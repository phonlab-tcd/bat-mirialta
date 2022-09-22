import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import AbButton from '@/components/AbButton';
import Meta from '@/components/Meta';
import getVerbScripts from '@/scripts/questions';
import { useForm, useTense, useVerb } from '@/store/scripts';

function Welcome() {
  const { verb, setVerb } = useVerb();
  const { tense, setTense } = useTense();
  const { form, setForm } = useForm();

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
          {Object.keys(getVerbScripts()).map((v, i) => (
            <Grid key={i} item>
              <AbButton
                label={v}
                onClick={() => {
                  verb === v ? setVerb(undefined) : setVerb(v);
                }}
                selected={v === verb ? true : false}
                variation="verb"
                color="secondary"
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      {verb !== undefined && (
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
            {Object.keys(getVerbScripts()[verb]).map(
              (t, j) =>
                t !== 'quiz' && (
                  <Grid key={j} item>
                    <AbButton
                      label={t}
                      onClick={() => {
                        tense === t ? setTense(undefined) : setTense(t);
                      }}
                      selected={t === tense ? true : false}
                      variation="tense"
                      color="secondary"
                    />
                  </Grid>
                ),
            )}
          </Grid>
        </Box>
      )}
      {verb !== undefined && tense !== undefined && (
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
            {Object.keys(getVerbScripts()[verb][tense]).map((f, k) => (
              <Grid key={k} item>
                <AbButton
                  label={f}
                  onClick={() => {
                    form === f ? setForm(undefined) : setForm(f);
                  }}
                  selected={f === form ? true : false}
                  variation="form"
                  color="secondary"
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {verb !== undefined && tense !== undefined && form !== undefined && (
        <Box>
          <Typography py={2} align="center">
            Lets begin
          </Typography>
          <Typography align="center">
            <AbButton
              label={'start'}
              onClick={() => {
                console.log('start');
              }}
              selected={true}
              variation="question"
              color="primary"
            />
          </Typography>
        </Box>
      )}
    </>
  );
}

export default Welcome;
