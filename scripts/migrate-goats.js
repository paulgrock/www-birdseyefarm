import { config } from 'dotenv';
import { createClient } from '@sanity/client';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Sanity client with write permissions
const client = createClient({
  projectId: '2nhyst6p',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function uploadImage(imagePath, alt) {
  try {
    const imageBuffer = readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: imagePath.split('/').pop(),
    });
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
      alt: alt || '',
    };
  } catch (error) {
    console.error(`Failed to upload image ${imagePath}:`, error.message);
    return null;
  }
}

async function migrateGoats() {
  const contentDir = join(__dirname, '../src/content/goats');
  const imagesDir = join(__dirname, '../src/images');

  const goatFiles = readdirSync(contentDir).filter(file => file.endsWith('.json'));

  console.log(`Found ${goatFiles.length} goat files to migrate\n`);

  for (const file of goatFiles) {
    const filePath = join(contentDir, file);
    const goatData = JSON.parse(readFileSync(filePath, 'utf-8'));

    console.log(`Migrating: ${goatData.name}...`);

    // Upload images if they exist
    const sanityImages = [];
    if (goatData.images && Array.isArray(goatData.images)) {
      const goatSlug = goatData.slug;
      const goatImagesDir = join(imagesDir, goatSlug);

      for (const img of goatData.images) {
        const imagePath = join(goatImagesDir, img.filename);
        console.log(`  Uploading image: ${img.filename}`);
        const uploadedImage = await uploadImage(imagePath, img.alt);
        if (uploadedImage) {
          sanityImages.push(uploadedImage);
        }
      }
    }

    // Create Sanity document
    const sanityDoc = {
      _type: 'goat',
      name: goatData.name,
      aka: goatData.aka,
      slug: {
        _type: 'slug',
        current: goatData.slug,
      },
      date: goatData.date,
      adgaPedigree: goatData.adgaPedigree,
      ...(goatData.pedigree && { pedigree: goatData.pedigree }),
      ...(goatData.kiddingDate && { kiddingDate: goatData.kiddingDate }),
      sire: goatData.sire,
      dam: goatData.dam,
      ...(goatData.mate && { mate: goatData.mate }),
      copy: goatData.copy || [],
      notes: goatData.notes || [],
      prices: goatData.prices || [],
      images: sanityImages,
    };

    try {
      const result = await client.create(sanityDoc);
      console.log(`  ✓ Created document: ${result._id}\n`);
    } catch (error) {
      console.error(`  ✗ Failed to create document:`, error.message, '\n');
    }
  }

  console.log('Migration complete!');
}

// Run migration
migrateGoats().catch(console.error);
