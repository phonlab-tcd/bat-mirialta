/* eslint-disable react-hooks/exhaustive-deps */
import { getForms, getTenses, getVerbs } from '@/services/supabase';
import { useForms, useTenses, useVerbs } from '@/store/scripts';

function usePopulateVerbsTensesForms() {
  const { setVerbs } = useVerbs();
  const { setTenses } = useTenses();
  const { setForms } = useForms();
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
  };

  return populateVerbsTensesForms;
}

export default usePopulateVerbsTensesForms;
