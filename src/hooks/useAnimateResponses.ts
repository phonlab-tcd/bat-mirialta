/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import useGenerateNextQuestion from '@/hooks/questions/useGenerateNextQuestion';
import { ResponseModel } from '@/models';
import { useAdjacencyPairs } from '@/store/adjacencyPairs';
import { currentAdjacencyPairState } from '@/store/adjacencyPairs';
import { replaceFinalAdjacencyPair } from '@/store/utils';
import {
  updateCorrectionInFinalAdjacencyPair,
  updateResponsesInFinalAdjacencyPair,
} from '@/store/utils';

import { Database } from '../../types/supabase';
import useDelayBatFeedback from './useDelayBatFeedback';

const useAnimateResponses = () => {
  const { adjacencyPairs, setAdjacencyPairs } = useAdjacencyPairs();
  const currentAdjacencyPair = useRecoilValue(currentAdjacencyPairState);
  const [animatingResponses, setAnimatingResponses] = useState(false);
  const [responses, setResponses] = useState<ResponseModel[]>([]);
  const delayBatFeedback = useDelayBatFeedback();
  const generateNextQuestion = useGenerateNextQuestion();

  useEffect(() => {
    if (animatingResponses && currentAdjacencyPair !== undefined) {
      setAnimatingResponses(false);

      if (currentAdjacencyPair.response.length < responses.length) {
        const updatedAdjacencyPair = updateResponsesInFinalAdjacencyPair(
          responses.slice(0, currentAdjacencyPair.response.length + 1),
          currentAdjacencyPair,
        );
        const updatedAdjacencyPairs = replaceFinalAdjacencyPair(
          adjacencyPairs,
          updatedAdjacencyPair,
        );

        delayBatFeedback(
          () => {
            setAdjacencyPairs(updatedAdjacencyPairs);
            setAnimatingResponses(true);
          },
          2000,
          false,
        );
      } else if (currentAdjacencyPair.response.length === responses.length) {
        delayBatFeedback(
          () => {
            generateNextQuestion();
          },
          2000,
          true,
        );
      }
    }
  }, [animatingResponses]);

  const animateResponses = (a_p: Database['public']['Tables']['bat_adjacency_pairs']['Row']) => {
    if (currentAdjacencyPair && a_p.correct !== null) {
      const updatedCorrection = updateCorrectionInFinalAdjacencyPair(
        a_p.correct,
        a_p.error_data,
        currentAdjacencyPair,
      );
      setAdjacencyPairs(replaceFinalAdjacencyPair(adjacencyPairs, updatedCorrection));
      setResponses(a_p.response);
      setAnimatingResponses(true);
    }
  };

  return animateResponses;
};

export default useAnimateResponses;
