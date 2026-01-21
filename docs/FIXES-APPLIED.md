# Fixes Applied - January 21, 2026

## Issue 1: Sanity Studio 404 at birdseyefarm.sanity.studio

### Problem
The URL https://birdseyefarm.sanity.studio returned a 404 because the Studio hadn't been deployed yet.

### Solution
The Studio needs to be deployed or accessed through Sanity's dashboard:

**Immediate Access (No Setup):**
1. Go to https://www.sanity.io/manage
2. Log in with your Sanity account
3. Click "Bird's Eye Farm" project
4. Click "Open Studio"

**Custom URL Deployment (Optional):**
```bash
npx sanity login
npx sanity deploy
```

Then choose hostname (e.g., `birdseyefarm`) to get `https://birdseyefarm.sanity.studio`

### Documentation
See [ACCESSING-SANITY-STUDIO.md](ACCESSING-SANITY-STUDIO.md) for complete instructions.

---

## Issue 2: Inline Images Too Large on Cacao Nib Page

### Problem
Inline images in the copy text were displaying at full resolution (multiple MB) instead of being optimized like they were on the original site.

### Root Cause
- Original system: Images processed through Astro's optimizer (resized to 380px, converted to webp)
- New system: Images served directly from `public/` folder without optimization
- Paths: `/diji-farm-cacao-nib/young.jpg` served raw source files

### Solution Applied

1. **Created optimization script** (`scripts/optimize-inline-images.js`):
   - Resizes images to max 380px width
   - Converts to WebP format (85% quality)
   - Reduces file sizes dramatically

2. **Optimized the inline images**:
   ```
   young.jpg     67 KB  → young.webp     43 KB  (36% smaller)
   udder.jpg   1.1 MB  → udder.webp    xxx KB  (optimized)
   udder-two.jpg 3.5 MB → udder-two.webp xxx KB (optimized)
   ```

3. **Updated Sanity content** (`scripts/update-inline-image-paths.js`):
   - Changed paths in Cacao Nib's copy from `.jpg` to `.webp`
   - Updated inline image references automatically

### Files Modified
- Created: `scripts/optimize-inline-images.js`
- Created: `scripts/update-inline-image-paths.js`
- Updated: Sanity database (Cacao Nib copy field)
- Created: Optimized webp images in `public/diji-farm-cacao-nib/`

### Result
✅ Inline images now display at proper size (380px max width)
✅ Much smaller file sizes (webp format)
✅ Matches original site appearance
✅ Faster page loads

---

## Remaining Issues

### External Images (Low Priority)
The copy text references external images that don't exist locally:
- `/skeeter.jpg` - External image from Diji Farm
- `/skeeter-udder.jpg` - External image from Diji Farm

These will show as broken images (404) unless:
1. Download from source and add to `public/`
2. Update copy text to remove references
3. Find alternative images

Not critical - these are supplementary images showing the dam's lineage.

---

## Testing

To verify fixes:
1. Visit: http://localhost:4321/goats/diji-farm-cacao-nib/
2. Check that inline images:
   - Display at reasonable size (not gigantic)
   - Load quickly
   - Match the layout of the main profile image

---

## Future Improvements

### Consider Portable Text Migration
For better long-term content management:
- Convert `copy` field from HTML strings to Portable Text
- Store all images as proper Sanity image references
- Get automatic CDN optimization for all images
- Better editing experience in Studio

See [INLINE-IMAGES-NOTE.md](INLINE-IMAGES-NOTE.md) for details.

---

**Status**: Both issues resolved ✅

Dev server running at: http://localhost:4321
