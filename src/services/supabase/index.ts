import { createClient } from '@supabase/supabase-js';

import getQuestions from './getQuestions';
import getVerbsTensesForms from './getVerbsTensesForms';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
export { getVerbsTensesForms, getQuestions };
