import { createClient } from '@supabase/supabase-js';

import getAdjacencyPairs from './adjacencyPairs/getAdjacencyPairs';
import patchAdjacencyPairResponse from './adjacencyPairs/patchAdjacencyPairResponse';
import patchAdjacencyPairText from './adjacencyPairs/patchAdjacencyPairText';
import postAdjacencyPair from './adjacencyPairs/postAdjacencyPair';
import checkError from './edgeFunctions/checkError';
import getAvailableForms from './getAvailableForms';
import getAvailableTenses from './getAvailableTenses';
import getForms from './getForms';
import getProfile from './getProfile';
import getResponseCategories from './getResponseCategories';
import getResponses from './getResponses';
import getTenses from './getTenses';
import getVerbs from './getVerbs';
import getAllQuestions from './questions/getAllQuestions';
import getQuestion from './questions/getQuestion';
import getQuestionSet from './questions/getQuestionSet';
import getQuestions from './questions/getQuestions';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
export {
  checkError,
  getQuestion,
  getQuestions,
  getQuestionSet,
  getVerbs,
  getTenses,
  getForms,
  getProfile,
  getResponses,
  getResponseCategories,
  postAdjacencyPair,
  patchAdjacencyPairText,
  patchAdjacencyPairResponse,
  getAvailableTenses,
  getAvailableForms,
  getAdjacencyPairs,
  getAllQuestions,
};
