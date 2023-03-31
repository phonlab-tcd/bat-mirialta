/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Box from '@mui/material/Box';

import { AbButton } from 'abair-components';

import BatBox from '@/display/components/BatBox';
// import ChatInProgress from '@/display/controllers/ChatInProgress';
import { patchChatComplete } from '@/services/supabase';
import { useAdjacencyPairs } from '@/store/adjacencyPairs';
import { useSession } from '@/store/auth';
import { activeChatState, useChats } from '@/store/chats';

const ContinueChatOrNew = () => {
  const navigate = useNavigate();
  const { session } = useSession();
  const { chats, setChats } = useChats();
  const activeChat = useRecoilValue(activeChatState);
  const { setAdjacencyPairs } = useAdjacencyPairs();

  const continueChat = (cont: boolean) => {
    if (cont) {
      navigate('/chat');
    } else {
      if (session !== null && activeChat !== undefined) {
        console.log('finishing previously unfinished chat');
        patchChatComplete(activeChat.id, null, true, null).then((c) => {
          setAdjacencyPairs([]);
          setChats([...chats.slice(0, chats.length - 1), c]);
        });
      }
      navigate('/set-task');
    }
  };

  return (
    <BatBox>
      <Box>
        {activeChat && (
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
        )}
      </Box>

      <Box mt={activeChat ? 1 : 0}>
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
