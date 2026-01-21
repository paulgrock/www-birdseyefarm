// @ts-check
import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://birdseyefarm.com',
  output: 'static',
  integrations: [
    sanity({
      projectId: '2nhyst6p',
      dataset: 'production',
      useCdn: true, // use CDN for production
      apiVersion: '2024-01-01',
    }),
    react(),
  ],
  vite: {
    assetsInclude: ['**/*.HEIC']
  }
});
