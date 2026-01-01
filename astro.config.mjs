// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: 'https://birdseyefarm.com',
  output: 'static',
  vite: {
    css: {
      modules: {
        localsConvention: 'camelCase'
      }
    },
    assetsInclude: ['**/*.HEIC']
  }
});
