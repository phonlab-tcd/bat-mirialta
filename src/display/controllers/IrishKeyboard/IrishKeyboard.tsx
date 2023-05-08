/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { useRecoilValue } from 'recoil';

import SendIcon from '@mui/icons-material/Send';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { AbIconButton } from 'abair-components';
import isMobile from 'is-mobile';

import BatBox from '@/display/components/BatBox';
import { CenteredFlexBox, FullSizeBox, FullSizeCenteredFlexBox } from '@/display/components/styled';
import { patchAdjacencyPairText } from '@/services/supabase';
import {
  currentAdjacencyPairState,
  useAdjacencyPairs,
  useAwaitingHint,
} from '@/store/adjacencyPairs';
import { currentQuestionState } from '@/store/questions';
import { chatTextEmptyState, useChatText, useMessageInputDisabled } from '@/store/textInput';
import { replaceFinalObject } from '@/store/utils';

import HintButton from '../HintButton';
import keyboardOptions from './keyboardOptions';
import './styles.css';

const IrishKeyboard = () => {
  const [layoutName, setLayoutName] = useState('default');
  const keyboard = useRef<any>();
  const textBoxRef = useRef<HTMLInputElement>();
  const { chatText, setChatText } = useChatText();
  const currentAdjacencyPair = useRecoilValue(currentAdjacencyPairState);
  const currentQuestion = useRecoilValue(currentQuestionState);
  const chatTextEmpty = useRecoilValue(chatTextEmptyState);
  const { adjacencyPairs, setAdjacencyPairs } = useAdjacencyPairs();
  const { messageInputDisabled, setMessageInputDisabled } = useMessageInputDisabled();
  const { awaitingHint } = useAwaitingHint();
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (!isMobile()) {
      if (!messageInputDisabled && !awaitingHint) {
        if (textBoxRef.current !== undefined) {
          textBoxRef.current.focus();
        }
      }
    }
  }, [messageInputDisabled, awaitingHint]);

  useEffect(() => {
    setTimeout(() => {
      setBlink(!blink);
    }, 800);
  }, [blink]);

  const handleChange = (input: string) => {
    if (!messageInputDisabled) {
      setChatText(input);
      if (isMobile()) {
        keyboard.current.setInput(input);
      }
    }
  };

  const handleKeyPress = (button: string) => {
    if (button === '{fada}' || button === '{urú}' || button === '{séimhiú}') {
      setLayoutName(button.slice(1, button.length - 1));
      handleShift(button);
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

  const resetChatText = () => {
    if (isMobile()) {
      keyboard.current.setInput('');
    } else {
      if (textBoxRef.current !== undefined) {
        textBoxRef.current.value = '';
        textBoxRef.current.blur();
      }
    }
    setChatText('');
  };

  const cleanWhiteSpace = (t: string) => {
    return t.replace(/\s+/g, ' ').trim();
  };

  const handleSend = () => {
    if (currentQuestion !== undefined && currentAdjacencyPair !== undefined) {
      const cleanedChatText = cleanWhiteSpace(chatText);

      setMessageInputDisabled(true);
      patchAdjacencyPairText(currentAdjacencyPair.id, cleanedChatText).then((a_p) => {
        setAdjacencyPairs(replaceFinalObject(adjacencyPairs, a_p));
        resetChatText();
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
          <Grid container py={1} height={isMobile() ? 56 : 70}>
            <Grid item xs={1.5}>
              <HintButton />
            </Grid>

            <Grid item xs={9}>
              <FullSizeCenteredFlexBox
                height={36}
                border={isMobile() ? 2 : 0}
                borderColor={'primary.dark'}
                sx={{
                  backgroundColor: '#fff',
                  opacity: messageInputDisabled || awaitingHint ? 0.2 : 1,
                }}
              >
                {isMobile() ? (
                  <Box>
                    <Typography display="inline" fontFamily={'Helvetica'} alignItems="center">
                      {chatText}
                    </Typography>
                    <Typography
                      display={'inline'}
                      sx={{
                        visibility: messageInputDisabled ? 'hidden' : blink ? 'visible' : 'hidden',
                      }}
                      color="gray"
                    >
                      |
                    </Typography>
                  </Box>
                ) : (
                  <TextField
                    inputRef={textBoxRef}
                    variant="outlined"
                    onChange={(e) => {
                      handleChange(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSend();
                      }
                    }}
                    fullWidth
                    disabled={messageInputDisabled || awaitingHint ? true : false}
                    inputProps={{ style: { fontFamily: 'Helvetica', textAlign: 'center' } }}
                  >
                    {chatText}
                  </TextField>
                )}
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
          {isMobile() && (
            <Box
              sx={{ opacity: messageInputDisabled || awaitingHint ? 0.2 : 1, position: 'relative' }}
            >
              {messageInputDisabled || awaitingHint ? (
                <FullSizeBox sx={{ position: 'absolute', zIndex: 10 }}></FullSizeBox>
              ) : null}
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
          )}
        </BatBox>
      </CenteredFlexBox>
    </Box>
  );
};

export default IrishKeyboard;
