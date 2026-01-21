# How to Access Sanity Studio

## Option 1: Via Sanity.io Dashboard (Easiest)

1. Go to: https://www.sanity.io/manage
2. Log in with your Sanity account
3. Click on "Bird's Eye Farm" project
4. Click "Open Studio" button

This opens the Studio in your browser without any deployment needed.

## Option 2: Deploy Studio to Custom URL

To get a custom URL like `birdseyefarm.sanity.studio`:

### First Time Setup:

1. Login to Sanity CLI:
```bash
npx sanity login
```

2. Deploy the Studio:
```bash
npx sanity deploy
```

3. Choose a studio hostname (e.g., `birdseyefarm`)
4. Your Studio will be available at: `https://birdseyefarm.sanity.studio`

### Updating Studio:

Whenever you change schemas or Studio configuration:
```bash
npx sanity deploy
```

## Option 3: Run Locally (For Development)

```bash
cd /path/to/www-birdseyefarm
npx sanity dev
```

Access at: `http://localhost:3333`

Good for testing schema changes before deploying.

## Which Option to Use?

- **For Emma (content editing)**: Use Option 1 (Dashboard) - no setup needed
- **For custom branding**: Use Option 2 (Deploy) - one-time setup
- **For development**: Use Option 3 (Local) - testing only

## Current Status

The Studio has NOT been deployed to a custom URL yet. To access it now:
- Use Option 1 (via Sanity Dashboard)
- OR run `npx sanity login` then `npx sanity deploy` to set up custom URL

---

**Note**: The Studio is a React application that runs separately from your Astro site. This keeps your main site static and fast.
