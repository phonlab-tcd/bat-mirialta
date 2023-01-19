/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilValue } from 'recoil';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { AbButton } from 'abair-components';

import { VerbTenseFormModel } from '@/models';
import { availableForms, useSelectedForm, useShowStart } from '@/store/scripts';

const FormChoice = () => {
  const availableFormsValue = useRecoilValue(availableForms);
  const { selectedForm, setSelectedForm } = useSelectedForm();
  const { setShowStart } = useShowStart();

  const toggleForm = (choice: VerbTenseFormModel) => {
    selectedForm === choice ? setSelectedForm(undefined) : setSelectedForm(choice);
    setShowStart(true);
  };

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
        {availableFormsValue.map((v, i) => (
          <Grid key={i} item>
            <AbButton
              label={v.name}
              onClick={() => {
                toggleForm(v);
              }}
              selected={v === selectedForm ? true : false}
              // variation="Form"
              color="secondary"
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default FormChoice;
