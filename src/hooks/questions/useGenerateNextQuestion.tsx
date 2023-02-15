/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilValue } from 'recoil';

import { postAdjacencyPair } from '@/services/supabase';
import { currentAdjacencyPairState, useAdjacencyPairs } from '@/store/adjacencyPairs';
import { useSession } from '@/store/auth';
import { currentQuestionState, useQuestionSet, useQuestions } from '@/store/questions';

const useGenerateNextQuestion = () => {
  const { questions, setQuestions } = useQuestions();
  const { questionSet } = useQuestionSet();
  const { adjacencyPairs, setAdjacencyPairs } = useAdjacencyPairs();
  const currentAdjacencyPair = useRecoilValue(currentAdjacencyPairState);
  const currentQuestion = useRecoilValue(currentQuestionState);
  const { session } = useSession();

  const calcQuestionIDsAskedThisSet = () => {
    if (adjacencyPairs.length === 0) {
      return [];
    } else {
      const questionIDsAskedThisSetTemp = [];
      let inCurrentQuestionSet = true;
      let i = adjacencyPairs.length - 1;
      while (inCurrentQuestionSet) {
        const foundQuestion = questionSet.find((q) => q.id === adjacencyPairs[i].question_id);
        if (foundQuestion !== undefined) {
          questionIDsAskedThisSetTemp.push(foundQuestion.id);
          if (i > 0) {
            i -= 1;
          } else {
            inCurrentQuestionSet = false;
          }
        } else {
          inCurrentQuestionSet = false;
        }
      }
      return questionIDsAskedThisSetTemp;
    }
  };

  const getUnaskedQuestionsSet = (askedIDs: number[]) => {
    return questionSet.filter((qS) => !askedIDs.includes(qS.id));
  };

  const determineRepeatForNewAdjacencyPair = () => {
    if (currentAdjacencyPair === undefined) {
      return 0;
    } else if (currentAdjacencyPair.correct) {
      return 0;
    } else {
      return currentAdjacencyPair.retry_attempt + 1;
    }
  };

  const generateNextQuestion = () => {
    if (session !== null) {
      // if wrong, ask again with retry_attempt iterated
      const repeat = determineRepeatForNewAdjacencyPair();
      if (repeat === 0) {
        // generate new question from set
        // check how many questions of this set have been asked
        const questionIDsAskedThisSet = calcQuestionIDsAskedThisSet();
        const unaskedQuestionsSet = getUnaskedQuestionsSet(questionIDsAskedThisSet);
        if (unaskedQuestionsSet.length === 0) {
          alert('all questions in this set asked');
        } else {
          const randomQuestion =
            unaskedQuestionsSet[Math.floor(Math.random() * unaskedQuestionsSet.length)];

          postAdjacencyPair(session.user.id, randomQuestion.id, repeat).then((a_p) => {
            setAdjacencyPairs([...adjacencyPairs, a_p]);
            setQuestions([...questions, randomQuestion]);
          });
        }
      } else {
        //ask same question
        if (currentQuestion !== undefined) {
          postAdjacencyPair(session.user.id, currentQuestion.id, repeat).then((a_p) => {
            setAdjacencyPairs([...adjacencyPairs, a_p]);
            setQuestions([...questions, currentQuestion]);
          });
        } else {
          alert('currentQuestion is undefined');
        }
      }
    } else {
      alert('session is null');
    }
    return true;
  };

  return generateNextQuestion;
};

export default useGenerateNextQuestion;
