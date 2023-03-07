/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import useGenerateNextQuestion from '@/hooks/questions/useGenerateNextQuestion';
import useGenerateFeedback from '@/hooks/useGenerateFeedback';
import { currentAdjacencyPairState } from '@/store/adjacencyPairs';

const useChatAdjacencyPairLogic = () => {
  const currentAdjacencyPair = useRecoilValue(currentAdjacencyPairState);
  const generateNextQuestion = useGenerateNextQuestion();

  const generateFeedback = useGenerateFeedback();

  const chatAdjacencyPairLogic = () => {
    if (currentAdjacencyPair === undefined) {
      // start of chat session
      console.log('in chatAdjacencyPairLogic, generating next question');
      generateNextQuestion();
    } else {
      if (currentAdjacencyPair.text !== null && currentAdjacencyPair.correct === null) {
        console.log('generating feedback');
        generateFeedback();
      }
    }
    return true;
  };

  return chatAdjacencyPairLogic;
};

export default useChatAdjacencyPairLogic;
