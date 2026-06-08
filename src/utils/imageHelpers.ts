import type { ImageMetadata } from 'astro'

interface GoatImage {
  filename: string
  alt: string
}

export async function getGoatImages(slug: string, imageList?: GoatImage[]) {
  const images = import.meta.glob<{ default: ImageMetadata }>(
    '/src/images/**/*.{jpg,jpeg,png,webp,avif,HEIC}'
  )

  const goatImages: Array<{ image: ImageMetadata; alt: string }> = []

  if (imageList) {
    // Use the explicit image list from the JSON
    const loadedImages = await Promise.all(
      imageList
        .map(({ filename, alt }) => {
          // If filename starts with /, it's an absolute path from /src/images/
          // Otherwise, it's relative to the goat's folder
          const imageKey = filename.startsWith('/')
            ? `/src/images${filename}`
            : `/src/images/${slug}/${filename}`
          return images[imageKey] ? { imageKey, alt } : null
        })
        .filter(
          (item): item is { imageKey: string; alt: string } => item !== null
        )
        .map(async ({ imageKey, alt }) => ({
          image: (await images[imageKey]()).default,
          alt,
        }))
    )
    goatImages.push(...loadedImages)
  }

  return goatImages
}

export async function getMateImage(slug: string) {
  const images = import.meta.glob<{ default: ImageMetadata }>(
    '/src/images/*.{jpg,jpeg,png,webp,avif}'
  )

  // Try to find an image that matches the slug
  for (const key of Object.keys(images)) {
    if (key.toLowerCase().includes(slug.toLowerCase())) {
      return (await images[key]()).default
    }
  }

  return null
}

export async function getAllMateImages() {
  const images = import.meta.glob<{ default: ImageMetadata }>(
    '/src/images/*.{jpg,jpeg,png,webp,avif}'
  )

  const mateImages: Record<string, ImageMetadata> = {}

  for (const [key, value] of Object.entries(images)) {
    // Extract filename without path and extension
    const filename = key.split('/').pop()?.split('.')[0]
    if (
      filename &&
      !filename.includes('logo') &&
      !filename.includes('skeeter')
    ) {
      mateImages[filename] = (await value()).default
    }
  }

  return mateImages
}
