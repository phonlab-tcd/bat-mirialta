/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import Grid from '@mui/material/Grid';

import { FullSizeCenteredFlexBox } from '@/display/components/styled';
import { CenteredFlexBox } from '@/display/components/styled';
import PointsAvailable from '@/display/controllers/PointsAvailable';
import QuestionNumber from '@/display/controllers/QuestionNumber';
import TotalPoints from '@/display/controllers/TotalPoints';
import { useAwaitingHint } from '@/store/adjacencyPairs';
import { useAnimatingResponses } from '@/store/animate';
import { showHintState, useShowPoints } from '@/store/points';
import { useShowAvailablePoints } from '@/store/points';

const ChatButtons = () => {
  const { awaitingHint } = useAwaitingHint();
  const { showPoints } = useShowPoints();
  const showHint = useRecoilValue(showHintState);

  const { animatingResponses } = useAnimatingResponses();
  const { showAvailablePoints } = useShowAvailablePoints();

  useEffect(() => {
    console.log('showHint', showHint);
    console.log('awaitingHint', awaitingHint);
    console.log('animatingResponses', animatingResponses);
  }, []);

  return (
    <CenteredFlexBox width={'100%'} height={64}>
      {showPoints && (
        // <BatBox width={'95%'} height={'100%'}>
        <Grid container height={'100%'}>
          <Grid item xs={5}></Grid>
          <Grid item xs={2}>
            <FullSizeCenteredFlexBox>
              <QuestionNumber />
            </FullSizeCenteredFlexBox>
          </Grid>
          <Grid item xs={2.5}>
            {showAvailablePoints && <PointsAvailable />}
          </Grid>

          <Grid item xs={2.5}>
            <TotalPoints />
          </Grid>
        </Grid>
        // </BatBox>
      )}
    </CenteredFlexBox>
  );
};

export default ChatButtons;
