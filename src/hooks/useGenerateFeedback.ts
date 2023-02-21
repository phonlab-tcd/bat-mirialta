/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilValue } from 'recoil';

import useAnimateResponses from '@/hooks/useAnimateResponses';
import { ResponseModel } from '@/models';
import { postError } from '@/services/error-check';
import { patchAdjacencyPairFeedback } from '@/services/supabase';
import { currentAdjacencyPairState } from '@/store/adjacencyPairs';
import { currentQuestionState } from '@/store/questions';

const useGenerateFeedback = () => {
  const currentAdjacencyPair = useRecoilValue(currentAdjacencyPairState);
  const currentQuestion = useRecoilValue(currentQuestionState);
  const animateResponses = useAnimateResponses();

  const correctResponses = ['ceart', 'foirfe'];
  const incorrectResponses = ['níl se ceart', 'mícheart'];

  const correctFollowUp = ['maith thú', 'tá tú iontach'];
  const incorrectFollowUp = ['...', '...'];

  const generateFeedback = () => {
    if (
      currentAdjacencyPair !== undefined &&
      currentAdjacencyPair.text !== null &&
      currentQuestion !== undefined
    ) {
      let responseObject: ResponseModel[] = [];
      const correct = currentAdjacencyPair.text === currentQuestion.answer ? true : false;

      if (correct) {
        responseObject = [
          {
            text: correctResponses[Math.floor(Math.random() * correctResponses.length)],
            form: 'statement',
          },
          {
            text: correctFollowUp[Math.floor(Math.random() * correctFollowUp.length)],
            form: 'statement',
          },
        ];
        patchAdjacencyPairFeedback(currentAdjacencyPair.id, correct, null, responseObject).then(
          (a_p) => {
            animateResponses(a_p);
          },
        );
      } else {
        postError(currentAdjacencyPair.text, currentQuestion.answer).then((errorData: any) => {
          // GENERATE RESPONSE OBJECT FROM ERROR DATA

          responseObject = [
            {
              text: incorrectResponses[Math.floor(Math.random() * incorrectResponses.length)],
              form: 'statement',
            },
            {
              text: incorrectFollowUp[Math.floor(Math.random() * incorrectFollowUp.length)],
              form: 'statement',
            },
          ];

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
