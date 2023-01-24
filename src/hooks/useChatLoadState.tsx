/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import useGenerateNextQuestion from '@/hooks/useGenerateNextQuestion';
import { getQuestion, getResponseCategories, getResponses } from '@/services/supabase';
import { currentAdjacencyPairState, useAdjacencyPairs } from '@/store/adjacencyPairs';
import { useSession } from '@/store/auth';
import { useQuestionSet, useQuestions } from '@/store/questions';
import { useResponseCategories, useResponses } from '@/store/responses';
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

import usePopulateQuestionSet from './usePopulateQuestionSet';
import usePopulateQuestions from './usePopulateQuestions';
import usePopulateVerbsTensesForms from './usePopulateVerbsTensesForms';

const useChatLoadState = () => {
  const currentAdjacencyPair = useRecoilValue(currentAdjacencyPairState);
  const tasksPopulated = useRecoilValue(tasksPopulatedState);
  const taskSelected = useRecoilValue(taskSelectedState);

  const populateQuestions = usePopulateQuestions();
  const populateQuestionSet = usePopulateQuestionSet();

  const { session } = useSession();
  const { setResponses } = useResponses();
  const { setResponseCategories } = useResponseCategories();

  const populateVerbsTensesForms = usePopulateVerbsTensesForms();

  const { adjacencyPairs } = useAdjacencyPairs();
  const { questions } = useQuestions();
  const { questionSet } = useQuestionSet();
  const generateNextQuestion = useGenerateNextQuestion();

  const { responses } = useResponses();
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

  useEffect(() => {
    if (tasksPopulated) {
      if (responses.length === 0) {
        getResponses().then((r) => {
          if (r !== undefined) {
            setResponses(r);
          }
        });
        getResponseCategories().then((r_c) => {
          if (r_c !== undefined) {
            setResponseCategories(r_c);
          }
        });
      }
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
          navigate('/qa/bat/');
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
      console.log('generating next question:', questionSet);
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
