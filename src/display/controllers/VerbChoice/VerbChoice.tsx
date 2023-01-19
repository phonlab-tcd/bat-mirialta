/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { AbButton } from 'abair-components';

import { VerbTenseFormModel } from '@/models';
import { getAvailableTenses } from '@/services/supabase';
import {
  // selectedVerbID,
  useAvailableTenseIDs,
  useSelectedForm,
  useSelectedTense,
  useSelectedVerb,
  useShowStart, // useTenses,
  useVerbs,
} from '@/store/scripts';

const VerbChoice = () => {
  const { verbs } = useVerbs();
  const { selectedVerb, setSelectedVerb } = useSelectedVerb();
  const { setShowStart } = useShowStart();
  const { setSelectedForm } = useSelectedForm();
  const { setSelectedTense } = useSelectedTense();
  const { setAvailableTenseIDs } = useAvailableTenseIDs();

  const toggleVerb = (choice: VerbTenseFormModel) => {
    selectedVerb === choice ? setSelectedVerb(undefined) : setSelectedVerb(choice);
    setSelectedTense(undefined);
    setSelectedForm(undefined);
    setShowStart(false);
  };

  useEffect(() => {
    if (selectedVerb !== undefined) {
      getAvailableTenses(selectedVerb.id).then((res: any) => {
        setAvailableTenseIDs(res);
      });
    }
  }, [selectedVerb]);

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
                toggleVerb(v);
              }}
              selected={selectedVerb !== undefined ? (v === selectedVerb ? true : false) : false}
              // variation="verb"
              color="secondary"
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default VerbChoice;
