import { atom, selector, useRecoilState } from 'recoil';

import { ResponseModel } from '@/models';

import { Database } from '../../../types/supabase';

const chatsState = atom<Database['public']['Tables']['bat_chats']['Row'][]>({
  key: 'chats',
  default: [],
});

const useChats = () => {
  const [chats, setChats] = useRecoilState(chatsState);
  return { chats, setChats };
};

const activeChatState = selector({
  key: 'chat-in-progress',
  get: ({ get }) => {
    const chats = get(chatsState);
    if (chats.length > 0 && !chats[chats.length - 1].complete) {
      return chats[chats.length - 1];
    }
    return undefined;
  },
});

const introState = atom<ResponseModel[]>({
  key: 'intro',
  default: [],
});

const useIntro = () => {
  const [intro, setIntro] = useRecoilState(introState);
  return { intro, setIntro };
};

export { useChats, activeChatState, introState, useIntro };
