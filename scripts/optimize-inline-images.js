import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const images = [
  { input: '../src/images/diji-farm-cacao-nib/young.jpg', output: '../public/diji-farm-cacao-nib/young.jpg' },
  { input: '../src/images/diji-farm-cacao-nib/udder.jpg', output: '../public/diji-farm-cacao-nib/udder.jpg' },
  { input: '../src/images/diji-farm-cacao-nib/udder-two.jpg', output: '../public/diji-farm-cacao-nib/udder-two.jpg' },
];

async function optimizeImages() {
  for (const { input, output } of images) {
    const inputPath = join(__dirname, input);
    const outputPath = join(__dirname, output);

    // Ensure output directory exists
    mkdirSync(dirname(outputPath), { recursive: true });

    console.log(`Optimizing ${input}...`);

    await sharp(inputPath)
      .resize(380, null, { // Max width 380px, maintain aspect ratio
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: 85 })
      .toFile(outputPath.replace('.jpg', '.webp'));

    console.log(`  ✓ Saved to ${output.replace('.jpg', '.webp')}`);
  }

  console.log('\nOptimization complete!');
  console.log('Note: Images saved as .webp format for better compression');
}

optimizeImages().catch(console.error);
