/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import Grid from '@mui/material/Grid';

import { AbButton } from 'abair-components';

import BatBox from '@/display/components/BatBox';
import { CenteredFlexBox } from '@/display/components/styled';
import PointsAvailable from '@/display/controllers/PointsAvailable';
import TotalPoints from '@/display/controllers/TotalPoints';
import { useShowAvailablePoints, useShowPoints } from '@/store/points';

const ChatButtons = () => {
  const { showAvailablePoints } = useShowAvailablePoints();
  const { showPoints } = useShowPoints();

  return (
    <CenteredFlexBox width={'100%'}>
      <BatBox width={'95%'} height={'100%'}>
        {showPoints && (
          <Grid container>
            <Grid item xs={6}>
              <BatBox button={true}>
                <AbButton
                  size="medium"
                  fullWidth={true}
                  label={`hint`}
                  onClick={() => {
                    console.log('hi');
                  }}
                  selected={true}
                  color={'secondary'}
                />
              </BatBox>
            </Grid>
            <Grid item xs={3}>
              {showAvailablePoints && <PointsAvailable />}
            </Grid>
            <Grid item xs={3}>
              <TotalPoints />
            </Grid>
          </Grid>
        )}
      </BatBox>
    </CenteredFlexBox>
  );
};

export default ChatButtons;
