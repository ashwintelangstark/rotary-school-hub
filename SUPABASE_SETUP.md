# Supabase Setup Guide for Gallery Feature

This comprehensive guide will help you set up Supabase for the gallery upload feature, including table editor integration and migrations.

## Prerequisites

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project in your Supabase dashboard

## Step 1: Get Your Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings → API**
3. Copy the following credentials:

From your dashboard, you'll get:
- **Project URL** (e.g., `https://xyz.supabase.co`)
- **anon/public key** (long string starting with `eyJ...`)

### Update your `.env` file:

```env
# Legacy Supabase credentials (for compatibility with other tools)
SUPABASE_PROJECT_ID=xyz
SUPABASE_PUBLISHABLE_KEY=abc
SUPABASE_URL=efg

# Vite Supabase credentials (used by this application)
VITE_SUPABASE_PROJECT_ID=your-project-id
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Supabase Storage Configuration
VITE_SUPABASE_STORAGE_BUCKET=gallery-images
```

**Replace the placeholder values with your actual Supabase credentials:**

- Replace `your-project-id` with your project ID
- Replace `your-anon-key-here` with your anon/public key
- Replace `https://your-project.supabase.co` with your project URL

### Available Environment Variables:

The app supports multiple environment variable formats for flexibility:

| Variable | Purpose | Example |
|---|---|---|
| `VITE_SUPABASE_URL` | Main Supabase project URL | `https://xyz.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Anonymous/public key for client access | `eyJhbGciOiJIUzI1NiIsInR5cCI6...` |
| `SUPABASE_URL` | Alternative URL format (legacy) | Same as above |
| `SUPABASE_PUBLISHABLE_KEY` | Alternative key format (legacy) | Same as above |
| `VITE_SUPABASE_STORAGE_BUCKET` | Storage bucket name | `gallery-images` |

## Step 2: Create Storage Bucket

1. Go to **Storage** in your Supabase dashboard
2. Click **"New bucket"**
3. Enter bucket name: `gallery-images`
4. Make it **Public bucket**
5. Click **"Create bucket"**

### Set up Bucket Policies (Optional but Recommended)

For production, you may want to set up Row Level Security (RLS) policies. For now, we'll keep it public for simplicity.

## Step 3: Run Migrations & Table Editor Setup

### Option A: Using Supabase Table Editor (Recommended)

1. Go to **Table Editor** in your Supabase dashboard
2. Click **"New Table"**
3. Enter table name: `gallery_images`
4. Add the following columns:

| Column Name | Type | Default | Description |
|---|---|---|---|
| `id` | uuid | uuid_generate_v4() | Primary key |
| `title` | text | - | Image title (required) |
| `description` | text | - | Image description |
| `image_url` | text | - | URL to stored image (required) |
| `category` | text | 'School Life' | Category for filtering |
| `created_at` | timestamp with time zone | NOW() | Upload timestamp |
| `updated_at` | timestamp with time zone | NOW() | Last update timestamp |

5. Set `id` as Primary Key
6. Enable Row Level Security (RLS)
7. Click **"Save"**

### Option B: Using SQL Migrations (Advanced)

If you prefer using migrations, the migration files are provided in the `supabase/migrations/` directory:

1. Go to **SQL Editor** in Supabase dashboard
2. Open `supabase/migrations/001_create_gallery_images.sql`
3. Copy and run the entire SQL script
4. Repeat for `002_create_storage_policies.sql`

### Setup Row Level Security Policies

After creating the table, set up RLS policies in **SQL Editor**:

```sql
-- Enable RLS (if not already enabled)
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access"
  ON public.gallery_images
  FOR SELECT
  TO public
  USING (true);

-- Allow public insert access
CREATE POLICY "Allow public insert access"
  ON public.gallery_images
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow updates
CREATE POLICY "Allow update own images"
  ON public.gallery_images
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);
```

## Step 3: Create Database Table

Go to **SQL Editor** in your Supabase dashboard and run the following SQL:

```sql
-- Create gallery_images table
CREATE TABLE IF NOT EXISTS public.gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT DEFAULT 'School Life',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional, for production)
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read images
CREATE POLICY "Allow public read access"
  ON public.gallery_images
  FOR SELECT
  TO public
  USING (true);

