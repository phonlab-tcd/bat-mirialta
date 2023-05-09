/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import { AbButton } from 'abair-components';

import { basePath } from '@/config';
import BatBox from '@/display/components/BatBox';
// import { CenteredFlexBox, FullSizeCenteredFlexBox } from '@/display/components/styled';
import ChartAllPoints from '@/display/controllers/ChartAllPoints';
import PlayedChatStats from '@/display/controllers/PlayedChatStats';
import { getAllPoints } from '@/services/supabase';
import { useSession } from '@/store/auth';
import { useCumFreqArray, usePointsModalOpen } from '@/store/points';
import { calculateChatPointsCumFreq } from '@/utils/points';

const EndChatStats = () => {
  const navigate = useNavigate();
  const { cumFreqArray, setCumFreqArray } = useCumFreqArray();
  const { pointsModalOpen, setPointsModalOpen } = usePointsModalOpen();
  const { session } = useSession();
  const { t } = useTranslation();

  useEffect(() => {
    if (session !== null) {
      getAllPoints(session.user.id).then((points: number[] | undefined) => {
        if (points) {
          const cumFreq = calculateChatPointsCumFreq(points);
          setCumFreqArray(Object.values(cumFreq));
        }
      });
    }
  }, [session]);

  return (
    <Modal
      open={pointsModalOpen}
      onClose={() => {
        setPointsModalOpen(false);
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ outline: 'none' }}>
        <Box width={374}>
          <BatBox width={'100%'} height={386}>
            <Typography align="center" variant="h6">
              {t('headers.stats')}
            </Typography>
            <Box width={'100%'}>
              <PlayedChatStats />
            </Box>

            <Box width={'100%'} height={200} sx={{ position: 'relative' }}>
              <Box width={'93%'} height={'100%'} sx={{ position: 'absolute', left: -10 }}>
                <ChartAllPoints cumFreq={cumFreqArray} />
              </Box>
            </Box>
            <Box mt={2}>
              <BatBox button={true} width={'100%'}>
                <AbButton
                  size="large"
                  fullWidth={true}
                  label={t('buttons.home')}
                  onClick={() => {
                    setPointsModalOpen(false);
                    navigate(`${basePath}`);
                  }}
                  selected={true}
                  color="secondary"
                />
              </BatBox>
            </Box>
          </BatBox>
        </Box>
      </div>
    </Modal>
  );
};

export default EndChatStats;
