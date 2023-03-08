/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { useAnimateIntro } from '@/hooks';
// import useGenerateNextQuestion from '@/hooks/questions/useGenerateNextQuestion';
import useGenerateFeedback from '@/hooks/useGenerateFeedback';
import { currentAdjacencyPairState } from '@/store/adjacencyPairs';

const useChatAdjacencyPairLogic = () => {
  const currentAdjacencyPair = useRecoilValue(currentAdjacencyPairState);
  // const generateNextQuestion = useGenerateNextQuestion();
  const animateIntro = useAnimateIntro();

  const generateFeedback = useGenerateFeedback();

  const chatAdjacencyPairLogic = () => {
    if (currentAdjacencyPair === undefined) {
      // start of chat session
      animateIntro();
    } else {
      if (currentAdjacencyPair.text !== null && currentAdjacencyPair.correct === null) {
        generateFeedback();
      }
    }
    return true;
  };

  return chatAdjacencyPairLogic;
};

export default useChatAdjacencyPairLogic;
