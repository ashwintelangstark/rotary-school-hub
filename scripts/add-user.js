/**
 * Add User to Database Script
 * This script adds your user credentials to the Supabase database
 *
 * Run with: node scripts/add-user.js
 */

import { createClient } from '@supabase/supabase-js';

// Your Supabase credentials
const supabaseUrl = 'https://qgazujqykfgmvovrfjyq.supabase.co';
const supabaseKey = 'sb_publishable_2ygRlqJ7RiRic79OzHqvTQ_LZrW5zAn';

const supabase = createClient(supabaseUrl, supabaseKey);

async function addUser() {
  console.log('👤 Adding user to database...\n');

  const userEmail = 'ashwintelang2@gmail.com';
  const userPassword = 'starkislive';
  const userName = 'Ashwin Telang';

  try {
    // First, let's check if the users table exists
    console.log('📊 Checking if users table exists...');
    const { data: tables, error: tableError } = await supabase
      .from('users')
      .select('id')
      .limit(1);

    if (tableError) {
      console.log('❌ Users table not found. Creating it first...');
      console.log('Please run this SQL in your Supabase SQL Editor:\n');

      const createTableSQL = `
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
`;

      console.log(createTableSQL);
      console.log('\nAfter running the SQL, run this script again.');
      return;
    }

    console.log('✅ Users table exists!\n');

    // Check if user already exists
    console.log('🔍 Checking if user already exists...');
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('email', userEmail)
      .single();

    if (existingUser && !checkError) {
      console.log('⚠️  User already exists!');
      console.log('Email:', existingUser.email);
      console.log('Name:', existingUser.name);
      console.log('Role:', existingUser.role);
      console.log('\nIf you want to update the password, let me know.');
      return;
    }

    // Add the user
    console.log('➕ Adding user:', userEmail);
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          email: userEmail,
          password_hash: userPassword, // In production, this should be properly hashed
          name: userName,
          role: 'admin' // Giving you admin access
        }
      ])
      .select()
      .single();

    if (error) {
      console.log('❌ Error adding user:', error.message);
      return;
    }

    console.log('✅ User added successfully!');
    console.log('Email:', data.email);
    console.log('Name:', data.name);
    console.log('Role:', data.role);
    console.log('\n🎉 You can now login with:');
    console.log('Email: ashwintelang2@gmail.com');
    console.log('Password: starkislive');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the script
addUser().catch(console.error);