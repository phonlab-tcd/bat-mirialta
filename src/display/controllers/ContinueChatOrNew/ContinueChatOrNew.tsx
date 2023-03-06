/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';

import { AbButton } from 'abair-components';

import { CenteredFlexBox } from '@/display/components/styled';
import { patchChat } from '@/services/supabase/chats';
import { useSession } from '@/store/auth';
import { useChats } from '@/store/chats';

const ContinueChatOrNew = () => {
  const navigate = useNavigate();
  const { session } = useSession();
  const { chats, setChats } = useChats();

  const continueChat = (cont: boolean) => {
    if (cont) {
      navigate('/chat');
    } else {
      if (session !== null) {
        patchChat(session.user.id, false).then((c) => {
          setChats([...chats, c]);
          console.log('chat updated successfully');
        });
      }
    }
  };

  return (
    <Box
      sx={{ backgroundColor: '#67add6' }}
      width={300}
      border={4}
      borderRadius={3}
      borderColor={'#3e435a'}
      p={2}
    >
      <Box>
        <CenteredFlexBox
          sx={{ backgroundColor: '#67add6' }}
          border={4}
          borderRadius={3}
          borderColor={'#3e435a'}
        >
          <AbButton
            size="large"
            fullWidth={true}
            label="continue"
            onClick={() => {
              continueChat(false);
            }}
            selected={true}
            color="secondary"
          />
        </CenteredFlexBox>
        <CenteredFlexBox
          sx={{ backgroundColor: '#67add6' }}
          border={4}
          borderRadius={3}
          borderColor={'#3e435a'}
          mt={2}
        >
          <AbButton
            size="large"
            fullWidth={true}
            label="start new"
            onClick={() => {
              continueChat(true);
            }}
            selected={true}
            color="secondary"
          />
        </CenteredFlexBox>
      </Box>
    </Box>
  );
};

export default ContinueChatOrNew;
