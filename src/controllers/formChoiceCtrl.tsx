/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import AbButton from '@/components/AbButton';
import { getTaskSelection } from '@/services/supabase';
import { useForms, useSelectedForm, useShowStart } from '@/store/scripts';

const FormChoiceCtrl = () => {
  const { forms, setForms } = useForms();
  const { selectedForm, setSelectedForm } = useSelectedForm();
  const { setShowStart } = useShowStart();

  const toggleForm = (choice: string) => {
    selectedForm === choice ? setSelectedForm(undefined) : setSelectedForm(choice);
    setShowStart(true);
  };

  useEffect(() => {
    getTaskSelection('forms').then((res: any) => {
      console.log('forms:', res);
      setForms(res);
    });
  }, []);

  return (
    <>
      <Typography py={2} align="center">
        Roghnaigh foirm
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
        {forms.map((v, i) => (
          <Grid key={i} item>
            <AbButton
              label={v.name}
              onClick={() => {
                toggleForm(v.name);
              }}
              selected={v.name === selectedForm ? true : false}
              variation="Form"
              color="secondary"
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default FormChoiceCtrl;
