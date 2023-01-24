import { atom, selector, useRecoilState } from 'recoil';

import { Database } from '../../../types/supabase';

const questionsState = atom<Database['public']['Tables']['bat_questions']['Row'][]>({
  key: 'questions-state',
  default: [],
});

const useQuestions = () => {
  const [questions, setQuestions] = useRecoilState(questionsState);
  return { questions, setQuestions };
};

const questionSetState = atom<Database['public']['Tables']['bat_questions']['Row'][]>({
  key: 'question-set-state',
  default: [],
});

const useQuestionSet = () => {
  const [questionSet, setQuestionSet] = useRecoilState(questionSetState);
  return { questionSet, setQuestionSet };
};

const currentQuestionState = selector({
  key: 'current-question-state',
  get: ({ get }) => {
    const questions = get(questionsState);
    if (questions.length !== 0) {
      return questions[questions.length - 1];
    } else {
      return undefined;
    }
  },
});

export { questionsState, useQuestions, useQuestionSet, currentQuestionState };
