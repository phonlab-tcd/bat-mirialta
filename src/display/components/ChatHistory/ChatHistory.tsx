import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import dayjs from 'dayjs';

import TotalPoints from '@/display/components/TotalPoints';
import { FullSizeCenteredFlexBox } from '@/display/components/styled';

import { Database } from '../../../../types/supabase';

interface ChatHistoryProps {
  chat: Database['public']['Tables']['bat_chats']['Row'];
}

const ChatHistory = ({ chat }: ChatHistoryProps) => {
  const { t } = useTranslation();
  return (
    <Box mt={1} py={0.5} sx={{ backgroundColor: 'primary.light' }} borderRadius={2}>
      <Grid container>
        <Grid item xs={3}>
          <FullSizeCenteredFlexBox flexDirection={'column'}>
            <Typography fontFamily={'Helvetica'} align="center">
              {`${dayjs(chat.created_at).format('D')} ${t(
                'months.' + dayjs(chat.created_at).format('MMM').toLowerCase(),
              )}`}
            </Typography>
          </FullSizeCenteredFlexBox>
        </Grid>
        <Grid item xs={6}>
          <FullSizeCenteredFlexBox flexDirection={'column'}>
            <Typography fontFamily={'Helvetica'} sx={{ marginBottom: -0.5 }}>
              {chat.verb === null ? t('subHeaders.all') : chat.verb}
            </Typography>
            <Typography fontFamily={'Helvetica'}>
              {chat.tense === null ? t('subHeaders.all') : chat.tense}
            </Typography>
            <Typography fontFamily={'Helvetica'} sx={{ marginTop: -0.5 }}>
              {chat.form === null ? t('subHeaders.all') : chat.form}
            </Typography>
          </FullSizeCenteredFlexBox>
        </Grid>
        <Grid item xs={3}>
          <FullSizeCenteredFlexBox flexDirection={'column'}>
            <Box height={35} width={50} sx={{ backgroundColor: 'gold' }} borderRadius={1}>
              <TotalPoints points={chat.points !== null ? chat.points : 0} />
            </Box>
          </FullSizeCenteredFlexBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatHistory;
