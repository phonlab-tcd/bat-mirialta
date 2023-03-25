/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

import SendIcon from '@mui/icons-material/Send';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { AbIconButton } from 'abair-components';

import BatBox from '@/display/components/BatBox';
import {
  CenteredFlexBox,
  FullSizeCenteredFlexBox,
  FullSizeFlexBox,
} from '@/display/components/styled';
import useHandleSend from '@/hooks/useHandleSend';
import { useChatText, useMessageInputDisabled } from '@/store/textInput';

import HintOrHomeButtons from '../HintOrHomeButtons';
import keyboardOptions from './keyboardOptions';
import './styles.css';

const IrishKeyboard = () => {
  const [layoutName, setLayoutName] = useState('default');
  const keyboard = useRef<any>();
  const { chatText, setChatText } = useChatText();
  const handleSend = useHandleSend();
  const messageInputRef = useRef<HTMLInputElement>(null);
  const { messageInputDisabled } = useMessageInputDisabled();

  const handleChange = (input: string) => {
    setChatText(input);
    keyboard.current.setInput(input);
    console.log('Input changed', input);
  };

  const handleKeyPress = (button: string) => {
    if (button === '{fada}' || button === '{urú}' || button === '{séimhiú}') {
      setLayoutName(button.slice(1, button.length - 1));
      handleShift(button);
    } else if (button === '{enter}') {
      console.log('Enter pressed', button);
    }
  };

  const handleShift = (button: string) => {
    console.log('button pressed', button);
    console.log('keyboard.current.options.layoutName', keyboard.current.options.layoutName);
    const buttonBaseName = button.slice(1, button.length - 1);
    if (keyboard.current !== undefined) {
      if (buttonBaseName === keyboard.current.options.layoutName) {
        setLayoutName('default');
      } else {
        setLayoutName(buttonBaseName);
      }
    }
  };

  // const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
  //   const input = event.target.value;
  //   setInput(input);
  //   keyboard.current.setInput(input);
  // };

  useEffect(() => {
    if (!messageInputDisabled) {
      if (messageInputRef.current !== null) {
        messageInputRef.current.focus();
      }
    }
  }, [messageInputDisabled]);

  // if (messageInputRef.current !== null) {
  //   messageInputRef.current.focus();
  // }

  return (
    <Box>
      <CenteredFlexBox p={1} sx={{ position: 'relative' }}>
        <BatBox width={'100%'} padding={0.5}>
          <Grid container py={1}>
            <Grid item xs={1.5}>
              <HintOrHomeButtons />
            </Grid>

            <Grid item xs={9}>
              <FullSizeCenteredFlexBox
                border={2}
                borderColor={'primary.dark'}
                sx={{ backgroundColor: messageInputDisabled ? '#ddd' : '#fff' }}
              >
                <Typography ref={messageInputRef} alignItems="center">
                  {chatText}
                </Typography>
              </FullSizeCenteredFlexBox>
            </Grid>
            <Grid item xs={1.5}>
              <FullSizeFlexBox justifyContent="flex-end" alignItems="center">
                <FullSizeCenteredFlexBox>
                  <AbIconButton
                    icon={SendIcon}
                    onClick={handleSend}
                    fontSize="medium"
                    color="info"
                  />
                </FullSizeCenteredFlexBox>
              </FullSizeFlexBox>
            </Grid>
          </Grid>

          <Box border={1}>
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
