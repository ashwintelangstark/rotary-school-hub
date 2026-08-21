/**
 * Add User using Supabase Auth Script
 * This script creates users using Supabase's built-in authentication system
 *
 * Run with: node scripts/add-user-auth.js
 */

import { createClient } from '@supabase/supabase-js';

// Your Supabase credentials
const supabaseUrl = 'https://qgazujqykfgmvovrfjyq.supabase.co';
const supabaseKey = 'sb_publishable_2ygRlqJ7RiRic79OzHqvTQ_LZrW5zAn';

const supabase = createClient(supabaseUrl, supabaseKey);

async function addUser() {
  console.log('👤 Creating user with Supabase Auth...\n');

  const userEmail = 'ashwintelang2@gmail.com';
  const userPassword = 'starkislive';
  const userName = 'Ashwin Telang';
  const userRole = 'admin';

  try {
    // Create user using Supabase Auth Admin API
    // Note: The anon key might not have admin privileges. If this fails,
    // you may need to use the service_role key instead.
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userEmail,
      password: userPassword,
      options: {
        data: {
          name: userName,
          role: userRole
        }
      }
    });

    if (authError) {
      console.log('❌ Error creating user in Supabase Auth:', authError.message);
      console.log('\n💡 If you see "Auth api is not enabled", go to your Supabase dashboard:');
      console.log('   1. Navigate to Authentication > Providers');
      console.log('   2. Enable Email provider');
      console.log('   3. Disable email confirmation if testing (Settings > Auth > Email Confirmation)');
      return;
    }

    if (authData.user) {
      console.log('✅ User created in Supabase Auth!');
      console.log('ID:', authData.user.id);
      console.log('Email:', authData.user.email);
      console.log('Name:', authData.user.user_metadata?.name);
      console.log('Role:', authData.user.user_metadata?.role || 'user');

      // Also add to custom users table for additional data
      console.log('\n📊 Adding user to custom users table...');
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user.id,
            email: authData.user.email,
            name: userName,
            role: userRole
          }
        ])
        .select()
        .single();

      if (userError) {
        console.log('⚠️  Warning: Could not add to custom users table:', userError.message);
        console.log('   This is OK - the user is still registered in Supabase Auth');
      } else {
        console.log('✅ User also added to custom users table!');
        console.log('Custom User ID:', userData.id);
      }

      console.log('\n🎉 You can now login with:');
      console.log('Email:', userEmail);
      console.log('Password:', userPassword);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the script
addUser().catch(console.error);
