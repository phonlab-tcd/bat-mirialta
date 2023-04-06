/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Grid, Typography } from '@mui/material';

import { FullSizeFlexBox } from '@/display/components/styled';
import { useChats } from '@/store/chats';

const PlayedChatStats = () => {
  const [avScore, setAvScore] = useState<number>(0);
  const [completedChats, setCompletedChats] = useState<number>(0);
  const { chats } = useChats();
  const { t } = useTranslation();

  useEffect(() => {
    const allChats = chats.filter((c) => c.points !== null);
    setCompletedChats(completedChats);
    const allPoints = allChats.map((c) => c.points);
    setCompletedChats(allPoints.length);
    let totalPoints = 0;
    allPoints.forEach((p) => {
      if (p !== null) {
        totalPoints += p;
      }
    });
    setAvScore(Math.round(totalPoints / allPoints.length));
  }, [chats]);

  return (
    <FullSizeFlexBox>
      <Grid container>
        <Grid item xs={6}>
          <Typography align="center" variant="h5">
            {completedChats}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align="center" variant="h5">
            {!Number.isNaN(avScore) ? `${avScore}%` : '-'}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align="center" variant="body2">
            {t('subHeaders.played')}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align="center" variant="body2">
            {t('subHeaders.average')}
          </Typography>
        </Grid>
      </Grid>
    </FullSizeFlexBox>
  );
};

export default PlayedChatStats;
