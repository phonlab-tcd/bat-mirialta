/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// import Typography from '@mui/material/Typography';
import Image from 'mui-image';

import Meta from '@/display/components/Meta';
import { CenteredFlexBox } from '@/display/components/styled';
import ContinueChatOrNew from '@/display/controllers/ContinueChatOrNew';
import SetTask from '@/display/controllers/SetTask';
import usePopulateChats from '@/hooks/chats/usePopulateChats';
import { useAvailables, useGetAvailables } from '@/hooks/selectTask';
import usePopulateVerbsTensesForms from '@/hooks/tasks/usePopulateVerbsTensesForms';
import { useSession } from '@/store/auth';
import { mostRecentChatState, useChats } from '@/store/chats';
import { useVerbs } from '@/store/scripts';

import robotImg from '/assets/images/robot.png';

const Welcome = () => {
  useAvailables();
  useGetAvailables();
  const { verbs } = useVerbs();
  const { chats } = useChats();
  const { session } = useSession();
  const populateVerbsTensesForms = usePopulateVerbsTensesForms();
  const populateChats = usePopulateChats();
  const mostRecentChat = useRecoilValue(mostRecentChatState);

  useEffect(() => {
    console.log('first load of tasks and chats');
    if (verbs.length === 0) {
      populateVerbsTensesForms();
    }

    if (chats.length === 0 && session !== null) {
      console.log('populating chats');
      populateChats(session.user.id);
    }
  }, [session]);

  useEffect(() => {
    console.log('chats:', chats);
  }, [chats]);

  return (
    <Box>
      <Meta title="Welcome" />
      <CenteredFlexBox p={2}>
        <Image
          duration={1000}
          height={150}
          width={150}
          easing="ease-out"
          alt="Abair Applications"
          src={robotImg}
          showLoading
        />
      </CenteredFlexBox>
      <Box>
        {mostRecentChat !== undefined && !mostRecentChat.complete ? (
          <Box>
            <Typography align="center">Already A chat in progress. Would you like to</Typography>
            <Typography align="center">New Chat</Typography>
            <CenteredFlexBox>
              <ContinueChatOrNew />
            </CenteredFlexBox>
          </Box>
        ) : (
          <CenteredFlexBox>
            <SetTask />
          </CenteredFlexBox>
        )}
      </Box>
    </Box>
  );
};

export default Welcome;
