/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import Box from '@mui/material/Box';

import {
  Avatar,
  ConversationHeader,
  Message,
  MessageInput,
  MessageList,
  MessageSeparator,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import { ChatContainer } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import Meta from '@/display/components/Meta';
import useAdjacencyPairLogic from '@/hooks/useAdjacencyPairLogic';
import useChatLoadState from '@/hooks/useChatLoadState';
import useHandleSend from '@/hooks/useHandleSend';
import { getAdjacencyPairs } from '@/services/supabase';
import checkBroadSlender from '@/services/supabase/edgeFunctions/checkBroadSlender';
import { useAdjacencyPairs, useReceivedAdjacencyPairHistory } from '@/store/adjacencyPairs';
import { useSession } from '@/store/auth';
import { chatBubblesState } from '@/store/chatBubbles';
import { currentQuestionState } from '@/store/questions';
import { useBatTyping, useChatText, useMessageInputDisabled } from '@/store/textInput';

import femaleImg from '/assets/images/avatar-female.svg';
import robotImg from '/assets/images/robot.png';

function Chat() {
  const messageInputRef = useRef(null);

  const [date] = useState(new Date().toUTCString());
  const [firstLoad, setFirstLoad] = useState(true);

  const chatBubbles = useRecoilValue(chatBubblesState);
  const currentQuestion = useRecoilValue(currentQuestionState);

  const { session } = useSession();
  const { adjacencyPairs, setAdjacencyPairs } = useAdjacencyPairs();

  const { batTyping } = useBatTyping();
  const { messageInputDisabled } = useMessageInputDisabled();
  const { chatText, setChatText } = useChatText();
  const adjacencyPairLogic = useAdjacencyPairLogic();
  const chatLoadState = useChatLoadState();

  const { receivedAdjacencyPairHistory, setReceivedAdjacencyPairHistory } =
    useReceivedAdjacencyPairHistory();

  const handleSend = useHandleSend();

  useEffect(() => {
    if (session !== null && adjacencyPairs.length === 0) {
      getAdjacencyPairs(session.user.id).then((a_p) => {
        setReceivedAdjacencyPairHistory(true);
        if (a_p !== undefined) {
          setAdjacencyPairs(a_p);
        } else {
          setAdjacencyPairs([]);
        }
      });
    }
  }, [session]);

  useEffect(() => {
    if (firstLoad && receivedAdjacencyPairHistory) {
      setFirstLoad(false);
      chatLoadState();
    }
    checkBroadSlender('wordy');
  }, [firstLoad, receivedAdjacencyPairHistory]);

  useEffect(() => {
    if (currentQuestion && session !== null) {
      adjacencyPairLogic();
    } else {
      console.log("don't have current question");
    }
  }, [adjacencyPairs]);

  return (
    <Box height="100%">
      <Meta title="Chat" />
      <ChatContainer>
        <ConversationHeader>
          <Avatar src={robotImg} name="Bat" />
          <ConversationHeader.Content userName="Bat" info="Active Now" />
        </ConversationHeader>
        <MessageList
          typingIndicator={batTyping ? <TypingIndicator content="Tá Bat ag clóscríobh" /> : null}
        >
          <MessageSeparator>{date}</MessageSeparator>
          {chatBubbles.map((c_b, j) => (
            <Message
              key={j}
              model={{
                message: String(c_b.text),
                sentTime: 'now',
                sender: c_b.sender,
                direction: c_b.sender === 'robot' ? 'incoming' : 'outgoing',
                position: 'single',
              }}
            >
              <Avatar
                src={c_b.sender === 'robot' ? robotImg : femaleImg}
                name={c_b.sender === 'robot' ? 'Robot' : 'You'}
              />
            </Message>
          ))}
        </MessageList>
        <MessageInput
          value={chatText}
          onChange={(t: string) => {
            setChatText(t);
          }}
          onSend={handleSend}
          disabled={messageInputDisabled}
          attachButton={false}
          placeholder={'scríobh anseo'}
          ref={messageInputRef}
        />
      </ChatContainer>
    </Box>
  );
}

export default Chat;
