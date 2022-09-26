import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import { useRecoilValue } from 'recoil';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import AbButton from '@/components/AbButton';
import Meta from '@/components/Meta';
import { getQuestionIDs, getVerbsTensesForms } from '@/services/supabase';
import {
  // selectedForm,
  // selectedTense,
  // selectedVerb,
  useFormID,
  useForms,
  useQuestionIDs,
  useTenseID,
  useTenses,
  useVerbID,
  useVerbs,
} from '@/store/scripts';

const Welcome = () => {
  const { verbID, setVerbID } = useVerbID();
  const { tenseID, setTenseID } = useTenseID();
  const { formID, setFormID } = useFormID();

  const { verbs, setVerbs } = useVerbs();
  const { tenses, setTenses } = useTenses();
  const { forms, setForms } = useForms();
  const { setQuestionIDs } = useQuestionIDs();
  const [showStart, setShowStart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getVerbsTensesForms({ table: 'bat_verbs', setter: setVerbs });
    getVerbsTensesForms({ table: 'bat_tenses', setter: setTenses });
    getVerbsTensesForms({ table: 'bat_forms', setter: setForms });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTask = (task: string, choice: number) => {
    if (task === 'verb') {
      verbID === choice ? setVerbID(undefined) : setVerbID(choice);
      setTenseID(undefined);
      setFormID(undefined);
      setShowStart(false);
    } else if (task === 'tense') {
      tenseID === choice ? setTenseID(undefined) : setTenseID(choice);
      setFormID(undefined);
      setShowStart(false);
    } else if (task === 'form') {
      formID === choice ? setFormID(undefined) : setFormID(choice);
      setShowStart(true);
    }
  };

  const prepareToStart = () => {
    getQuestionIDs('bat_questions', verbID, tenseID, formID).then((res) => {
      if (res) {
        setQuestionIDs(res);
        navigate('/chat');
      }
    });
  };

  return (
    <>
      <Meta title="Welcome" />
      <Box>
        <Typography py={2} align="center">
          Choose a Verb
        </Typography>
        <Grid
          container
          direction="row"
          spacing={{ sm: 1, xs: 0.5 }}
          sx={{ flexWrap: 'wrap', marginBottom: 2 }}
          justifyContent="center"
          maxWidth="xs"
          px={{ sm: 4, xs: 2 }}
        >
          {verbs.map((v, i) => (
            <Grid key={i} item>
              <AbButton
                label={v.name}
                onClick={() => {
                  toggleTask('verb', v.id);
                }}
                selected={v.id === verbID ? true : false}
                variation="verb"
                color="secondary"
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      {verbID !== undefined && (
        <Box>
          <Typography py={2} align="center">
            Choose a Tense
          </Typography>

          <Grid
            container
            direction="row"
            spacing={{ sm: 1, xs: 0.5 }}
            sx={{ flexWrap: 'wrap', marginBottom: 2 }}
            justifyContent="center"
            maxWidth="xs"
            px={{ sm: 4, xs: 2 }}
          >
            {tenses.map((t, j) => (
              <Grid key={j} item>
                <AbButton
                  label={t.name}
                  onClick={() => {
                    toggleTask('tense', t.id);
                  }}
                  selected={t.id === tenseID ? true : false}
                  variation="tense"
                  color="secondary"
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {verbID !== undefined && tenseID !== undefined && (
        <Box>
          <Typography py={2} align="center">
            Choose a Form
          </Typography>

          <Grid
            container
            direction="row"
            spacing={{ sm: 1, xs: 0.5 }}
            sx={{ flexWrap: 'wrap', marginBottom: 2 }}
            justifyContent="center"
            maxWidth="xs"
            px={{ sm: 4, xs: 2 }}
          >
            {forms.map((f, k) => (
              <Grid key={k} item>
                <AbButton
                  label={f.name}
                  onClick={() => {
                    toggleTask('form', f.id);
                  }}
                  selected={f.id === formID ? true : false}
                  variation="form"
                  color="secondary"
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {showStart && (
        <Box>
          <Typography py={2} align="center">
            Lets begin
          </Typography>
          <Typography align="center">
            <AbButton
              label={'start'}
              onClick={prepareToStart}
              selected={true}
              variation="question"
              color="primary"
            />
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Welcome;
