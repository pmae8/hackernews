import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import type { Database } from './types';

const SUPABASE_URL = "https://rklmmawjfhbxykyewage.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrbG1tYXdqZmhieHlreWV3YWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1MTE5NDYsImV4cCI6MjA1NDA4Nzk0Nn0.6b9yjODu6c5PAgq9BqLD0K-Y0jUTgzXVVobcjeBrxe8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);