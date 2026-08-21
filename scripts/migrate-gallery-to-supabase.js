/**
 * Gallery Migration Script
 * This script migrates all existing static gallery images to Supabase
 *
 * Run with: node scripts/migrate-gallery-to-supabase.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase configuration from your .env file
const supabaseUrl = 'https://qgazujqykfgmvovrfjyq.supabase.co';
const supabaseKey = 'sb_publishable_2ygRlqJ7RiRic79OzHqvTQ_LZrW5zAn';
const bucketName = 'gallery-images';

const supabase = createClient(supabaseUrl, supabaseKey);

// Existing gallery data from gallery.tsx (matching actual filenames)
const existingGalleryItems = [
  { src: "/gallery/seach.webp", title: "First Day Vibes", category: "School Life", caption: "New uniforms, bright smiles and a year of possibilities begins." },
  { src: "/gallery/envday.webp", title: "World Environment Day", category: "Celebrations", caption: "Little hands planted hope for a greener tomorrow." },
  { src: "/gallery/essey.webp", title: "Essay Writing Competition", category: "Literary Club", caption: "Big ideas found their voice, one thoughtful page at a time." },
  { src: "/gallery/hinday.webp", title: "Hindi Day", category: "Literary Club", caption: "Language, confidence and culture took centre stage." },
  { src: "/gallery/story.webp", title: "Story Telling Competition", category: "Literary Club", caption: "Young storytellers turned imagination into unforgettable moments." },
  { src: "/gallery/justamin.webp", title: "Just A Minute", category: "Literary Club", caption: "Quick minds, brave voices and sixty seconds of brilliance." },
  { src: "/gallery/poem.webp", title: "Poem Recitation", category: "Literary Club", caption: "Every verse sparkled with rhythm, feeling and flair." },
  { src: "/gallery/mockin.webp", title: "Mock Interview", category: "Literary Club", caption: "Future-ready confidence began with a firm hello." },
  { src: "/gallery/mathtalent.webp", title: "Mathematical Talent", category: "Academics", caption: "Curious minds cracked challenges and celebrated every solution." },
  { src: "/gallery/healthaware.webp", title: "Health Awareness", category: "Academics", caption: "A meaningful session inspiring healthier choices every day." },
  { src: "/gallery/mathrelayrace.webp", title: "Math Relay Race", category: "Academics", caption: "Speed, teamwork and numbers raced towards the finish line." },
  { src: "/gallery/smrtsclor.webp", title: "Smart Scholar Test", category: "Academics", caption: "Sharp thinkers rose to every challenge beyond the textbook." },
  { src: "/gallery/libclub.webp", title: "Library Club", category: "Library Club", caption: "Where every book opens a new world of wonder." },
  { src: "/gallery/abhn.webp", title: "Abhinaya Geete Competition", category: "Music Club", caption: "Melody and expression came alive in every graceful performance." },
  { src: "/gallery/flutedeco.webp", title: "Flute Decoration", category: "Art & Craft", caption: "Young artists transformed simple flutes into vibrant masterpieces." },
  { src: "/gallery/crownmaking.webp", title: "Crown Making", category: "Art & Craft", caption: "Creativity ruled as every child crafted a crown to remember." },
  { src: "/gallery/pott.webp", title: "Pot Decoration", category: "Art & Craft", caption: "Clay became a canvas for colour, pattern and imagination." },
  { src: "/gallery/pratibhakaranji.webp", title: "Pratibha Karanji Prize Winners", category: "Achievements", caption: "Celebrating shining talents who brought home well-earned honours." },
  { src: "/gallery/INVESTITURE.webp", title: "Investiture Ceremony", category: "Celebrations", caption: "Young leaders accepted their badges with pride, ready to serve and inspire." },
  { src: "/gallery/rhyme.webp", title: "Rhyme Competition", category: "Literary Club", caption: "Tiny voices filled the air with rhythm, rhyme and pure joy." },
  { src: "/gallery/annualsports.webp", title: "Annual Sports Meet", category: "Celebrations", caption: "Spirit, teamwork and triumph — where every finish line tells a story of dedication." },
  { src: "/gallery/agadithota.webp", title: "Agadi Thotha", category: "Cultural Heritage", caption: "Where tradition comes alive through folk tales and timeless wisdom passed down generations." },
  { src: "/gallery/gujrat.webp", title: "Rainbow Art Centre Gujarat — All India Colouring & Handwriting Competition", category: "Achievements", caption: "Our young artists showcased their talent on the national stage, bringing honour and recognition to their school." },
  { src: "/gallery/phspark.webp", title: "PHS Water Park Trip", category: "School Life", caption: "Splashes of laughter, waves of joy — a day of sunshine, friendship and unforgettable memories." },
  { src: "/gallery/abhinayageete.webp", title: "Abhinaya Geete Competition", category: "Music Club", caption: "Melody and expression came alive in every graceful performance." },
];

async function migrateGalleryToSupabase() {
  console.log('🚀 Starting Gallery Migration to Supabase...\n');

  try {
    // Step 1: Check if bucket exists and is accessible
    console.log('📁 Checking storage bucket...');
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();

    if (bucketError) {
      console.log('⚠️  Could not access buckets. You may need to create the bucket manually.');
      console.log('   Please create a bucket named "gallery-images" in Supabase Dashboard (Storage → New bucket)');
      console.log('   Make sure to make it public!\n');
    } else {
      const bucketExists = buckets?.find(b => b.name === bucketName);
      if (bucketExists) {
        console.log('✅ Bucket "gallery-images" found and accessible!');
      } else {
        console.log('⚠️  Bucket "gallery-images" not found. Creating it...');
        const { error: createError } = await supabase.storage.createBucket(bucketName, {
          public: true,
          fileSizeLimit: 5242880 // 5MB
        });
        if (createError) {
          console.log('⚠️  Could not create bucket automatically. Please create it manually in Dashboard.');
        } else {
          console.log('✅ Bucket created successfully!');
        }
      }
    }

    // Step 2: Check if table exists
    console.log('\n📊 Checking database table...');
    const { data: tables, error: tableError } = await supabase
      .from('gallery_images')
      .select('id')
      .limit(1);

    if (tableError) {
      console.log('⚠️  Table "gallery_images" not found. Please run the migration:');
      console.log('   Run: supabase/migrations/001_create_gallery_images.sql in SQL Editor\n');
      return;
    } else {
      console.log('✅ Database table "gallery_images" is accessible!');
    }

    // Step 3: Upload existing images and create database entries
    console.log('\n📤 Uploading gallery images...');

    let uploaded = 0;
    let skipped = 0;
    let errors = 0;

    for (const item of existingGalleryItems) {
      try {
        const fileName = path.basename(item.src);
        const localPath = path.join(__dirname, '..', 'public', item.src);

        // Check if file exists locally
        if (!fs.existsSync(localPath)) {
          console.log(`⚠️  File not found: ${fileName} (skipping)`);
          skipped++;
          continue;
        }

        // Read file
        const fileBuffer = fs.readFileSync(localPath);
        const fileExt = path.extname(fileName).substring(1);
        const newFileName = `${Date.now()}_${fileName}`;

        console.log(`📤 Uploading: ${fileName}...`);

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(newFileName, fileBuffer, {
            contentType: `image/${fileExt === 'webp' ? 'webp' : 'jpeg'}`
          });

        if (uploadError) {
          console.log(`❌ Upload failed for ${fileName}:`, uploadError.message);
          errors++;
          continue;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from(bucketName)
          .getPublicUrl(newFileName);

        // Insert into database
        const { data: insertData, error: insertError } = await supabase
          .from('gallery_images')
          .insert({
            title: item.title,
            description: item.caption,
            image_url: publicUrl,
            category: item.category
          })
          .select();

        if (insertError) {
          console.log(`❌ Database insert failed for ${item.title}:`, insertError.message);
          errors++;
        } else {
          console.log(`✅ Successfully uploaded: ${item.title}`);
          uploaded++;
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));

      } catch (error) {
        console.log(`❌ Error processing ${item.title}:`, error.message);
        errors++;
      }
    }

    console.log(`\n🎉 Migration Complete!`);
    console.log(`✅ Uploaded: ${uploaded} images`);
    console.log(`⚠️  Skipped: ${skipped} images`);
    console.log(`❌ Errors: ${errors} images`);
    console.log(`\n📝 Your gallery is now stored in Supabase!`);
    console.log(`🌐 View your images at: https://qgazujqykfgmvovrfjyq.supabase.co/storage/gallery-images`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

// Run migration
migrateGalleryToSupabase().catch(console.error);
