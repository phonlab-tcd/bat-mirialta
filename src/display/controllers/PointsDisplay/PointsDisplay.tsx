import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import TotalPoints from '@/display/components/TotalPoints';
import { FullSizeCenteredFlexBox, FullSizeFlexBox } from '@/display/components/styled';
import { FullSizeBox } from '@/display/components/styled';
import PointsAvailable from '@/display/controllers/PointsAvailable';
import QuestionNumber from '@/display/controllers/QuestionNumber';
import { useShowPoints } from '@/store/points';
import { useShowAvailablePoints } from '@/store/points';
import { useTotalPoints } from '@/store/points';

const PointsDisplay = () => {
  const { showPoints } = useShowPoints();
  const { totalPoints } = useTotalPoints();
  const { t } = useTranslation();
  const { showAvailablePoints } = useShowAvailablePoints();

  return (
    <FullSizeBox minHeight={46}>
      {showPoints && (
        <Grid container height={46}>
          <Grid item xs={3}>
            <FullSizeCenteredFlexBox>
              <QuestionNumber />
            </FullSizeCenteredFlexBox>
          </Grid>

          <Grid item xs={3}>
            <FullSizeFlexBox>{showAvailablePoints && <PointsAvailable />}</FullSizeFlexBox>
          </Grid>

          <Grid item xs={6}>
            <FullSizeFlexBox justifyContent="flex-end">
              <Box
                width="60%"
                height="100%"
                sx={{ position: 'relative', backgroundColor: 'primary.data' }}
                borderRadius={2}
              >
                <FullSizeFlexBox>
                  <Grid container>
                    <Grid item xs={7}>
                      <FullSizeCenteredFlexBox>
                        <Typography variant={'body2'} align="right" color="#fff">
                          {t('subHeaders.total')}:
                        </Typography>
                      </FullSizeCenteredFlexBox>
                    </Grid>

                    <Grid item xs={5}>
                      <TotalPoints points={totalPoints} inChat={true} />
                    </Grid>
                  </Grid>
                </FullSizeFlexBox>
              </Box>
            </FullSizeFlexBox>
          </Grid>
        </Grid>
      )}
    </FullSizeBox>
  );
};

export default PointsDisplay;
