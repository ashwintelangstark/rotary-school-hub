-- Migration: Create Storage Policies (Simplified Version)
-- Description: Sets up storage policies using dashboard-compatible approach

-- IMPORTANT: Run this after creating the bucket through Supabase Dashboard
-- If you get permission errors, use the Dashboard UI instead (see instructions below)

-- Alternative approach: Set up storage through Dashboard UI
-- Instructions provided in comments below

-- DASHBOARD INSTRUCTIONS (if SQL doesn't work):
-- 1. Go to Storage → gallery-images bucket
-- 2. Click "Policies" or "Configuration"
-- 3. Create these policies using the dashboard UI:

-- Policy 1: "Public Read Access"
-- - Allowed operation: SELECT
-- - Target roles: public, anon
-- - USING condition: true

-- Policy 2: "Public Upload Access"
-- - Allowed operation: INSERT
-- - Target roles: public, anon
-- - WITH CHECK condition: true

-- SQL APPROACH (try this first, if it fails use Dashboard UI):

-- Make bucket public
UPDATE storage.buckets
SET public = true
WHERE name = 'gallery-images';

-- Simple policy creation (if you have permissions)
-- These might work even with limited access:

-- Drop existing policies first
DROP POLICY IF EXISTS "Gallery Public Read" ON storage.objects;
DROP POLICY IF EXISTS "Gallery Public Upload" ON storage.objects;

-- Create simple read policy
CREATE POLICY "Gallery Public Read"
  ON storage.objects
  FOR SELECT
  TO public
  USING (true);

-- Create simple upload policy
CREATE POLICY "Gallery Public Upload"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (true);

-- If you get errors above, the bucket should still work
-- because we set it to public, but policies give more control

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Storage setup complete. If you got errors, use Dashboard UI for policies.';
END $$;
