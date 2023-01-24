/* eslint-disable react-hooks/exhaustive-deps */
import { getForms, getTenses, getVerbs } from '@/services/supabase';
import { useForms, useTenses, useVerbs } from '@/store/scripts';

function usePopulateVerbsTensesForms() {
  const { setVerbs } = useVerbs();
  const { setTenses } = useTenses();
  const { setForms } = useForms();
  const populateVerbsTensesForms = () => {
    getVerbs().then((v) => {
      setVerbs(v);
    });
    getTenses().then((t) => {
      setTenses(t);
    });
    getForms().then((f) => {
      setForms(f);
    });
  };

  return populateVerbsTensesForms;
}

export default usePopulateVerbsTensesForms;
