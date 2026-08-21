/**
 * Upload Gallery Images to Supabase
 * This script uploads all images from public/gallery to Supabase Storage and database
 *
 * Run with: node scripts/upload-gallery-images.js
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Your Supabase credentials
const supabaseUrl = 'https://qgazujqykfgmvovrfjyq.supabase.co';
const supabaseKey = 'sb_publishable_2ygRlqJ7RiRic79OzHqvTQ_LZrW5zAn';

const supabase = createClient(supabaseUrl, supabaseKey);
const bucketName = 'gallery-images';

// Image metadata with titles and descriptions
const imageMetadata = {
  'healthaware.webp': {
    title: 'Health Awareness Program',
    description: 'Students participating in health awareness activities and learning about wellness practices.'
  },
  'INVESTITURE.webp': {
    title: 'Investiture Ceremony',
    description: 'Official ceremony where student leaders are sworn into their positions for the academic year.'
  },
  'crownmaking.webp': {
    title: 'Crown Making Activity',
    description: 'Creative arts and crafts session where students design and create decorative crowns.'
  },
  'pratibhakaranji.webp': {
    title: 'Pratibha Karanji - Talent Competition',
    description: 'Annual talent showcase where students display their skills in various performing arts.'
  },
  'annualsports.webp': {
    title: 'Annual Sports Day',
    description: 'Grand celebration of athletics and sportsmanship with various competitive events.'
  },
  'story.webp': {
    title: 'Storytelling Session',
    description: 'Engaging storytelling activities that enhance communication and imagination skills.'
  },
  'pott.webp': {
    title: 'Pot Decoration Activity',
    description: 'Creative art session where students decorate pots with traditional and modern designs.'
  },
  'hinday.webp': {
    title: 'Hindi Day Celebration',
    description: 'Cultural celebration honoring Hindi language with literary activities and performances.'
  },
  'mockin.webp': {
    title: 'Mock Interview Session',
    description: 'Preparatory workshop helping students develop interview skills for future opportunities.'
  },
  'phspark.webp': {
    title: 'Science Park Activity',
    description: 'Hands-on science exploration activities in the school science park.'
  },
  'smrtsclor.webp': {
    title: 'Smart Classroom Learning',
    description: 'Students engaged in interactive learning using modern smart classroom technology.'
  },
  'libclub.webp': {
    title: 'Library Club Activities',
    description: 'Reading sessions and literary activities organized by the school library club.'
  },
  'abhn.webp': {
    title: 'Abhinay - Drama Performance',
    description: 'Theatrical performance showcasing students\' acting and dramatic talents.'
  },
  'poem.webp': {
    title: 'Poetry Recitation',
    description: 'Students reciting poems and expressing themselves through poetic literature.'
  },
  'flutedeco.webp': {
    title: 'Flute Decoration Workshop',
    description: 'Traditional musical art activity where students decorate flutes with artistic designs.'
  },
  'mathrelayrace.webp': {
    title: 'Math Relay Race',
    description: 'Exciting mathematical competition combining physical activity with problem-solving.'
  },
  'abhinayageete.webp': {
    title: 'Abhinaya Geete - Musical Performance',
    description: 'Traditional musical performance combining expressive dance and singing.'
  },
  'agadithota.webp': {
    title: 'Agadi Thota - Village Life Experience',
    description: 'Educational field trip giving students experience of rural village life and traditions.'
  },
  'gujrat.webp': {
    title: 'Gujarat Cultural Presentation',
    description: 'Cultural presentation highlighting traditions and heritage of Gujarat state.'
  },
  'rhyme.webp': {
    title: 'Rhyme Recitation',
    description: 'Young students participating in rhyme and poetry recitation activities.'
  },
  'envday.webp': {
    title: 'Environment Day Celebration',
    description: 'Environmental awareness activities and green initiatives celebrating nature conservation.'
  },
  'seach.webp': {
    title: 'Science Exhibition',
    description: 'Annual science fair displaying innovative projects and experiments by students.'
  },
  'mathtalent.webp': {
    title: 'Mathematics Talent Show',
    description: 'Competition showcasing exceptional mathematical skills and problem-solving abilities.'
  },
  'essey.webp': {
    title: 'Essay Writing Competition',
    description: 'Literary competition where students showcase their writing skills on various topics.'
  },
  'justamin.webp': {
    title: 'Just a Minute - Public Speaking',
    description: 'Public speaking challenge where students speak impromptu for one minute on given topics.'
  },
  // Winners folder
  'winners/laasya.webp': {
    title: 'Laasya - Achievement Winner',
    description: 'Outstanding achievement award recipient excelling in academic and co-curricular activities.'
  },
  'winners/MALLIKARJUN.webp': {
    title: 'Mallikarjun - Achievement Winner',
    description: 'Exceptional performer recognized for excellence in academic and competitive achievements.'
  },
  'winners/kayan.webp': {
    title: 'Kayan - Achievement Winner',
    description: 'Young achiever recognized for outstanding performance in school activities.'
  },
  'winners/akshara.webp': {
    title: 'Akshara - Achievement Winner',
    description: 'Award recipient demonstrating excellence in academic and cultural activities.'
  },
  'winners/shubham.webp': {
    title: 'Shubham - Achievement Winner',
    description: 'Notable achiever recognized for exceptional performance in various competitions.'
  },
  'winners/atharva.webp': {
    title: 'Atharva - Achievement Winner',
    description: 'Distinguished award recipient for outstanding accomplishments in school events.'
  }
};

// Category mapping based on image content
const categories = {
  'healthaware.webp': 'School Life',
  'INVESTITURE.webp': 'Events',
  'crownmaking.webp': 'Activities',
  'pratibhakaranji.webp': 'Cultural',
  'annualsports.webp': 'Sports',
  'story.webp': 'Activities',
  'pott.webp': 'Activities',
  'hinday.webp': 'Cultural',
  'mockin.webp': 'School Life',
  'phspark.webp': 'School Life',
  'smrtsclor.webp': 'School Life',
  'libclub.webp': 'School Life',
  'abhn.webp': 'Cultural',
  'poem.webp': 'Cultural',
  'flutedeco.webp': 'Activities',
  'mathrelayrace.webp': 'Activities',
  'abhinayageete.webp': 'Cultural',
  'agadithota.webp': 'School Life',
  'gujrat.webp': 'Cultural',
  'rhyme.webp': 'Activities',
  'envday.webp': 'Events',
  'seach.webp': 'School Life',
  'mathtalent.webp': 'Activities',
  'essey.webp': 'School Life',
  'justamin.webp': 'Activities',
  'winners/laasya.webp': 'Achievements',
  'winners/MALLIKARJUN.webp': 'Achievements',
  'winners/kayan.webp': 'Achievements',
  'winners/akshara.webp': 'Achievements',
  'winners/shubham.webp': 'Achievements',
  'winners/atharva.webp': 'Achievements'
};

async function uploadGalleryImages() {
  console.log('🎨 Uploading Gallery Images to Supabase...\n');

  const galleryPath = path.join(__dirname, '../public/gallery');

  try {
    // Check if bucket exists by trying to list files
    console.log('📁 Checking if storage bucket exists...');
    try {
      await supabase.storage.from(bucketName).list('/');
      console.log('✅ Bucket exists!');
    } catch (listError) {
      console.log('⚠️  Bucket not found or not accessible:', listError.message);
      console.log('💡 Please create the bucket manually in Supabase Dashboard:');
      console.log('   Storage → New Bucket → Name: gallery-images → Public: Yes');
      console.log('   Then add this policy in SQL Editor:\n');

      console.log(`-- Create storage policies for public read access
CREATE POLICY "Allow public read access to ${bucketName}"
ON storage.objects FOR SELECT
TO public
USING ( bucket_id = '${bucketName}' );

CREATE POLICY "Allow authenticated upload to ${bucketName}"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = '${bucketName}' );`);
      return;
    }

    let successCount = 0;
    let errorCount = 0;
    const results = [];

    // Process each image
    for (const [filename, metadata] of Object.entries(imageMetadata)) {
      console.log(`\n📤 Processing: ${filename}`);

      const fullPath = path.join(galleryPath, filename);

      // Check if file exists
      if (!fs.existsSync(fullPath)) {
        console.log(`⚠️  File not found: ${fullPath}`);
        errorCount++;
        continue;
      }

      try {
        // Read file
        const fileBuffer = fs.readFileSync(fullPath);
        const fileName = path.basename(filename);

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(fileName, fileBuffer, {
            cacheControl: '3600',
            upsert: true,
            contentType: 'image/webp'
          });

        if (uploadError) {
          console.log(`❌ Upload error: ${uploadError.message}`);
          errorCount++;
          continue;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(fileName);

        const imageUrl = urlData.publicUrl;

        // Check if image already exists in database
        const { data: existingImage } = await supabase
          .from('gallery_images')
          .select('id')
          .eq('image_url', imageUrl)
          .maybeSingle();

        if (existingImage) {
          console.log(`ℹ️  Image already in database, updating...`);
          // Update existing record
          const { data: updateData, error: updateError } = await supabase
            .from('gallery_images')
            .update({
              title: metadata.title,
              description: metadata.description,
              category: categories[filename] || 'School Life',
              updated_at: new Date().toISOString()
            })
            .eq('id', existingImage.id)
            .select()
            .single();

          if (updateError) {
            console.log(`❌ Database update error: ${updateError.message}`);
            errorCount++;
          } else {
            console.log(`✅ Updated: ${metadata.title}`);
            successCount++;
            results.push(updateData);
          }
        } else {
          // Insert new record
          const { data: insertData, error: insertError } = await supabase
            .from('gallery_images')
            .insert([{
              title: metadata.title,
              description: metadata.description,
              image_url: imageUrl,
              category: categories[filename] || 'School Life'
            }])
            .select()
            .single();

          if (insertError) {
            console.log(`❌ Database insert error: ${insertError.message}`);
            errorCount++;
          } else {
            console.log(`✅ Uploaded: ${metadata.title}`);
            successCount++;
            results.push(insertData);
          }
        }

      } catch (error) {
        console.log(`❌ Error processing ${filename}:`, error.message);
        errorCount++;
      }
    }

    console.log('\n📊 Upload Summary:');
    console.log(`✅ Success: ${successCount} images`);
    console.log(`❌ Errors: ${errorCount} images`);
    console.log(`📈 Total: ${successCount + errorCount} images processed`);

    if (successCount > 0) {
      console.log('\n🎉 Gallery images uploaded successfully!');
      console.log('💡 You can now view them on your gallery page.');
    }

  } catch (error) {
    console.error('❌ Fatal error:', error.message);
  }
}

// Run the script
uploadGalleryImages().catch(console.error);
