/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { useGenerateOutro } from '@/hooks';
import useDelayBatFeedback from '@/hooks/animate/useDelayBatFeedback';
import { patchChatComplete } from '@/services/supabase';
import { useAnimatingOutro } from '@/store/animate';
import { activeChatState, useChats, useOutro } from '@/store/chats';
import {
  useShowAvailablePoints,
  /*, useShowHome */
} from '@/store/points';

const useAnimateOutro = () => {
  const { outro, setOutro } = useOutro();
  const { chats, setChats } = useChats();
  // const { setShowHome } = useShowHome();
  const { setShowAvailablePoints } = useShowAvailablePoints();
  const generateOutro = useGenerateOutro();

  const { animatingOutro, setAnimatingOutro } = useAnimatingOutro();
  const [animatingSingleOutro, setAnimatingSingleOutro] = useState(false);
  const delayBatFeedback = useDelayBatFeedback();
  const activeChat = useRecoilValue(activeChatState);

  useEffect(() => {
    if (animatingOutro && activeChat !== undefined) {
      setAnimatingSingleOutro(false);

      if (outro.length < activeChat.outro.length) {
        delayBatFeedback(
          () => {
            setOutro(activeChat.outro.slice(0, outro.length + 1));
            setAnimatingSingleOutro(true);
          },
          2000,
          false,
        );
      } else if (activeChat.outro.length === outro.length) {
        patchChatComplete(activeChat.id, activeChat.outro, true).then((c) => {
          setChats([...chats.slice(0, chats.length - 1), c]);
        });
        setAnimatingOutro(false);
        alert('complete');
      }
    }
  }, [animatingSingleOutro]);

  const animateOutro = () => {
    if (activeChat !== undefined) {
      console.log('animating outro');
      const generatedOutro = generateOutro();
      patchChatComplete(activeChat.id, generatedOutro, false).then((c) => {
        setChats([...chats.slice(0, chats.length - 1), c]);
        setAnimatingOutro(true);
        setAnimatingSingleOutro(true);
        setShowAvailablePoints(false);
      });
    } else {
      console.log('activeChat undefined');
    }
  };

  return animateOutro;
};

export default useAnimateOutro;
