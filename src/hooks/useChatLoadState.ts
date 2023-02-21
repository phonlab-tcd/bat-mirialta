/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { basePath } from '@/config';
import useGenerateNextQuestion from '@/hooks/questions/useGenerateNextQuestion';
import usePopulateQuestionSet from '@/hooks/questions/usePopulateQuestionSet';
import usePopulateQuestions from '@/hooks/questions/usePopulateQuestions';
import usePopulateVerbsTensesForms from '@/hooks/tasks/usePopulateVerbsTensesForms';
import { getQuestion } from '@/services/supabase';
import { currentAdjacencyPairState, useAdjacencyPairs } from '@/store/adjacencyPairs';
import { useSession } from '@/store/auth';
import { useQuestionSet, useQuestions } from '@/store/questions';
import {
  taskSelectedState,
  tasksPopulatedState,
  useForms,
  useSelectedForm,
  useSelectedTense,
  useSelectedVerb,
  useTenses,
  useVerbs,
} from '@/store/scripts';

const useChatLoadState = () => {
  const currentAdjacencyPair = useRecoilValue(currentAdjacencyPairState);
  const tasksPopulated = useRecoilValue(tasksPopulatedState);
  const taskSelected = useRecoilValue(taskSelectedState);

  const populateQuestions = usePopulateQuestions();
  const populateQuestionSet = usePopulateQuestionSet();

  const { session } = useSession();

  const populateVerbsTensesForms = usePopulateVerbsTensesForms();

  const { adjacencyPairs } = useAdjacencyPairs();
  const { questions } = useQuestions();
  const { questionSet } = useQuestionSet();
  const generateNextQuestion = useGenerateNextQuestion();

  const { verbs } = useVerbs();
  const { tenses } = useTenses();
  const { forms } = useForms();
  const { setSelectedVerb } = useSelectedVerb();
  const { setSelectedTense } = useSelectedTense();
  const { setSelectedForm } = useSelectedForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (taskSelected && questionSet.length === 0) {
      populateQuestionSet();
    }
  }, [taskSelected]);

  // runs when verb, tense and form are all selected
  useEffect(() => {
    if (tasksPopulated) {
      if (adjacencyPairs.length !== 0) {
        if (questions.length === 0 && currentAdjacencyPair !== undefined) {
          getQuestion(currentAdjacencyPair.question_id).then((q) => {
            setSelectedVerb(verbs.find((v) => v.id === q.verb_id));
            setSelectedTense(tenses.find((v) => v.id === q.tense_id));
            setSelectedForm(forms.find((v) => v.id === q.form_id));
          });
          populateQuestions();
        }
      } else {
        if (!taskSelected) {
          navigate(`${basePath}`);
        }
      }
    }
  }, [tasksPopulated]);

  useEffect(() => {
    if (
      adjacencyPairs.length === 0 &&
      currentAdjacencyPair === undefined &&
      session !== null &&
      questionSet.length !== 0
    ) {
      console.log('generating next question in ChatLoadState:', questionSet);
      generateNextQuestion();
    }
  }, [questionSet]);

  const chatLoadState = () => {
    // loads verbs tenses and forms if not done already.
    if (!tasksPopulated) {
      populateVerbsTensesForms();
    }

    return true;
  };

  return chatLoadState;
};

export default useChatLoadState;
