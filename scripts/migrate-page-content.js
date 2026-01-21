import { config } from 'dotenv';
import { createClient } from '@sanity/client';

config();

const client = createClient({
  projectId: '2nhyst6p',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function migratePageContent() {
  console.log('Migrating page content to Sanity...\n');

  // Check if goatsPage already exists
  const existingGoatsPage = await client.fetch('*[_type == "goatsPage"][0]');

  if (existingGoatsPage) {
    console.log('✓ Goats page content already exists, skipping migration');
  } else {
    // Create goats page content
    const goatsPageData = {
      _type: 'goatsPage',
      title: 'Does',
      introText: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'We keep a small herd of ADGA registered Nigerian Dwarf dairy goats, the pride and joy of Bird\'s Eye Farm. Goats were among the first species domesticated by humans—at the dawn of agriculture, some 10,000 years ago—and it\'s no wonder. Humans just thrive better with goats around.',
            },
          ],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Excellent milk production is our priority, and we carefully limit herd size so we can have close, affectionate working relationships with our milkers. We specialize in extended lactations, breeding in alternate years and milking through to keep supply going in the off years. We\'ve been pleased to see how well our does perform on this schedule—see their individual doe pages for details.',
            },
          ],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Our herd tested negative for CAE, CL, OPP and Johne\'s as of October 2025.',
            },
          ],
        },
      ],
    };

    const goatsPage = await client.create(goatsPageData);
    console.log('✓ Created goats page content');
  }

  // Check if homePage already exists
  const existingHomePage = await client.fetch('*[_type == "homePage"][0]');

  if (existingHomePage) {
    console.log('✓ Home page content already exists, skipping migration');
  } else {
    // Create home page content
    const homePageData = {
      _type: 'homePage',
      welcomeTitle: 'Welcome to our farm',
      welcomeText: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'We live on 14 glorious acres in Yamhill County, a vibrantly rural piece of Oregon\'s Willamette Valley. Here we grow produce and keep Nigerian Dwarf dairy goats, laying hens, guard geese, honeybees and fiber rabbits.',
            },
          ],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'We moved here in 2019, when our goat population outgrew our urban farm in Oakland, CA. Emma is the farmstead\'s resident gardener, goat midwife, hoof pedicurist, amateur poultry nurse and dreamer/planner. Paul heads up buildings and security, beekeeping, hay hauling, compost management, dreams/plans implementation and web development. (We also like to say he\'s our goats\' other kid, since he drinks so much of their milk.) Laila is already an accomplished goat milker, and a sly detective for eggs hidden in secret nests. She\'s also in charge of carrot pulling and spoiling bantam hens.',
            },
          ],
        },
      ],
      instagramUrl: 'https://instagram.com/birds_eye_farm',
      contactHeading: 'Contact Us',
    };

    const homePage = await client.create(homePageData);
    console.log('✓ Created home page content');
  }

  console.log('\n✅ Page content migration complete!');
}

migratePageContent().catch(console.error);
