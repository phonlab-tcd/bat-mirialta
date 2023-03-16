/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import { AbButton } from 'abair-components';

import BatBox from '@/display/components/BatBox';
import { CenteredFlexBox } from '@/display/components/styled';
import PointsAvailable from '@/display/controllers/PointsAvailable';
import QuestionNumber from '@/display/controllers/QuestionNumber';
import TotalPoints from '@/display/controllers/TotalPoints';
import { useShowAvailablePoints, useShowHint, useShowHome, useShowPoints } from '@/store/points';

const ChatButtons = () => {
  const { showAvailablePoints } = useShowAvailablePoints();
  const { showPoints } = useShowPoints();
  const { showHint } = useShowHint();
  const { showHome } = useShowHome();
  const navigate = useNavigate();

  return (
    <CenteredFlexBox width={'100%'} height={84}>
      {showPoints && (
        <BatBox width={'95%'} height={'100%'}>
          <Grid container>
            <Grid item xs={2}>
              {showPoints && <QuestionNumber />}
            </Grid>
            <Grid item xs={4}>
              {showHint ? (
                <CenteredFlexBox>
                  <BatBox button={true} width={'70%'}>
                    <AbButton
                      size="medium"
                      fullWidth={true}
                      label={`hint`}
                      onClick={() => {
                        console.log('hi');
                      }}
                      selected={true}
                      color={'warning'}
                    />
                  </BatBox>
                </CenteredFlexBox>
              ) : showHome ? (
                <CenteredFlexBox>
                  <BatBox button={true} width={'70%'}>
                    <AbButton
                      size="medium"
                      fullWidth={true}
                      label={`abhaile`}
                      onClick={() => {
                        navigate('/');
                      }}
                      selected={true}
                      color={'secondary'}
                    />
                  </BatBox>
                </CenteredFlexBox>
              ) : null}
            </Grid>

            <Grid item xs={3}>
              {showAvailablePoints && <PointsAvailable />}
            </Grid>
            <Grid item xs={3}>
              <TotalPoints />
            </Grid>
          </Grid>
        </BatBox>
      )}
    </CenteredFlexBox>
  );
};

export default ChatButtons;