-- Create a policy that allows anyone to insert images (for simplicity)
-- For production, you might want to restrict this to authenticated users
CREATE POLICY "Allow public insert access"
  ON public.gallery_images
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create an index on created_at for better performance
CREATE INDEX IF NOT EXISTS gallery_images_created_at_idx
  ON public.gallery_images(created_at DESC);

-- Create an index on category for filtering
CREATE INDEX IF NOT EXISTS gallery_images_category_idx
  ON public.gallery_images(category);
```

## Step 4: Update Environment Variables

Update your `.env` file with your actual credentials:

```env
VITE_SUPABASE_URL=your-actual-project-url
VITE_SUPABASE_ANON_KEY=your-actual-anon-key
VITE_SUPABASE_STORAGE_BUCKET=gallery-images
```

## Step 5: Test the Setup

1. Restart your development server
2. Navigate to the gallery page
3. Click the **"Upload to Gallery"** button
4. Try uploading an image

## Connecting Website with Supabase Table Editor

### Using Supabase Table Editor

Once your database is set up, you can manage gallery images directly through the Supabase Table Editor:

1. **Access Table Editor**: Go to **Table Editor** → Select `gallery_images` table

2. **View Uploaded Images**: See all uploaded images with their metadata
   - Each row shows: id, title, description, image_url, category, timestamps

3. **Manual Image Management**:
   - **Add images manually**: Click "Insert row" to add images directly
   - **Edit metadata**: Update titles, descriptions, categories
   - **Delete images**: Remove unwanted entries
   - **Filter by category**: Use the filter bar to show specific categories

4. **Data Validation**:
   - Required fields are automatically enforced
   - Timestamps are auto-generated
   - UUIDs are automatically assigned

### Real-time Data Sync

The website automatically fetches from the `gallery_images` table, so any changes you make in the Table Editor will immediately reflect on the website:

- ✅ Add a row in Table Editor → Appears in gallery instantly
- ✅ Update image details → Changes show immediately
- ✅ Delete a row → Image removed from gallery

### API Integration

Your website connects to Supabase through the configured environment variables:

```
User uploads image → Website sends to Supabase Storage → 
Image URL generated → Metadata saved to gallery_images table → 
Image appears in gallery
```

### Database Functions Available

The following database functions are automatically available:

1. **`fetchGalleryImages()`** - Retrieves all images from `gallery_images`
2. **`saveGalleryImage()`** - Saves new image metadata
3. **`uploadImageToStorage()`** - Uploads files to Supabase Storage
4. **`getPublicUrl()`** - Generates public URLs for stored images

## Troubleshooting

**Issue: "Bucket not found" error**
- Make sure you created the storage bucket with the exact name `gallery-images`
- Verify the bucket is set to public

**Issue: "Table not found" error**
- Make sure you ran the SQL script to create the `gallery_images` table
- Check the SQL Editor → History to see if the table was created

**Issue: Images not appearing in gallery**
- Check browser console for errors
- Verify your Supabase credentials in `.env`
- Make sure RLS policies are set correctly

**Issue: File upload fails**
- Check file size (max 5MB)
- Verify file type (PNG, JPEG, RAW only)
- Check Supabase storage logs in dashboard

## Production Considerations

For a production environment, consider:

1. **Authentication**: Add user authentication and restrict uploads to logged-in users
2. **Image Moderation**: Add approval workflow for uploaded images
3. **Storage Limits**: Set up storage quotas and limits
4. **Image Optimization**: Add image compression/thumbnails
5. **Advanced RLS**: Implement proper Row Level Security policies

## Additional Features You Can Add

- Image categories/albums
- Like and comment functionality
- Image editing capabilities
- Batch upload
- Image search and filtering by date
