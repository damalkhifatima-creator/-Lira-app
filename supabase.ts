
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://doljudnmftgbwyxzdxpk.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_6yOVd0NDoi2M80bfY5lkvQ_uBGph-YY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
