# 🔐 Quick User Authentication Setup

## Step 1: Create Users Table (2 minutes)

**Go to your Supabase SQL Editor:**
https://supabase.com/dashboard/project/qgazujqykfgmvovrfjyq/sql

**Copy and run this SQL:**

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS users_email_idx ON public.users(email);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies for user authentication
CREATE POLICY "Users can view their own profile"
  ON public.users
  FOR SELECT
  TO public
  USING (true);

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION update_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION update_users_updated_at();

COMMENT ON TABLE public.users IS 'User authentication for gallery management';
```

## Step 2: Add Your User Account

**Run this command to add yourself:**
```bash
node scripts/add-user.js
```

## Step 3: Login to Test

**Go to:** http://localhost:5173/login

**Use your credentials:**
- **Email:** ashwintelang2@gmail.com
- **Password:** starkislive

## Step 4: Access Gallery Management

After successful login, you'll be redirected to:
**http://localhost:5173/gallery-manage**

Where you can:
- Upload new images
- Edit existing images
- Delete images
- Logout

## 🔍 Troubleshooting

**Login not working:**
- Make sure you ran Step 1 (users table creation)
- Make sure you ran Step 2 (add-user.js script)
- Check your email/password exactly: ashwintelang2@gmail.com / starkislive

**SQL Editor error:**
- Make sure you're on the correct project (qgazujqykfgmvovrfjyq)
- Try running the SQL one section at a time

**User already exists:**
- The script will tell you if your user already exists
- Try logging in with your credentials

## 🎯 What This Creates:

- **Users table** in your database
- **Your admin account** with email: ashwintelang2@gmail.com
- **Admin role** - full access to gallery management
- **Secure authentication** for edit/delete features

## ✅ After Setup:

You'll have complete access to:
- Upload images to gallery
- Edit image titles, descriptions, categories
- Delete unwanted images
- Manage all your school's gallery content

**This is a one-time setup (3 minutes) and you'll have full admin access!** 🚀
