/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Legacy Supabase credentials
  readonly SUPABASE_PROJECT_ID: string
  readonly SUPABASE_PUBLISHABLE_KEY: string
  readonly SUPABASE_URL: string

  // Vite Supabase credentials
  readonly VITE_SUPABASE_PROJECT_ID: string
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_SUPABASE_STORAGE_BUCKET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
