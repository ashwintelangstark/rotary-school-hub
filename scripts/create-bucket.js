/**
 * Create Storage Bucket Script
 * This script attempts to create the gallery-images storage bucket
 *
 * Run with: node scripts/create-bucket.js
 */

import { createClient } from '@supabase/supabase-js';

// Your Supabase credentials
const supabaseUrl = 'https://qgazujqykfgmvovrfjyq.supabase.co';
const supabaseKey = 'sb_publishable_2ygRlqJ7RiRic79OzHqvTQ_LZrW5zAn';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createBucket() {
  console.log('🪣 Creating Supabase Storage Bucket...\n');

  try {
    // First, let's check what buckets exist
    console.log('📋 Checking existing buckets...');
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
      console.log('❌ Error listing buckets:', listError.message);
      console.log('\n⚠️  You may not have permission to list buckets.');
      console.log('Please create the bucket manually using the Dashboard:\n');
      console.log('1. Go to: https://supabase.com/dashboard/project/qgazujqykfgmvovrfjyq/storage');
      console.log('2. Click "New bucket"');
      console.log('3. Name it: gallery-images');
      console.log('4. Make it public: Toggle ON');
      console.log('5. Click "Create bucket"\n');
      return;
    }

    console.log('✅ Found', buckets?.length || 0, 'existing buckets:');
    buckets?.forEach(bucket => {
      console.log('   -', bucket.name, bucket.public ? '(public)' : '(private)');
    });

    // Check if our bucket already exists
    const existingBucket = buckets?.find(b => b.name === 'gallery-images');
    if (existingBucket) {
      console.log('\n✅ Bucket "gallery-images" already exists!');
      if (!existingBucket.public) {
        console.log('⚠️  Making bucket public...');
        await makeBucketPublic();
      }
      console.log('\n🎉 Bucket is ready! You can now run the migration script:');
      console.log('   node scripts/migrate-gallery-to-supabase.js\n');
      return;
    }

    // Try to create the bucket
    console.log('\n🔨 Creating bucket "gallery-images"...');
    const { data, error } = await supabase.storage.createBucket('gallery-images', {
      public: true,
      fileSizeLimit: 5242880, // 5MB limit
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/*']
    });

    if (error) {
      console.log('❌ Could not create bucket automatically:', error.message);
      console.log('\n📋 MANUAL SETUP INSTRUCTIONS:\n');
      console.log('1. Go to: https://supabase.com/dashboard/project/qgazujqykfgmvovrfjyq/storage');
      console.log('2. Click "New bucket" button');
      console.log('3. Enter bucket name: gallery-images');
      console.log('4. Toggle "Make bucket public" to ON');
      console.log('5. Click "Create bucket"');
      console.log('\nThen run: node scripts/migrate-gallery-to-supabase.js\n');
      return;
    }

    console.log('✅ Bucket created successfully!');
    console.log('🎉 You can now run the migration script:');
    console.log('   node scripts/migrate-gallery-to-supabase.js\n');

  } catch (error) {
    console.log('❌ Unexpected error:', error.message);
    console.log('\nPlease create the bucket manually through the Dashboard.');
  }
}

async function makeBucketPublic() {
  try {
    const { error } = await supabase.storage.updateBucket('gallery-images', {
      public: true
    });
    if (error) {
      console.log('⚠️  Could not make bucket public automatically:', error.message);
    } else {
      console.log('✅ Bucket is now public!');
    }
  } catch (error) {
    console.log('⚠️  Error making bucket public:', error.message);
  }
}

// Run the script
createBucket().catch(console.error);
