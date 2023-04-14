/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';

import { CenteredFlexBox, FullSizeCenteredFlexBox } from '@/display/components/styled';

interface TotalPointsProps {
  points: number;
}

const TotalPoints = ({ points }: TotalPointsProps) => {
  const [pointsChanged, setPointsChanged] = useState(false);

  useEffect(() => {
    if (points !== 0) {
      setPointsChanged(true);
      setTimeout(() => {
        setPointsChanged(false);
      }, 2000);
    }
  }, [points]);

  return (
    <FullSizeCenteredFlexBox>
      <CenteredFlexBox sx={{ position: 'relative' }}>
        <Typography variant={pointsChanged ? 'h4' : 'h5'}>{points}</Typography>
      </CenteredFlexBox>
    </FullSizeCenteredFlexBox>
  );
};

export default TotalPoints;
