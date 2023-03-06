/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { AbButton } from 'abair-components';
import Image from 'mui-image';

import AbSelect from '@/display/components/AbSelect';
import Meta from '@/display/components/Meta';
import { CenteredFlexBox } from '@/display/components/styled';
import { useAvailables, useGetAvailables } from '@/hooks/selectTask';
import usePopulateVerbsTensesForms from '@/hooks/tasks/usePopulateVerbsTensesForms';
import {
  availableFormsState,
  availableTensesState,
  availableVerbsState,
  useNoQuestions,
  useSelectedForm,
  useSelectedTense,
  useSelectedVerb,
  useVerbs,
} from '@/store/scripts';

import robotImg from '/assets/images/robot.png';

const Welcome = () => {
  const { verbs } = useVerbs();

  const populateVerbsTensesForms = usePopulateVerbsTensesForms();

  useAvailables();
  useGetAvailables();

  const availableVerbs = useRecoilValue(availableVerbsState);
  const { selectedVerb, setSelectedVerb } = useSelectedVerb();
  const availableTenses = useRecoilValue(availableTensesState);
  const { selectedTense, setSelectedTense } = useSelectedTense();
  const availableForms = useRecoilValue(availableFormsState);
  const { selectedForm, setSelectedForm } = useSelectedForm();
  const { noQuestions, setNoQuestions } = useNoQuestions();

  useEffect(() => {
    if (verbs.length === 0) {
      console.log('first load\n\ngetting verbs, tenses and forms');
      populateVerbsTensesForms();
    }
  }, []);

  return (
    <Box>
      <Meta title="Welcome" />
      <CenteredFlexBox p={2}>
        <Image
          duration={1000}
          height={150}
          width={150}
          easing="ease-out"
          alt="Abair Applications"
          src={robotImg}
          showLoading
        />
      </CenteredFlexBox>
      <CenteredFlexBox>
        <Box
          sx={{ backgroundColor: '#67add6' }}
          width={300}
          border={4}
          borderRadius={3}
          borderColor={'#3e435a'}
          p={2}
          pt={1}
        >
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
              items={[3, 5, 10]}
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
        </Box>
      </CenteredFlexBox>
    </Box>
  );
};

export default Welcome;
