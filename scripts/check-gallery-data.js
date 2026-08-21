/**
 * Check Gallery Data
 * This script checks what images are currently in the gallery database
 *
 * Run with: node scripts/check-gallery-data.js
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qgazujqykfgmvovrfjyq.supabase.co';
const supabaseKey = 'sb_publishable_2ygRlqJ7RiRic79OzHqvTQ_LZrW5zAn';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkGalleryData() {
  console.log('🎨 Checking Gallery Data...\n');

  try {
    // Get all images from the database
    const { data: images, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.log('❌ Error fetching images:', error.message);
      return;
    }

    if (!images || images.length === 0) {
      console.log('📭 No images found in the database.');
      return;
    }

    console.log(`📊 Found ${images.length} image(s):\n`);

    images.forEach((img, index) => {
      console.log(`${index + 1}. ${img.title}`);
      console.log(`   Category: ${img.category}`);
      console.log(`   Description: ${img.description}`);
      console.log(`   Image URL: ${img.image_url}`);
      console.log(`   Created: ${img.created_at}`);
      console.log('');
    });

    // Check if images are accessible
    console.log('🔍 Checking if image URLs are accessible...\n');

    for (const img of images) {
      try {
        const response = await fetch(img.image_url, { method: 'HEAD' });
        console.log(`${img.title}: ${response.ok ? '✅ Accessible' : '❌ Not accessible (' + response.status + ')'}`);
      } catch (error) {
        console.log(`${img.title}: ❌ Error checking accessibility`);
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkGalleryData().catch(console.error);
