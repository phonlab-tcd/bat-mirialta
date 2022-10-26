/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import Box from '@mui/material/Box';

import FormChoiceCtrl from '@/controllers/formChoiceCtrl';
import TenseChoiceCtrl from '@/controllers/tenseChoiceCtrl';
import VerbChoiceCtrl from '@/controllers/verbChoiceCtrl';
import { getTaskSelection } from '@/services/supabase';
import { useForms, useSelectedTense, useSelectedVerb, useTenses, useVerbs } from '@/store/scripts';

const TaskChoiceCtrl = () => {
  const { selectedVerb } = useSelectedVerb();
  const { selectedTense } = useSelectedTense();
  const { setVerbs } = useVerbs();
  const { setTenses } = useTenses();
  const { setForms } = useForms();

  useEffect(() => {
    getTaskSelection('verbs').then((res: any) => {
      setVerbs(res);
    });
    getTaskSelection('tenses').then((res: any) => {
      setTenses(res);
    });
    getTaskSelection('forms').then((res: any) => {
      setForms(res);
    });
  }, []);

  return (
    <Box>
      <Box>
        <VerbChoiceCtrl />
      </Box>
      {selectedVerb !== undefined && (
        <Box>
          <TenseChoiceCtrl />
        </Box>
      )}
      {selectedVerb !== undefined && selectedTense !== undefined && (
        <Box>
          <FormChoiceCtrl />
        </Box>
      )}
    </Box>
  );
};

export default TaskChoiceCtrl;
