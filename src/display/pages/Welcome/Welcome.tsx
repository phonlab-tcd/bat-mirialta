/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import Box from '@mui/material/Box';

import Meta from '@/display/components/Meta';
import RobotImage from '@/display/components/RobotImage';
import { CenteredFlexBox } from '@/display/components/styled';
import ChatHistories from '@/display/controllers/ChatHistories';
import ContinueChatOrNew from '@/display/controllers/ContinueChatOrNew';
import Stats from '@/display/controllers/Stats';
import { usePopulateChats, useSetSelectedTaskFromActiveChat } from '@/hooks';
import { useAvailables, useGetAvailables } from '@/hooks/selectTask';
import usePopulateVerbsTensesForms from '@/hooks/tasks/usePopulateVerbsTensesForms';
import { useSession } from '@/store/auth';
import { useChats } from '@/store/chats';
import { useVerbs } from '@/store/scripts';

const Welcome = () => {
  useAvailables();
  useGetAvailables();
  useSetSelectedTaskFromActiveChat();
  const { verbs } = useVerbs();
  const { chats } = useChats();
  const { session } = useSession();
  const populateVerbsTensesForms = usePopulateVerbsTensesForms();
  const populateChats = usePopulateChats();

  useEffect(() => {
    // reset the question set, so no redirect to chat
    if (verbs.length === 0) {
      populateVerbsTensesForms();
    }

    if (chats.length === 0 && session !== null) {
      populateChats(session.user.id);
    }
  }, [session]);

  return (
    <Box>
      <Meta title="Welcome" />
      <CenteredFlexBox p={2}>
        <RobotImage />
      </CenteredFlexBox>

      <CenteredFlexBox>
        <ContinueChatOrNew />
      </CenteredFlexBox>

      <CenteredFlexBox mt={2}>
        <Stats />
      </CenteredFlexBox>

      <CenteredFlexBox mt={2}>
        <ChatHistories />
      </CenteredFlexBox>
    </Box>
  );
};

export default Welcome;
