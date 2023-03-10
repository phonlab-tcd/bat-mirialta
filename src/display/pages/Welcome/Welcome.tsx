/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import Box from '@mui/material/Box';

// import Typography from '@mui/material/Typography';
import Image from 'mui-image';

import Meta from '@/display/components/Meta';
import { CenteredFlexBox } from '@/display/components/styled';
import ChatHistories from '@/display/controllers/ChatHistories';
import ContinueChatOrNew from '@/display/controllers/ContinueChatOrNew';
import SetTask from '@/display/controllers/SetTask';
import Stats from '@/display/controllers/Stats';
import { usePopulateChats, useSetSelectedTaskFromActiveChat } from '@/hooks/chats';
import { useAvailables, useGetAvailables } from '@/hooks/selectTask';
import usePopulateVerbsTensesForms from '@/hooks/tasks/usePopulateVerbsTensesForms';
import { useSession } from '@/store/auth';
import { activeChatState, useChats } from '@/store/chats';
import { useQuestionSet } from '@/store/questions';
import { useVerbs } from '@/store/scripts';

import robotImg from '/assets/images/robot.png';

const Welcome = () => {
  useAvailables();
  useGetAvailables();
  useSetSelectedTaskFromActiveChat();
  const { verbs } = useVerbs();
  const { chats } = useChats();
  const { session } = useSession();
  const populateVerbsTensesForms = usePopulateVerbsTensesForms();
  const populateChats = usePopulateChats();
  const activeChat = useRecoilValue(activeChatState);
  const { setQuestionSet } = useQuestionSet();

  useEffect(() => {
    // reset the question set, so no redirect to chat
    setQuestionSet([]);
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

      {activeChat !== undefined ? (
        <CenteredFlexBox>
          <ContinueChatOrNew />
        </CenteredFlexBox>
      ) : (
        <CenteredFlexBox>
          <SetTask />
        </CenteredFlexBox>
      )}
      <CenteredFlexBox mt={2}>
        <ChatHistories />
      </CenteredFlexBox>
      <CenteredFlexBox mt={2}>
        <Stats />
      </CenteredFlexBox>
    </Box>
  );
};

export default Welcome;
