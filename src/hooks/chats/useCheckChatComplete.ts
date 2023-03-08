/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useChats } from '@/store/chats';

function useCheckChatComplete() {
  const { chats } = useChats();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('in useeCheckChatComplete');
    if (chats !== undefined && chats[chats.length - 1].complete) {
      alert('Congratulations! You have finished the chat!');
      navigate('/');
    }
  }, [chats]);

  return null;
}

export default useCheckChatComplete;
