/* eslint-disable react-hooks/exhaustive-deps */
import {
  getAvailableForms,
  getAvailableTenses,
  getAvailableVerbs,
  getForms,
  getTenses,
  getVerbs,
} from '@/services/supabase';
import {
  useAvailableFormIDs,
  useAvailableTenseIDs,
  useAvailableVerbIDs,
  useForms,
  useTenses,
  useVerbs,
} from '@/store/scripts';

function usePopulateVerbsTensesForms() {
  const { setVerbs } = useVerbs();
  const { setTenses } = useTenses();
  const { setForms } = useForms();
  const { setAvailableVerbIDs } = useAvailableVerbIDs();
  const { setAvailableTenseIDs } = useAvailableTenseIDs();
  const { setAvailableFormIDs } = useAvailableFormIDs();

  const populateVerbsTensesForms = () => {
    getVerbs().then((v) => {
      if (v !== undefined) {
        setVerbs(v);
      } else {
        alert('v is undefined');
      }
    });
    getTenses().then((t) => {
      if (t !== undefined) {
        setTenses(t);
      } else {
        alert('t is undefined');
      }
    });
    getForms().then((f) => {
      if (f !== undefined) {
        setForms(f);
      } else {
        alert('f is undefined');
      }
    });
    getAvailableVerbs(undefined, undefined).then((verbs) => {
      if (verbs !== undefined) {
        setAvailableVerbIDs(verbs);
      }
    });
    getAvailableTenses(undefined, undefined).then((tenses) => {
      if (tenses !== undefined) {
        setAvailableTenseIDs(tenses);
      }
    });
    getAvailableForms(undefined, undefined).then((forms) => {
      if (forms !== undefined) {
        setAvailableFormIDs(forms);
      }
    });
  };

  return populateVerbsTensesForms;
}

export default usePopulateVerbsTensesForms;
