/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

// import { useRecoilValue } from 'recoil';
import {
  Avatar,
  ChatContainer,
  ConversationHeader,
  Message,
  MessageInput,
  MessageList,
  MessageSeparator,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import Meta from '@/components/Meta';
import IntroMessagesCtrl from '@/controllers/IntroMessagesCtrl';
import { patchMessage, postMessage } from '@/services/supabase';
import {
  useBatTyping,
  useChatText,
  useCurrentQuestionID,
  useDisplayMessages,
  useMessageInputDisabled,
  useMessages,
} from '@/store/messages';
import { useQuestionIDs } from '@/store/scripts';
import { replaceFinalMessage } from '@/store/utils';
import generateNewQuestionID from '@/utils/generateNewQuestionID';

import femaleImg from '/assets/images/avatar-female.svg';
import robotImg from '/assets/images/robot.png';

function Chat() {
  const { batTyping, setBatTyping } = useBatTyping();
  const { messageInputDisabled, setMessageInputDisabled } = useMessageInputDisabled();
  const { setCurrentQuestionID } = useCurrentQuestionID();
  const { messages, setMessages } = useMessages();
  const { displayMessages, setDisplayMessages } = useDisplayMessages();

  const { chatText, setChatText } = useChatText();
  const { questionIDs, setQuestionIDs } = useQuestionIDs();

  const messageInputRef = useRef(null);

  useEffect(() => {
    startDialogue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startDialogue = () => {
    if (messages.length === 0) {
      const qID = generateNewQuestionID(questionIDs);
      setQuestionIDs(qID[1]);
      setCurrentQuestionID(qID[0]);
      console.log('about to CreateMessage');
      postMessage(qID[0], 0).then((data: any) => {
        const question: any = data?.bat_questions;
        setMessages([
          ...messages,
          {
            id: data?.id,
            question: question,
            text: data?.text,
            correct: data?.correct,
            retry_attempt: data?.retry_attempt,
            bat_response: data?.bat_response,
          },
        ]);
      });
    }
  };

  const handleSend = () => {
    const correct = chatText === messages[messages.length - 1].question?.answer ? true : false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    patchMessage(messages[messages.length - 1].id, chatText, correct).then((data: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const question: any = data?.bat_questions;
      setMessages(
        replaceFinalMessage(messages, {
          id: data?.id,
          question: question,
          text: data?.text,
          correct: data?.correct,
          retry_attempt: data?.retry_attempt,
          bat_response: data?.bat_response,
        }),
      );
      setDisplayMessages([...displayMessages, { message: chatText, sender: 'you' }]);
      setChatText('');
      setMessageInputDisabled(true);
    });
  };

  // useEffect(() => {
  //   // console.log('localStorage:', localStorage['sb-pdntukcptgktuzpynlsv-auth-token']);
  //   // setSession(localStorage['sb-pdntukcptgktuzpynlsv-auth-token'])
  //   // const sess = JSON.parse(localStorage['sb-pdntukcptgktuzpynlsv-auth-token']);
  //   session !== null ? getMessages(session) : null;
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (messages.length !== 0) {
      if (messages.length === 1) {
        if (messages[0].text === null) {
          initiateDialogueIntroduction();
        }
      } else {
        goToNextMessage();
      }
      console.log('messages:', messages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const goToNextMessage = () => {
    console.log('in go to next message');
  };

  const initiateDialogueIntroduction = () => {
    setTimeout(() => {
      setBatTyping(true);
    }, 1000);
    setTimeout(() => {
      setDisplayMessages([...displayMessages, { message: 'Conas atá tú?', sender: 'robot' }]);
      setBatTyping(false);
    }, 3000);
  };

  return (
    <>
      <Meta title="Chat" />
      <ChatContainer>
        <ConversationHeader>
          <Avatar src={robotImg} name="Bat" />

          <ConversationHeader.Content userName="Bat" info="Active Now" />
        </ConversationHeader>
        <MessageList
          typingIndicator={batTyping ? <TypingIndicator content="Tá Bat ag clóscríobh" /> : null}
        >
          <MessageSeparator content={new Date().toUTCString()} />
          {displayMessages.map((m, j) => (
            <Message
              key={j}
              model={{
                message: m.message,
                sentTime: 'now',
                sender: m.sender,
                direction: m.sender === 'robot' ? 'incoming' : 'outgoing',
                position: 'single',
              }}
            >
              <Avatar
                src={m.sender === 'robot' ? robotImg : femaleImg}
                name={m.sender === 'robot' ? 'Robot' : 'You'}
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
      <IntroMessagesCtrl />
    </>
  );
}

export default Chat;
