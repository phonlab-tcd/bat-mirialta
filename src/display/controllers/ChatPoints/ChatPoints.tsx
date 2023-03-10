/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { FlexBox, FullSizeCenteredFlexBox, FullSizeFlexBox } from '@/display/components/styled';
import {
  useAvailablePoints,
  useCompletedQuestions,
  useShowThisPenalty,
  useThisPenalty,
  useTotalPoints,
} from '@/store/points';

const ChatPoints = () => {
  const { totalPoints } = useTotalPoints();
  const { availablePoints } = useAvailablePoints();
  const { completedQuestions } = useCompletedQuestions();
  const { showThisPenalty, setShowThisPenalty } = useShowThisPenalty();
  const { thisPenalty } = useThisPenalty();

  useEffect(() => {
    if (thisPenalty !== 0) {
      setShowThisPenalty(true);
      setTimeout(() => {
        setShowThisPenalty(false);
      }, 2000);
    }
  }, [thisPenalty]);

  return (
    <Box width={'100%'} height={65} sx={{ position: 'absolute' }}>
      <FullSizeCenteredFlexBox sx={{ position: 'absolute' }}>
        <FlexBox sx={{ position: 'relative' }}>
          <Typography variant="h6">{totalPoints}</Typography>
          <Typography variant="h6">{`/${5 * completedQuestions}`}</Typography>
        </FlexBox>
      </FullSizeCenteredFlexBox>
      <FullSizeFlexBox
        justifyContent="flex-end"
        alignItems="center"
        sx={{ position: 'absolute' }}
        px={2}
      >
        <Box sx={{ position: 'relative' }}>
          <Typography
            pt={-0.5}
            px={0.5}
            variant="body1"
            sx={{
              position: 'absolute',
              visibility: showThisPenalty ? 'visible' : 'hidden',
              top: -8,
              left: 25,
            }}
          >{`-${thisPenalty}`}</Typography>
          <Typography
            variant="h6"
            px={1.25}
            borderRadius={100}
            sx={{ backgroundColor: showThisPenalty ? 'red' : 'gold' }}
          >
            {availablePoints}
          </Typography>
        </Box>
      </FullSizeFlexBox>
    </Box>
  );
};

export default ChatPoints;
