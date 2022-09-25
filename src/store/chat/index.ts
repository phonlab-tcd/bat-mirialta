import { atom, useRecoilState } from 'recoil';

const chatTextState = atom<string>({
  key: 'chat-text-state',
  default: '',
});

const useChatText = () => {
  const [chatText, setChatText] = useRecoilState(chatTextState);
  return { chatText, setChatText };
};

export { useChatText };
