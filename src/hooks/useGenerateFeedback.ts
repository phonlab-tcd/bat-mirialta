/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilValue } from 'recoil';

import useAnimateResponses from '@/hooks/animate/useAnimateResponses';
import { ResponseModel } from '@/models';
import { postError } from '@/services/error-check';
import { patchAdjacencyPairFeedback } from '@/services/supabase';
import { currentAdjacencyPairState } from '@/store/adjacencyPairs';
import { useAvailablePoints } from '@/store/points';
import { currentQuestionState } from '@/store/questions';
import { generateResponseForCorrect, generateResponseForIncorrect } from '@/utils/feedback';

const useGenerateFeedback = () => {
  const currentAdjacencyPair = useRecoilValue(currentAdjacencyPairState);
  const currentQuestion = useRecoilValue(currentQuestionState);
  const animateResponses = useAnimateResponses();
  const { availablePoints } = useAvailablePoints();

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
        console.log('availablePoints:', availablePoints);

        postError(currentAdjacencyPair.text, currentQuestion.answer).then((errorData: any) => {
          // GENERATE RESPONSE OBJECT FROM ERROR DATA

          if (currentAdjacencyPair.text !== null) {
            responseObject = generateResponseForIncorrect(
              currentAdjacencyPair.text,
              currentQuestion.answer,
              errorData,
            );
            if (availablePoints === 1) {
              responseObject = [
                { text: 'níl sé ceart', form: 'statement' },
                { text: `the correct answer is ${currentQuestion.answer}`, form: 'statement' },
                { text: `on to the next question`, form: 'statement' },
              ];
            }
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
