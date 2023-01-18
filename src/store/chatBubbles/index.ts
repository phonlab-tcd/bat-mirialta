import { atom, selector, useRecoilState } from 'recoil';

import { ChatBubbleModel } from '@/models';

import { adjacencyPairsState } from '../adjacencyPairs';
import { questionsState } from '../questions';
import { responsesState } from '../responses';

// import { selectedFormState, selectedTenseState, selectedVerbState } from '@/store/scripts';

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
    // const verb = get(selectedVerbState);
    // const tense = get(selectedTenseState);
    // const form = get(selectedFormState);
    const chatBubbles: ChatBubbleModel[] = [];
    adjacencyPairs.map((m) => {
      // if (i === 0) {
      //   chatBubbles.push(
      //     { message: 'Conas atá tú?', sender: 'robot' },
      //     {
      //       message: `Déanaimis cleachtadh ar an...`,
      //       sender: 'robot',
      //     },
      //     {
      //       message: `briathar - <strong>${verb?.name}</strong>\naimsir - <strong>${tense?.name}</strong>\nfoirm - <strong>${form?.name}</strong>`,
      //       sender: 'robot',
      //     },
      //     {
      //       message: `Anois, ceist a haon...`,
      //       sender: 'robot',
      //     },
      //   );
      // } else {
      if (m !== null) {
        chatBubbles.push({
          text: questions.map((q) => q.id === m.question_id && q.question_text),
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
            text: responses.map((r) => r.id === m.response_id && r.text),
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
