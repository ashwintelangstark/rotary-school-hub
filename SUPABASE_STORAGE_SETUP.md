# Supabase Storage Setup Guide (Dashboard UI Method)

Since SQL storage policies require elevated permissions, here's the recommended way to set up storage using the Supabase Dashboard:

## Step 1: Create Storage Bucket

1. **Go to Storage** in your Supabase Dashboard
2. Click **"New bucket"**
3. Enter bucket name: `gallery-images`
4. **Make it public**: Toggle ON
5. Click **"Create bucket"**

## Step 2: Configure Bucket Policies (Through Dashboard)

1. **Click on your bucket** `gallery-images`
2. **Go to "Configuration"** or **"Policies"** tab
3. **Create policies** using the dashboard interface:

### Policy 1: Public Read Access
- **Policy Name**: `Gallery Public Read`
- **Allowed Operation**: `SELECT`
- **Allowed Roles**: `public`, `anon`, `authenticated`
- **USING condition**: `true`

### Policy 2: Public Upload Access  
- **Policy Name**: `Gallery Public Upload`
- **Allowed Operation**: `INSERT`
- **Allowed Roles**: `public`, `anon`, `authenticated`
- **WITH CHECK condition**: `true`

## Step 3: Alternative Quick Method

If the above doesn't work, try this simpler approach:

1. **Make the bucket public** (already done in Step 1)
2. **Skip the policies for now** - public buckets should work without explicit policies
3. **Test upload** - if it works, you're good to go!
4. **Add policies later** if you need more control

## Step 4: Verify Bucket Setup

1. Go to **Storage** → **gallery-images**
2. You should see your bucket listed
3. **Test manually**: Try uploading a small image through the dashboard
4. If manual upload works, the app upload will work too

## What Each Policy Does

- **SELECT Policy**: Allows anyone to view/download images
- **INSERT Policy**: Allows anyone to upload images
- **UPDATE Policy**: Allows editing image metadata (optional)
- **DELETE Policy**: Allows deleting images (optional)

## Troubleshooting

### Upload fails with permission error
- Make sure the bucket is **public**
- Check that the INSERT policy includes `anon` role
- Try uploading through Dashboard first to test

### Images don't show in gallery
- Check SELECT policy includes `anon` role  
- Verify bucket is public
- Check console for specific error messages

### "Permission denied" errors
- The SQL method requires project owner permissions
- Use the Dashboard UI method instead
- Contact Supabase support if you need higher access

## Minimal Working Configuration

If you just want it to work quickly, this is all you need:

1. **Create bucket** named `gallery-images`
2. **Make it public**
3. **That's it!** - No additional policies needed for basic functionality

The app will work with just a public bucket. Add policies later if you need more security control.

## Quick Test

Once bucket is created and public, test it:

1. Go to **Storage** → **gallery-images** in Dashboard
2. Click **"Upload"** → select a small test image
3. Wait for upload to complete
4. Click on the uploaded file → copy the public URL
5. Paste the URL in your browser - it should show the image

If this works, your app upload feature will work too! 🎉
