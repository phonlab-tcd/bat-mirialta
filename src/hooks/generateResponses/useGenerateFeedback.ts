/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilValue } from 'recoil';

import { useGenerateResponseForCorrect, useGenerateResponseForIncorrect } from '@/hooks';
import useAnimateResponses from '@/hooks/animate/useAnimateResponses';
import { ResponseModel } from '@/models';
import { postError } from '@/services/error-check';
import { patchAdjacencyPairFeedback } from '@/services/supabase';
import { getHint } from '@/services/supabase';
import { currentAdjacencyPairState } from '@/store/adjacencyPairs';
import { useAvailablePoints } from '@/store/points';
import { currentQuestionState } from '@/store/questions';

const useGenerateFeedback = () => {
  const currentAdjacencyPair = useRecoilValue(currentAdjacencyPairState);
  const currentQuestion = useRecoilValue(currentQuestionState);
  const animateResponses = useAnimateResponses();
  const generateResponseForCorrect = useGenerateResponseForCorrect();
  const generateResponseForIncorrect = useGenerateResponseForIncorrect();
  const { availablePoints } = useAvailablePoints();

  const generateFeedback = () => {
    if (
      currentAdjacencyPair !== undefined &&
      currentAdjacencyPair.text !== null &&
      currentQuestion !== undefined
    ) {
      let responseObject: ResponseModel[] = [];
      const correct =
        currentAdjacencyPair.text.toLowerCase() === currentQuestion.answer.toLowerCase()
          ? true
          : false;
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
        getHint('hard', currentQuestion.verb_id).then((hints) => {
          postError(currentAdjacencyPair.text, currentQuestion.answer, hints).then(
            (errorData: any) => {
              // GENERATE RESPONSE OBJECT FROM ERROR DATA

              if (currentAdjacencyPair.text !== null) {
                responseObject = generateResponseForIncorrect(
                  currentAdjacencyPair.text,
                  currentQuestion.answer,
                  errorData,
                );
                console.log('availablePoints:', availablePoints);
                if (availablePoints <= 2) {
                  responseObject = [
                    { text: 'níl sé ceart', form: 'statement' },
                    { text: `the correct answer is ${currentQuestion.answer}`, form: 'statement' },
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
            },
          );
        });
      }
    } else {
      alert('current adjacencyPair is undefined');
    }
  };

  return generateFeedback;
};

export default useGenerateFeedback;
