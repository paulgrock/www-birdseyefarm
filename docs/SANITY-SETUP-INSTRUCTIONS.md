# Sanity CMS Setup Instructions

## Current Status: API Token Issue

The Sanity CMS integration is **90% complete** but cannot proceed with migration due to API token permissions.

### What's Done ✅

1. All dependencies installed
2. Sanity configured in Astro
3. Content schemas created (goat, homepage)
4. Migration script written and ready
5. Sanity client helpers created
6. GROQ queries prepared

### What's Blocked ⚠️

The API token provided doesn't have **write permissions**, so we cannot:
- Upload images to Sanity CDN
- Create goat documents
- Programmatically migrate content

## How to Fix: Get New API Token

### Step 1: Access Sanity Dashboard
1. Go to: https://www.sanity.io/manage
2. Log in with your Sanity account
3. Select the "Bird's Eye Farm" project (ID: 2nhyst6p)

### Step 2: Create New Token
1. Click on "API" in the left sidebar
2. Click "Add API token" or "Tokens" tab
3. Fill in:
   - **Name**: "Migration Script" or "Local Development"
   - **Permissions**: Select **Editor** or **Administrator**
4. Click "Add token"
5. **IMPORTANT**: Copy the token immediately (you can't view it again!)

### Step 3: Update Environment Variable
1. Open `.env` file in the project root
2. Replace the existing `SANITY_API_TOKEN` value with your new token:
   ```
   SANITY_API_TOKEN=sk...your-new-token-here...
   ```
3. Save the file

### Step 4: Run Migration
```bash
npm run migrate:goats
```

This will:
- Upload all 11 goat images to Sanity CDN
- Create all 11 goat documents in Sanity
- Take about 2-3 minutes

## Alternative: Manual Entry via Studio

If you prefer not to deal with API tokens, you can manually add content:

### Option A: Access Studio Locally
1. Start dev server: `npm run dev`
2. Go to: http://localhost:4321/admin
3. Log in with your Sanity credentials
4. Manually create goat entries

**Pros**: No token needed, full control
**Cons**: Takes 30-60 minutes for 11 goats

## After Migration Completes

Once the token issue is resolved and migration runs successfully:

### 1. Verify Content in Studio
- Visit Studio at http://localhost:4321/admin
- Check that all 11 goats appear
- Verify images uploaded correctly

### 2. Add Homepage Content
- Create a single "Home Page" document
- Upload hero logo and background
- Add welcome text
- Upload family photo and gallery images

### 3. Update Astro Code
We'll update these files to query Sanity instead of Content Collections:
- `src/pages/goats/index.astro`
- `src/pages/goats/[slug].astro`
- `src/components/sections/Hero.astro`
- `src/components/sections/Gallery.astro`

### 4. Test Locally
- Build: `npm run build`
- Preview: `npm run preview`
- Verify all pages work correctly

### 5. Deploy
- Push to Git
- Netlify will auto-deploy
- Set up webhook for content updates

## Questions?

Check `sanity-migration.md` for full technical details and architecture diagram.

## Next Step

**ACTION NEEDED**: Please create a new Sanity API token with Editor permissions and update the `.env` file, then run `npm run migrate:goats`.

Let me know when you're ready, or if you'd prefer to use the Studio for manual entry!
