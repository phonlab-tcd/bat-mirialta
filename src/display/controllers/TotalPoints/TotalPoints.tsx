/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from '@mui/material/Typography';

import { CenteredFlexBox, FullSizeCenteredFlexBox } from '@/display/components/styled';
import {
  /*useCompletedQuestions,*/
  useTotalPoints,
} from '@/store/points';

const TotalPoints = () => {
  const { totalPoints } = useTotalPoints();

  // const { completedQuestions } = useCompletedQuestions();

  return (
    <FullSizeCenteredFlexBox>
      <CenteredFlexBox sx={{ position: 'relative' }}>
        <Typography fontWeight="bold" variant="h4">
          {totalPoints}
        </Typography>
        {/* <Typography variant="h6">{`/${3 * completedQuestions}`}</Typography> */}
      </CenteredFlexBox>
    </FullSizeCenteredFlexBox>
  );
};

export default TotalPoints;
