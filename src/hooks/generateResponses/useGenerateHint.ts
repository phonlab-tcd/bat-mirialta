/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilValue } from 'recoil';

import useAnimateHints from '@/hooks/animate/useAnimateHints';
import { ResponseModel } from '@/models';
import { getHint, patchAdjacencyPairHint } from '@/services/supabase';
import { useAwaitingHint } from '@/store/adjacencyPairs';
import { currentAdjacencyPairState } from '@/store/adjacencyPairs';
import { useAvailablePoints } from '@/store/points';
import { currentQuestionState } from '@/store/questions';

const useGenerateHint = () => {
  const currentAdjacencyPair = useRecoilValue(currentAdjacencyPairState);
  // const hintsGiven = useRecoilValue(hintsGivenState);
  const { setAwaitingHint } = useAwaitingHint();
  const currentQuestion = useRecoilValue(currentQuestionState);
  const { availablePoints } = useAvailablePoints();

  const animateHints = useAnimateHints();

  const generateHint = () => {
    if (currentAdjacencyPair !== undefined && currentQuestion !== undefined) {
      setAwaitingHint(true);
      console.log('availablePoints: ', availablePoints);
      if (availablePoints === 3) {
        getHint('hard', currentQuestion.verb_id).then((hints) => {
          // console.log('hard hints:', hints);
          let correctLengthHints: string[] = [];
          if (hints !== undefined) {
            if (currentQuestion.text.includes('_ _')) {
              correctLengthHints = hints.filter(
                (h) => h.includes(' ') && h !== currentQuestion.answer,
              );
            } else {
              correctLengthHints = hints.filter(
                (h) => !h.includes(' ') && h !== currentQuestion.answer,
              );
            }

            let hintsToBeGiven = [];
            if (correctLengthHints.length > 6) {
              correctLengthHints.sort(() => (Math.random() > 0.5 ? 1 : -1));
              hintsToBeGiven = [currentQuestion.answer].concat(correctLengthHints.slice(0, 4));
            } else {
              hintsToBeGiven = [currentQuestion.answer].concat(correctLengthHints);
            }
            hintsToBeGiven.sort(() => (Math.random() > 0.5 ? 1 : -1));
            // console.log('hintsToBeGiven:', hintsToBeGiven);
            const hintToBeStored: ResponseModel[] = [
              {
                form: 'statement',
                text: hintsToBeGiven.join(', '),
              },
            ];
            patchAdjacencyPairHint(currentAdjacencyPair.id, hintToBeStored).then((a_p) => {
              animateHints(a_p);
            });
          }
        });
      } else if (availablePoints === 2) {
        getHint(
          'easy',
          currentQuestion.verb_id,
          currentQuestion.tense_id,
          currentQuestion.form_id,
        ).then((hints) => {
          if (hints !== undefined) {
            // console.log('easy hints:', hints);
            const hintsToBeGiven = hints;
            hintsToBeGiven.sort(() => (Math.random() > 0.5 ? 1 : -1));
            // console.log('hintsToBeGiven:', hintsToBeGiven);
            let hintToBeStored: ResponseModel[] = [
              {
                form: 'statement',
                text: hintsToBeGiven.join(', '),
              },
            ];
            if (currentAdjacencyPair.hints !== null) {
              hintToBeStored = currentAdjacencyPair.hints.concat(hintToBeStored);
            }

            patchAdjacencyPairHint(currentAdjacencyPair.id, hintToBeStored).then((a_p) => {
              animateHints(a_p);
            });
          }
        });
      }
    } else {
      alert('current adjacencyPair or currentQuestion is undefined');
    }
  };

  return generateHint;
};

export default useGenerateHint;
