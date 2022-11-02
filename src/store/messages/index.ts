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

const batTypingState = atom<boolean>({
  key: 'bat-typing-state',
  default: false,
});

const useBatTyping = () => {
  const [batTyping, setBatTyping] = useRecoilState(batTypingState);
  return { batTyping, setBatTyping };
};

const messageInputDisabledState = atom<boolean>({
  key: 'message-input-disabled-state',
  default: false,
});

const useMessageInputDisabled = () => {
  const [messageInputDisabled, setMessageInputDisabled] = useRecoilState(messageInputDisabledState);
  return { messageInputDisabled, setMessageInputDisabled };
};

const currentQuestionIDState = atom<number>({
  key: 'current-question-ID-state',
  default: 0,
});

const useCurrentQuestionID = () => {
  const [currentQuestionID, setCurrentQuestionID] = useRecoilState(currentQuestionIDState);
  return { currentQuestionID, setCurrentQuestionID };
};

const repeatAttemptState = atom<number>({
  key: 'repeat-attempt-state',
  default: 0,
});

const useRepeatAttempt = () => {
  const [repeatAttempt, setRepeatAttempt] = useRecoilState(repeatAttemptState);
  return { repeatAttempt, setRepeatAttempt };
};

const chatTextState = atom<string>({
  key: 'chat-text-state',
  default: '',
});

const useChatText = () => {
  const [chatText, setChatText] = useRecoilState(chatTextState);
  return { chatText, setChatText };
};

export {
  useMessages,
  displayMessages,
  useDisplayMessages,
  useBatTyping,
  useMessageInputDisabled,
  useCurrentQuestionID,
  useRepeatAttempt,
  useChatText,
};
