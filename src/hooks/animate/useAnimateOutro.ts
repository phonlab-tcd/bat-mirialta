/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { useGenerateOutro } from '@/hooks';
import useDelayBatFeedback from '@/hooks/animate/useDelayBatFeedback';
import { getAllPoints } from '@/services/supabase';
import { patchChatComplete } from '@/services/supabase';
import { useAnimatingOutro } from '@/store/animate';
import { useSession } from '@/store/auth';
import { activeChatState, useChats, useOutro } from '@/store/chats';
import {
  useCumFreqArray,
  usePointsModalOpen,
  useShowAvailablePoints,
  useTotalPoints,
} from '@/store/points';
import { calculateChatPointsCumFreq } from '@/utils/points';

const useAnimateOutro = () => {
  const { session } = useSession();
  const { outro, setOutro } = useOutro();
  const { chats, setChats } = useChats();
  const { setPointsModalOpen } = usePointsModalOpen();
  const { setShowAvailablePoints } = useShowAvailablePoints();
  const generateOutro = useGenerateOutro();
  const { totalPoints } = useTotalPoints();
  const { setCumFreqArray } = useCumFreqArray();

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
        patchChatComplete(activeChat.id, activeChat.outro, true, totalPoints).then((c) => {
          setChats([...chats.slice(0, chats.length - 1), c]);
          setAnimatingOutro(false);
          if (session !== null) {
            getAllPoints(session.user.id).then((points: number[] | undefined) => {
              console.log('points: ', points);
              if (points) {
                const cumFreq = calculateChatPointsCumFreq(points);
                console.log('cumFreq: ', cumFreq);
                setCumFreqArray(Object.values(cumFreq));
                setPointsModalOpen(true);
              }
            });
          }
        });
      }
    }
  }, [animatingSingleOutro]);

  const animateOutro = () => {
    if (activeChat !== undefined) {
      console.log('animating outro');
      const generatedOutro = generateOutro();
      patchChatComplete(activeChat.id, generatedOutro, false, null).then((c) => {
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
