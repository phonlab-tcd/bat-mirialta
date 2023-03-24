/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import { getAvailableForms, getAvailableTenses, getAvailableVerbs } from '@/services/supabase';
import {
  useAvailableFormIDs,
  useAvailableTenseIDs,
  useAvailableVerbIDs,
  useSelectedForm,
  useSelectedTense,
  useSelectedVerb,
} from '@/store/scripts';

const useGetAvailables = () => {
  const { selectedVerb } = useSelectedVerb();
  const { selectedTense } = useSelectedTense();
  const { selectedForm } = useSelectedForm();
  const { setAvailableVerbIDs } = useAvailableVerbIDs();
  const { setAvailableTenseIDs } = useAvailableTenseIDs();
  const { setAvailableFormIDs } = useAvailableFormIDs();

  useEffect(() => {
    getAvailableForms(
      selectedVerb !== undefined ? selectedVerb.id : undefined,
      selectedTense !== undefined ? selectedTense.id : undefined,
    ).then((a_f) => {
      if (a_f !== undefined) {
        // remove additional question
        setAvailableFormIDs(a_f);
      } else {
        setAvailableFormIDs([]);
      }
    });
    getAvailableTenses(
      selectedVerb !== undefined ? selectedVerb.id : undefined,
      selectedForm !== undefined ? selectedForm.id : undefined,
    ).then((a_f) => {
      if (a_f !== undefined) {
        setAvailableTenseIDs(a_f);
      } else {
        setAvailableTenseIDs([]);
      }
    });
  }, [selectedVerb]);

  useEffect(() => {
    getAvailableVerbs(
      selectedTense !== undefined ? selectedTense.id : undefined,
      selectedForm !== undefined ? selectedForm.id : undefined,
    ).then((a_v) => {
      if (a_v !== undefined) {
        setAvailableVerbIDs(a_v);
      } else {
        setAvailableVerbIDs([]);
      }
    });

    getAvailableForms(
      selectedVerb !== undefined ? selectedVerb.id : undefined,
      selectedTense !== undefined ? selectedTense.id : undefined,
    ).then((a_f) => {
      if (a_f !== undefined) {
        setAvailableFormIDs(a_f);
      } else {
        setAvailableFormIDs([]);
      }
    });
  }, [selectedTense]);

  useEffect(() => {
    getAvailableVerbs(
      selectedTense !== undefined ? selectedTense.id : undefined,
      selectedForm !== undefined ? selectedForm.id : undefined,
    ).then((a_v) => {
      if (a_v !== undefined) {
        setAvailableVerbIDs(a_v);
      } else {
        setAvailableVerbIDs([]);
      }
    });
    getAvailableTenses(
      selectedVerb !== undefined ? selectedVerb.id : undefined,
      selectedForm !== undefined ? selectedForm.id : undefined,
    ).then((a_t) => {
      if (a_t !== undefined) {
        setAvailableTenseIDs(a_t);
      } else {
        setAvailableTenseIDs([]);
      }
    });
  }, [selectedForm]);

  return null;
};

export default useGetAvailables;
