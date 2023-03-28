import Grid from '@mui/material/Grid';

import { FullSizeCenteredFlexBox } from '@/display/components/styled';
import { FullSizeBox } from '@/display/components/styled';
import PointsAvailable from '@/display/controllers/PointsAvailable';
import QuestionNumber from '@/display/controllers/QuestionNumber';
import TotalPoints from '@/display/controllers/TotalPoints';
import { useShowPoints } from '@/store/points';
import { useShowAvailablePoints } from '@/store/points';

const PointsDisplay = () => {
  const { showPoints } = useShowPoints();

  const { showAvailablePoints } = useShowAvailablePoints();

  return (
    <FullSizeBox minHeight={42}>
      {showPoints && (
        <Grid container>
          <Grid item xs={5}></Grid>

          <Grid item xs={2}>
            <FullSizeCenteredFlexBox>
              <QuestionNumber />
            </FullSizeCenteredFlexBox>
          </Grid>
          <Grid item xs={3}>
            <FullSizeCenteredFlexBox>
              {showAvailablePoints && <PointsAvailable />}
            </FullSizeCenteredFlexBox>
          </Grid>
          <Grid item xs={2}>
            <TotalPoints />
          </Grid>
        </Grid>
      )}
    </FullSizeBox>
  );
};

export default PointsDisplay;
