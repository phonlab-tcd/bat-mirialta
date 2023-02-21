/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilValue } from 'recoil';

import useAnimateResponses from '@/hooks/useAnimateResponses';
import { ResponseModel } from '@/models';
import { postError } from '@/services/error-check';
import { patchAdjacencyPairFeedback } from '@/services/supabase';
import { currentAdjacencyPairState } from '@/store/adjacencyPairs';
import { currentQuestionState } from '@/store/questions';
import { generateResponseForCorrect, generateResponseForIncorrect } from '@/utils/feedback';

const useGenerateFeedback = () => {
  const currentAdjacencyPair = useRecoilValue(currentAdjacencyPairState);
  const currentQuestion = useRecoilValue(currentQuestionState);
  const animateResponses = useAnimateResponses();

  const generateFeedback = () => {
    if (
      currentAdjacencyPair !== undefined &&
      currentAdjacencyPair.text !== null &&
      currentQuestion !== undefined
    ) {
      let responseObject: ResponseModel[] = [];
      const correct = currentAdjacencyPair.text === currentQuestion.answer ? true : false;

      if (correct) {
        responseObject = generateResponseForCorrect(
          currentAdjacencyPair.text,
          currentQuestion.answer,
        );
        patchAdjacencyPairFeedback(currentAdjacencyPair.id, correct, null, responseObject).then(
          (a_p) => {
            animateResponses(a_p);
          },
        );
      } else {
        postError(currentAdjacencyPair.text, currentQuestion.answer).then((errorData: any) => {
          // GENERATE RESPONSE OBJECT FROM ERROR DATA
          if (currentAdjacencyPair.text !== null) {
            responseObject = generateResponseForIncorrect(
              currentAdjacencyPair.text,
              currentQuestion.answer,
              errorData,
            );
          }

          patchAdjacencyPairFeedback(
            currentAdjacencyPair.id,
            correct,
            errorData,
            responseObject,
          ).then((a_p) => {
            animateResponses(a_p);
          });
        });
      }
    } else {
      alert('current adjacencyPair is undefined');
    }
  };

  return generateFeedback;
};

export default useGenerateFeedback;
