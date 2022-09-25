import { atom, useRecoilState } from 'recoil';

import { messageModel } from '@/models';

const messagesState = atom<messageModel[]>({
  key: 'messages-state',
  default: undefined,
});

const useMessages = () => {
  const [messages, setMessages] = useRecoilState(messagesState);
  return { messages, setMessages };
};

export { useMessages };
