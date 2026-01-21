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

// Order from src/pages/goats/index.astro
const goatOrder = [
  'birds-eye-farm-ina-may',
  'diji-farm-cacao-nib',
  'birds-eye-farm-elena-ferrante',
  'birds-eye-farm-lizabeth-darcy',
  'birds-eye-farm-masha-gessen',
  'birds-eye-farm-gianaclis',
  'birds-eye-farm-gilia-tricolor',
  'birds-eye-farm-vanilla-orchid',
  'birds-eye-farm-zora-neale',
  'harley-hillside-ginger-zinger',
  'harley-hillside-dime-piece',
];

// Kidding schedule order from src/pages/kidding-schedule/index.astro
const kiddingOrder = [
  'birds-eye-farm-ina-may',
  'diji-farm-cacao-nib',
  'birds-eye-farm-elena-ferrante',
  'birds-eye-farm-lizabeth-darcy',
  'birds-eye-farm-masha-gessen',
  'birds-eye-farm-gianaclis',
  'birds-eye-farm-zora-neale',
  'birds-eye-farm-vanilla-orchid',
];

async function setDisplayOrder() {
  console.log('Setting display order for all goats...\n');

  // Fetch all goats
  const goats = await client.fetch('*[_type == "goat"] { _id, name, "slug": slug.current }');

  // Set main page display order
  console.log('Setting main page display order...');
  for (let i = 0; i < goatOrder.length; i++) {
    const slug = goatOrder[i];
    const goat = goats.find(g => g.slug === slug);

    if (goat) {
      await client
        .patch(goat._id)
        .set({ displayOrder: i })
        .commit();

      console.log(`✓ Set displayOrder=${i} for ${goat.name}`);
    } else {
      console.log(`⚠️  Could not find goat with slug: ${slug}`);
    }
  }

  // Set kidding schedule order
  console.log('\nSetting kidding schedule order...');
  for (let i = 0; i < kiddingOrder.length; i++) {
    const slug = kiddingOrder[i];
    const goat = goats.find(g => g.slug === slug);

    if (goat) {
      await client
        .patch(goat._id)
        .set({ kiddingScheduleOrder: i })
        .commit();

      console.log(`✓ Set kiddingScheduleOrder=${i} for ${goat.name}`);
    } else {
      console.log(`⚠️  Could not find goat with slug: ${slug}`);
    }
  }

  console.log('\n✅ Display order migration complete!');
  console.log('\nNote: You can now edit both orders independently in Sanity Studio');
  console.log('Lower numbers appear first in listings');
}

setDisplayOrder().catch(console.error);
