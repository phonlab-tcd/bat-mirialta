import { atom, selector, useRecoilState } from 'recoil';

const chatTextState = atom<string>({
  key: 'chat-text-state',
  default: '',
});

const useChatText = () => {
  const [chatText, setChatText] = useRecoilState(chatTextState);
  return { chatText, setChatText };
};

const chatTextEmptyState = selector({
  key: 'chat-text-empty-state',
  get: ({ get }) => {
    const chatText = get(chatTextState);

    if (chatText.length !== 0) {
      return false;
    }
    return true;
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

const taNilInputChoiceState = atom<boolean>({
  key: 'ta-nil-input-choice-state',
  default: false,
});

const useTaNilInputChoice = () => {
  const [taNilInputChoice, setTaNilInputChoice] = useRecoilState(taNilInputChoiceState);
  return { taNilInputChoice, setTaNilInputChoice };
};

export {
  useBatTyping,
  useMessageInputDisabled,
  useChatText,
  useTaNilInputChoice,
  chatTextEmptyState,
};
