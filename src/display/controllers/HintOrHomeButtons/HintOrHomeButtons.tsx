/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import HomeIcon from '@mui/icons-material/Home';

import { AbIconButton } from 'abair-components';

import BatBox from '@/display/components/BatBox';
import { CenteredFlexBox, FlexBox } from '@/display/components/styled';
import { useGenerateHint } from '@/hooks';
import { useAwaitingHint } from '@/store/adjacencyPairs';
import { useAnimatingResponses } from '@/store/animate';
import { showHintState, useShowHome, useShowPoints } from '@/store/points';

const HintOrHomeButtons = () => {
  const { awaitingHint } = useAwaitingHint();
  const { showPoints } = useShowPoints();
  const showHint = useRecoilValue(showHintState);
  const { showHome } = useShowHome();
  const navigate = useNavigate();
  const generateHint = useGenerateHint();
  const { animatingResponses } = useAnimatingResponses();

  useEffect(() => {
    console.log('showHint', showHint);
    console.log('awaitingHint', awaitingHint);
    console.log('animatingResponses', animatingResponses);
  }, []);

  return (
    <CenteredFlexBox width={'100%'} height={64}>
      {showPoints && showHint && !awaitingHint && !animatingResponses ? (
        <FlexBox width="100%" justifyContent="flex-start">
          <BatBox button={true} width={'80%'}>
            <AbIconButton
              icon={ContactSupportIcon}
              onClick={() => {
                generateHint();
              }}
              color={'warning'}
            />
          </BatBox>
        </FlexBox>
      ) : showHome ? (
        <FlexBox width="100%" justifyContent="flex-end">
          <BatBox button={true} width={'80%'}>
            <AbIconButton
              icon={HomeIcon}
              onClick={() => {
                navigate('/');
              }}
              color={'secondary'}
            />
          </BatBox>
        </FlexBox>
      ) : null}
    </CenteredFlexBox>
  );
};

export default HintOrHomeButtons;
