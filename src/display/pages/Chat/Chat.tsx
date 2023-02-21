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
import MessageInputButtons from '@/display/controllers/MessageInputButtons';
import useAdjacencyPairLogic from '@/hooks/useAdjacencyPairLogic';
import useChatLoadState from '@/hooks/useChatLoadState';
import useHandleSend from '@/hooks/useHandleSend';
import { getAdjacencyPairs } from '@/services/supabase';
import { useAdjacencyPairs, useReceivedAdjacencyPairHistory } from '@/store/adjacencyPairs';
import { useSession } from '@/store/auth';
import { useProfile } from '@/store/auth';
import { chatBubblesState } from '@/store/chatBubbles';
import { currentQuestionState } from '@/store/questions';
import {
  useBatTyping,
  useChatText,
  useMessageInputDisabled,
  useTaNilInputChoice,
} from '@/store/textInput';

import anonImg from '/assets/images/anon-avatar.png';
import robotImg from '/assets/images/robot.png';

function Chat() {
  const messageInputRef = useRef<HTMLInputElement>(null);
  const { profile } = useProfile();

  const [date] = useState(new Date().toUTCString());
  const [firstLoad, setFirstLoad] = useState(true);

  const chatBubbles = useRecoilValue(chatBubblesState);
  const currentQuestion = useRecoilValue(currentQuestionState);

  const { session } = useSession();
  const { adjacencyPairs, setAdjacencyPairs } = useAdjacencyPairs();
  const { taNilInputChoice } = useTaNilInputChoice();

  const { batTyping } = useBatTyping();
  const { messageInputDisabled } = useMessageInputDisabled();
  const { chatText, setChatText } = useChatText();
  const adjacencyPairLogic = useAdjacencyPairLogic();
  const chatLoadState = useChatLoadState();

  const { receivedAdjacencyPairHistory, setReceivedAdjacencyPairHistory } =
    useReceivedAdjacencyPairHistory();

  const handleSend = useHandleSend();

  // sets the conversation history or redirects to the login page
  useEffect(() => {
    // if session is null, redirect to login page
    if (session !== null) {
      // get history of adjacency pairs
      getAdjacencyPairs(session.user.id).then((a_p) => {
        setReceivedAdjacencyPairHistory(true);
        // if adjacency pairs exist, set adjacency pairs
        if (a_p !== undefined) {
          setAdjacencyPairs(a_p);
          // if adjacency pairs don't exist, set adjacency pairs to []
        } else {
          setAdjacencyPairs([]);
        }
      });
    } else {
      console.log('session is null');
    }
  }, [session]);

  // after receiving adjacency pairs from the server, loads the chat and sets first load to false
  useEffect(() => {
    if (firstLoad && receivedAdjacencyPairHistory) {
      setFirstLoad(false);
      chatLoadState();
      if (messageInputRef.current !== null) {
        messageInputRef.current.focus();
      }
    }
  }, [firstLoad, receivedAdjacencyPairHistory]);

  // anytime adjacency pairs is updated, runs the logic to determine next part of conversation
  useEffect(() => {
    if (currentQuestion && session !== null && !firstLoad) {
      adjacencyPairLogic();
    } else {
      console.log("don't have current question");
    }
  }, [adjacencyPairs]);

  useEffect(() => {
    if (!messageInputDisabled) {
      if (messageInputRef.current !== null) {
        messageInputRef.current.focus();
      }
    }
  }, [messageInputDisabled]);

  return (
    <Box height="100%" sx={{ position: 'relative' }}>
      <Meta title="Chat" />
      <MessageInputButtons vis={taNilInputChoice ? 'visible' : 'hidden'} />
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
                src={
                  c_b.sender === 'robot'
                    ? robotImg
                    : profile !== null && profile.avatar !== ''
                    ? profile.avatar
                    : anonImg
                }
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
          placeholder={messageInputDisabled ? 'fán le do thoil' : 'scríobh anseo'}
          ref={messageInputRef}
        />
      </ChatContainer>
    </Box>
  );
}

export default Chat;
