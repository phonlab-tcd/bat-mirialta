/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import Box from '@mui/material/Box';

import {
  Avatar,
  ConversationHeader,
  Message,
  MessageList,
  MessageSeparator,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import { ChatContainer } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import Meta from '@/display/components/Meta';
// import useHandleSend from '@/hooks/useHandleSend';
import { getAdjacencyPairs, getQuestions, getResponses } from '@/services/supabase';
import { useAdjacencyPairs } from '@/store/adjacencyPairs';
import { useSession } from '@/store/auth';
import { chatBubblesState } from '@/store/chatBubbles';
import { useQuestions } from '@/store/questions';
import { useResponses } from '@/store/responses';
import {
  useBatTyping,
  /*, useChatText, useMessageInputDisabled */
} from '@/store/textInput';

import femaleImg from '/assets/images/avatar-female.svg';
import robotImg from '/assets/images/robot.png';

function Chat() {
  // const messageInputRef = useRef(null);
  const { session } = useSession();
  const { adjacencyPairs, setAdjacencyPairs } = useAdjacencyPairs();
  const { setQuestions } = useQuestions();
  const { setResponses } = useResponses();

  const [date] = useState(new Date().toUTCString());
  const chatBubbles = useRecoilValue(chatBubblesState);
  const { batTyping } = useBatTyping();
  // const { messageInputDisabled } = useMessageInputDisabled();
  // const { chatText, setChatText } = useChatText();
  // const handleSend = useHandleSend();

  useEffect(() => {
    session !== null &&
      getAdjacencyPairs(session.user.id).then((a_p) => {
        if (a_p !== undefined) {
          setAdjacencyPairs(a_p);
        }
      });
  }, [session]);

  useEffect(() => {
    if (adjacencyPairs.length !== 0) {
      const questionIDs = adjacencyPairs.map((aP) => aP !== null && aP.question_id);
      const uniqueQuestionIDs = Array.from(new Set(questionIDs));
      getQuestions(uniqueQuestionIDs as number[]).then((q) => {
        if (q !== undefined) {
          setQuestions(q);
        }
      });
      const responseIDs = adjacencyPairs.map((aP) => aP !== null && aP.response_id);
      const uniqueResponseIDs = Array.from(new Set(responseIDs));
      getResponses(uniqueResponseIDs as number[]).then((r) => {
        if (r !== undefined) {
          setResponses(r);
        }
      });
    }
  }, [adjacencyPairs]);

  return (
    <Box height={'100%'}>
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
        {/* <MessageInput
          value={chatText}
          onChange={(t: string) => {
            setChatText(t);
          }}
          onSend={handleSend}
          disabled={messageInputDisabled}
          attachButton={false}
          placeholder={'scríobh anseo'}
          ref={messageInputRef}
        /> */}
      </ChatContainer>
    </Box>
  );
}

export default Chat;
