// Environment-specific configurations will be exported from here

export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL || '',
  },
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  },
}; 