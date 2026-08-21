/**
 * Setup Supabase Gallery Database
 * This script creates the necessary table and policies for the gallery
 *
 * Run with: node scripts/setup-gallery-table.js
 */

import { createClient } from '@supabase/supabase-js';

// Your Supabase credentials
const supabaseUrl = 'https://qgazujqykfgmvovrfjyq.supabase.co';
const supabaseKey = 'sb_publishable_2ygRlqJ7RiRic79OzHqvTQ_LZrW5zAn';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupGalleryDatabase() {
  console.log('🗄️  Setting up Gallery Database...\n');

  try {
    // Check if table exists
    console.log('📊 Checking if gallery_images table exists...');
    const { data: existingTable, error: checkError } = await supabase
      .from('gallery_images')
      .select('id')
      .limit(1);

    if (!checkError) {
      console.log('✅ gallery_images table exists!\n');
    } else {
      console.log('❌ gallery_images table does not exist. Please run this SQL in your Supabase SQL Editor:\n');

      const createTableSQL = `
-- Create gallery_images table
CREATE TABLE IF NOT EXISTS public.gallery_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT DEFAULT 'School Life',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS gallery_images_category_idx ON public.gallery_images(category);
CREATE INDEX IF NOT EXISTS gallery_images_created_at_idx ON public.gallery_images(created_at DESC);

-- Enable RLS
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access"
ON public.gallery_images
FOR SELECT
TO public
USING (true);

-- Create policies for authenticated insert/update/delete
CREATE POLICY "Allow authenticated insert"
ON public.gallery_images
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated update"
ON public.gallery_images
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated delete"
ON public.gallery_images
FOR DELETE
TO authenticated
USING (true);

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION update_gallery_images_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
DROP TRIGGER IF EXISTS update_gallery_images_updated_at ON public.gallery_images;
CREATE TRIGGER update_gallery_images_updated_at
    BEFORE UPDATE ON public.gallery_images
    FOR EACH ROW
    EXECUTE FUNCTION update_gallery_images_updated_at();

COMMENT ON TABLE public.gallery_images IS 'Gallery images with metadata for the school website';
`;

      console.log(createTableSQL);
      console.log('\n⚠️  After running the SQL, run this script again to verify.');
      return;
    }

    // Test query to ensure we can read from the table
    console.log('🧪 Testing table access...');
    const { data: testData, error: testError } = await supabase
      .from('gallery_images')
      .select('*')
      .limit(1);

    if (testError) {
      console.log('❌ Cannot read from table:', testError.message);
      console.log('💡 The table might have restrictive RLS policies.');
      console.log('💡 Run the SQL above to fix the policies.');
      return;
    }

    console.log('✅ Table access is working!');
    console.log(`📊 Current image count: ${testData?.length || 0}`);

    // If no images, suggest uploading
    if (!testData || testData.length === 0) {
      console.log('\n💡 No images found in the database.');
      console.log('💡 Run: node scripts/upload-gallery-images.js');
    } else {
      console.log('\n✅ Gallery is set up and ready!');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the setup
setupGalleryDatabase().catch(console.error);
