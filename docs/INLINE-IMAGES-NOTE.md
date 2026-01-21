# Inline Images in Copy Text

## Current Situation

Some goat entries (notably Cacao Nib) have inline images embedded in their `copy` text as HTML:

```html
<img src='/diji-farm-cacao-nib/young.jpg' alt='Nib as a young doe' class='photo' />
```

## Current Solution

These images have been copied to the `public/` directory so they can be served as static assets:

- `public/diji-farm-cacao-nib/young.jpg`
- `public/diji-farm-cacao-nib/udder.jpg`
- `public/diji-farm-cacao-nib/udder-two.jpg`

External images (like skeeter.jpg) referenced in the copy don't exist locally and will need to be sourced or removed.

## Why This Happened

During the Sanity migration:
1. Profile/gallery images in the `images` array were uploaded to Sanity CDN
2. Inline images embedded in HTML copy text were NOT migrated
3. The copy field is stored as plain text/HTML in Sanity

## Better Long-term Solution

The proper way to handle rich text with images in Sanity is to use **Portable Text** instead of HTML strings:

### Benefits of Portable Text:
- Images stored as proper Sanity image references
- All images on Sanity CDN with automatic optimization
- No broken image paths
- Better editing experience in Sanity Studio
- Can render to any format (HTML, React, etc.)

### Migration Path:

1. Update goat schema to use Portable Text for copy:
```typescript
{
  name: 'copy',
  type: 'array',
  of: [
    { type: 'block' },  // Rich text blocks
    {
      type: 'image',    // Inline images
      fields: [
        { name: 'alt', type: 'string' }
      ]
    }
  ]
}
```

2. Re-migrate content, converting HTML to Portable Text blocks

3. Update frontend to use `@portabletext/react` or similar

### For Now:
The current solution works - inline images are in `public/` and served correctly. This is perfectly fine for a small site.

##Files with Inline Images

Currently only:
- **Diji Farm Cacao Nib** has inline images in copy

If you add more goats with inline images in the future:
1. Copy the images to appropriate `public/` subdirectories
2. OR migrate to Portable Text (better long-term)

## External Images

Some copy references external images (like skeeter.jpg from Diji Farm). These either need to:
- Be downloaded and added to `public/`
- Be replaced with Sanity-hosted versions
- Have their URLs updated to point to external sources

---

**Status**: Working solution in place. Consider Portable Text upgrade in future.
