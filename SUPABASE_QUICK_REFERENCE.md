# Supabase Quick Reference Guide

## Environment Variables Template

```env
# Legacy Supabase credentials (for compatibility)
SUPABASE_PROJECT_ID=xyz
SUPABASE_PUBLISHABLE_KEY=abc
SUPABASE_URL=efg

# Vite Supabase credentials (used by the application)
VITE_SUPABASE_PROJECT_ID=adc
VITE_SUPABASE_PUBLISHABLE_KEY=adx
VITE_SUPABASE_URL=lgh
VITE_SUPABASE_ANON_KEY=adx

# Supabase Storage Configuration
VITE_SUPABASE_STORAGE_BUCKET=gallery-images
```

## Database Schema

### gallery_images Table Structure

| Column | Type | Required | Default | Description |
|---|---|---|---|---|
| `id` | UUID | ✅ | auto-generated | Unique identifier |
| `title` | TEXT | ✅ | - | Image title |
| `description` | TEXT | ❌ | - | Image description |
| `image_url` | TEXT | ✅ | - | Full URL to image |
| `category` | TEXT | ❌ | 'School Life' | Category for filtering |
| `created_at` | TIMESTAMPTZ | ❌ | NOW() | Upload timestamp |
| `updated_at` | TIMESTAMPTZ | ❌ | NOW() | Last update timestamp |

## Table Editor Operations

### Add Image Manually
1. Go to Table Editor → gallery_images
2. Click "Insert row"
3. Fill in:
   - `title`: "My School Event"
   - `description`: "Annual sports day celebration"
   - `image_url`: "https://your-project.supabase.co/storage/v1/object/public/gallery-images/image.jpg"
   - `category`: "School Life"
4. Click "Save"

### Edit Image
1. Find the row in Table Editor
2. Click on any cell to edit
3. Make changes
4. Press Enter or click away to save

### Delete Image
1. Find the row in Table Editor
2. Click the row menu (⋮)
3. Select "Delete"
4. Confirm deletion

## Storage Bucket Setup

### Create Bucket via Dashboard
1. Storage → "New bucket"
2. Name: `gallery-images`
3. Public bucket: ✅
4. Click "Create bucket"

### Upload Images via Dashboard
1. Storage → gallery-images
2. Click "Upload"
3. Select image files
4. Wait for upload completion
5. Copy public URL for use in database

## Common SQL Queries

### View all images
```sql
SELECT * FROM public.gallery_images ORDER BY created_at DESC;
```

### Filter by category
```sql
SELECT * FROM public.gallery_images WHERE category = 'School Life';
```

### Count images by category
```sql
SELECT category, COUNT(*) as count
FROM public.gallery_images
GROUP BY category;
```

### Delete specific image
```sql
DELETE FROM public.gallery_images WHERE id = 'uuid-here';
```

## API Functions Reference

### Fetch Images
```typescript
const { data, error } = await fetchGalleryImages();
// Returns: { data: GalleryImage[] | null, error: Error | null }
```

### Upload Image
```typescript
const { data, error } = await uploadImageToStorage(file);
// Returns: { data: { path: string } | null, error: Error | null }
```

### Save Metadata
```typescript
const { data, error } = await saveGalleryImage(
  "Title",
  "Description",
  "https://url-to-image",
  "School Life"
);
// Returns: { data: GalleryImage | null, error: Error | null }
```

## Troubleshooting Quick Fixes

| Issue | Solution |
|---|---|
| "Bucket not found" | Create storage bucket named `gallery-images` |
| "Table not found" | Run migration 001_create_gallery_images.sql |
| "Permission denied" | Check RLS policies are set correctly |
| "Invalid URL" | Verify Supabase URL format includes https:// |
| "Upload fails" | Check file size <5MB and valid file type |
| "Images not showing" | Verify bucket is public and RLS allows read access |

## Support & Resources

- **Migration Files**: `supabase/migrations/`
- **Setup Guide**: `SUPABASE_SETUP.md`
- **Supabase Docs**: https://supabase.com/docs
- **Table Editor**: Your Supabase Dashboard → Table Editor
- **SQL Editor**: Your Supabase Dashboard → SQL Editor
