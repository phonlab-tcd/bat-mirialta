import { atom, selector, useRecoilState } from 'recoil';

import { ChatBubbleModel, ResponseModel } from '@/models';
import { introState } from '@/store/chats';

import { adjacencyPairsState } from '../adjacencyPairs';
import { questionsState } from '../questions';

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
    const intro = get(introState);
    const chatBubbles: ChatBubbleModel[] = [];
    intro.map((i) => {
      if (i.text) {
        chatBubbles.push({
          text: i.text,
          sender: 'robot',
        });
      }
    });
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
        if (Array.isArray(m.response)) {
          m.response.map((r: ResponseModel) => {
            chatBubbles.push({
              text: r.text,
              sender: 'robot',
            });
          });
        }
      }
    });
    return chatBubbles;
  },
});

export { chatBubblesState, useRepeatAttempt };
