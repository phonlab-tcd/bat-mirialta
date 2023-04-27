import { createClient } from '@supabase/supabase-js';

import getAdjacencyPairs from './adjacencyPairs/getAdjacencyPairs';
import patchAdjacencyPairFeedback from './adjacencyPairs/patchAdjacencyPairFeedback';
import patchAdjacencyPairHint from './adjacencyPairs/patchAdjacencyPairHint';
import patchAdjacencyPairText from './adjacencyPairs/patchAdjacencyPairText';
import postAdjacencyPair from './adjacencyPairs/postAdjacencyPair';
import getChats from './chats/getChats';
import patchChatComplete from './chats/patchChatComplete';
import postChat from './chats/postChat';
import checkError from './edgeFunctions/checkError';
import getAvailableForms from './getAvailableForms';
import getAvailableTenses from './getAvailableTenses';
import getAvailableVerbs from './getAvailableVerbs';
import getForms from './getForms';
import getHint from './getHint';
import getTenses from './getTenses';
import getVerbs from './getVerbs';
import getAllPoints from './points/getAllPoints';
import getProfile from './profiles/getProfile';
import updateProfileLanguage from './profiles/updateProfileLanguage';
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
  updateProfileLanguage,
  postAdjacencyPair,
  patchAdjacencyPairText,
  patchAdjacencyPairFeedback,
  patchAdjacencyPairHint,
  getAvailableVerbs,
  getAvailableTenses,
  getAvailableForms,
  getAdjacencyPairs,
  getAllQuestions,
  getChats,
  patchChatComplete,
  postChat,
  getHint,
  getAllPoints,
};
