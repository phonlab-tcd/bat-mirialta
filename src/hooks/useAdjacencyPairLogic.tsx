/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import useGenerateNextQuestion from '@/hooks/questions/useGenerateNextQuestion';
import useDelayBatFeedback from '@/hooks/useDelayBatFeedback';
import useGiveFeedbackForCorrect from '@/hooks/useGiveFeedbackForCorrect';
import useGiveFeedbackForIncorrect from '@/hooks/useGiveFeedbackForIncorrect';
import { currentAdjacencyPairState } from '@/store/adjacencyPairs';

const useChatAdjacencyPairLogic = () => {
  const currentAdjacencyPair = useRecoilValue(currentAdjacencyPairState);
  const generateNextQuestion = useGenerateNextQuestion();
  const giveFeedbackForCorrect = useGiveFeedbackForCorrect();
  const giveFeedbackForIncorrect = useGiveFeedbackForIncorrect();
  const delayBatFeedback = useDelayBatFeedback();

  const chatAdjacencyPairLogic = () => {
    if (currentAdjacencyPair !== undefined) {
      if (currentAdjacencyPair.response_id !== null) {
        delayBatFeedback(generateNextQuestion, 3000, true);
      } else {
        if (currentAdjacencyPair.text !== null && currentAdjacencyPair.correct !== null) {
          if (currentAdjacencyPair.correct) {
            delayBatFeedback(giveFeedbackForCorrect, 1000, false);
          } else {
            delayBatFeedback(giveFeedbackForIncorrect, 1000, false);
          }
        }
      }
    }
    return true;
  };

  return chatAdjacencyPairLogic;
};

export default useChatAdjacencyPairLogic;
