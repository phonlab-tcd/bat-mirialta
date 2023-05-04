/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useCompletedQuestions, useShowPoints } from '@/store/points';
import { useQuestions } from '@/store/questions';

const QuestionNumber = () => {
  const { completedQuestions } = useCompletedQuestions();
  const { questions } = useQuestions();
  const { showPoints } = useShowPoints();
  const { t } = useTranslation();

  return (
    <Box>
      {showPoints && completedQuestions < questions.length && (
        <Typography variant="body1">{`${t('buttons.question')} ${
          completedQuestions + 1
        }`}</Typography>
      )}
    </Box>
  );
};

export default QuestionNumber;
