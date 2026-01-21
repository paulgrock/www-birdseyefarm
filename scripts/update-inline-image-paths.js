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

async function updateImagePaths() {
  // Fetch Cacao Nib
  const goat = await client.fetch(`*[_type == "goat" && slug.current == "diji-farm-cacao-nib"][0]`);

  if (!goat) {
    console.error('Could not find Cacao Nib goat');
    return;
  }

  console.log('Found Cacao Nib, updating copy...');

  // Update image paths in copy to use webp versions
  const updatedCopy = goat.copy.map(paragraph =>
    paragraph
      .replace(/\/diji-farm-cacao-nib\/young\.jpg/g, '/diji-farm-cacao-nib/young.webp')
      .replace(/\/diji-farm-cacao-nib\/udder\.jpg/g, '/diji-farm-cacao-nib/udder.webp')
      .replace(/\/diji-farm-cacao-nib\/udder-two\.jpg/g, '/diji-farm-cacao-nib/udder-two.webp')
  );

  await client.patch(goat._id)
    .set({ copy: updatedCopy })
    .commit();

  console.log('✓ Updated Cacao Nib copy with optimized image paths');
}

updateImagePaths().catch(console.error);
