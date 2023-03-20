/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { useAnimateIntro } from '@/hooks';
import { useUpdatePoints } from '@/hooks';
import { useGenerateFeedback } from '@/hooks';
import { currentAdjacencyPairState } from '@/store/adjacencyPairs';

const useChatAdjacencyPairLogic = () => {
  const currentAdjacencyPair = useRecoilValue(currentAdjacencyPairState);
  const animateIntro = useAnimateIntro();
  const updatePoints = useUpdatePoints();
  const [calledIntro, setCalledIntro] = useState(false);
  const generateFeedback = useGenerateFeedback();

  const chatAdjacencyPairLogic = () => {
    if (currentAdjacencyPair === undefined) {
      if (!calledIntro) {
        // start of chat session
        setCalledIntro(true);
        console.log('calling animateIntro from chatAdjacencyPairLogic');
        animateIntro();
      } else {
        console.log('already called intro');
      }
    } else {
      console.log('currentAdjacencyPair:', currentAdjacencyPair);
      if (currentAdjacencyPair.text !== null && currentAdjacencyPair.correct === null) {
        generateFeedback();
      } else if (currentAdjacencyPair.text === null) {
        updatePoints();
      }
    }
    return true;
  };

  return chatAdjacencyPairLogic;
};

export default useChatAdjacencyPairLogic;
