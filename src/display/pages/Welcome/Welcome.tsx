/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import { AbButton } from 'abair-components';
import Image from 'mui-image';

import Meta from '@/display/components/Meta';
import { CenteredFlexBox } from '@/display/components/styled';
import usePopulateVerbsTensesForms from '@/hooks/tasks/usePopulateVerbsTensesForms';
import { getAvailableForms, getAvailableTenses, getAvailableVerbs } from '@/services/supabase';
import {
  availableFormsState,
  availableTensesState,
  availableVerbsState,
  useAvailableFormIDs,
  useAvailableTenseIDs,
  useAvailableVerbIDs,
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

  const availableVerbs = useRecoilValue(availableVerbsState);
  const { selectedVerb, setSelectedVerb } = useSelectedVerb();
  const availableTenses = useRecoilValue(availableTensesState);
  const { selectedTense, setSelectedTense } = useSelectedTense();
  const availableForms = useRecoilValue(availableFormsState);
  const { selectedForm, setSelectedForm } = useSelectedForm();
  const { noQuestions, setNoQuestions } = useNoQuestions();
  const { availableVerbIDs, setAvailableVerbIDs } = useAvailableVerbIDs();
  const { availableTenseIDs, setAvailableTenseIDs } = useAvailableTenseIDs();
  const { availableFormIDs, setAvailableFormIDs } = useAvailableFormIDs();

  useEffect(() => {
    if (verbs.length === 0) {
      console.log('first load\n\ngetting verbs, tenses and forms');
      populateVerbsTensesForms();
    }
  }, []);

  useEffect(() => {
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

            <Select
              label="Verbs"
              value={selectedVerb !== undefined ? selectedVerb.name : 'all'}
              onChange={(e) => {
                setSelectedVerb(availableVerbs.find((v) => v.name === e.target.value));
              }}
              sx={{ width: '100%', color: '#fff', textAlign: 'center' }}
            >
              <MenuItem key={'all'} value={'all'}>
                all
              </MenuItem>
              {availableVerbs.map((v, i) => (
                <MenuItem key={i} value={v.name}>
                  {v.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box mt={1}>
            <Typography align="center" fontSize={20} color="#3e435a" fontFamily={'Comic Neue'}>
              TENSE
            </Typography>
            <Select
              label="Tenses"
              value={selectedTense !== undefined ? selectedTense.name : 'all'}
              onChange={(e) => {
                setSelectedTense(availableTenses.find((t) => t.name === e.target.value));
              }}
              sx={{ width: '100%', color: '#fff', textAlign: 'center' }}
            >
              <MenuItem key={'all'} value={'all'}>
                all
              </MenuItem>
              {availableTenses.map((t, i) => (
                <MenuItem key={i} value={t.name}>
                  {t.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box mt={1}>
            <Typography align="center" fontSize={20} color="#3e435a" fontFamily={'Comic Neue'}>
              FORM
            </Typography>
            <Select
              label="Forms"
              value={selectedForm !== undefined ? selectedForm.name : 'all'}
              onChange={(e) => {
                setSelectedForm(availableForms.find((f) => f.name === e.target.value));
              }}
              sx={{ width: '100%', color: '#fff', textAlign: 'center' }}
            >
              <MenuItem key={'all'} value={'all'}>
                all
              </MenuItem>
              {availableForms.map((f, i) => (
                <MenuItem key={i} value={f.name}>
                  {f.name}
                </MenuItem>
              ))}
            </Select>
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

            <Select
              label="noQuestions"
              value={noQuestions}
              onChange={(e) => {
                setNoQuestions(e.target.value as number);
              }}
              sx={{ width: '100%', color: '#fff', textAlign: 'center' }}
            >
              {[3, 5, 10].map((f, i) => (
                <MenuItem key={i} value={f}>
                  {f}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      </CenteredFlexBox>
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
              console.log('start');
            }}
            selected={true}
            color="secondary"
          />
        </Box>
      </CenteredFlexBox>
    </Box>
  );
};

export default Welcome;
