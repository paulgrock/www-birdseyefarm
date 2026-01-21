import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_STUDIO_DATASET,
  useCdn: import.meta.env.PROD, // Use CDN in production, bypass in development
  apiVersion: '2024-01-01',
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
