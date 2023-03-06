import { atom, selector, useRecoilState } from 'recoil';

import { Database } from '../../../types/supabase';

const chatsState = atom<Database['public']['Tables']['bat_chats']['Row'][]>({
  key: 'chats',
  default: [],
});

const useChats = () => {
  const [chats, setChats] = useRecoilState(chatsState);
  return { chats, setChats };
};

const mostRecentChatState = selector({
  key: 'chat-in-progress',
  get: ({ get }) => {
    const chats = get(chatsState);
    if (chats.length > 0) {
      return chats[chats.length - 1];
    }
    return undefined;
  },
});

export { useChats, mostRecentChatState };
