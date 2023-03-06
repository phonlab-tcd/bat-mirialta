/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import {
  useAvailableFormIDs,
  useAvailableTenseIDs,
  useAvailableVerbIDs,
  useSelectedForm,
  useSelectedTense,
  useSelectedVerb,
} from '@/store/scripts';

const useAvailables = () => {
  const { availableVerbIDs } = useAvailableVerbIDs();
  const { availableTenseIDs } = useAvailableTenseIDs();
  const { availableFormIDs } = useAvailableFormIDs();
  const { selectedVerb, setSelectedVerb } = useSelectedVerb();

  const { selectedTense, setSelectedTense } = useSelectedTense();

  const { selectedForm, setSelectedForm } = useSelectedForm();

  useEffect(() => {
    if (selectedVerb !== undefined) {
      if (!availableVerbIDs.includes(selectedVerb.id)) {
        setSelectedVerb(undefined);
      }
    }
  }, [availableVerbIDs]);

  useEffect(() => {
    if (selectedTense !== undefined) {
      if (!availableTenseIDs.includes(selectedTense.id)) {
        setSelectedTense(undefined);
      }
    }
  }, [availableTenseIDs]);

  useEffect(() => {
    if (selectedForm !== undefined) {
      if (!availableFormIDs.includes(selectedForm.id)) {
        setSelectedForm(undefined);
      }
    }
  }, [availableFormIDs]);

  return null;
};

export default useAvailables;
