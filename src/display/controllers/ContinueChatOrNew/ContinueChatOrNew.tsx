/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Box from '@mui/material/Box';

import { AbButton } from 'abair-components';

import BatBox from '@/display/components/BatBox';
import ChatInProgress from '@/display/controllers/ChatInProgress';
import { patchChat } from '@/services/supabase';
import { useSession } from '@/store/auth';
import { activeChatState, useChats } from '@/store/chats';

const ContinueChatOrNew = () => {
  const navigate = useNavigate();
  const { session } = useSession();
  const { chats, setChats } = useChats();
  const activeChat = useRecoilValue(activeChatState);

  const continueChat = (cont: boolean) => {
    if (cont) {
      navigate('/chat');
    } else {
      if (session !== null && activeChat !== undefined) {
        patchChat(activeChat.id, true).then((c) => {
          setChats([...chats.slice(0, chats.length - 1), c]);
          console.log('chat updated successfully');
        });
      }
    }
  };

  return (
    <BatBox>
      <Box>
        <ChatInProgress />
        <BatBox button={true} width={'100%'}>
          <AbButton
            size="large"
            fullWidth={true}
            label="continue"
            onClick={() => {
              continueChat(true);
            }}
            selected={true}
            color="secondary"
          />
        </BatBox>
      </Box>

      <Box mt={2}>
        <BatBox button={true} width={'100%'}>
          <AbButton
            size="large"
            fullWidth={true}
            label="start new"
            onClick={() => {
              continueChat(false);
            }}
            selected={true}
            color="secondary"
          />
        </BatBox>
      </Box>
    </BatBox>
  );
};

export default ContinueChatOrNew;
