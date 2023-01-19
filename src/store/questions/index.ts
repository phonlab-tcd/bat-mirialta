import { atom, useRecoilState } from 'recoil';

import { Database } from '../../../types/supabase';

const questionsState = atom<Database['public']['Tables']['bat_questions']['Row'][]>({
  key: 'questions-state',
  default: [],
});

const useQuestions = () => {
  const [questions, setQuestions] = useRecoilState(questionsState);
  return { questions, setQuestions };
};

const currentQuestionIDState = atom<number>({
  key: 'current-question-ID-state',
  default: 0,
});

const useCurrentQuestionID = () => {
  const [currentQuestionID, setCurrentQuestionID] = useRecoilState(currentQuestionIDState);
  return { currentQuestionID, setCurrentQuestionID };
};

export { questionsState, useQuestions, useCurrentQuestionID };