/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import useDelayBatFeedback from '@/hooks/animate/useDelayBatFeedback';
import useGenerateNextQuestion from '@/hooks/questions/useGenerateNextQuestion';
import { activeChatState, useIntro } from '@/store/chats';
import { useShowPoints } from '@/store/points';

const useAnimateIntro = () => {
  const { intro, setIntro } = useIntro();
  const { setShowPoints } = useShowPoints();

  const [animatingIntro, setAnimatingIntro] = useState(false);
  const delayBatFeedback = useDelayBatFeedback();
  const generateNextQuestion = useGenerateNextQuestion();
  const activeChat = useRecoilValue(activeChatState);

  useEffect(() => {
    if (animatingIntro && activeChat !== undefined) {
      setAnimatingIntro(false);

      if (intro.length < activeChat.intro.length) {
        delayBatFeedback(
          () => {
            setIntro(activeChat.intro.slice(0, intro.length + 1));
            setAnimatingIntro(true);
          },
          2000,
          false,
        );
      } else if (activeChat.intro.length === intro.length) {
        delayBatFeedback(
          () => {
            setShowPoints(true);
            console.log('AnimateIntro calling generateNextQuestion');

            generateNextQuestion();
          },
          2000,
          true,
        );
      }
    }
  }, [animatingIntro]);

  const animateIntro = () => {
    if (activeChat !== undefined) {
      console.log('AnimateIntro called');

      setAnimatingIntro(true);
    }
  };

  return animateIntro;
};

export default useAnimateIntro;
