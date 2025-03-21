import { config } from '@/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = config.supabase.url;
const supabaseKey = config.supabase.anonKey;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase environment variables. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file.'
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
