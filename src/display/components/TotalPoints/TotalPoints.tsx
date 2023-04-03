/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from '@mui/material/Typography';

import { CenteredFlexBox, FullSizeCenteredFlexBox } from '@/display/components/styled';

interface TotalPointsProps {
  points: number;
}

const TotalPoints = ({ points }: TotalPointsProps) => {
  return (
    <FullSizeCenteredFlexBox>
      <CenteredFlexBox sx={{ position: 'relative' }}>
        <Typography variant="h5">{points}</Typography>
      </CenteredFlexBox>
    </FullSizeCenteredFlexBox>
  );
};

export default TotalPoints;
