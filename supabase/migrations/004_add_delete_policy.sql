-- Migration: Add Delete Policy for Gallery Images
-- Description: Allows deletion of gallery images for authenticated users

-- Allow authenticated users to delete gallery images
CREATE POLICY "Allow authenticated delete access"
  ON public.gallery_images
  FOR DELETE
  TO authenticated
  USING (true);

-- Allow service role to delete gallery images (for admin operations)
CREATE POLICY "Allow service role delete access"
  ON public.gallery_images
  FOR DELETE
  TO service_role
  USING (true);

-- Add comment for documentation
COMMENT ON POLICY "Allow authenticated delete access" ON public.gallery_images IS 'Allows authenticated users to delete gallery images';
COMMENT ON POLICY "Allow service role delete access" ON public.gallery_images IS 'Allows service role to delete gallery images for admin operations';
