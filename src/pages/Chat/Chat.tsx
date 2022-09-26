import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import {
  Avatar,
  ChatContainer,
  ConversationHeader, // InfoButton,
  Message,
  MessageInput,
  MessageList,
  MessageSeparator,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import Meta from '@/components/Meta';
import { patchMessage, postMessage } from '@/services/supabase';
import { useDisplayMessages, useMessages } from '@/store/messages';
import { selectedForm, selectedTense, selectedVerb } from '@/store/scripts';
import { useQuestionIDs } from '@/store/scripts';
// import getMessages from '@/services/supabase/getMessages';
// import { useSession } from '@/store/auth';
import { removeNumberAtIndex } from '@/store/utils';

import femaleImg from '/assets/images/avatar-female.svg';
import robotImg from '/assets/images/robot.png';

function Chat() {
  // const { session } = useSession();
  const { questionIDs, setQuestionIDs } = useQuestionIDs();
  const { messages, setMessages } = useMessages();
  const { displayMessages, setDisplayMessages } = useDisplayMessages();
  const verb = useRecoilValue(selectedVerb);
  const tense = useRecoilValue(selectedTense);
  const form = useRecoilValue(selectedForm);
  const [chatText, setChatText] = useState('');
  const [batTyping, setBatTyping] = useState(false);
  const [messageInputDisabled, setMessageInputDisabled] = useState(true);
  const messageInputRef = useRef();
  const handleSend = () => {
    patchMessage(messages[messages.length - 1].id, chatText);
    setDisplayMessages([...displayMessages, { message: chatText, sender: 'you' }]);
    setChatText('');
    setMessageInputDisabled(true);
    setTimeout(() => {
      setBatTyping(true);
    }, 1500);
  };

  // useEffect(() => {
  //   // console.log('localStorage:', localStorage['sb-pdntukcptgktuzpynlsv-auth-token']);
  //   // setSession(localStorage['sb-pdntukcptgktuzpynlsv-auth-token'])
  //   // const sess = JSON.parse(localStorage['sb-pdntukcptgktuzpynlsv-auth-token']);
  //   session !== null ? getMessages(session) : null;
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    startDialogue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startDialogue = () => {
    if (messages.length === 0) {
      createMessage();
    }
  };

  const createMessage = () => {
    const randomIndex = Math.floor(Math.random() * questionIDs.length);
    const randomQuestionID = questionIDs[randomIndex];
    const newList = removeNumberAtIndex(questionIDs, randomIndex);
    setQuestionIDs(newList);
    postMessage(randomQuestionID).then((data) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  };

  useEffect(() => {
    if (messages.length === 1) {
      if (messages[0].text === null) {
        initiateDialogueIntroduction();
      }
      console.log('messages:', messages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    if (displayMessages.length === 1) {
      setTimeout(() => {
        setBatTyping(true);
      }, 1000);
      setTimeout(() => {
        setDisplayMessages([
          ...displayMessages,
          { message: 'déanaimis cleachtadh ar an...', sender: 'robot' },
        ]);
        setBatTyping(false);
      }, 2000 + Math.random() * 1000);
    } else if (displayMessages.length === 2) {
      setTimeout(() => {
        setBatTyping(true);
      }, 1000);
      setTimeout(() => {
        setDisplayMessages([
          ...displayMessages,
          {
            message: `briathar - <strong>${verb}</strong>`,
            sender: 'robot',
          },
        ]);
        setBatTyping(false);
      }, 2000 + Math.random() * 1000);
    } else if (displayMessages.length === 3) {
      setTimeout(() => {
        setBatTyping(true);
      }, 1000);
      setTimeout(() => {
        setDisplayMessages([
          ...displayMessages,
          {
            message: `aimsir - <strong>${tense}</strong>`,
            sender: 'robot',
          },
        ]);
        setBatTyping(false);
      }, 2000 + Math.random() * 1000);
    } else if (displayMessages.length === 4) {
      setTimeout(() => {
        setBatTyping(true);
      }, 1000);
      setTimeout(() => {
        setDisplayMessages([
          ...displayMessages,
          {
            message: `foirm - <strong>${form}</strong>`,
            sender: 'robot',
          },
        ]);
        setBatTyping(false);
      }, 2000 + Math.random() * 1000);
    } else if (displayMessages.length === 5) {
      setTimeout(() => {
        setBatTyping(true);
      }, 1000);
      setTimeout(() => {
        setDisplayMessages([
          ...displayMessages,
          {
            message: `anois, cuirfimid tús leis an gcleachtas`,
            sender: 'robot',
          },
        ]);
        setBatTyping(false);
      }, 2500 + Math.random() * 1000);
    } else if (displayMessages.length === 6) {
      setTimeout(() => {
        setBatTyping(true);
      }, 1000);
      setTimeout(() => {
        setDisplayMessages([
          ...displayMessages,
          {
            message: messages[0].question?.question_text,
            sender: 'robot',
          },
        ]);
        setBatTyping(false);
        setMessageInputDisabled(false);
        if (messageInputRef.current !== null) {
          messageInputRef.current.focus();
        }
      }, 3000 + Math.random() * 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayMessages]);

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
          <MessageSeparator content={new Date().toISOString()} />
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
          onChange={setChatText}
          onSend={handleSend}
          disabled={messageInputDisabled}
          attachButton={false}
          placeholder={'scríobh anseo'}
          ref={messageInputRef}
        />
      </ChatContainer>
    </>
  );
}

export default Chat;
