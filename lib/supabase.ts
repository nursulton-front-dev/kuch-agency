import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://uslrcbibqannepcttoqc.supabase.co'

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzbHJjYmlicWFubmVwY3R0b3FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3MzUyMzQsImV4cCI6MjEwNjMxMTIzNH0.V43fUzEzgsTSqmouMDhLJt4HvWo64oPlvpSxyPFdD3g'

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

export * from './supabase/client'
