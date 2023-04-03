import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import BatBox from '@/display/components/BatBox';
import TotalPoints from '@/display/components/TotalPoints';
import { FullSizeCenteredFlexBox } from '@/display/components/styled';
import { FullSizeBox } from '@/display/components/styled';
import { FullSizeFlexBox } from '@/display/components/styled';
import PointsAvailable from '@/display/controllers/PointsAvailable';
import QuestionNumber from '@/display/controllers/QuestionNumber';
import { useShowPoints } from '@/store/points';
import { useShowAvailablePoints } from '@/store/points';
import { useTotalPoints } from '@/store/points';

const PointsDisplay = () => {
  const { showPoints } = useShowPoints();
  const { totalPoints } = useTotalPoints();

  const { showAvailablePoints } = useShowAvailablePoints();

  return (
    <FullSizeBox minHeight={36}>
      {showPoints && (
        <Grid container>
          <Grid item xs={2}>
            <FullSizeCenteredFlexBox>
              <QuestionNumber />
            </FullSizeCenteredFlexBox>
          </Grid>

          <Grid item xs={1}></Grid>
          <Grid item xs={6}>
            <FullSizeCenteredFlexBox>
              {showAvailablePoints && <PointsAvailable />}
            </FullSizeCenteredFlexBox>
          </Grid>
          <Grid item xs={3}>
            <FullSizeFlexBox justifyContent="flex-end">
              <Box width="80%">
                <BatBox button={true} backgroundColor="gold">
                  <TotalPoints points={totalPoints} />
                </BatBox>
              </Box>
            </FullSizeFlexBox>
          </Grid>
        </Grid>
      )}
    </FullSizeBox>
  );
};

export default PointsDisplay;