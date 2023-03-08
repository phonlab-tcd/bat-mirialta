/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilValue } from 'recoil';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { CenteredFlexBox } from '@/display/components/styled';
import { activeChatState } from '@/store/chats';

const ChatInProgress = () => {
  const activeChat = useRecoilValue(activeChatState);

  return activeChat ? (
    <Box>
      <Box>
        <Typography mb={2} align="center">
          You already have a chat in progress
        </Typography>
      </Box>
      <Box my={2}>
        <CenteredFlexBox>
          <Typography>verb:</Typography>
          <Typography fontWeight="bold">
            {activeChat.verb !== null ? activeChat.verb : 'all'}
          </Typography>
        </CenteredFlexBox>
        <CenteredFlexBox>
          <Typography>tense: </Typography>
          <Typography fontWeight="bold">
            {activeChat.tense !== null ? activeChat.tense : 'all'}
          </Typography>
        </CenteredFlexBox>
        <CenteredFlexBox>
          <Typography>form: </Typography>
          <Typography fontWeight="bold">
            {activeChat.form !== null ? activeChat.form : 'all'}
          </Typography>
        </CenteredFlexBox>
      </Box>
    </Box>
  ) : null;
};

export default ChatInProgress;
