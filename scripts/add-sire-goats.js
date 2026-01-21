import { config } from 'dotenv';
import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config();

const client = createClient({
  projectId: '2nhyst6p',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

// Sire data
const sires = [
  {
    name: 'Till-Riv BNS Smooth Edition*B',
    slug: 'ed',
    link: 'https://adgagenetics.org/GoatDetail.aspx?RegNumber=AB1874374',
    imagePath: path.join(__dirname, '../src/images/ed.avif'),
    imageAlt: 'Till-Riv BNS Smooth Edition*B (Ed)',
  },
  {
    name: 'Diji Farm DJ Shaboozie*B',
    slug: 'shaboozie',
    link: 'https://adgagenetics.org/GoatDetail.aspx?RegNumber=AB1936726',
    imagePath: path.join(__dirname, '../src/images/shaboozie.avif'),
    imageAlt: 'Diji Farm DJ Shaboozie*B (Shaboozie)',
  },
];

async function uploadImage(imagePath, altText) {
  console.log(`Uploading image: ${imagePath}`);
  const imageBuffer = fs.readFileSync(imagePath);
  const asset = await client.assets.upload('image', imageBuffer, {
    filename: path.basename(imagePath),
  });
  console.log(`✓ Uploaded image: ${asset._id}`);
  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
    alt: altText,
  };
}

async function addSireGoats() {
  console.log('Adding sire goats to Sanity...\n');

  for (const sire of sires) {
    console.log(`\nProcessing ${sire.name}...`);

    // Check if sire already exists
    const existing = await client.fetch(
      '*[_type == "sire" && slug.current == $slug][0]',
      { slug: sire.slug }
    );

    if (existing) {
      console.log(`⚠️  Sire with slug "${sire.slug}" already exists, skipping...`);
      continue;
    }

    // Upload image
    const image = await uploadImage(sire.imagePath, sire.imageAlt);

    // Create sire document
    const sireDoc = {
      _type: 'sire',
      name: sire.name,
      slug: {
        _type: 'slug',
        current: sire.slug,
      },
      link: sire.link,
      image: image,
    };

    const result = await client.create(sireDoc);
    console.log(`✓ Created sire document: ${result._id}`);
  }

  console.log('\n✅ Sires added successfully!');
  console.log('You can edit their details in Sanity Studio if needed');
}

addSireGoats().catch(console.error);
