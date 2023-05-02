import { atom, selector, useRecoilState } from 'recoil';

import { ChatBubbleModel, ResponseModel } from '@/models';
import { introState, outroState } from '@/store/chats';

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
    const outro = get(outroState);
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
        const text = question !== undefined ? question.text.replace(/ *\([^)]*\) */g, '') : '-';
        const verb_tense_form_info =
          m.verb_tense_form_info !== null ? ` (${m.verb_tense_form_info})` : '';
        chatBubbles.push({
          text: text + verb_tense_form_info,
          sender: 'robot',
        });
        if (Array.isArray(m.hints)) {
          m.hints.map((r: ResponseModel) => {
            chatBubbles.push({
              text: 'nod',
              sender: 'you',
            });
            if (r.text !== 'temp') {
              chatBubbles.push({
                text: r.text.charAt(0).toUpperCase() + r.text.slice(1),
                sender: 'robot',
              });
            }
          });
        }
        if (m.text) {
          chatBubbles.push({
            text: m.text,
            sender: 'you',
          });
        }
        if (Array.isArray(m.response)) {
          m.response.map((r: ResponseModel) => {
            chatBubbles.push({
              text: r.text.charAt(0).toUpperCase() + r.text.slice(1),
              sender: 'robot',
            });
          });
        }
      }
    });
    outro.map((o) => {
      if (o.text) {
        chatBubbles.push({
          text: o.text.charAt(0).toUpperCase() + o.text.slice(1),
          sender: 'robot',
        });
      }
    });
    return chatBubbles;
  },
});

export { chatBubblesState, useRepeatAttempt };
