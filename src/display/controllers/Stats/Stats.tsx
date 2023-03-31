/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { AbButton } from 'abair-components';

import BatBox from '@/display/components/BatBox';
import { FullSizeBox } from '@/display/components/styled';
import ChartAllPoints from '@/display/controllers/ChartAllPoints';
import { getAllPoints } from '@/services/supabase';
import { useSession } from '@/store/auth';
import { calculateChatPointsCumFreq } from '@/utils/points';

const Stats = () => {
  const navigate = useNavigate();
  const { session } = useSession();
  const [cumFreqArray, setCumFreqArray] = useState<number[]>([]);

  useEffect(() => {
    if (session) {
      getAllPoints(session.user.id).then((points: number[] | undefined) => {
        console.log('points: ', points);
        if (points) {
          const cumFreq = calculateChatPointsCumFreq(points);
          console.log('cumFreq: ', cumFreq);
          setCumFreqArray(Object.values(cumFreq));
        }
      });
    }
  }, []);

  return (
    <BatBox>
      <FullSizeBox>
        <Typography align="center">My Stats</Typography>
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
              label="more"
              onClick={() => {
                navigate('/chat');
              }}
              selected={true}
              color="secondary"
            />
          </BatBox>
        </Box>
      </FullSizeBox>
    </BatBox>
  );
};

export default Stats;
