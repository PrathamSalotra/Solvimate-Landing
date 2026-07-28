import 'server-only';
import { createClient } from '@supabase/supabase-js';

if (typeof window !== 'undefined') {
  throw new Error(
    'CRITICAL SECURITY ERROR: The Supabase service-role client (lib/supabase/server.ts) cannot be imported in client components or bundled into the browser.'
  );
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export function createServerClient() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    // In server environment, log warning if keys are missing
    if (process.env.NODE_ENV !== 'production' && (!supabaseUrl || !supabaseServiceRoleKey)) {
      console.warn(
        'Warning: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing from environment variables.'
      );
    }
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export const supabaseServer = createServerClient();
