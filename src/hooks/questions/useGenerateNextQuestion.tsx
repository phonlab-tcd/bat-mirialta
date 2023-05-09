/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilValue } from 'recoil';

import { postAdjacencyPair } from '@/services/supabase';
import { currentAdjacencyPairState, useAdjacencyPairs } from '@/store/adjacencyPairs';
import { useSession } from '@/store/auth';
import { activeChatState } from '@/store/chats';
import { useAvailablePoints } from '@/store/points';
import { currentQuestionIndexState } from '@/store/questions';
import { useQuestions } from '@/store/questions';

const verbs: { [key: number]: string } = {
  1: 'abair',
  2: 'beir',
  3: 'bí',
  4: 'clois',
  5: 'déan',
  6: 'faigh',
  7: 'feic',
  8: 'ith',
  9: 'tabhair',
  10: 'tar',
  11: 'téigh',
};

const tenses: { [key: number]: string } = {
  1: 'aimsir chaite',
  2: 'aimsir láithreach',
  3: 'aimsir fháisineach',
  4: 'modh coinníolach',
};

const forms: { [key: number]: string } = {
  1: 'ráitis',
  2: 'diúltach',
  3: 'briathar saor',
  4: 'ceisteach',
  5: 'spleach',
  6: 'coibhneasta',
  7: 'ceisteanna breise',
};

const useGenerateNextQuestion = () => {
  const { adjacencyPairs, setAdjacencyPairs } = useAdjacencyPairs();
  const currentAdjacencyPair = useRecoilValue(currentAdjacencyPairState);
  const currentQuestionIndex = useRecoilValue(currentQuestionIndexState);
  const { session } = useSession();
  const activeChat = useRecoilValue(activeChatState);
  const { availablePoints } = useAvailablePoints();
  const { questions } = useQuestions();

  const determineRepeatForNewAdjacencyPair = () => {
    if (currentAdjacencyPair === undefined) {
      return 0;
    } else if (currentAdjacencyPair.correct) {
      return 0;
    } else if (availablePoints <= 0) {
      return 0;
    } else if (!currentAdjacencyPair.correct) {
      return currentAdjacencyPair.retry_attempt + 1;
    }
  };

  const generateNextQuestion = () => {
    if (session !== null && activeChat !== undefined) {
      // if wrong, ask again with retry_attempt iterated

      let questionID: number | undefined;
      let repeat;
      if (currentAdjacencyPair === undefined) {
        questionID = activeChat.questions[0];
        repeat = 0;
      } else {
        if (currentQuestionIndex !== undefined) {
          repeat = determineRepeatForNewAdjacencyPair();
          if (repeat === 0) {
            // generate new question

            questionID = activeChat.questions[currentQuestionIndex + 1];
          } else {
            // same question repeated
            questionID = activeChat.questions[currentQuestionIndex];
          }
        } else {
          console.log('currentQuestionIndex is undefined');
        }
      }

      if (questionID !== undefined && repeat !== undefined) {
        let verbTenseFormInfo = '';
        const curQuestion = questions.find((q) => q.id === questionID);
        if (curQuestion !== undefined) {
          if (activeChat.verb === null) {
            verbTenseFormInfo += verbs[curQuestion.verb_id];
          }
          if (activeChat.tense === null) {
            if (verbTenseFormInfo === '') {
              verbTenseFormInfo += tenses[curQuestion.tense_id];
            } else {
              verbTenseFormInfo += `, ${tenses[curQuestion.tense_id]}`;
            }
          }
          if (activeChat.form === null) {
            if (verbTenseFormInfo === '') {
              verbTenseFormInfo += forms[curQuestion.form_id];
            } else {
              verbTenseFormInfo += `, ${forms[curQuestion.form_id]}`;
            }
          }
        }
        postAdjacencyPair(
          session.user.id,
          activeChat.id,
          questionID,
          repeat,
          verbTenseFormInfo,
        ).then((a_p) => {
          setAdjacencyPairs([...adjacencyPairs, a_p]);
        });
      } else {
        console.log('questionID or repeat is undefined');
      }
    } else {
      alert('session is null');
    }
    return true;
  };

  return generateNextQuestion;
};

export default useGenerateNextQuestion;
