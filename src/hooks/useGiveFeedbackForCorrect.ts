/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilValue } from 'recoil';

import { patchAdjacencyPairResponse } from '@/services/supabase';
import { currentAdjacencyPairState, useAdjacencyPairs } from '@/store/adjacencyPairs';
import { useResponses } from '@/store/responses';
import { replaceFinalAdjacencyPair } from '@/store/utils';

const useGiveFeedbackForCorrect = () => {
  const { responses } = useResponses();
  const currentAdjacencyPair = useRecoilValue(currentAdjacencyPairState);

  const { adjacencyPairs, setAdjacencyPairs } = useAdjacencyPairs();

  const GiveFeedbackForCorrect = () => {
    if (currentAdjacencyPair !== undefined) {
      const correctResponses = responses.filter((r) => r.category === 1);
      const randomCorrectResponse =
        correctResponses[Math.floor(Math.random() * correctResponses.length)];
      patchAdjacencyPairResponse(currentAdjacencyPair.id, randomCorrectResponse.id).then((a_p) => {
        setAdjacencyPairs(replaceFinalAdjacencyPair(adjacencyPairs, a_p));
      });
    } else {
      alert('current adjacencyPair is undefined');
    }
  };

  return GiveFeedbackForCorrect;
};

export default useGiveFeedbackForCorrect;
