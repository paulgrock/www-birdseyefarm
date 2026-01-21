# Sanity CMS Migration for Bird's Eye Farm

## Overview
Migrating from Astro Content Collections to Sanity CMS to enable non-technical content editing.

## Project Setup

### Dependencies Installed
```bash
npm install @sanity/client @sanity/astro @astrojs/react @sanity/image-url sanity dotenv
```

### Environment Variables
Created `.env` file with:
```
PUBLIC_SANITY_PROJECT_ID=2nhyst6p
PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<your-token>
```

### Configuration Files Created

#### astro.config.mjs
Added Sanity and React integrations:
```javascript
import sanity from '@sanity/astro';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [
    sanity({
      projectId: '2nhyst6p',
      dataset: 'production',
      useCdn: false,
      apiVersion: '2024-01-01',
      studioBasePath: '/admin',
    }),
    react(),
  ],
  // ... rest of config
});
```

#### sanity.config.ts
Sanity Studio configuration with schema registry.

## Content Schemas

### Goat Schema (`sanity/schemas/goat.ts`)
Mirrors the existing JSON structure with:
- Basic info: name, aka, slug, birth date, ADGA pedigree
- Genealogy: sire and dam with nested lineage
- Content arrays: descriptions, notes, prices
- Images with alt text

### Homepage Schema (`sanity/schemas/homePage.ts`)
Makes hardcoded homepage content editable:
- Hero section: logo and background images
- Welcome section: title, rich text, family photo
- Gallery: image array with captions
- Contact: configurable heading

## Migration Script

Created `scripts/migrate-goats.js` to:
1. Read all goat JSON files from `src/content/goats/`
2. Upload images to Sanity CDN
3. Transform data to Sanity document format
4. Create documents via Sanity API

Run with: `npm run migrate:goats`

## Status: Token Permission Issue

The migration script is ready but the API token needs write permissions. The current token shows:
```
Insufficient permissions; permission "create" required
```

### To Fix:
1. Go to Sanity dashboard: https://www.sanity.io/manage/personal/project/2nhyst6p
2. Navigate to API settings
3. Create a new token with **Editor** or **Administrator** permissions
4. Replace the `SANITY_API_TOKEN` in `.env`
5. Re-run `npm run migrate:goats`

## Next Steps

Once the API token issue is resolved:

1. ✅ Complete migration of goat data
2. Manually add homepage content to Sanity Studio
3. Update Astro pages to query from Sanity:
   - `src/pages/goats/index.astro`
   - `src/pages/goats/[slug].astro`
   - `src/components/sections/Hero.astro`
   - `src/components/sections/Gallery.astro`
4. Test Studio at `/admin`
5. Configure Netlify webhook for auto-deploys

## Benefits After Migration

- Emma can edit goat profiles without touching code
- Add/update homepage content through Sanity Studio
- Images managed through Sanity CDN
- Content changes trigger automatic Netlify rebuilds
- Preview changes before publishing

## Rollback Plan

All original files remain in place:
- Content Collections still in `src/content/goats/`
- Images still in `src/images/`
- Can revert Astro config and pages if needed

## Architecture

```
┌─────────────────┐
│  Sanity Studio  │ <-- Emma edits here at /admin
│  (React SPA)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Sanity API     │ <-- Content stored here
│  Content Lake   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Astro Site     │ <-- Queries content via GROQ
│  (Static SSG)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Netlify      │ <-- Webhook triggers rebuild
│   (Hosting)     │
└─────────────────┘
```

## Files Created

### Configuration
- `/sanity.config.ts` - Studio configuration
- `/astro.config.mjs` - Updated with Sanity integration
- `/.env` - Environment variables (git ignored)

### Schemas
- `/sanity/schemas/goat.ts` - Goat content type
- `/sanity/schemas/homePage.ts` - Homepage content type
- `/sanity/schemas/index.ts` - Schema registry

### Utilities
- `/src/lib/sanity.ts` - Sanity client and image builder
- `/src/lib/queries.ts` - GROQ queries for content

### Scripts
- `/scripts/migrate-goats.js` - Migration script
- Added `migrate:goats` npm script

## Migration Progress

- [x] Install dependencies
- [x] Configure Astro integration
- [x] Define content schemas
- [x] Create Sanity client helpers
- [x] Write migration script
- [ ] Fix API token permissions ⚠️ **CURRENT BLOCKER**
- [ ] Run migration successfully
- [ ] Update Astro pages to use Sanity
- [ ] Test build and deployment

## Resources

- [Sanity Docs](https://www.sanity.io/docs)
- [Sanity + Astro Guide](https://docs.astro.build/en/guides/cms/sanity/)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity Image URL Builder](https://www.sanity.io/docs/image-url)
