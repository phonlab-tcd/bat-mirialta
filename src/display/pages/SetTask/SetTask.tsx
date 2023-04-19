/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeAnimation } from 'react-type-animation';

import Box from '@mui/material/Box';

import Meta from '@/display/components/Meta';
import RobotImage from '@/display/components/RobotImage';
import { CenteredFlexBox } from '@/display/components/styled';
import SetVerbTenseForm from '@/display/controllers/SetVerbTenseForm';
import { usePopulateChats, useSetSelectedTaskFromActiveChat } from '@/hooks';
import { useAvailables, useGetAvailables } from '@/hooks/selectTask';
import usePopulateVerbsTensesForms from '@/hooks/tasks/usePopulateVerbsTensesForms';
import { useSession } from '@/store/auth';
import { useChats } from '@/store/chats';
import { useVerbs } from '@/store/scripts';

const SetTask = () => {
  useAvailables();
  useGetAvailables();
  useSetSelectedTaskFromActiveChat();
  const { verbs } = useVerbs();
  const { chats } = useChats();
  const { session } = useSession();
  const populateVerbsTensesForms = usePopulateVerbsTensesForms();
  const populateChats = usePopulateChats();
  const { t } = useTranslation();

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
      <Meta title="SetTask" />
      <CenteredFlexBox p={2}>
        <RobotImage />
      </CenteredFlexBox>
      <CenteredFlexBox py={1}>
        <Box width={400} height={130} px={2}>
          <TypeAnimation
            style={{ whiteSpace: 'pre', minHeight: 130, width: '100%' }}
            sequence={[
              1000,
              String(t('instructions.chooseTask.text_01')),
              200,
              String(t('instructions.chooseTask.text_02')),
              200,
              String(t('instructions.chooseTask.text_03')),
              500,
              String(t('instructions.chooseTask.text_04')),
              200,
              String(t('instructions.chooseTask.text_05')),
              200,
              String(t('instructions.chooseTask.text_06')),
              500,
              String(t('instructions.chooseTask.text_07')),
              500,
              String(t('instructions.chooseTask.text_08')),
              400,
              String(t('instructions.chooseTask.text_09')),
              400,
              String(t('instructions.chooseTask.text_10')),
              500,
              String(t('instructions.chooseTask.text_11')),
            ]}
            wrapper="span"
            cursor={true}
            repeat={0}
          />
        </Box>
      </CenteredFlexBox>
      <CenteredFlexBox>
        <SetVerbTenseForm />
      </CenteredFlexBox>
    </Box>
  );
};

export default SetTask;
