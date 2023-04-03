import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { AbButton } from 'abair-components';
import dayjs from 'dayjs';

import BatBox from '@/display/components/BatBox';
import TotalPoints from '@/display/components/TotalPoints';
import { FullSizeCenteredFlexBox } from '@/display/components/styled';

import { Database } from '../../../../types/supabase';

interface ChatHistoryProps {
  chat: Database['public']['Tables']['bat_chats']['Row'];
}

const ChatHistory = ({ chat }: ChatHistoryProps) => {
  const navigate = useNavigate();
  return (
    <Box mt={1} py={0.5} sx={{ backgroundColor: 'primary.light' }} borderRadius={2}>
      <Grid container>
        <Grid item xs={3}>
          <FullSizeCenteredFlexBox flexDirection={'column'}>
            <Typography fontFamily={'Helvetica'} align="center">
              {dayjs(chat.created_at).format('D MMM')}
            </Typography>
            <Box height={35} width={50} sx={{ backgroundColor: 'gold' }} borderRadius={1}>
              <TotalPoints points={chat.points !== null ? chat.points : 0} />
            </Box>
          </FullSizeCenteredFlexBox>
        </Grid>
        <Grid item xs={6}>
          <FullSizeCenteredFlexBox flexDirection={'column'}>
            <Typography fontFamily={'Helvetica'} sx={{ marginBottom: -0.5 }}>
              {chat.verb === null ? 'all' : chat.verb}
            </Typography>
            <Typography fontFamily={'Helvetica'}>
              {chat.tense === null ? 'all' : chat.tense}
            </Typography>
            <Typography fontFamily={'Helvetica'} sx={{ marginTop: -0.5 }}>
              {chat.form === null ? 'all' : chat.form}
            </Typography>
          </FullSizeCenteredFlexBox>
        </Grid>
        <Grid item xs={3}>
          <FullSizeCenteredFlexBox>
            <BatBox button={true} width={68} height={40.5}>
              <AbButton
                size="medium"
                fullWidth={false}
                label={`>`}
                onClick={() => {
                  navigate('/');
                }}
                selected={true}
                color={'secondary'}
              />
            </BatBox>
          </FullSizeCenteredFlexBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatHistory;
