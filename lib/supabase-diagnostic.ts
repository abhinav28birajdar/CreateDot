/**
 * Supabase Diagnostic Tool
 * Run this in browser console to debug Supabase connection
 */

import { createSupabaseClient } from './supabase';

export async function diagnoseSpabase() {
  console.log('🔍 Starting Supabase diagnostic...\n');
  
  const supabase = createSupabaseClient();
  
  try {
    // 1. Check environment variables
    console.log('📋 Environment Variables:');
    console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    
    // 2. Test basic connection
    console.log('\n🌐 Testing Supabase Connection...');
    const { data: authData, error: authError } = await supabase.auth.getSession();
    console.log('Auth session check:', authError ? `❌ ${authError.message}` : '✅ Connected');
    
    // 3. Check if users table exists
    console.log('\n📊 Checking Database Tables...');
    try {
      const { data, error, count } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.log('❌ Users table error:', error.message);
        console.log('   This likely means:');
        console.log('   1. The database migration (migrations_complete.sql) has NOT been run');
        console.log('   2. RLS policies are blocking access');
        console.log('   3. The table does not exist');
      } else {
        console.log('✅ Users table exists (', count, 'rows)');
      }
    } catch (e) {
      console.log('❌ Users table check failed:', e);
    }
    
    // 4. Check if projects table exists
    try {
      const { data, error, count } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.log('❌ Projects table error:', error.message);
      } else {
        console.log('✅ Projects table exists (', count, 'rows)');
      }
    } catch (e) {
      console.log('❌ Projects table check failed:', e);
    }
    
    // 5. Check RLS status
    console.log('\n🔐 RLS Status Check:');
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .limit(1);
      
      if (error?.code === 'PGRST116') {
        console.log('⚠️  RLS policies may be too restrictive');
      } else if (error) {
        console.log('❌ RLS Error:', error.message);
      } else {
        console.log('✅ RLS appears to be working');
      }
    } catch (e) {
      console.log('⚠️  Could not fully verify RLS');
    }
    
    console.log('\n✅ Diagnostic complete!\n');
    console.log('NEXT STEPS:');
    console.log('1. If tables don\'t exist: Run migrations_complete.sql in Supabase SQL editor');
    console.log('2. If RLS is blocking: Check RLS policies in Supabase dashboard');
    console.log('3. If connection fails: Verify NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
    
  } catch (error) {
    console.error('❌ Diagnostic failed:', error);
  }
}

// Export for easy access
declare global {
  interface Window {
    diagnoseSpabase: typeof diagnoseSpabase;
  }
}

if (typeof window !== 'undefined') {
  (window as any).diagnoseSpabase = diagnoseSpabase;
}

