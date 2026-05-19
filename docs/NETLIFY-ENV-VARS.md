# Netlify Environment Variables Setup

## Issue

The Netlify build is failing because the environment variable names in Netlify don't match what the code expects.

## Current Netlify Variables (Wrong Names)
- `PUBLIC_SANITY_STUDIO_DATASET`
- `PUBLIC_SANITY_STUDIO_PROJECT_ID`

## Required Variables (Correct Names)
- `PUBLIC_SANITY_PROJECT_ID` = `2nhyst6p`
- `PUBLIC_SANITY_DATASET` = `production`

## How to Fix

1. Go to your Netlify site dashboard
2. Navigate to **Site configuration** → **Environment variables**
3. **Either:**
   - **Option A (Recommended):** Rename the existing variables:
     - Change `PUBLIC_SANITY_STUDIO_PROJECT_ID` to `PUBLIC_SANITY_PROJECT_ID`
     - Change `PUBLIC_SANITY_STUDIO_DATASET` to `PUBLIC_SANITY_DATASET`

   - **Option B:** Delete old ones and add new ones:
     - Delete `PUBLIC_SANITY_STUDIO_PROJECT_ID` and `PUBLIC_SANITY_STUDIO_DATASET`
     - Add new variable: `PUBLIC_SANITY_PROJECT_ID` = `2nhyst6p`
     - Add new variable: `PUBLIC_SANITY_DATASET` = `production`

4. Trigger a new deploy

## Why These Values Are Safe to Share

These are **public** identifiers (note the `PUBLIC_` prefix):
- `PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID (visible in browser)
- `PUBLIC_SANITY_DATASET`: The dataset name (typically "production")

These are NOT secrets - they're meant to be public and are included in the built site's JavaScript.

## Build Configuration

The build command in `netlify.toml` is:
```toml
[build]
  command = "npm run build"
  publish = "dist"
```

This runs `astro check && astro build`, which:
1. Type checks all files
2. Builds the static site
3. Outputs to `dist/` directory

## Type Check Issue

There's currently 1 type error in `src/pages/kidding-schedule/index.astro` (line 92) related to the `mateImage` property type. This is a pre-existing issue unrelated to the Sanity migration.

### Temporary Fix (Skip Type Check)

If you need to deploy immediately, you can temporarily skip the type check by updating `package.json`:

```json
"scripts": {
  "build": "astro build"
}
```

Then change it back to `"astro check && astro build"` after fixing the type error.

### Permanent Fix

Fix the type error in the kidding schedule component by updating the prop type to allow `null`:

```typescript
mateImage?: ImageMetadata | null | undefined
```
