/* eslint-disable react-hooks/exhaustive-deps */
import { getQuestions } from '@/services/supabase';
import { useAdjacencyPairs } from '@/store/adjacencyPairs';
import { useQuestions } from '@/store/questions';

function usePopulateQuestions() {
  const { adjacencyPairs } = useAdjacencyPairs();
  const { setQuestions } = useQuestions();

  const populateQuestions = () => {
    const questionIDs = adjacencyPairs.map((aP) => aP.question_id);
    const uniqueQuestionIDs = Array.from(new Set(questionIDs));
    getQuestions(uniqueQuestionIDs as number[]).then((q) => {
      if (q !== undefined) {
        setQuestions(q);
      } else {
        console.log('questions undefined');
      }
    });
  };

  return populateQuestions;
}

export default usePopulateQuestions;
