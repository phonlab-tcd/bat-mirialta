/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box';

import { AbButton, AbButtonProps } from 'abair-components';

import { CenteredFlexBox } from '@/display/components/styled';

interface BatWelcomeProps {
  buttons: AbButtonProps[];
}

const BatWelcome = ({ buttons }: BatWelcomeProps) => {
  return (
    <CenteredFlexBox>
      <Box width={200}>
        {buttons.map((b, i) => (
          <Box key={i} m={1}>
            <AbButton
              size="large"
              fullWidth={true}
              label={b.label}
              onClick={b.onClick}
              selected={false}
              color="secondary"
            />
          </Box>
        ))}
      </Box>
    </CenteredFlexBox>
  );
};

export default BatWelcome;
