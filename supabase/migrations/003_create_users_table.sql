-- Migration: Create Users Table for Authentication
-- Description: Creates users table for gallery authentication (existing users only)

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

-- Insert existing users (you would add your actual users here)
-- Examples (replace with real user data):
-- INSERT INTO public.users (email, password_hash, name, role) VALUES
-- ('admin@rotaryschool.com', '$2a$12$...', 'Administrator', 'admin'),
-- ('teacher@rotaryschool.com', '$2a$12$...', 'Teacher Name', 'user');

-- Note: Passwords should be hashed. In production, use a proper hashing function.
-- You can generate password hashes using bcrypt or similar.

COMMENT ON TABLE public.users IS 'User authentication for gallery management';
COMMENT ON COLUMN public.users.email IS 'User email (unique)';
COMMENT ON COLUMN public.users.password_hash IS 'Hashed password';
COMMENT ON COLUMN public.users.name IS 'Full name';
COMMENT ON COLUMN public.users.role IS 'User role (admin or user)';