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
import ChatPoints from '@/display/controllers/ChatPoints';
import MessageInputButtons from '@/display/controllers/MessageInputButtons';
import { useUpdatePoints } from '@/hooks';
import { usePopulateChats } from '@/hooks/chats';
import useCheckChatComplete from '@/hooks/chats/useCheckChatComplete';
import useGenerateNextQuestion from '@/hooks/questions/useGenerateNextQuestion';
import useAdjacencyPairLogic from '@/hooks/useAdjacencyPairLogic';
import useHandleSend from '@/hooks/useHandleSend';
import { getAdjacencyPairs, getQuestions } from '@/services/supabase';
import { useAdjacencyPairs, useReceivedAdjacencyPairHistory } from '@/store/adjacencyPairs';
import { currentAdjacencyPairState } from '@/store/adjacencyPairs';
import { useSession } from '@/store/auth';
import { useProfile } from '@/store/auth';
import { chatBubblesState } from '@/store/chatBubbles';
import { activeChatState, useIntro } from '@/store/chats';
import { useQuestions } from '@/store/questions';
import {
  useBatTyping,
  useChatText,
  useMessageInputDisabled,
  useTaNilInputChoice,
} from '@/store/textInput';

import anonImg from '/assets/images/anon-avatar.png';
import robotImg from '/assets/images/robot.png';

function Chat() {
  useCheckChatComplete();

  const messageInputRef = useRef<HTMLInputElement>(null);
  const { profile } = useProfile();
  const updatePoints = useUpdatePoints();
  const [date] = useState(new Date().toUTCString());
  const [firstLoad, setFirstLoad] = useState(true);
  const generateNextQuestion = useGenerateNextQuestion();

  const chatBubbles = useRecoilValue(chatBubblesState);

  const { session } = useSession();
  const { adjacencyPairs, setAdjacencyPairs } = useAdjacencyPairs();
  const { setQuestions } = useQuestions();
  const { taNilInputChoice } = useTaNilInputChoice();
  const currentAdjacencyPair = useRecoilValue(currentAdjacencyPairState);

  const { batTyping } = useBatTyping();
  const { messageInputDisabled } = useMessageInputDisabled();
  const { chatText, setChatText } = useChatText();
  const adjacencyPairLogic = useAdjacencyPairLogic();
  const populateChats = usePopulateChats();
  const activeChat = useRecoilValue(activeChatState);
  const { setIntro } = useIntro();
  const { receivedAdjacencyPairHistory, setReceivedAdjacencyPairHistory } =
    useReceivedAdjacencyPairHistory();

  const handleSend = useHandleSend();

  useEffect(() => {
    if (session !== null) {
      if (activeChat !== undefined) {
        getQuestions(activeChat.questions as number[]).then((q) => {
          if (q !== undefined) {
            setQuestions(q);
            getAdjacencyPairs(activeChat.id).then((a_p) => {
              setReceivedAdjacencyPairHistory(true);
              if (a_p !== undefined) {
                setAdjacencyPairs(a_p);

                if (a_p.length !== 0) {
                  setIntro(activeChat.intro);
                }
              }
            });
          }
        });
      } else {
        populateChats(session.user.id);
      }
    } else {
      console.log('session is null');
    }
  }, [session, activeChat]);

  useEffect(() => {
    if (session !== null && activeChat !== undefined && receivedAdjacencyPairHistory) {
      adjacencyPairLogic();
    } else {
      console.log("don't have current question");
    }
  }, [adjacencyPairs, receivedAdjacencyPairHistory]);

  useEffect(() => {
    if (firstLoad && receivedAdjacencyPairHistory) {
      // generate new question if needed from first load - unusual that aP will have a response and no next questions, but in the case:
      if (currentAdjacencyPair !== undefined && currentAdjacencyPair.response !== null) {
        generateNextQuestion();
      }
      updatePoints();

      setFirstLoad(false);
      if (messageInputRef.current !== null) {
        messageInputRef.current.focus();
      }
    }
  }, [firstLoad, receivedAdjacencyPairHistory]);

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
      <ChatPoints />

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
