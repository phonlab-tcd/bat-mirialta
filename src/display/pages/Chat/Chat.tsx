/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Box from '@mui/material/Box';

import { Avatar, Message, MessageList, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import { ChatContainer } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import BatBox from '@/display/components/BatBox';
import Meta from '@/display/components/Meta';
import { CenteredFlexBox } from '@/display/components/styled';
import EndChatStats from '@/display/controllers/EndChatStats';
import IrishKeyboard from '@/display/controllers/IrishKeyboard';
import MessageInputButtons from '@/display/controllers/MessageInputButtons';
import PointsDisplay from '@/display/controllers/PointsDisplay';
import { useUpdatePoints } from '@/hooks';
import { usePopulateChats } from '@/hooks';
import useGenerateNextQuestion from '@/hooks/questions/useGenerateNextQuestion';
import useAdjacencyPairLogic from '@/hooks/useAdjacencyPairLogic';
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

// calculate the height of the chat area to fill the entire screen
function flexFillHeight() {
  const elAbove = document.querySelector('.flex-fill-above');
  if (!elAbove) return '60vh';
  const rectAbove = elAbove.getBoundingClientRect();
  const top = rectAbove.bottom + window.scrollY;
  const elBelow = document.querySelector('.flex-fill-below');
  let roomBelow = 102; // guess height of IrishKeyboard in case it's not yet mounted
  if (elBelow) {
    const rectBelow = elBelow.getBoundingClientRect();
    roomBelow = rectBelow.height;
  }

  const pxHeight = window.innerHeight - top - roomBelow; // rectBelow.height;
  if (pxHeight < 100) return '100px';
  if (pxHeight > 1000) return '1000px';
  return pxHeight + 'px';
}

function chatWindowFillSpaceEffect() {
  window.addEventListener('resize', handleResize);
  handleResize();
  window.addEventListener('orientationchange', handleResize);
  return handleResizeDestructor;

  function handleResize() {
    const chatMain = document.querySelector('.flex-fill-main');
    if (chatMain instanceof HTMLElement) {
      chatMain.style.height = flexFillHeight();
    } else {
      console.error(
        'failed to update height of chat window, selected element is not a HTMLElement',
      );
    }
  }

  function handleResizeDestructor() {
    window.removeEventListener('resize', handleResize);
  }
}

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

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const error_info = searchParams.get('error_info');

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
                    if (error_info !== null) {
                      console.log('error_info:', JSON.parse(error_info));
                    }
                  }
                }
              });
            }
          });
        } else {
          if (adjacencyPairs.length === 0) {
            navigate(`/`);
          }
        }
      } else {
        populateChats(session.user.id);
      }
    } else {
      console.log('session is null');
    }
  }, [session, activeChat, chats]);

  useEffect(chatWindowFillSpaceEffect);

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

      <CenteredFlexBox className="flex-fill-above" p={1}>
        <EndChatStats />
        <BatBox width={'100%'} padding={0.5}>
          <PointsDisplay />
        </BatBox>
      </CenteredFlexBox>
      <CenteredFlexBox className="flex-fill-main" px={1} sx={{ height: flexFillHeight() }}>
        <BatBox width={'100%'} backgroundColor={'background.default'} padding={0}>
          <Box px={0.6} py={0.5} sx={{ height: '100%' }}>
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
      {activeChat !== undefined && <IrishKeyboard />}
    </Box>
  );
}

export default Chat;
