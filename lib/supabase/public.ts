import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import type { Database } from "@/types/database.types";

let publicClientInstance: ReturnType<typeof createSupabaseClient<Database>> | null = null;

export function createPublicClient() {
  if (publicClientInstance) return publicClientInstance;

  publicClientInstance = createSupabaseClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );

  return publicClientInstance;
}
