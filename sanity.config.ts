import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemas } from './sanity/schemas';

export default defineConfig({
  name: 'birds-eye-farm',
  title: "Bird's Eye Farm",

  projectId: '2nhyst6p',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemas,
  },
});
