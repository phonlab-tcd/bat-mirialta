/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { AbButton } from 'abair-components';

import BatBox from '@/display/components/BatBox';
import ChatHistory from '@/display/components/ChatHistory';
import { useChats } from '@/store/chats';

interface ChatHistoriesProps {
  showHowMany?: number;
}

const ChatHistories = ({ showHowMany = 3 }: ChatHistoriesProps) => {
  const { chats } = useChats();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <BatBox>
      <Box mb={2}>
        <Typography variant={'h6'} align="center">
          {t('pageTitles.history')}
        </Typography>

        {chats
          .slice(0)
          .reverse()
          .filter((c) => c.complete && c.points !== null)
          .map((chat, i) => i < showHowMany && <ChatHistory key={i} chat={chat} />)}
      </Box>
      {chats.filter((c) => c.complete && c.points !== null).length !== 0 && showHowMany === 3 && (
        <BatBox button={true} width={'100%'}>
          <AbButton
            size="large"
            fullWidth={true}
            label={t('buttons.seeAll')}
            onClick={() => {
              navigate(`/history`);
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
