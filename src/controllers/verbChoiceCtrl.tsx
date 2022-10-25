/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import AbButton from '@/components/AbButton';
import { getTaskSelection } from '@/services/supabase';
import {
  useSelectedForm,
  useSelectedTense,
  useSelectedVerb,
  useShowStart,
  useVerbs,
} from '@/store/scripts';

const VerbChoiceCtrl = () => {
  const { verbs, setVerbs } = useVerbs();
  const { selectedVerb, setSelectedVerb } = useSelectedVerb();
  const { setShowStart } = useShowStart();
  const { setSelectedForm } = useSelectedForm();
  const { setSelectedTense } = useSelectedTense();

  const toggleVerb = (choice: string) => {
    selectedVerb === choice ? setSelectedVerb(undefined) : setSelectedVerb(choice);
    setSelectedTense(undefined);
    setSelectedForm(undefined);
    setShowStart(false);
  };

  useEffect(() => {
    getTaskSelection('verbs').then((res: any) => {
      setVerbs(res);
    });
  }, []);

  return (
    <>
      <Typography align="center" py={2}>
        Roghnaigh briathar
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
                toggleVerb(v.name);
              }}
              selected={v.name === selectedVerb ? true : false}
              variation="verb"
              color="secondary"
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default VerbChoiceCtrl;
