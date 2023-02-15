/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box';

import { AbButton } from 'abair-components';

import { FullSizeCenteredFlexBox } from '@/display/components/styled';

interface MessageInputButtonsProps {
  vis: 'visible' | 'hidden';
}

const MessageInputButtons = ({ vis }: MessageInputButtonsProps) => {
  return (
    <Box
      height="50px"
      width="100%"
      sx={{
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'secondary.light',
        visibility: vis,
        zIndex: 10,
      }}
    >
      <FullSizeCenteredFlexBox p={2}>
        <AbButton
          fullWidth={true}
          size="large"
          label="Tá"
          color="primary"
          onClick={() => {
            alert('Tá');
          }}
        />
        <Box p={1}></Box>
        <AbButton
          fullWidth={true}
          size="large"
          label="Níl"
          color="warning"
          onClick={() => {
            alert('Níl');
          }}
        />
      </FullSizeCenteredFlexBox>
    </Box>
  );
};

export default MessageInputButtons;
