-- Migration: Create Storage Bucket and Policies
-- Description: Creates storage bucket for gallery images and sets up access policies

-- IMPORTANT: First create the bucket through Supabase Dashboard (Storage → New bucket)
-- Bucket name: gallery-images
-- Make it public: Yes

-- Then run this migration to set up the proper policies

-- Step 1: Enable RLS on storage.objects (if not already enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Step 2: Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public read gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public upload gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public update gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public delete gallery images" ON storage.objects;

-- Step 3: Create read policy for gallery-images bucket
CREATE POLICY "Allow public read gallery images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (
    bucket_id = (
      SELECT id
      FROM storage.buckets
      WHERE name = 'gallery-images'
    )
  );

-- Step 4: Create upload policy for gallery-images bucket
CREATE POLICY "Allow public upload gallery images"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (
    bucket_id = (
      SELECT id
      FROM storage.buckets
      WHERE name = 'gallery-images'
    )
  );

-- Step 5: Create update policy (optional - allows updating files)
CREATE POLICY "Allow public update gallery images"
  ON storage.objects
  FOR UPDATE
  TO public
  USING (
    bucket_id = (
      SELECT id
      FROM storage.buckets
      WHERE name = 'gallery-images'
    )
  )
  WITH CHECK (
    bucket_id = (
      SELECT id
      FROM storage.buckets
      WHERE name = 'gallery-images'
    )
  );

-- Step 6: Create delete policy (optional - allows deleting files)
CREATE POLICY "Allow public delete gallery images"
  ON storage.objects
  FOR DELETE
  TO public
  USING (
    bucket_id = (
      SELECT id
      FROM storage.buckets
      WHERE name = 'gallery-images'
    )
  );

-- Step 7: Make sure the bucket is set to public
UPDATE storage.buckets
SET public = true
WHERE name = 'gallery-images';

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Storage policies for gallery-images bucket created successfully!';
END $$;
