import { config } from 'dotenv';
import { createClient } from '@sanity/client';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

config();

if (!process.env.SANITY_API_TOKEN) {
  console.error('Error: SANITY_API_TOKEN env var is required (set it in .env or the environment).');
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = createClient({
  projectId: '2nhyst6p',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

const CONTENT_DIR = join(__dirname, '../src/content/goats');
const IMAGES_DIR = join(__dirname, '../src/images');

// Raw shapes as returned by Sanity (link fields may be absent when empty).
interface SanityAncestor {
  name?: string;
  link?: string;
}

interface SanityParent {
  name?: string;
  link?: string;
  sire?: SanityAncestor;
  dam?: SanityAncestor;
}

interface SanityMate {
  name?: string;
  slug?: string;
  link?: string;
}

interface SanityImage {
  asset: { url: string };
  alt?: string;
}

interface SanityGoat {
  name?: string;
  aka?: string;
  slug: string;
  date?: string;
  adgaPedigree: string;
  pedigree?: string;
  kiddingDate?: string;
  sire?: SanityParent;
  dam?: SanityParent;
  mate?: SanityMate;
  copy?: string[];
  notes?: string[];
  prices?: string[];
  images?: SanityImage[];
}

// Normalized shapes that satisfy the Astro content Zod schema
// (src/content/config.ts): sire.link / dam.link are required strings.
interface NormalizedAncestor {
  name: string;
  link: string;
}

interface NormalizedParent {
  name: string;
  link: string;
  sire?: NormalizedAncestor;
  dam?: NormalizedAncestor;
}

interface NormalizedMate {
  name: string;
  slug: string;
  link: string;
}

interface LocalImage {
  filename: string;
  alt: string;
}

interface LocalGoat {
  name: string;
  aka: string;
  slug: string;
  adgaPedigree: string;
  date: string;
  sire: NormalizedParent;
  dam: NormalizedParent;
  copy: string[];
  notes: string[];
  prices: string[];
  kiddingDate?: string;
  pedigree?: string;
  mate?: NormalizedMate;
  images?: LocalImage[];
}

const query = `*[_type == "goat"] | order(displayOrder asc) {
  name,
  aka,
  "slug": slug.current,
  date,
  adgaPedigree,
  pedigree,
  kiddingDate,
  sire,
  dam,
  mate,
  copy,
  notes,
  prices,
  images[] {
    asset->{
      url
    },
    alt
  }
}`;

// The Astro content-collection schema (src/content/config.ts) requires
// `sire.link` and `dam.link` as non-optional strings, and a fully-formed
// `mate` object. Sanity omits empty link fields entirely, so pass everything
// through these normalizers to guarantee schema-valid output ("" for missing
// links, matching the original hand-maintained JSON convention).
function normalizeAncestor(a: SanityAncestor | undefined): NormalizedAncestor | undefined {
  if (!a || typeof a !== 'object') return undefined;
  return { name: a.name ?? '', link: a.link ?? '' };
}

function normalizeParent(p: SanityParent | undefined): NormalizedParent {
  // Top-level sire/dam: name + link required by schema; nested sire/dam optional.
  const parent: NormalizedParent = {
    name: p?.name ?? '',
    link: p?.link ?? '',
  };
  const sire = normalizeAncestor(p?.sire);
  const dam = normalizeAncestor(p?.dam);
  if (sire) parent.sire = sire;
  if (dam) parent.dam = dam;
  return parent;
}

function normalizeMate(m: SanityMate | undefined): NormalizedMate | undefined {
  if (!m || typeof m !== 'object') return undefined;
  // All three fields are required by the schema when `mate` is present.
  return { name: m.name ?? '', slug: m.slug ?? '', link: m.link ?? '' };
}

function getExistingImages(slug: string): LocalImage[] | null {
  const filePath = join(CONTENT_DIR, `${slug}.json`);
  if (!existsSync(filePath)) return null;
  try {
    const data = JSON.parse(readFileSync(filePath, 'utf-8'));
    return data.images || null;
  } catch {
    return null;
  }
}

async function downloadImage(url: string, destPath: string): Promise<void> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download: ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  const dir = dirname(destPath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(destPath, buffer);
}

function getExtensionFromUrl(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const ext = extname(pathname);
    return ext || '.jpg';
  } catch {
    return '.jpg';
  }
}

async function syncFromSanity(): Promise<void> {
  console.log('Fetching goats from Sanity...\n');
  const goats = await client.fetch<SanityGoat[]>(query);
  console.log(`Found ${goats.length} goats\n`);

  for (const goat of goats) {
    const slug = goat.slug;
    console.log(`Syncing: ${goat.name} (${slug})`);

    // Build local JSON object matching the Zod schema
    const localData: LocalGoat = {
      name: goat.name ?? '',
      aka: goat.aka ?? '',
      slug,
      adgaPedigree: goat.adgaPedigree ?? '',
      date: goat.date ?? '',
      sire: normalizeParent(goat.sire),
      dam: normalizeParent(goat.dam),
      copy: goat.copy || [],
      notes: goat.notes || [],
      prices: goat.prices || [],
    };

    // Optional fields — only include if they have values
    if (goat.kiddingDate) localData.kiddingDate = goat.kiddingDate;
    if (goat.pedigree) localData.pedigree = goat.pedigree;
    const mate = normalizeMate(goat.mate);
    if (mate) localData.mate = mate;

    // Handle images: preserve existing local filenames, or download new ones
    const existingImages = getExistingImages(slug);
    if (existingImages && existingImages.length > 0) {
      localData.images = existingImages;
      console.log(`  Preserved ${existingImages.length} existing local image(s)`);
    } else if (goat.images && goat.images.length > 0) {
      // Download images from Sanity (in parallel; order preserved by index)
      const goatImagesDir = join(IMAGES_DIR, slug);
      const results = await Promise.all(
        goat.images.map(async (img, i): Promise<LocalImage | null> => {
          const ext = getExtensionFromUrl(img.asset.url);
          const filename = i === 0 ? `profile${ext}` : `image-${i}${ext}`;
          const destPath = join(goatImagesDir, filename);

          try {
            console.log(`  Downloading: ${filename}`);
            await downloadImage(img.asset.url, destPath);
            return { filename, alt: img.alt || `${goat.name} photo` };
          } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.error(`  Failed to download image: ${message}`);
            return null;
          }
        })
      );
      const downloadedImages = results.filter(
        (img): img is LocalImage => img !== null
      );

      if (downloadedImages.length > 0) {
        localData.images = downloadedImages;
      }
    }

    // Write JSON file
    const filePath = join(CONTENT_DIR, `${slug}.json`);
    writeFileSync(filePath, JSON.stringify(localData, null, 2) + '\n');
    console.log(`  ✓ Written to ${slug}.json\n`);
  }

  console.log('Sync complete!');
}

syncFromSanity().catch(console.error);
