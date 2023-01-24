/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilValue } from 'recoil';

import { patchAdjacencyPairResponse } from '@/services/supabase';
import { currentAdjacencyPairState, useAdjacencyPairs } from '@/store/adjacencyPairs';
import { useResponses } from '@/store/responses';
import { replaceFinalAdjacencyPair } from '@/store/utils';

const useGiveFeedbackForIncorrect = () => {
  const { responses } = useResponses();
  const currentAdjacencyPair = useRecoilValue(currentAdjacencyPairState);

  const { adjacencyPairs, setAdjacencyPairs } = useAdjacencyPairs();

  const GiveFeedbackForIncorrect = () => {
    if (currentAdjacencyPair !== undefined) {
      console.log('responses:', responses);
      const incorrectResponses = responses.filter((r) => r.category === 2);
      const randomIncorrectResponse =
        incorrectResponses[Math.floor(Math.random() * incorrectResponses.length)];
      patchAdjacencyPairResponse(currentAdjacencyPair.id, randomIncorrectResponse.id).then(
        (a_p) => {
          setAdjacencyPairs(replaceFinalAdjacencyPair(adjacencyPairs, a_p));
        },
      );
    } else {
      alert('current adjacencyPair is undefined');
    }
  };

  return GiveFeedbackForIncorrect;
};

export default useGiveFeedbackForIncorrect;
