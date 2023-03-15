/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
// import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { FullSizeCenteredFlexBox } from '@/display/components/styled';
import { useCompletedQuestions } from '@/store/points';

const QuestionNumber = () => {
  const { completedQuestions } = useCompletedQuestions();

  return (
    <FullSizeCenteredFlexBox>
      <Typography variant="h6">{`Q. ${completedQuestions + 1}`}</Typography>
    </FullSizeCenteredFlexBox>
  );
};

export default QuestionNumber;
