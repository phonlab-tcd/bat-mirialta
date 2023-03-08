/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { AbButton } from 'abair-components';

import AbSelect from '@/display/components/AbSelect';
import BatBox from '@/display/components/BatBox';
import { CenteredFlexBox } from '@/display/components/styled';
import usePopulateQuestionSet from '@/hooks/questions/usePopulateQuestionSet';
import { postChat } from '@/services/supabase';
import { useSession } from '@/store/auth';
import { useChats } from '@/store/chats';
import { useQuestionSet } from '@/store/questions';
import {
  availableFormsState,
  availableTensesState,
  availableVerbsState,
  useNoQuestions,
  useSelectedForm,
  useSelectedTense,
  useSelectedVerb,
} from '@/store/scripts';
import getRandomArrayFromArray from '@/utils/getRandomArrayFromArray';

const SetTask = () => {
  const availableVerbs = useRecoilValue(availableVerbsState);
  const { selectedVerb, setSelectedVerb } = useSelectedVerb();
  const availableTenses = useRecoilValue(availableTensesState);
  const { selectedTense, setSelectedTense } = useSelectedTense();
  const availableForms = useRecoilValue(availableFormsState);
  const { selectedForm, setSelectedForm } = useSelectedForm();
  const { noQuestions, setNoQuestions } = useNoQuestions();
  const { questionSet } = useQuestionSet();
  const { chats, setChats } = useChats();
  const navigate = useNavigate();
  const { session } = useSession();
  const populateQuestionSet = usePopulateQuestionSet();

  const startChat = () => {
    console.log('starting chat');
    if (session !== null) {
      populateQuestionSet();
    }
  };

  useEffect(() => {
    if (questionSet.length !== 0 && session !== null) {
      const randomQuestionSet = getRandomArrayFromArray(questionSet, noQuestions);
      postChat(
        session.user.id,
        selectedVerb !== undefined ? selectedVerb.name : null,
        selectedTense !== undefined ? selectedTense.name : null,
        selectedForm !== undefined ? selectedForm.name : null,
        randomQuestionSet,
      ).then((c) => {
        setChats([...chats, c]);
        navigate('/chat');
      });
    }
  }, [questionSet]);

  return (
    <BatBox>
      <Box>
        <Typography align="center" fontSize={20} color="#3e435a" fontFamily={'Comic Neue'}>
          VERB
        </Typography>
        <AbSelect
          handleChange={(e) => {
            setSelectedVerb(availableVerbs.find((v) => v.name === e.target.value));
          }}
          value={selectedVerb !== undefined ? selectedVerb.name : 'all'}
          label={'Verbs'}
          items={availableVerbs.map((aV) => aV.name)}
        />
      </Box>
      <Box mt={1}>
        <Typography align="center" fontSize={20} color="#3e435a" fontFamily={'Comic Neue'}>
          TENSE
        </Typography>
        <AbSelect
          handleChange={(e) => {
            setSelectedTense(availableTenses.find((t) => t.name === e.target.value));
          }}
          value={selectedTense !== undefined ? selectedTense.name : 'all'}
          label={'Tenses'}
          items={availableTenses.map((aT) => aT.name)}
        />
      </Box>
      <Box mt={1}>
        <Typography align="center" fontSize={20} color="#3e435a" fontFamily={'Comic Neue'}>
          FORM
        </Typography>
        <AbSelect
          handleChange={(e) => {
            setSelectedForm(availableForms.find((t) => t.name === e.target.value));
          }}
          value={selectedForm !== undefined ? selectedForm.name : 'all'}
          label={'Forms'}
          items={availableForms.map((aF) => aF.name)}
        />
      </Box>
      <Box mt={1}>
        <Typography
          align="center"
          fontWeight={'bold'}
          fontSize={20}
          color="#3e435a"
          fontFamily={'Comic Neue'}
        >
          QUESTIONS
        </Typography>

        <AbSelect
          handleChange={(e) => {
            setNoQuestions(e.target.value as number);
          }}
          value={String(noQuestions)}
          label={'noQuestions'}
          items={[1, 3, 5, 8]}
        />
      </Box>
      <CenteredFlexBox mt={3}>
        <Box
          sx={{ backgroundColor: '#67add6' }}
          width={300}
          border={4}
          borderRadius={3}
          borderColor={'#3e435a'}
        >
          <AbButton
            size="large"
            fullWidth={true}
            label="start"
            onClick={() => {
              startChat();
            }}
            selected={true}
            color="secondary"
          />
        </Box>
      </CenteredFlexBox>
    </BatBox>
  );
};

export default SetTask;
