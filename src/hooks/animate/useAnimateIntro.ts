/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import useDelayBatFeedback from '@/hooks/animate/useDelayBatFeedback';
import useGenerateNextQuestion from '@/hooks/questions/useGenerateNextQuestion';
import { activeChatState, useIntro } from '@/store/chats';

const useAnimateIntro = () => {
  const { intro, setIntro } = useIntro();

  const [animatingIntro, setAnimatingIntro] = useState(false);
  const delayBatFeedback = useDelayBatFeedback();
  const generateNextQuestion = useGenerateNextQuestion();
  const activeChat = useRecoilValue(activeChatState);

  useEffect(() => {
    if (animatingIntro && activeChat !== undefined) {
      setAnimatingIntro(false);
      console.log('animatingIntro');
      console.log('activeChat.intro:', activeChat.intro);
      console.log('intro:', intro);
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
      setAnimatingIntro(true);
    }
  };

  return animateIntro;
};

export default useAnimateIntro;
