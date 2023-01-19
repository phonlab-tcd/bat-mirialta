/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import Box from '@mui/material/Box';

import FormChoice from '@/display/controllers/FormChoice';
import TenseChoice from '@/display/controllers/TenseChoice';
import VerbChoice from '@/display/controllers/VerbChoice';
import { getTaskSelection } from '@/services/supabase';
// import { useChatBubbles, useMessages } from '@/store/adjacencyPairs';
import {
  useForms,
  useQuestionIDs,
  useSelectedTense,
  useSelectedVerb,
  useShowStart,
  useTenses,
  useVerbs,
} from '@/store/scripts';

const TaskChoice = () => {
  const { selectedVerb, setSelectedVerb } = useSelectedVerb();
  const { selectedTense, setSelectedTense } = useSelectedTense();
  const { setVerbs } = useVerbs();
  const { setTenses } = useTenses();
  const { setForms } = useForms();
  // const { setChatBubbles } = useChatBubbles();
  // const { setMessages } = useMessages();
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
    // setMessages([]);
    // setChatBubbles([]);
    setQuestionIDs([]);
    setSelectedVerb(undefined);
    setSelectedTense(undefined);
    setShowStart(false);
  }, []);

  return (
    <Box>
      <Box>
        <VerbChoice />
      </Box>
      {selectedVerb !== undefined && (
        <Box>
          <TenseChoice />
        </Box>
      )}
      {selectedVerb !== undefined && selectedTense !== undefined && (
        <Box>
          <FormChoice />
        </Box>
      )}
    </Box>
  );
};

export default TaskChoice;
