import { atom, selector, useRecoilState } from 'recoil';

import { ChatBubbleModel } from '@/models';

import { adjacencyPairsState } from '../adjacencyPairs';

// import { questionsState } from '../questions';
// import { responsesState } from '../responses';

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
    // const questions = get(questionsState);
    // const responses = get(responsesState);
    const chatBubbles: ChatBubbleModel[] = [];
    adjacencyPairs.map((m) => {
      if (m !== null) {
        chatBubbles.push({
          // text: questions.map((q) => q.id === m.question_id && q.question_text),
          text: 'hi',
          sender: 'robot',
        });
        if (m.text) {
          chatBubbles.push({
            text: m.text,
            sender: 'you',
          });
        }
        if (m.response_id !== null) {
          chatBubbles.push({
            // text: responses.map((r) => r.id === m.response_id && r.text),
            text: 'howdy',
            sender: 'robot',
          });
        }
      }
      // }
    });
    return chatBubbles;
  },
});

export { chatBubblesState, useRepeatAttempt };
