# Quick Supabase Setup - Create Storage Bucket

## Step 1: Create Storage Bucket (2 minutes)

1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard/project/qgazujqykfgmvovrfjyq
2. **Click on "Storage"** in the left sidebar
3. **Click "New bucket"** button
4. **Enter bucket name**: `gallery-images` (exactly this, lowercase with hyphen)
5. **Make bucket public**: Toggle this to **ON**
6. **Click "Create bucket"**

## Step 2: Verify Bucket is Public

1. Click on your new `gallery-images` bucket
2. Click on **"Configuration"** tab
3. Make sure **"Public bucket"** is set to **ON**

## Step 3: Run Migration Script

Once the bucket is created, run:

```bash
node scripts/migrate-gallery-to-supabase.js
```

This will upload all 24 existing gallery images to Supabase!

## What This Does

The migration script will:
- Upload all your existing gallery images from `/public/gallery/` folder
- Store them in Supabase Storage
- Create database entries with titles, descriptions, and categories
- Generate proper public URLs for each image

## Expected Output

After creating the bucket, you should see:

```
🚀 Starting Gallery Migration to Supabase...
📁 Checking storage bucket...
✅ Bucket "gallery-images" found and accessible!
📊 Checking database table...
✅ Database table "gallery_images" is accessible!
📤 Uploading gallery images...
📤 Uploading: seach.webp...
✅ Successfully uploaded: First Day Vibes
... (continues for all 24 images)
🎉 Migration Complete!
✅ Uploaded: 24 images
```

## Next Steps

After migration completes:

1. **View in Supabase Dashboard**:
   - Go to Storage → gallery-images to see uploaded files
   - Go to Table Editor → gallery_images to see database entries

2. **Test the Gallery**:
   - Navigate to http://localhost:5173/gallery
   - All images should load from Supabase
   - Upload button should be visible

3. **Test Upload Feature**:
   - Click "Upload to Gallery"
   - Upload a new image
   - See it appear as a card in the gallery!

## Troubleshooting

**"Bucket not found" error**:
- Make sure you created the bucket with exact name: `gallery-images`
- Check you're in the correct project (qgazujqykfgmvovrfjyq)

**"Permission denied" errors**:
- Make sure bucket is set to public
- Check that you're using the publishable key, not service role key

**Images not showing**:
- Check browser console for errors
- Verify bucket is public
- Check Supabase Dashboard → Table Editor to see if data exists

## Your Supabase Project Details

- **Project URL**: https://qgazujqykfgmvovrfjyq.supabase.co
- **Storage Bucket**: gallery-images
- **Database Table**: gallery_images
- **Status**: Database ready ✅ | Storage bucket needed ⚠️
