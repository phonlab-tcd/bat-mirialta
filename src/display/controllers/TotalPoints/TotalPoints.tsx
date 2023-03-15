/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from '@mui/material/Typography';

import { FullSizeCenteredFlexBox } from '@/display/components/styled';
import { useCompletedQuestions, useTotalPoints } from '@/store/points';
import { useShowAvailablePoints } from '@/store/points';

const TotalPoints = () => {
  const { totalPoints } = useTotalPoints();
  const { showAvailablePoints } = useShowAvailablePoints();

  const { completedQuestions } = useCompletedQuestions();

  return (
    <FullSizeCenteredFlexBox>
      <Typography variant={showAvailablePoints ? 'h6' : 'h4'}>{totalPoints}</Typography>
      <Typography variant="h6">{`/${3 * completedQuestions}`}</Typography>
    </FullSizeCenteredFlexBox>
  );
};

export default TotalPoints;
