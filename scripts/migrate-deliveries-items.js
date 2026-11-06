// One-off: convert the old text-only deliveriesPage.options
// (e.g. "Now-and-Then Eggs ($8/doz)") into structured deliveriesPage.items.
// Usage: SANITY_API_TOKEN=... node scripts/migrate-deliveries-items.js [--dry-run]
import { config } from 'dotenv';
import { createClient } from '@sanity/client';
import { randomUUID } from 'node:crypto';

config();

const dryRun = process.argv.includes('--dry-run');

const client = createClient({
  projectId: '2nhyst6p',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

function parseOption(option) {
  const match = option.match(
    /^(.*?)\s*\(\$(\d+(?:\.\d{1,2})?)\s*(?:\/\s*([^)]+))?\)\s*$/
  );
  const item = {
    _type: 'deliveryItem',
    _key: randomUUID().slice(0, 12),
    name: match ? match[1].trim() : option.trim(),
    available: true,
  };
  if (match) {
    item.price = Number(match[2]);
    if (match[3]) item.unit = match[3].trim();
  }
  return item;
}

async function migrate() {
  const page = await client.fetch(
    '*[_type == "deliveriesPage"][0]{_id, items, options}'
  );

  if (!page) {
    console.log('No deliveriesPage document found.');
    return;
  }
  if (page.items?.length) {
    console.log('✓ Delivery items already exist, skipping.');
    return;
  }

  const items = (page.options ?? [])
    .filter((option) => option.trim().toLowerCase() !== 'other')
    .map(parseOption);

  console.log('Items to create:');
  for (const item of items) {
    console.log(
      `  - ${item.name}: ${item.price !== undefined ? `$${item.price}` : 'price varies'}${item.unit ? ` / ${item.unit}` : ''}`
    );
  }

  if (dryRun) {
    console.log('\n(dry run, nothing written)');
    return;
  }

  await client.patch(page._id).set({ items }).commit();
  console.log(`\n✓ Added ${items.length} items to ${page._id}.`);
  console.log('Set your Venmo username in Sanity Studio > Deliveries Page.');
}

migrate().catch((error) => {
  console.error(error);
  process.exit(1);
});
