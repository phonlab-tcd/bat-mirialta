/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
// import Box from '@mui/material/Box';
import { useEffect } from 'react';

import Typography from '@mui/material/Typography';

import { FullSizeCenteredFlexBox } from '@/display/components/styled';
import { useCompletedQuestions, useShowPoints } from '@/store/points';
import { useQuestions } from '@/store/questions';

const QuestionNumber = () => {
  const { completedQuestions } = useCompletedQuestions();
  const { questions } = useQuestions();
  const { showPoints } = useShowPoints();

  useEffect(() => {
    console.log('completedQuestions:', completedQuestions);
  }, [completedQuestions]);

  return (
    <FullSizeCenteredFlexBox>
      {showPoints && completedQuestions < questions.length && (
        <Typography variant="h6">{`Q.${completedQuestions + 1}`}</Typography>
      )}
    </FullSizeCenteredFlexBox>
  );
};

export default QuestionNumber;
