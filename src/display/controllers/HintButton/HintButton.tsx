import { useRecoilValue } from 'recoil';

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import { AbIconButton } from 'abair-components';

import { CenteredFlexBox } from '@/display/components/styled';
import { useGenerateHint } from '@/hooks';
import { useAwaitingHint } from '@/store/adjacencyPairs';
import { useAnimatingOutro } from '@/store/animate';
import { useAnimatingResponses } from '@/store/animate';
import { activeChatState } from '@/store/chats';
import { showHintState, useShowPoints } from '@/store/points';

const HintButton = () => {
  const { awaitingHint } = useAwaitingHint();
  const { showPoints } = useShowPoints();
  const showHint = useRecoilValue(showHintState);
  const activeChat = useRecoilValue(activeChatState);
  const { animatingOutro } = useAnimatingOutro();

  const generateHint = useGenerateHint();
  const { animatingResponses } = useAnimatingResponses();

  return (
    <CenteredFlexBox width={'100%'} height={'100%'}>
      {showPoints &&
      showHint &&
      !awaitingHint &&
      !animatingResponses &&
      !animatingOutro &&
      activeChat ? (
        <AbIconButton
          icon={QuestionMarkIcon}
          onClick={() => {
            generateHint();
          }}
          color={'info'}
          fontSize={'medium'}
        />
      ) : null}
    </CenteredFlexBox>
  );
};

export default HintButton;
