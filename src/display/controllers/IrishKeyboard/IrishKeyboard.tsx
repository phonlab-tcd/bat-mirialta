/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { useRecoilValue } from 'recoil';

import SendIcon from '@mui/icons-material/Send';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { AbIconButton } from 'abair-components';

import BatBox from '@/display/components/BatBox';
import { CenteredFlexBox, FullSizeBox, FullSizeCenteredFlexBox } from '@/display/components/styled';
import { patchAdjacencyPairText } from '@/services/supabase';
import { currentAdjacencyPairState, useAdjacencyPairs } from '@/store/adjacencyPairs';
import { currentQuestionState } from '@/store/questions';
import { chatTextEmptyState, useChatText, useMessageInputDisabled } from '@/store/textInput';
import { replaceFinalObject } from '@/store/utils';

import HintButton from '../HintButton';
import keyboardOptions from './keyboardOptions';
import './styles.css';

const IrishKeyboard = () => {
  const [layoutName, setLayoutName] = useState('default');
  const keyboard = useRef<any>();
  const { chatText, setChatText } = useChatText();
  const currentAdjacencyPair = useRecoilValue(currentAdjacencyPairState);
  const currentQuestion = useRecoilValue(currentQuestionState);
  const chatTextEmpty = useRecoilValue(chatTextEmptyState);
  const { adjacencyPairs, setAdjacencyPairs } = useAdjacencyPairs();
  const { messageInputDisabled, setMessageInputDisabled } = useMessageInputDisabled();

  const handleChange = (input: string) => {
    if (!messageInputDisabled) {
      setChatText(input);
      keyboard.current.setInput(input);
    }
  };

  const handleKeyPress = (button: string) => {
    if (button === '{fada}' || button === '{urú}' || button === '{séimhiú}') {
      setLayoutName(button.slice(1, button.length - 1));
      handleShift(button);
      console.log('here');
    } else {
      setLayoutName('default');
    }
  };

  const handleShift = (button: string) => {
    const buttonBaseName = button.slice(1, button.length - 1);
    if (keyboard.current !== undefined && !messageInputDisabled) {
      if (buttonBaseName === keyboard.current.options.layoutName) {
        setLayoutName('default');
      } else {
        setLayoutName(buttonBaseName);
      }
    }
  };

  const handleSend = () => {
    if (currentQuestion !== undefined && currentAdjacencyPair !== undefined) {
      setChatText('');

      keyboard.current.setInput('');
      setMessageInputDisabled(true);
      patchAdjacencyPairText(currentAdjacencyPair.id, chatText).then((a_p) => {
        setAdjacencyPairs(replaceFinalObject(adjacencyPairs, a_p));
      });
    } else {
      console.log('useHandleSend: currentQuestion or currentAdjacencyPair is undefined');
      console.log('currentQuestion: ', currentQuestion);
      console.log('currentAdjacencyPair: ', currentAdjacencyPair);
    }
  };

  return (
    <Box>
      <CenteredFlexBox p={1} sx={{ position: 'relative' }}>
        <BatBox width={'100%'} padding={0.5}>
          <Grid container py={1} height={56}>
            <Grid item xs={1.5}>
              <HintButton />
            </Grid>

            <Grid item xs={9}>
              <FullSizeCenteredFlexBox
                height={36}
                border={2}
                borderColor={'primary.dark'}
                sx={{ backgroundColor: '#fff', opacity: messageInputDisabled ? 0.2 : 1 }}
              >
                <Typography alignItems="center">{chatText}</Typography>
              </FullSizeCenteredFlexBox>
            </Grid>
            <Grid item xs={1.5}>
              <FullSizeCenteredFlexBox>
                {!chatTextEmpty && (
                  <AbIconButton
                    icon={SendIcon}
                    onClick={handleSend}
                    fontSize="medium"
                    color="info"
                  />
                )}
              </FullSizeCenteredFlexBox>
            </Grid>
          </Grid>

          <Box sx={{ opacity: messageInputDisabled ? 0.2 : 1, position: 'relative' }}>
            {messageInputDisabled && (
              <FullSizeBox sx={{ position: 'absolute', zIndex: 10 }}></FullSizeBox>
            )}
            <Keyboard
              keyboardRef={(r) => (keyboard.current = r)}
              layoutName={layoutName}
              layout={keyboardOptions.layout}
              onChange={(e) => {
                handleChange(e);
              }}
              onKeyPress={(e) => {
                handleKeyPress(e);
              }}
              display={keyboardOptions.display}
              buttonTheme={keyboardOptions.button}
              theme="hg-theme-default base"
            />
          </Box>
        </BatBox>
      </CenteredFlexBox>
    </Box>
  );
};

export default IrishKeyboard;
