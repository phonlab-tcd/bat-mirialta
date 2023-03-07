/* eslint-disable react-hooks/exhaustive-deps */
import { getQuestionSet } from '@/services/supabase';
import { useQuestionSet } from '@/store/questions';
import {
  useForms,
  useSelectedForm,
  useSelectedTense,
  useSelectedVerb,
  useTenses,
  useVerbs,
} from '@/store/scripts';

function usePopulateQuestionSet() {
  const { selectedVerb } = useSelectedVerb();
  const { selectedTense } = useSelectedTense();
  const { selectedForm } = useSelectedForm();
  const { setQuestionSet } = useQuestionSet();
  const { verbs } = useVerbs();
  const { tenses } = useTenses();
  const { forms } = useForms();
  const populateQuestionSet = () => {
    const verbIDs = selectedVerb !== undefined ? [selectedVerb.id] : verbs.map((verb) => verb.id);
    const tenseIDs =
      selectedTense !== undefined ? [selectedTense.id] : tenses.map((verb) => verb.id);
    const formIDs = selectedForm !== undefined ? [selectedForm.id] : forms.map((verb) => verb.id);

    getQuestionSet(verbIDs, tenseIDs, formIDs).then((q_s) => {
      console.log('q_s:', q_s);
      if (q_s !== undefined) {
        setQuestionSet(q_s.map((q) => q.id));
      } else {
        console.log('question set undefined');
      }
    });
  };

  return populateQuestionSet;
}

export default usePopulateQuestionSet;
