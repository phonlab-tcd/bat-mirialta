import { atom, selector, useRecoilState } from 'recoil';

import { ChatBubbleModel } from '@/models';

import { adjacencyPairsState } from '../adjacencyPairs';
import { questionsState } from '../questions';
import { responsesState } from '../responses';

const repeatAttemptState = atom<number>({
  key: 'repeat-attempt-state',
  default: 0,
});

const useRepeatAttempt = () => {
  const [repeatAttempt, setRepeatAttempt] = useRecoilState(repeatAttemptState);
  return { repeatAttempt, setRepeatAttempt };
};

const chatBubblesState = selector({
  key: 'chat-bubbles',
  get: ({ get }) => {
    const adjacencyPairs = get(adjacencyPairsState);
    const questions = get(questionsState);
    const responses = get(responsesState);
    const chatBubbles: ChatBubbleModel[] = [];
    adjacencyPairs.map((m) => {
      if (m !== null) {
        const question = questions.find((q) => m.question_id === q.id);
        chatBubbles.push({
          text: question !== undefined ? question.text : 'error: no question',
          sender: 'robot',
        });
        if (m.text) {
          chatBubbles.push({
            text: m.text,
            sender: 'you',
          });
        }
        if (m.response_id !== null) {
          const response = responses.find((r) => m.response_id === r.id);
          chatBubbles.push({
            text: response !== undefined ? response.text : 'error: no response',
            sender: 'robot',
          });
        }
      }
    });
    return chatBubbles;
  },
});

export { chatBubblesState, useRepeatAttempt };
