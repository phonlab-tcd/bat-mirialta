/* eslint-disable react-hooks/exhaustive-deps */
import { getChats } from '@/services/supabase';
import { useChats } from '@/store/chats';

function usePopulateChats() {
  const { setChats } = useChats();

  const populateChats = (userID: string) => {
    getChats(userID).then((chats) => {
      if (chats !== undefined) {
        setChats(chats);
      }
    });
  };

  return populateChats;
}

export default usePopulateChats;
