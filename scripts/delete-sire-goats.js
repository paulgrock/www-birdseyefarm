import { config } from 'dotenv';
import { createClient } from '@sanity/client';

config();

const client = createClient({
  projectId: '2nhyst6p',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function deleteSireGoats() {
  console.log('Deleting sire goats (Ed and Shaboozie) from goat collection...\n');

  const sires = ['ed', 'shaboozie'];

  for (const slug of sires) {
    const goat = await client.fetch(
      '*[_type == "goat" && slug.current == $slug][0] { _id, name }',
      { slug }
    );

    if (!goat) {
      console.log(`⚠️  No goat found with slug: ${slug}`);
      continue;
    }

    console.log(`Deleting ${goat.name}...`);
    await client.delete(goat._id);
    console.log(`✓ Deleted ${goat.name}`);
  }

  console.log('\n✅ Cleanup complete!');
  console.log('You can now run add-sire-goats.js to create them as sires');
}

deleteSireGoats().catch(console.error);
