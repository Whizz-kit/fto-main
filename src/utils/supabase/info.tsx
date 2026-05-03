export const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
export const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!projectId || !publicAnonKey) {
  console.error('Missing Supabase environment variables. Set VITE_SUPABASE_PROJECT_ID and VITE_SUPABASE_ANON_KEY.');
}
