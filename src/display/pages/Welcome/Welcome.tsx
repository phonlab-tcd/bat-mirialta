/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeAnimation } from 'react-type-animation';

import Box from '@mui/material/Box';

import Meta from '@/display/components/Meta';
import RobotImage from '@/display/components/RobotImage';
import { CenteredFlexBox } from '@/display/components/styled';
import ChatHistories from '@/display/controllers/ChatHistories';
import ContinueChatOrNew from '@/display/controllers/ContinueChatOrNew';
import LoginSignup from '@/display/controllers/LoginSignup';
import Stats from '@/display/controllers/Stats';
import { usePopulateChats, useSetSelectedTaskFromActiveChat } from '@/hooks';
import { useAvailables, useGetAvailables } from '@/hooks/selectTask';
import usePopulateVerbsTensesForms from '@/hooks/tasks/usePopulateVerbsTensesForms';
import { useSession } from '@/store/auth';
import { useChats } from '@/store/chats';
import { useVerbs } from '@/store/scripts';

const Welcome = () => {
  const { i18n } = useTranslation();

  useAvailables();
  useGetAvailables();
  useSetSelectedTaskFromActiveChat();
  // const [showHistory, setShowHistory] = useState(false);
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

    // if (chats.filter((ch) => ch.complete && ch.points !== null).length > 0) {
    //   console.log('chats:', chats);
    //   // setShowHistory(true);
    // }
  }, [session]);

  return (
    <Box py={2}>
      <Meta title="Welcome" />
      <CenteredFlexBox>
        <RobotImage />
      </CenteredFlexBox>
      <CenteredFlexBox py={1} px={2} flexDirection="column">
        <Box px={1} width={400}>
          <Box
            width={'100%'}
            height={'100%'}
            sx={{ display: i18n.language === 'ga' ? 'block' : 'none' }}
          >
            <TypeAnimation
              style={{ whiteSpace: 'pre-wrap', minHeight: 170, width: '100%' }}
              sequence={[
                1000,
                'Fáilte isteach sa Bhat Mírialta, ',
                200,
                'Fáilte isteach sa Bhat Mírialta, do chuiditheoir ',
                500,
                'Fáilte isteach sa Bhat Mírialta, do chuiditheoir le briathra mírialta.',
              ]}
              wrapper="span"
              cursor={true}
              repeat={0}
            />
          </Box>
        </Box>
        <Box px={1} width={400}>
          <Box
            width={'100%'}
            height={'100%'}
            sx={{ display: i18n.language === 'en' ? 'block' : 'none' }}
          >
            <TypeAnimation
              style={{ whiteSpace: 'pre-wrap', minHeight: 170, width: '100%' }}
              sequence={[
                1000,
                'Welcome to ',
                200,
                'Welcome to Bat Mírialta,',
                500,
                'Welcome to Bat Mírialta, your irregular verb helper.',
              ]}
              wrapper="span"
              cursor={true}
              repeat={0}
            />
          </Box>
        </Box>
      </CenteredFlexBox>

      {session ? (
        <Box>
          <CenteredFlexBox mt={1}>
            <ContinueChatOrNew />
          </CenteredFlexBox>

          <Box>
            <CenteredFlexBox mt={2}>
              <Stats />
            </CenteredFlexBox>

            <CenteredFlexBox mt={2}>
              <ChatHistories />
            </CenteredFlexBox>
          </Box>
        </Box>
      ) : (
        <CenteredFlexBox mt={1}>
          <LoginSignup />
        </CenteredFlexBox>
      )}
    </Box>
  );
};

export default Welcome;
