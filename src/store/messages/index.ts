import { atom, selector, useRecoilState } from 'recoil';

import { displayMessageModel, messageModel } from '@/models';
import { selectedForm, selectedTense, selectedVerb } from '@/store/scripts';

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
    const verb = get(selectedVerb);
    const tense = get(selectedTense);
    const form = get(selectedForm);
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
            message: `briathar - <strong>${verb}</strong>`,
            sender: 'robot',
          },
          {
            message: `aimsir - <strong>${tense}</strong>`,
            sender: 'robot',
          },
          {
            message: `foirm - <strong>${form}</strong>`,
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
