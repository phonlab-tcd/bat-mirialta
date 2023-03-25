/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Box from '@mui/material/Box';

import { Avatar, Message, MessageList, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import { ChatContainer } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import BatBox from '@/display/components/BatBox';
import Meta from '@/display/components/Meta';
import { CenteredFlexBox } from '@/display/components/styled';
import IrishKeyboard from '@/display/controllers/IrishKeyboard';
import MessageInputButtons from '@/display/controllers/MessageInputButtons';
import PointsDisplay from '@/display/controllers/PointsDisplay';
import { useUpdatePoints } from '@/hooks';
import { usePopulateChats } from '@/hooks';
import useGenerateNextQuestion from '@/hooks/questions/useGenerateNextQuestion';
import useAdjacencyPairLogic from '@/hooks/useAdjacencyPairLogic';
import { getChatHeight } from '@/routes/Pages/utils';
import { getAdjacencyPairs, getQuestions } from '@/services/supabase';
import { useAdjacencyPairs, useReceivedAdjacencyPairHistory } from '@/store/adjacencyPairs';
import { currentAdjacencyPairState } from '@/store/adjacencyPairs';
import { useSession } from '@/store/auth';
import { useProfile } from '@/store/auth';
import { chatBubblesState } from '@/store/chatBubbles';
import { activeChatState, useIntro } from '@/store/chats';
import { useChats } from '@/store/chats';
import { useShowPoints } from '@/store/points';
import { useQuestions } from '@/store/questions';
import { useBatTyping, useTaNilInputChoice } from '@/store/textInput';

import anonImg from '/assets/images/anon-avatar.png';
import robotImg from '/assets/images/robot.png';

function Chat() {
  const { profile } = useProfile();
  const updatePoints = useUpdatePoints();

  const [firstLoad, setFirstLoad] = useState(true);
  const generateNextQuestion = useGenerateNextQuestion();
  const navigate = useNavigate();
  const chatBubbles = useRecoilValue(chatBubblesState);
  const { setShowPoints } = useShowPoints();

  const { session } = useSession();
  const { adjacencyPairs, setAdjacencyPairs } = useAdjacencyPairs();
  const { setQuestions } = useQuestions();
  const { taNilInputChoice } = useTaNilInputChoice();
  const currentAdjacencyPair = useRecoilValue(currentAdjacencyPairState);

  const { batTyping } = useBatTyping();
  const adjacencyPairLogic = useAdjacencyPairLogic();
  const populateChats = usePopulateChats();
  const activeChat = useRecoilValue(activeChatState);
  const { setIntro } = useIntro();
  const { receivedAdjacencyPairHistory, setReceivedAdjacencyPairHistory } =
    useReceivedAdjacencyPairHistory();
  const { chats } = useChats();

  useEffect(() => {
    if (session !== null) {
      if (chats.length !== 0) {
        if (activeChat !== undefined) {
          getQuestions(activeChat.questions as number[]).then((q) => {
            if (q !== undefined) {
              setQuestions(q);
              getAdjacencyPairs(activeChat.id).then((a_p) => {
                setReceivedAdjacencyPairHistory(true);
                if (a_p !== undefined) {
                  setAdjacencyPairs(a_p);
                  if (a_p.length !== 0) {
                    setShowPoints(true);
                    setIntro(activeChat.intro);
                  }
                }
              });
            }
          });
        } else {
          if (adjacencyPairs.length === 0) {
            navigate('/');
          }
        }
      } else {
        populateChats(session.user.id);
      }
    } else {
      console.log('session is null');
    }
  }, [session, activeChat, chats]);

  useEffect(() => {
    if (session !== null && activeChat !== undefined && receivedAdjacencyPairHistory) {
      adjacencyPairLogic();
    } else {
      console.log("don't have current question");
    }
  }, [adjacencyPairs, receivedAdjacencyPairHistory, session]);

  useEffect(() => {
    if (firstLoad && receivedAdjacencyPairHistory) {
      // generate new question if needed from first load - unusual that aP will have a response and no next questions, but in the case:
      if (currentAdjacencyPair !== undefined && currentAdjacencyPair.response !== null) {
        console.log('Chat calling generateNextQuestion');
        generateNextQuestion();
      }
      updatePoints();

      setFirstLoad(false);
    }
  }, [firstLoad, receivedAdjacencyPairHistory]);

  return (
    <Box sx={{ backgroundColor: 'background' }}>
      <Meta title="Chat" />
      <MessageInputButtons vis={taNilInputChoice ? 'visible' : 'hidden'} />

      <CenteredFlexBox p={1}>
        <BatBox width={'100%'} padding={0.5}>
          <PointsDisplay />
        </BatBox>
      </CenteredFlexBox>
      <CenteredFlexBox px={1}>
        <BatBox width={'100%'} backgroundColor={'background.default'} padding={0}>
          <Box px={0.6} py={0.5} sx={{ overflowY: 'scroll', height: getChatHeight() }}>
            <ChatContainer>
              <MessageList
                typingIndicator={
                  batTyping ? <TypingIndicator content="Tá Bat ag clóscríobh" /> : null
                }
              >
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
            </ChatContainer>
          </Box>
        </BatBox>
      </CenteredFlexBox>

      <IrishKeyboard />
    </Box>
  );
}

export default Chat;
