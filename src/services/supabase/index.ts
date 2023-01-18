import { createClient } from '@supabase/supabase-js';

import getAdjacencyPairs from './getAdjacencyPairs';
import getAvailableForms from './getAvailableForms';
import getAvailableTenses from './getAvailableTenses';
import getProfile from './getProfile';
import getQuestionIDs from './getQuestionIDs';
import getQuestions from './getQuestions';
import getResponses from './getResponses';
import getTaskSelection from './getTaskSelection';
import patchMessage from './patchMessage';
import postMessage from './postMessage';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
export {
  getQuestions,
  getTaskSelection,
  getQuestionIDs,
  getProfile,
  getResponses,
  postMessage,
  patchMessage,
  getAvailableTenses,
  getAvailableForms,
  getAdjacencyPairs,
};
