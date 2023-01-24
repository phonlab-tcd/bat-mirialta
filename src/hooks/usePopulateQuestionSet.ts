/* eslint-disable react-hooks/exhaustive-deps */
import { getQuestionSet } from '@/services/supabase';
import { useQuestionSet } from '@/store/questions';
import { useSelectedForm, useSelectedTense, useSelectedVerb } from '@/store/scripts';

function usePopulateQuestionSet() {
  const { selectedVerb } = useSelectedVerb();
  const { selectedTense } = useSelectedTense();
  const { selectedForm } = useSelectedForm();
  const { setQuestionSet } = useQuestionSet();

  const populateQuestionSet = () => {
    if (selectedVerb !== undefined && selectedTense !== undefined && selectedForm !== undefined) {
      getQuestionSet(selectedVerb.id, selectedTense.id, selectedForm.id).then((q_s) => {
        if (q_s !== undefined) {
          setQuestionSet(q_s);
        } else {
          console.log('question set undefined');
        }
      });
    }
  };

  return populateQuestionSet;
}

export default usePopulateQuestionSet;
