# 🪣 Create Storage Bucket - Step by Step Guide

## Follow These Exact Steps (2 minutes):

### Step 1: Go to Supabase Storage Dashboard
**Click this link:** https://supabase.com/dashboard/project/qgazujqykfgmvovrfjyq/storage

### Step 2: Create the Bucket
1. Look for the **"New bucket"** button (usually top-right)
2. Click it
3. A dialog will appear asking for bucket details

### Step 3: Configure the Bucket
- **Name**: `gallery-images` (exactly this - lowercase with hyphen)
- **Make bucket public**: Toggle this **ON** (very important!)
- **File size limit**: You can leave default or set to 5MB (5242880 bytes)
- **Allowed MIME types**: You can leave blank for images

### Step 4: Create
- Click the **"Create bucket"** button
- You should see your new bucket appear in the list

### Step 5: Verify it's Public
1. Click on your `gallery-images` bucket
2. Click on **"Configuration"** tab
3. Make sure **"Public bucket"** is set to **ON**

## ✅ Verification

Once created, you can verify by running:
```bash
node scripts/create-bucket.js
```

You should see:
```
✅ Bucket "gallery-images" already exists!
🎉 Bucket is ready!
```

## 🎯 Next Steps After Creating Bucket

Once the bucket is created, run:
```bash
node scripts/migrate-gallery-to-supabase.js
```

This will upload all your gallery images (24 images) to Supabase!

## 📁 What Gets Uploaded

All images from your `public/gallery/` folder:
- seach.webp (First Day Vibes)
- envday.webp (World Environment Day)
- essey.webp (Essay Writing Competition)
- hinday.webp (Hindi Day)
- story.webp (Story Telling Competition)
- justamin.webp (Just A Minute)
- poem.webp (Poem Recitation)
- mockin.webp (Mock Interview)
- mathtalent.webp (Mathematical Talent)
- healthaware.webp (Health Awareness)
- mathrelayrace.webp (Math Relay Race)
- smrtsclor.webp (Smart Scholar Test)
- libclub.webp (Library Club)
- abhn.webp (Abhinaya Geete Competition)
- flutedeco.webp (Flute Decoration)
- crownmaking.webp (Crown Making)
- pott.webp (Pot Decoration)
- pratibhakaranji.webp (Pratibha Karanji Prize Winners)
- INVESTITURE.webp (Investiture Ceremony)
- rhyme.webp (Rhyme Competition)
- annualsports.webp (Annual Sports Meet)
- agadithota.webp (Agadi Thotha)
- gujrat.webp (Rainbow Art Centre Gujarat)
- phspark.webp (PHS Water Park Trip)
- abhinayageete.webp (Abhinaya Geete Competition)

## 🚀 Final Result

After bucket creation and migration:
- ✅ All 24+ images stored in Supabase Storage
- ✅ Database entries with titles and descriptions
- ✅ Upload feature working
- ✅ Images displayed as cards in gallery
- ✅ Real-time updates from Supabase Table Editor

**Your Supabase Project URL:** https://qgazujqykfgmvovrfjyq.supabase.co
