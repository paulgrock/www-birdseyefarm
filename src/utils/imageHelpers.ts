import type { ImageMetadata } from 'astro';

export async function getGoatImages(slug: string) {
  const images = import.meta.glob<{ default: ImageMetadata }>(
    '/src/images/**/*.{jpg,jpeg,png,webp,avif,HEIC}'
  );

  const goatImages: Record<string, ImageMetadata> = {};

  // Try different possible image names for each type
  const imageTypes = ['profile', 'other', 'bottom', 'young', 'udder', 'udder-two'];

  for (const type of imageTypes) {
    // Try different extensions
    const extensions = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'HEIC'];
    for (const ext of extensions) {
      // First try the standard naming (e.g., profile.jpg)
      let imageKey = `/src/images/${slug}/${type}.${ext}`;
      if (images[imageKey]) {
        const key = type.replace('-', '');
        goatImages[key] = (await images[imageKey]()).default;
        break;
      }

      // If profile doesn't exist, try slug name as filename (e.g., harley-hillside-dime-piece.jpg)
      if (type === 'profile') {
        imageKey = `/src/images/${slug}/${slug}.${ext}`;
        if (images[imageKey]) {
          goatImages.profile = (await images[imageKey]()).default;
          break;
        }

        // Also try shortened slug (e.g., zora-neale.jpg from birds-eye-farm-zora-neale)
        const parts = slug.split('-');
        if (parts.length > 2) {
          const shortSlug = parts.slice(-2).join('-');
          imageKey = `/src/images/${slug}/${shortSlug}.${ext}`;
          if (images[imageKey]) {
            goatImages.profile = (await images[imageKey]()).default;
            break;
          }
        }
      }
    }
  }

  return goatImages;
}

export async function getMateImage(slug: string) {
  const images = import.meta.glob<{ default: ImageMetadata }>(
    '/src/images/*.{jpg,jpeg,png,webp,avif}'
  );

  // Try to find an image that matches the slug
  for (const key of Object.keys(images)) {
    if (key.toLowerCase().includes(slug.toLowerCase())) {
      return (await images[key]()).default;
    }
  }

  return null;
}

export async function getAllMateImages() {
  const images = import.meta.glob<{ default: ImageMetadata }>(
    '/src/images/*.{jpg,jpeg,png,webp,avif}'
  );

  const mateImages: Record<string, ImageMetadata> = {};

  for (const [key, value] of Object.entries(images)) {
    // Extract filename without path and extension
    const filename = key.split('/').pop()?.split('.')[0];
    if (filename && !filename.includes('logo') && !filename.includes('skeeter')) {
      mateImages[filename] = (await value()).default;
    }
  }

  return mateImages;
}
