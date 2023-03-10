/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import BatBox from '@/display/components/BatBox';
import ChatHistory from '@/display/components/ChatHistory';
import { FullSizeCenteredFlexBox } from '@/display/components/styled';
import { useChats } from '@/store/chats';

const ChatHistories = () => {
  const { chats } = useChats();

  return (
    <BatBox>
      <Box>
        <Typography fontSize={22} color="#3e435a" fontFamily={'Comic Neue'} align="center">
          My Chat History
        </Typography>
        <Grid container mt={2}>
          <Grid item xs={2.25}>
            <FullSizeCenteredFlexBox>
              <Typography fontWeight="bold">Date</Typography>
            </FullSizeCenteredFlexBox>
          </Grid>
          <Grid item xs={2.25}>
            <FullSizeCenteredFlexBox>
              <Typography fontWeight="bold">verb</Typography>
            </FullSizeCenteredFlexBox>
          </Grid>
          <Grid item xs={2.25}>
            <FullSizeCenteredFlexBox>
              <Typography fontWeight="bold">tense</Typography>
            </FullSizeCenteredFlexBox>
          </Grid>
          <Grid item xs={2.25}>
            <FullSizeCenteredFlexBox>
              <Typography fontWeight="bold">form</Typography>
            </FullSizeCenteredFlexBox>
          </Grid>
        </Grid>
        {chats.map((chat, i) => chat.complete && <ChatHistory key={i} chat={chat} />)}
      </Box>
    </BatBox>
  );
};

export default ChatHistories;
