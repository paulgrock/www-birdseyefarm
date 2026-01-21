# Editable Page Content in Sanity

You can now edit the text content on the following pages through Sanity Studio:

## 1. Goats Page (/goats)

**Editable in Sanity Studio:**
- Title: "Does"
- Introduction paragraphs (3 paragraphs about the herd)

**How to edit:**
1. Open Sanity Studio at http://localhost:3333 or https://birdseyefarm.sanity.studio
2. Click on "Goats Page" in the sidebar
3. Edit the "Title" and "Introduction Text" fields
4. Click "Publish" to save changes
5. Refresh your website to see the changes (in dev) or wait for Netlify to rebuild (in production)

## 2. Home Page Gallery Section (/)

**Editable in Sanity Studio:**
- Welcome title: "Welcome to our farm"
- Welcome text (2 paragraphs about the farm and family)

**How to edit:**
1. Open Sanity Studio
2. Click on "Home Page" in the sidebar
3. Edit the "Welcome Title" and "Welcome Text" fields
4. Click "Publish" to save changes

## Technical Details

### New Files Created:
- `sanity/schemas/goatsPage.ts` - Schema for goats page content
- `src/lib/portableText.ts` - Helper to convert Sanity rich text to HTML
- `scripts/migrate-page-content.js` - Script that populated initial content

### Updated Files:
- `sanity/schemas/index.ts` - Registered goatsPage schema
- `src/lib/queries.ts` - Added goatsPageQuery
- `src/pages/goats/index.astro` - Now fetches content from Sanity
- `src/components/sections/Gallery.astro` - Now fetches welcome text from Sanity

### Content Format:
The text is stored as **Portable Text** in Sanity, which is a rich text format that supports:
- Multiple paragraphs
- Bold, italic, and other formatting
- Links
- Future expansion: images, lists, etc.

### Development vs Production:
- **Development**: Content updates appear immediately on page refresh (no CDN caching)
- **Production**: Content updates trigger automatic Netlify rebuild via webhook (once configured)

## Next Steps (Optional)

1. **Upload gallery images to Sanity** - Currently gallery images are still hardcoded local files
2. **Upload family photo to Sanity** - Make it editable through Sanity
3. **Add more editable sections** - Hero section, contact form text, etc.
4. **Set up Netlify webhook** - So publishing in Sanity triggers automatic deploys

## Viewing Changes Locally

1. Make sure Sanity Studio is running: `npx sanity dev`
2. Make sure Astro dev server is running: `npm run dev`
3. Edit content in Studio at http://localhost:3333
4. Refresh your site at http://localhost:4321 to see changes
