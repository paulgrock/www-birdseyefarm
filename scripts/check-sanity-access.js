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

async function checkAccess() {
  try {
    // Check if we can read data
    const goats = await client.fetch('*[_type == "goat"] | order(name) [0...3] { _id, name }');
    console.log('✓ Can read data - found', goats.length, 'goats (showing first 3)');

    // Check project info
    const projects = await client.request({ url: '/projects' });
    console.log('\n✓ Project access confirmed');

    console.log('\n📍 Access your content here:');
    console.log('   https://www.sanity.io/manage/personal/project/2nhyst6p/desk/goat');

    console.log('\n💡 Or run the studio locally:');
    console.log('   npx sanity dev');
    console.log('   Then open: http://localhost:3333');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Try accessing via the Sanity CLI instead:');
    console.log('   npx sanity manage');
  }
}

checkAccess();
