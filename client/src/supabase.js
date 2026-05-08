import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wcbuhijjpljnrphhoyny.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_FDS26y9tozSn1wQc7P9ZOQ_NvZIGUwW';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
