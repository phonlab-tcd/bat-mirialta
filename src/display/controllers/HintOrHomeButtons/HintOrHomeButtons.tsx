import { useRecoilValue } from 'recoil';

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import { AbIconButton } from 'abair-components';

import { CenteredFlexBox } from '@/display/components/styled';
import { useGenerateHint } from '@/hooks';
import { useAwaitingHint } from '@/store/adjacencyPairs';
import { useAnimatingResponses } from '@/store/animate';
import { showHintState, useShowPoints } from '@/store/points';

const HintOrHomeButtons = () => {
  const { awaitingHint } = useAwaitingHint();
  const { showPoints } = useShowPoints();
  const showHint = useRecoilValue(showHintState);

  const generateHint = useGenerateHint();
  const { animatingResponses } = useAnimatingResponses();

  return (
    <CenteredFlexBox width={'100%'} height={'100%'}>
      {showPoints && showHint && !awaitingHint && !animatingResponses ? (
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

export default HintOrHomeButtons;
