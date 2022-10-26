import { atom, selector, useRecoilState } from 'recoil';

import { displayMessageModel, messageModel } from '@/models';
import { selectedFormState, selectedTenseState, selectedVerbState } from '@/store/scripts';

const messagesState = atom<messageModel[]>({
  key: 'messages-state',
  default: [],
});

const useMessages = () => {
  const [messages, setMessages] = useRecoilState(messagesState);
  return { messages, setMessages };
};

const displayMessagesState = atom<displayMessageModel[]>({
  key: 'display-messages-state',
  default: [],
});

const useDisplayMessages = () => {
  const [displayMessages, setDisplayMessages] = useRecoilState(displayMessagesState);
  return { displayMessages, setDisplayMessages };
};

const displayMessages = selector({
  key: 'display-messages',
  get: ({ get }) => {
    const messages = get(messagesState);
    const verb = get(selectedVerbState);
    const tense = get(selectedTenseState);
    const form = get(selectedFormState);
    const msgs: displayMessageModel[] = [];
    messages.map((m, i) => {
      if (i === 0) {
        msgs.push(
          { message: 'Conas atá tú?', sender: 'robot' },
          {
            message: `Déanaimis cleachtadh ar an...`,
            sender: 'robot',
          },
          {
            message: `briathar - <strong>${verb?.name}</strong>\naimsir - <strong>${tense?.name}</strong>\nfoirm - <strong>${form?.name}</strong>`,
            sender: 'robot',
          },
          {
            message: `Anois, ceist a haon...`,
            sender: 'robot',
          },
        );
      } else {
        msgs.push({
          message: m.question?.question_text,
          sender: 'robot',
        });
        if (m.text) {
          msgs.push({
            message: m.text,
            sender: 'you',
          });
        }
      }
    });
    return msgs;
  },
});

export { useMessages, displayMessages, useDisplayMessages };
