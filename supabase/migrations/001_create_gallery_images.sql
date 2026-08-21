-- Migration: Create Gallery Images Table
-- Description: Creates the gallery_images table for storing uploaded image metadata

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
CREATE INDEX IF NOT EXISTS gallery_images_created_at_idx
  ON public.gallery_images(created_at DESC);

CREATE INDEX IF NOT EXISTS gallery_images_category_idx
  ON public.gallery_images(category);

-- Enable Row Level Security
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for production)
-- Allow anyone to read images
CREATE POLICY "Allow public read access"
  ON public.gallery_images
  FOR SELECT
  TO public
  USING (true);

-- Allow anyone to insert images (for simplicity - restrict in production)
CREATE POLICY "Allow public insert access"
  ON public.gallery_images
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow anyone to update their own images (optional)
CREATE POLICY "Allow update own images"
  ON public.gallery_images
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_gallery_images_updated_at
    BEFORE UPDATE ON public.gallery_images
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE public.gallery_images IS 'Stores uploaded gallery image metadata';
COMMENT ON COLUMN public.gallery_images.id IS 'Unique identifier for each image';
COMMENT ON COLUMN public.gallery_images.title IS 'Image title';
COMMENT ON COLUMN public.gallery_images.description IS 'Image description/caption';
COMMENT ON COLUMN public.gallery_images.image_url IS 'URL to the stored image';
COMMENT ON COLUMN public.gallery_images.category IS 'Category for filtering (e.g., School Life, Celebrations, etc.)';
COMMENT ON COLUMN public.gallery_images.created_at IS 'Timestamp when the image was uploaded';
COMMENT ON COLUMN public.gallery_images.updated_at IS 'Timestamp when the image record was last updated';
