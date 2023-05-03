/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Typography from '@mui/material/Typography';

import { FullSizeCenteredFlexBox } from '@/display/components/styled';
import { useAvailablePoints, useMostRecentPenalty, useShowMostRecentPenalty } from '@/store/points';

const PointsAvailable = () => {
  const { availablePoints } = useAvailablePoints();
  const { showMostRecentPenalty, setShowMostRecentPenalty } = useShowMostRecentPenalty();
  const { mostRecentPenalty } = useMostRecentPenalty();
  const { i18n } = useTranslation();
  const [pointsString, setPointsString] = useState('');

  useEffect(() => {
    if (mostRecentPenalty !== 0) {
      setShowMostRecentPenalty(true);
      setTimeout(() => {
        setShowMostRecentPenalty(false);
      }, 2000);
    }
  }, [mostRecentPenalty]);

  useEffect(() => {
    if (i18n.language === 'en') {
      if (availablePoints === 1) {
        setPointsString('point');
      } else {
        setPointsString('points');
      }
    } else {
      if (availablePoints >= 3 && availablePoints <= 6) {
        setPointsString('phointe');
      } else if (availablePoints >= 7 && availablePoints <= 10) {
        setPointsString('bpointe');
      } else {
        setPointsString('pointe');
      }
    }
  }, [availablePoints]);

  return (
    <FullSizeCenteredFlexBox alignItems="center" sx={{ position: 'relative' }}>
      <Typography
        pt={-0.5}
        px={0.5}
        variant="h6"
        sx={{
          position: 'absolute',

          visibility:
            mostRecentPenalty === 0 ? 'hidden' : showMostRecentPenalty ? 'visible' : 'hidden',
          top: -10,
          left: 50,
          color: 'red',
        }}
      >{`-${mostRecentPenalty}`}</Typography>
      <Typography
        variant={showMostRecentPenalty ? 'h5' : 'h6'}
        fontWeight={showMostRecentPenalty ? 'bold' : 'normal'}
        px={1}
        borderRadius={100}
        sx={{
          visibility: availablePoints > 0 ? 'visible' : 'hidden',
        }}
      >
        {availablePoints}
      </Typography>
      <Typography ml={-0.5} variant="body1">
        {pointsString}
      </Typography>
    </FullSizeCenteredFlexBox>
  );
};

export default PointsAvailable;
