/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { useUpdatePoints } from '@/hooks';
import { useAnimateOutro } from '@/hooks';
import useDelayBatFeedback from '@/hooks/animate/useDelayBatFeedback';
import useGenerateNextQuestion from '@/hooks/questions/useGenerateNextQuestion';
import { ResponseModel } from '@/models';
import { useAdjacencyPairs } from '@/store/adjacencyPairs';
import { currentAdjacencyPairState } from '@/store/adjacencyPairs';
import { activeChatState } from '@/store/chats';
import { useShowAvailablePoints, useShowHint } from '@/store/points';
import { replaceFinalObject } from '@/store/utils';
import {
  updateCorrectionInFinalAdjacencyPair,
  updateResponsesInFinalAdjacencyPair,
} from '@/store/utils';

import { Database } from '../../../types/supabase';

const useAnimateResponses = () => {
  const { adjacencyPairs, setAdjacencyPairs } = useAdjacencyPairs();
  const currentAdjacencyPair = useRecoilValue(currentAdjacencyPairState);
  const [animatingResponses, setAnimatingResponses] = useState(false);
  const [responses, setResponses] = useState<ResponseModel[]>([]);
  const delayBatFeedback = useDelayBatFeedback();
  const generateNextQuestion = useGenerateNextQuestion();
  const updatePoints = useUpdatePoints();
  const { setShowAvailablePoints } = useShowAvailablePoints();
  const { setShowHint } = useShowHint();
  const animateOutro = useAnimateOutro();
  const activeChat = useRecoilValue(activeChatState);

  useEffect(() => {
    if (activeChat !== undefined && animatingResponses && currentAdjacencyPair !== undefined) {
      setAnimatingResponses(false);

      if (currentAdjacencyPair.response.length < responses.length) {
        const updatedAdjacencyPair = updateResponsesInFinalAdjacencyPair(
          responses.slice(0, currentAdjacencyPair.response.length + 1),
          currentAdjacencyPair,
        );
        const updatedAdjacencyPairs = replaceFinalObject(adjacencyPairs, updatedAdjacencyPair);

        delayBatFeedback(
          () => {
            setAdjacencyPairs(updatedAdjacencyPairs);
            setAnimatingResponses(true);
            if (currentAdjacencyPair.response.length === 0) {
              updatePoints();
              if (currentAdjacencyPair.correct) {
                setShowAvailablePoints(false);
                setShowHint(false);
              }
            }
          },
          2000,
          false,
        );
      } else if (currentAdjacencyPair.response.length === responses.length) {
        // check if all questions complete
        if (
          currentAdjacencyPair.question_id ===
            activeChat.questions[activeChat.questions.length - 1] &&
          (currentAdjacencyPair.correct ||
            (!currentAdjacencyPair.correct && currentAdjacencyPair.retry_attempt === 2))
        ) {
          // finish the current chat
          animateOutro();
        } else {
          delayBatFeedback(
            () => {
              console.log('AnimateResponses calling generateNextQuestion');

              generateNextQuestion();
              setShowAvailablePoints(true);
            },
            2000,
            true,
          );
        }
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
      setAdjacencyPairs(replaceFinalObject(adjacencyPairs, updatedCorrection));
      setResponses(a_p.response);
      setAnimatingResponses(true);
    }
  };

  return animateResponses;
};

export default useAnimateResponses;
