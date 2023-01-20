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
    console.log('adjacencyPairs:', adjacencyPairs);

    const questions = get(questionsState);
    console.log('questions:', questions);
    const responses = get(responsesState);
    const chatBubbles: ChatBubbleModel[] = [];
    adjacencyPairs.map((m) => {
      if (m !== null) {
        const question = questions.find((q) => q.id === m.question_id);
        if (question !== undefined) {
          chatBubbles.push({
            text: question.question_text,
            sender: 'robot',
          });
          if (m.text) {
            chatBubbles.push({
              text: m.text,
              sender: 'you',
            });
          }
          if (m.response_id !== null) {
            const response = responses.find((r) => r.id === m.response_id);
            if (response !== undefined) {
              chatBubbles.push({
                text: response.text,
                sender: 'robot',
              });
            }
          }
        }
      }
    });
    return chatBubbles;
  },
});

export { chatBubblesState, useRepeatAttempt };
