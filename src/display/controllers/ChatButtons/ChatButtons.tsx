/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Grid from '@mui/material/Grid';

import { AbButton } from 'abair-components';

import BatBox from '@/display/components/BatBox';
import { CenteredFlexBox } from '@/display/components/styled';
import PointsAvailable from '@/display/controllers/PointsAvailable';
import QuestionNumber from '@/display/controllers/QuestionNumber';
import TotalPoints from '@/display/controllers/TotalPoints';
import { useGenerateHint } from '@/hooks';
import { useAwaitingHint } from '@/store/adjacencyPairs';
import { showHintState, useShowAvailablePoints, useShowHome, useShowPoints } from '@/store/points';

const ChatButtons = () => {
  const { showAvailablePoints } = useShowAvailablePoints();
  const { awaitingHint } = useAwaitingHint();
  const { showPoints } = useShowPoints();
  const showHint = useRecoilValue(showHintState);
  const { showHome } = useShowHome();
  const navigate = useNavigate();
  const generateHint = useGenerateHint();

  return (
    <CenteredFlexBox width={'100%'} height={84}>
      {showPoints && (
        <BatBox width={'95%'} height={'100%'}>
          <Grid container height={'100%'}>
            <Grid item xs={2}>
              <QuestionNumber />
            </Grid>
            <Grid item xs={4}>
              {showHint && !awaitingHint ? (
                <CenteredFlexBox>
                  <BatBox button={true} width={'70%'}>
                    <AbButton
                      size="medium"
                      fullWidth={true}
                      label={`hint`}
                      onClick={() => {
                        generateHint();
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
