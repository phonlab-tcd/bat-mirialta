/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { AbButton } from 'abair-components';

import AbSelect from '@/display/components/AbSelect';
import BatBox from '@/display/components/BatBox';
import { useGenerateIntro } from '@/hooks';
import usePopulateQuestionSet from '@/hooks/questions/usePopulateQuestionSet';
import { postChat } from '@/services/supabase';
import { useAdjacencyPairs } from '@/store/adjacencyPairs';
import { useAnimatingOutro } from '@/store/animate';
import { useSession } from '@/store/auth';
import { useChats, useIntro, useOutro } from '@/store/chats';
import { useShowAvailablePoints, useShowHome, useShowPoints } from '@/store/points';
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
import { useMessageInputDisabled } from '@/store/textInput';
import getRandomArrayFromArray from '@/utils/getRandomArrayFromArray';

const SetVerbTenseForm = () => {
  const availableVerbs = useRecoilValue(availableVerbsState);
  const { selectedVerb, setSelectedVerb } = useSelectedVerb();
  const availableTenses = useRecoilValue(availableTensesState);
  const { selectedTense, setSelectedTense } = useSelectedTense();
  const availableForms = useRecoilValue(availableFormsState);
  const { selectedForm, setSelectedForm } = useSelectedForm();
  const { noQuestions } = useNoQuestions();
  const { questionSet } = useQuestionSet();
  const [clickedStart, setClickedStart] = useState(false);
  const { chats, setChats } = useChats();
  const { setIntro } = useIntro();
  const { setOutro } = useOutro();
  const navigate = useNavigate();
  const { session } = useSession();
  const populateQuestionSet = usePopulateQuestionSet();
  const generateIntro = useGenerateIntro();
  const { setAdjacencyPairs } = useAdjacencyPairs();
  const { setAnimatingOutro } = useAnimatingOutro();
  const startChat = () => {
    if (session !== null) {
      setClickedStart(true);
      populateQuestionSet();
    }
  };
  const { setMessageInputDisabled } = useMessageInputDisabled();
  const { t, i18n } = useTranslation();

  const { setShowAvailablePoints } = useShowAvailablePoints();
  const { setShowPoints } = useShowPoints();

  const { setShowHome } = useShowHome();

  useEffect(() => {
    if (questionSet.length !== 0 && session !== null && clickedStart) {
      setClickedStart(false);
      setShowPoints(false);
      setShowHome(false);
      setShowAvailablePoints(true);
      setIntro([]);
      setOutro([]);
      setAdjacencyPairs([]);
      setMessageInputDisabled(true);
      setAnimatingOutro(false);
      const intro = generateIntro();

      const randomQuestionSet = getRandomArrayFromArray(questionSet, noQuestions);

      postChat(
        session.user.id,
        selectedVerb !== undefined ? selectedVerb.name : null,
        selectedTense !== undefined ? selectedTense.name : null,
        selectedForm !== undefined ? selectedForm.name : null,
        randomQuestionSet,
        intro,
      ).then((c) => {
        setChats([...chats, c]);
        navigate(`/chat`);
      });
    }
    console.log('availableVerbs:', availableVerbs);
  }, [questionSet]);

  return (
    <BatBox>
      <Box>
        <Typography align="center" variant={'h6'}>
          {t('headers.verb')}
        </Typography>
        <Box border={2} borderColor={'primary.dark'} borderRadius={1.5}>
          <AbSelect
            handleChange={(e) => {
              setSelectedVerb(availableVerbs.find((v) => v.name === e.target.value));
            }}
            value={selectedVerb !== undefined ? selectedVerb.name : 'all'}
            label={'Verbs'}
            items={availableVerbs.map((aV) => aV.name).sort()}
            allDisplay={t('task.allVerbs')}
            lang={i18n.language}
          />
        </Box>
      </Box>
      <Box mt={1}>
        <Typography align="center" variant={'h6'}>
          {t('headers.tense')}
        </Typography>
        <Box border={2} borderColor={'primary.dark'} borderRadius={1.5}>
          <AbSelect
            handleChange={(e) => {
              setSelectedTense(availableTenses.find((t) => t.name === e.target.value));
            }}
            value={selectedTense !== undefined ? selectedTense.name : 'all'}
            label={'Tenses'}
            items={availableTenses.map((aT) => aT.name).sort()}
            allDisplay={t('task.allTenses')}
            lang={i18n.language}
          />
        </Box>
      </Box>
      <Box mt={1}>
        <Typography align="center" variant={'h6'}>
          {t('headers.form')}
        </Typography>
        <Box border={2} borderColor={'primary.dark'} borderRadius={1.5}>
          <AbSelect
            handleChange={(e) => {
              setSelectedForm(availableForms.find((t) => t.name === e.target.value));
            }}
            value={selectedForm !== undefined ? selectedForm.name : 'all'}
            label={'Forms'}
            items={availableForms.map((aF) => aF.name).sort()}
            allDisplay={t('task.allForms')}
            lang={i18n.language}
          />
        </Box>
      </Box>
      <Box mt={3}>
        <BatBox button={true} width={'100%'}>
          <AbButton
            size="large"
            fullWidth={true}
            label={t('buttons.start')}
            onClick={() => {
              startChat();
            }}
            selected={true}
            color="secondary"
          />
        </BatBox>
      </Box>
    </BatBox>
  );
};

export default SetVerbTenseForm;
