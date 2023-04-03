/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { AbButton } from 'abair-components';

import BatBox from '@/display/components/BatBox';
import ChatHistory from '@/display/components/ChatHistory';
import { useChats } from '@/store/chats';

interface ChatHistoriesProps {
  showHowMany: number;
}

const ChatHistories = ({ showHowMany = 3 }: ChatHistoriesProps) => {
  const { chats } = useChats();

  return (
    <BatBox>
      <Box mb={2}>
        <Typography variant={'h6'} align="center">
          History
        </Typography>

        {chats.map(
          (chat, i) => chat.complete && i < showHowMany && <ChatHistory key={i} chat={chat} />,
        )}
      </Box>
      {chats.filter((c) => c.complete).length > 0 && (
        <BatBox button={true} width={'100%'}>
          <AbButton
            size="large"
            fullWidth={true}
            label="see all"
            onClick={() => {
              console.log('show all history');
            }}
            selected={true}
            color="secondary"
          />
        </BatBox>
      )}
    </BatBox>
  );
};

export default ChatHistories;
