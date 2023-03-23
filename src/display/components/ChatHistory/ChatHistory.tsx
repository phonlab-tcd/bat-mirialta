import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { AbButton } from 'abair-components';
import dayjs from 'dayjs';

import BatBox from '@/display/components/BatBox';
import { FlexBox, FullSizeCenteredFlexBox } from '@/display/components/styled';

import { Database } from '../../../../types/supabase';

interface ChatHistoryProps {
  chat: Database['public']['Tables']['bat_chats']['Row'];
}

const ChatHistory = ({ chat }: ChatHistoryProps) => {
  const navigate = useNavigate();
  return (
    <Box mt={1}>
      <Grid container>
        <Grid item xs={2.25}>
          <FullSizeCenteredFlexBox>
            <Typography>{dayjs(chat.created_at).format('D MMM')}</Typography>
          </FullSizeCenteredFlexBox>
        </Grid>
        <Grid item xs={2.25}>
          <FullSizeCenteredFlexBox>
            <Typography>{chat.verb === null ? 'all' : chat.verb}</Typography>
          </FullSizeCenteredFlexBox>
        </Grid>
        <Grid item xs={2.25}>
          <FullSizeCenteredFlexBox>
            <Typography>{chat.tense === null ? 'all' : chat.tense}</Typography>
          </FullSizeCenteredFlexBox>
        </Grid>
        <Grid item xs={2.25}>
          <FullSizeCenteredFlexBox>
            <Typography>{chat.form === null ? 'all' : chat.form}</Typography>
          </FullSizeCenteredFlexBox>
        </Grid>
        <Grid item xs={3}>
          <FlexBox width="100%" justifyContent="flex-end">
            <BatBox button={true} width={72}>
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
          </FlexBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatHistory;
