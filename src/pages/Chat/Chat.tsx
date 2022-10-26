// import { useRef, useState } from 'react';
// import { useRecoilValue } from 'recoil';
import {
  Avatar,
  ChatContainer,
  ConversationHeader, // InfoButton,
  // Message,
  // MessageInput,
  // MessageList,
  // MessageSeparator,
  // TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import Meta from '@/components/Meta';

// import { messageModel } from '@/models';
// import { patchMessage, postMessage } from '@/services/supabase';
// import { useDisplayMessages, useMessages } from '@/store/messages';
// import { selectedForm, selectedTense, selectedVerb } from '@/store/scripts';
// import { useQuestionIDs } from '@/store/scripts';
// import getMessages from '@/services/supabase/getMessages';
// import { useSession } from '@/store/auth';
// import { removeNumberAtIndex, replaceFinalMessage } from '@/store/utils';
// import femaleImg from '/assets/images/avatar-female.svg';
import robotImg from '/assets/images/robot.png';

function Chat() {
  // const { session } = useSession();
  // const { questionIDs, setQuestionIDs } = useQuestionIDs();
  // const { messages, setMessages } = useMessages();
  // const { displayMessages, setDisplayMessages } = useDisplayMessages();
  // const verb = useRecoilValue(selectedVerb);
  // const tense = useRecoilValue(selectedTense);
  // const form = useRecoilValue(selectedForm);
  // const [chatText, setChatText] = useState('');
  // const [repeatAttempt, setRepeatAttempt] = useState(0);
  // const [currentQuestionID, setCurrentQuestionID] = useState<number>(1);
  // const [batTyping, setBatTyping] = useState(false);
  // const [messageInputDisabled, setMessageInputDisabled] = useState(true);
  // const messageInputRef = useRef(null);

  // const handleSend = () => {
  //   const correct = chatText === messages[messages.length - 1].question.answer ? true : false;
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   patchMessage(messages[messages.length - 1].id, chatText, correct).then((data: any) => {
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     const question: any = data?.bat_questions;
  //     setMessages(
  //       replaceFinalMessage(messages, {
  //         id: data?.id,
  //         question: question,
  //         text: data?.text,
  //         correct: data?.correct,
  //         retry_attempt: data?.retry_attempt,
  //         bat_response: data?.bat_response,
  //       }),
  //     );
  //     setDisplayMessages([...displayMessages, { message: chatText, sender: 'you' }]);
  //     setChatText('');
  //     setMessageInputDisabled(true);
  //   });
  // };

  // useEffect(() => {
  //   // console.log('localStorage:', localStorage['sb-pdntukcptgktuzpynlsv-auth-token']);
  //   // setSession(localStorage['sb-pdntukcptgktuzpynlsv-auth-token'])
  //   // const sess = JSON.parse(localStorage['sb-pdntukcptgktuzpynlsv-auth-token']);
  //   session !== null ? getMessages(session) : null;
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   startDialogue();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const startDialogue = () => {
  //   if (messages.length === 0) {
  //     const qID = getNewQuestionID();
  //     createMessage(qID, 0);
  //   }
  // };

  // const createMessage = (questionID: number, repeat: number) => {
  //   postMessage(questionID, repeat).then((data) => {
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     const question: any = data?.bat_questions;
  //     setMessages([
  //       ...messages,
  //       {
  //         id: data?.id,
  //         question: question,
  //         text: data?.text,
  //         correct: data?.correct,
  //         retry_attempt: data?.retry_attempt,
  //         bat_response: data?.bat_response,
  //       },
  //     ]);
  //   });
  // };

  // useEffect(() => {
  //   if (messages.length !== 0) {
  //     if (messages.length === 1) {
  //       if (messages[0].text === null) {
  //         initiateDialogueIntroduction();
  //       }
  //     } else {
  //       goToNextMessage();
  //     }
  //     console.log('messages:', messages);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [messages]);

  // const goToNextMessage = () => {
  //   console.log('in go to next message');
  // };

  // useEffect(() => {
  //   if (displayMessages.length === 1) {
  //     setTimeout(() => {
  //       setBatTyping(true);
  //     }, 500);
  //     setTimeout(() => {
  //       setDisplayMessages([
  //         ...displayMessages,
  //         { message: 'déanfaimid cleachtadh ar an...', sender: 'robot' },
  //       ]);
  //       setBatTyping(false);
  //     }, 1000 + Math.random() * 1000);
  //   } else if (displayMessages.length === 2) {
  //     setTimeout(() => {
  //       setBatTyping(true);
  //     }, 500);
  //     setTimeout(() => {
  //       setDisplayMessages([
  //         ...displayMessages,
  //         {
  //           message: `briathar - <strong>${verb}</strong>`,
  //           sender: 'robot',
  //         },
  //       ]);
  //       setBatTyping(false);
  //     }, 1000 + Math.random() * 1000);
  //   } else if (displayMessages.length === 3) {
  //     setTimeout(() => {
  //       setBatTyping(true);
  //     }, 500);
  //     setTimeout(() => {
  //       setDisplayMessages([
  //         ...displayMessages,
  //         {
  //           message: `aimsir - <strong>${tense}</strong>`,
  //           sender: 'robot',
  //         },
  //       ]);
  //       setBatTyping(false);
  //     }, 1000 + Math.random() * 1000);
  //   } else if (displayMessages.length === 4) {
  //     setTimeout(() => {
  //       setBatTyping(true);
  //     }, 500);
  //     setTimeout(() => {
  //       setDisplayMessages([
  //         ...displayMessages,
  //         {
  //           message: `foirm - <strong>${form}</strong>`,
  //           sender: 'robot',
  //         },
  //       ]);
  //       setBatTyping(false);
  //     }, 1000 + Math.random() * 1000);
  //   } else if (displayMessages.length === 5) {
  //     setTimeout(() => {
  //       setBatTyping(true);
  //     }, 500);
  //     setTimeout(() => {
  //       setDisplayMessages([
  //         ...displayMessages,
  //         {
  //           message: `anois, cuirfimid tús leis an gcleachtadh`,
  //           sender: 'robot',
  //         },
  //       ]);
  //       setBatTyping(false);
  //     }, 1500 + Math.random() * 1000);
  //   } else if (displayMessages.length === 6) {
  //     setTimeout(() => {
  //       setBatTyping(true);
  //     }, 500);
  //     setTimeout(() => {
  //       setDisplayMessages([
  //         ...displayMessages,
  //         {
  //           message: messages[0].question?.question_text,
  //           sender: 'robot',
  //         },
  //       ]);
  //       setBatTyping(false);
  //       setMessageInputDisabled(false);
  //       if (messageInputRef.current !== null) {
  //         messageInputRef.current.focus();
  //       }
  //     }, 3000 + Math.random() * 1000);
  //   } else if (displayMessages.length !== 0) {
  //     const dM = displayMessages[displayMessages.length - 1];
  //     if (dM.sender === 'you') {
  //       setTimeout(() => {
  //         setBatTyping(true);
  //         if (messages[messages.length - 1].correct) {
  //           setDisplayMessages([...displayMessages, { message: 'ceart', sender: 'robot' }]);
  //         } else {
  //           setDisplayMessages([...displayMessages, { message: 'mícheart', sender: 'robot' }]);
  //         }
  //       }, 1000);
  //     } else if (dM.message === 'mícheart') {
  //       createMessage(currentQuestionID, repeatAttempt + 1);
  //       setRepeatAttempt(repeatAttempt + 1);
  //       setTimeout(() => {
  //         setDisplayMessages([
  //           ...displayMessages,
  //           { message: 'Déan iarracht arís', sender: 'robot' },
  //         ]);
  //       }, 2000);
  //     } else if (dM.message === 'ceart') {
  //       const qID = getNewQuestionID();
  //       createMessage(qID, 0);
  //       setRepeatAttempt(0);
  //       setTimeout(() => {
  //         setDisplayMessages([...displayMessages, { message: 'maith thú!!', sender: 'robot' }]);
  //       }, 2000);
  //     } else if (dM.message === 'maith thú!!') {
  //       setTimeout(() => {
  //         setDisplayMessages([
  //           ...displayMessages,
  //           {
  //             message: messages[messages.length - 1].question?.question_text,
  //             sender: 'robot',
  //           },
  //         ]);
  //         setBatTyping(false);
  //         setMessageInputDisabled(false);
  //         if (messageInputRef.current !== null) {
  //           messageInputRef.current.focus();
  //         }
  //       }, 1000 + Math.random() * 1000);
  //     } else if (dM.message === 'Déan iarracht arís') {
  //       setTimeout(() => {
  //         setDisplayMessages([
  //           ...displayMessages,
  //           {
  //             message: messages[messages.length - 1].question?.question_text,
  //             sender: 'robot',
  //           },
  //         ]);
  //         setBatTyping(false);
  //         setMessageInputDisabled(false);
  //         if (messageInputRef.current !== null) {
  //           messageInputRef.current.focus();
  //         }
  //       }, 1000 + Math.random() * 1000);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [displayMessages]);

  // const initiateDialogueIntroduction = () => {
  //   setTimeout(() => {
  //     setBatTyping(true);
  //   }, 1000);
  //   setTimeout(() => {
  //     setDisplayMessages([...displayMessages, { message: 'Conas atá tú?', sender: 'robot' }]);
  //     setBatTyping(false);
  //   }, 3000);
  // };

  return (
    <>
      <Meta title="Chat" />
      <ChatContainer>
        <ConversationHeader>
          <Avatar src={robotImg} name="Bat" />

          <ConversationHeader.Content userName="Bat" info="Active Now" />
        </ConversationHeader>
        {/* <MessageList
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
        </MessageList> */}
        {/* <MessageInput
          value={chatText}
          onChange={setChatText}
          // onSend={handleSend}
          onSend={() => {
            console.log('send');
          }}
          disabled={messageInputDisabled}
          attachButton={false}
          placeholder={'scríobh anseo'}
          ref={messageInputRef}
        /> */}
      </ChatContainer>
    </>
  );
}

export default Chat;
