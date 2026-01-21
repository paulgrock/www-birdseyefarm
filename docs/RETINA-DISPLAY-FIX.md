# Retina Display Optimization

## Issue
Goat images from Sanity CDN were not optimized for retina (2x) displays. They only served a single resolution, which looked blurry on high-DPI screens.

## Solution Applied

Updated `src/components/GoatBio.astro` to add proper `srcset` attributes for all Sanity images.

### Changes Made

#### Profile Images (Main goat photos)
```html
<img
  src="https://cdn.sanity.io/images/.../image.jpg?w=380&auto=format"
  srcset="https://cdn.sanity.io/images/.../image.jpg?w=380&auto=format 1x,
          https://cdn.sanity.io/images/.../image.jpg?w=760&auto=format 2x"
  alt="..."
  width="380"
  loading="lazy"
/>
```

#### Additional Images (Detail page images)
Same srcset pattern applied to all additional images shown on individual goat pages.

### Benefits

1. **Retina Display Support**
   - 1x resolution (380px) for standard displays
   - 2x resolution (760px) for retina/high-DPI displays
   - Crisp, sharp images on all devices

2. **Automatic Format Optimization**
   - `auto=format` parameter tells Sanity to serve WebP to browsers that support it
   - Falls back to JPEG for older browsers
   - Smaller file sizes with better quality

3. **Performance**
   - `loading="lazy"` - Images load as you scroll
   - Browser requests appropriate resolution based on screen
   - Bandwidth-conscious - mobile devices may use 1x even if retina

4. **Sanity CDN Features**
   - Images are cached globally
   - Automatic image optimization
   - On-the-fly resizing and format conversion
   - No build-time processing needed

### URL Parameters Used

- `w=380` - Width in pixels
- `w=760` - Width for 2x displays (380px × 2)
- `auto=format` - Automatically serve best format (WebP, JPEG, etc.)

### Testing

Visit any goat page on a retina display:
- Images should appear sharp and crisp
- Inspect network tab to see 2x images loading on high-DPI screens
- Check for WebP format being served (if browser supports it)

### Comparison

**Before:**
- Single resolution image
- No retina support
- Fixed JPEG format
- Blurry on retina displays

**After:**
- Multi-resolution srcset
- Proper retina support
- Automatic format optimization (WebP when possible)
- Sharp on all displays

---

**Status**: All goat images now optimized for retina displays ✅

**Files Modified:**
- `src/components/GoatBio.astro` - Added srcset and lazy loading
