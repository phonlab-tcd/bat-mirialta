import { atom, selector, useRecoilState } from 'recoil';

import { Database } from '../../../types/supabase';
import { currentAdjacencyPairState } from '../adjacencyPairs';
import { activeChatState } from '../chats';

const questionsState = atom<Database['public']['Tables']['bat_questions']['Row'][]>({
  key: 'questions-state',
  default: [],
});

const useQuestions = () => {
  const [questions, setQuestions] = useRecoilState(questionsState);
  return { questions, setQuestions };
};

const questionSetState = atom<number[]>({
  key: 'question-set-state',
  default: [],
});

const useQuestionSet = () => {
  const [questionSet, setQuestionSet] = useRecoilState(questionSetState);
  return { questionSet, setQuestionSet };
};

const currentQuestionIndexState = selector({
  key: 'current-question-index-state',
  get: ({ get }) => {
    const activeChat = get(activeChatState);
    const currentAdjacencyPair = get(currentAdjacencyPairState);
    if (activeChat !== undefined && currentAdjacencyPair !== undefined) {
      return activeChat.questions.indexOf(currentAdjacencyPair.question_id);
    } else {
      return undefined;
    }
  },
});

const currentQuestionState = selector({
  key: 'current-question-state',
  get: ({ get }) => {
    const activeChat = get(activeChatState);
    const questions = get(questionsState);
    const currentQuestionIndex = get(currentQuestionIndexState);
    if (activeChat !== undefined && currentQuestionIndex !== undefined) {
      return questions.find((q) => q.id === activeChat.questions[currentQuestionIndex]);
    } else {
      return undefined;
    }
  },
});

export {
  questionsState,
  useQuestions,
  currentQuestionIndexState,
  currentQuestionState,
  useQuestionSet,
};
