const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

let supabase;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables! Running in degraded/mock mode.');
  // Create a robust Proxy object to prevent crashes on startup/require and handle nested calls gracefully
  const mockResponse = {
    data: [],
    error: null,
    count: 0,
    select: () => mockResponse,
    neq: () => mockResponse,
    eq: () => mockResponse,
    order: () => mockResponse,
    limit: () => mockResponse,
    insert: () => mockResponse,
    upsert: () => mockResponse,
    update: () => mockResponse,
    delete: () => mockResponse,
  };
  
  supabase = {
    from: () => mockResponse,
    auth: {
      signUp: () => mockResponse,
      signInWithPassword: () => mockResponse,
      getUser: () => ({ data: { user: null }, error: null }),
    }
  };
} else {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('🚀 Backend connected via Supabase HTTPS API');
  } catch (err) {
    console.error('❌ Failed to initialize Supabase client:', err.message);
    supabase = {
      from: () => ({ select: () => ({ neq: () => ({ data: [] }) }) }),
      auth: {}
    };
  }
}

module.exports = supabase;
