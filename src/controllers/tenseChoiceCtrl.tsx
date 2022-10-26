/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect } from 'react';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import AbButton from '@/components/AbButton';
import { getAvailableForms } from '@/services/supabase';
import {
  availableTenses,
  selectedTenseID,
  selectedVerbID,
  useAvailableFormIDs,
  useSelectedForm,
  useSelectedTense,
  useShowStart,
} from '@/store/scripts';

const TenseChoiceCtrl = () => {
  const availableTensesValue = useRecoilValue(availableTenses);
  const { selectedTense, setSelectedTense } = useSelectedTense();
  const { setSelectedForm } = useSelectedForm();
  const { setShowStart } = useShowStart();
  const { setAvailableFormIDs } = useAvailableFormIDs();
  const selectedTenseIDValue = useRecoilValue(selectedTenseID);
  const selectedVerbIDValue = useRecoilValue(selectedVerbID);

  const toggleTense = (choice: string) => {
    selectedTense === choice ? setSelectedTense(undefined) : setSelectedTense(choice);
    setSelectedForm(undefined);
    setShowStart(false);
  };

  useEffect(() => {
    if (selectedTenseIDValue !== undefined) {
      getAvailableForms(selectedVerbIDValue, selectedTenseIDValue).then((res: any) => {
        setAvailableFormIDs(res);
      });
    }
  }, [selectedTenseIDValue]);

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
                toggleTense(v.name);
              }}
              selected={v.name === selectedTense ? true : false}
              variation="Tense"
              color="secondary"
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TenseChoiceCtrl;
