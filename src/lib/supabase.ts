import { createClient } from "@supabase/supabase-js";

// Fall back to a syntactically valid placeholder so the app never crashes at
// import time if env vars aren't set yet. Submissions simply fail gracefully
// (the forms show an error) until real values are provided.
const url = import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY || "anon-key-not-set";

export const supabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
);

if (!supabaseConfigured) {
  console.warn(
    "Supabase env vars not set — forms will not submit. " +
      "Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local and in Vercel."
  );
}

export const supabase = createClient(url, anon);
