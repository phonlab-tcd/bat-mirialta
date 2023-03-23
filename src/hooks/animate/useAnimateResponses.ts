/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { useUpdatePoints } from '@/hooks';
import { useAnimateOutro } from '@/hooks';
import useDelayBatFeedback from '@/hooks/animate/useDelayBatFeedback';
import useGenerateNextQuestion from '@/hooks/questions/useGenerateNextQuestion';
import { ResponseModel } from '@/models';
import { currentAdjacencyPairState, useAdjacencyPairs } from '@/store/adjacencyPairs';
import { useAnimatingResponses } from '@/store/animate';
import { activeChatState } from '@/store/chats';
import { useShowAvailablePoints } from '@/store/points';
import { replaceFinalObject } from '@/store/utils';
import {
  updateCorrectionInFinalAdjacencyPair,
  updateResponsesInFinalAdjacencyPair,
} from '@/store/utils';

import { Database } from '../../../types/supabase';

const useAnimateResponses = () => {
  const { adjacencyPairs, setAdjacencyPairs } = useAdjacencyPairs();
  const currentAdjacencyPair = useRecoilValue(currentAdjacencyPairState);
  const { setAnimatingResponses } = useAnimatingResponses();
  const [animatingSingleResponse, setAnimatingSingleResponse] = useState(false);
  const [responses, setResponses] = useState<ResponseModel[]>([]);
  const delayBatFeedback = useDelayBatFeedback();
  const generateNextQuestion = useGenerateNextQuestion();
  const updatePoints = useUpdatePoints();
  const { setShowAvailablePoints } = useShowAvailablePoints();
  const animateOutro = useAnimateOutro();
  const activeChat = useRecoilValue(activeChatState);

  useEffect(() => {
    if (activeChat !== undefined && animatingSingleResponse && currentAdjacencyPair !== undefined) {
      setAnimatingSingleResponse(false);

      if (currentAdjacencyPair.response.length < responses.length) {
        const updatedAdjacencyPair = updateResponsesInFinalAdjacencyPair(
          responses.slice(0, currentAdjacencyPair.response.length + 1),
          currentAdjacencyPair,
        );
        const updatedAdjacencyPairs = replaceFinalObject(adjacencyPairs, updatedAdjacencyPair);

        delayBatFeedback(
          () => {
            setAdjacencyPairs(updatedAdjacencyPairs);
            setAnimatingSingleResponse(true);
            if (currentAdjacencyPair.response.length === 0) {
              updatePoints();
              if (currentAdjacencyPair.correct) {
                setShowAvailablePoints(false);
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
            (!currentAdjacencyPair.correct && currentAdjacencyPair.retry_attempt === 2) ||
            (currentAdjacencyPair.correct === false &&
              Array.isArray(currentAdjacencyPair.hints) &&
              currentAdjacencyPair.retry_attempt + currentAdjacencyPair.hints.length === 2))
        ) {
          // finish the current chat
          animateOutro();
        } else {
          delayBatFeedback(
            () => {
              console.log('AnimateResponses calling generateNextQuestion');
              updatePoints();
              setAnimatingResponses(false);
              generateNextQuestion();
              setShowAvailablePoints(true);
            },
            2000,
            true,
          );
        }
      }
    }
  }, [animatingSingleResponse]);

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
      setAnimatingSingleResponse(true);
    }
  };

  return animateResponses;
};

export default useAnimateResponses;
