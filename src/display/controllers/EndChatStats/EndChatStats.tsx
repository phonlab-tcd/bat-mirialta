/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import { AbButton } from 'abair-components';

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
    >
      <Box
        sx={{
          width: '90%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <BatBox width={'100%'}>
          <Typography align="center" variant="h6">
            Stats
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
                label="abhaile"
                onClick={() => {
                  navigate('/');
                }}
                selected={true}
                color="secondary"
              />
            </BatBox>
          </Box>
        </BatBox>
      </Box>
    </Modal>
  );
};

export default EndChatStats;
