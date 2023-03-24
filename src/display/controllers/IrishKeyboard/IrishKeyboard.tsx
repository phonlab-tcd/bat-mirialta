/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { AbIconButton } from 'abair-components';

import BatBox from '@/display/components/BatBox';
import { FullSizeCenteredFlexBox, FullSizeFlexBox } from '@/display/components/styled';
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
    <Box p={1}>
      <Box p={0.5}>
        <TextField
          ref={messageInputRef}
          variant="outlined"
          fullWidth
          value={chatText}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleChange(e.target.value);
          }}
          disabled={messageInputDisabled}
          placeholder={messageInputDisabled ? 'fán le do thoil' : 'scríobh anseo'}
        />
      </Box>
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
      <Grid container>
        <Grid item xs={6}>
          <HintOrHomeButtons />
        </Grid>
        <Grid item xs={6}>
          <FullSizeFlexBox pl={1.5} justifyContent="flex-end" alignItems="center">
            <BatBox button={true} width={'100%'} height={45}>
              <FullSizeCenteredFlexBox>
                <AbIconButton
                  icon={SendIcon}
                  onClick={handleSend}
                  fontSize="medium"
                  color="secondary"
                />
              </FullSizeCenteredFlexBox>
            </BatBox>
          </FullSizeFlexBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IrishKeyboard;
