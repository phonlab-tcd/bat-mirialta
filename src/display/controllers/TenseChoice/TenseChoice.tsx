/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect } from 'react';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { AbButton } from 'abair-components';

import { VerbTenseFormModel } from '@/models';
import { getAvailableForms } from '@/services/supabase';
import {
  availableTenses,
  useAvailableFormIDs,
  useSelectedForm,
  useSelectedTense,
  useSelectedVerb,
  useShowStart,
} from '@/store/scripts';

const TenseChoice = () => {
  const availableTensesValue = useRecoilValue(availableTenses);
  const { selectedVerb } = useSelectedVerb();
  const { selectedTense, setSelectedTense } = useSelectedTense();
  const { setSelectedForm } = useSelectedForm();
  const { setShowStart } = useShowStart();
  const { setAvailableFormIDs } = useAvailableFormIDs();

  const toggleTense = (choice: VerbTenseFormModel) => {
    selectedTense === choice ? setSelectedTense(undefined) : setSelectedTense(choice);
    setSelectedForm(undefined);
    setShowStart(false);
  };

  useEffect(() => {
    if (selectedTense !== undefined && selectedVerb !== undefined) {
      getAvailableForms(selectedVerb.id, selectedTense.id).then((res: any) => {
        setAvailableFormIDs(res);
      });
    }
  }, [selectedTense]);

  return (
    <>
      <Typography py={2} align="center">
        Roghnaigh aimsir
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
        {availableTensesValue.map((v, i) => (
          <Grid key={i} item>
            <AbButton
              label={v.name}
              onClick={() => {
                toggleTense(v);
              }}
              selected={v === selectedTense ? true : false}
              // variation="Tense"
              color="secondary"
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TenseChoice;
