/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import Typography from '@mui/material/Typography';

import { FullSizeCenteredFlexBox } from '@/display/components/styled';
import { useAvailablePoints, useShowThisPenalty, useThisPenalty } from '@/store/points';

const PointsAvailable = () => {
  const { availablePoints } = useAvailablePoints();
  const { showThisPenalty, setShowThisPenalty } = useShowThisPenalty();
  const { thisPenalty, setThisPenalty } = useThisPenalty();

  useEffect(() => {
    if (thisPenalty !== 0) {
      setShowThisPenalty(true);
      setTimeout(() => {
        setShowThisPenalty(false);
        setThisPenalty(0);
      }, 500);
    }
  }, [thisPenalty]);

  return (
    <FullSizeCenteredFlexBox sx={{ position: 'relative' }}>
      <Typography
        pt={-0.5}
        px={0.5}
        variant="body1"
        sx={{
          position: 'absolute',
          visibility: showThisPenalty ? 'visible' : 'hidden',
          top: -8,
          left: 50,
        }}
      >{`-${thisPenalty}`}</Typography>
      <Typography
        variant="h6"
        px={1.25}
        borderRadius={100}
        sx={{ backgroundColor: showThisPenalty ? 'warning.light' : 'secondary.light' }}
      >
        {availablePoints}
      </Typography>
    </FullSizeCenteredFlexBox>
  );
};

export default PointsAvailable;
