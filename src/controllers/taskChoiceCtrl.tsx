/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import Box from '@mui/material/Box';

import FormChoiceCtrl from '@/controllers/formChoiceCtrl';
import TenseChoiceCtrl from '@/controllers/tenseChoiceCtrl';
import VerbChoiceCtrl from '@/controllers/verbChoiceCtrl';
import { getTaskSelection } from '@/services/supabase';
import { useDisplayMessages, useMessages } from '@/store/messages';
import {
  useForms,
  useQuestionIDs,
  useSelectedTense,
  useSelectedVerb,
  useShowStart,
  useTenses,
  useVerbs,
} from '@/store/scripts';

const TaskChoiceCtrl = () => {
  const { selectedVerb, setSelectedVerb } = useSelectedVerb();
  const { selectedTense, setSelectedTense } = useSelectedTense();
  const { setVerbs } = useVerbs();
  const { setTenses } = useTenses();
  const { setForms } = useForms();
  const { setDisplayMessages } = useDisplayMessages();
  const { setMessages } = useMessages();
  const { setQuestionIDs } = useQuestionIDs();
  const { setShowStart } = useShowStart();

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
    setMessages([]);
    setDisplayMessages([]);
    setQuestionIDs([]);
    setSelectedVerb(undefined);
    setSelectedTense(undefined);
    setShowStart(false);
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
