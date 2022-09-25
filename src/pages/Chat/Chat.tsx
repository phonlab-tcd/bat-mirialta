import { useEffect } from 'react';

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
import getMessages from '@/services/supabase/getChatHistory';
// import { useSession } from '@/store/auth';
import { useChatText } from '@/store/chat';

// import { useMessages } from '@/store/messages';
import femaleImg from '/assets/images/avatar-female.svg';
import robotImg from '/assets/images/robot.png';

function Chat() {
  // const { session, setSession } = useSession();
  const { chatText, setChatText } = useChatText();
  // const { messages, setMessages } = useMessages();
  const handleSend = () => {
    console.log('sending');
  };

  useEffect(() => {
    console.log('localStorage:', localStorage['sb-pdntukcptgktuzpynlsv-auth-token']);
    // setSession(localStorage['sb-pdntukcptgktuzpynlsv-auth-token'])
    const sess = JSON.parse(localStorage['sb-pdntukcptgktuzpynlsv-auth-token']);
    sess !== null ? getMessages(sess) : null;
  }, []);

  return (
    <>
      <Meta title="Chat" />
      <ChatContainer>
        <ConversationHeader>
          <Avatar src={robotImg} name="Bat" />

          <ConversationHeader.Content userName="Bat" info="Active 10 mins ago" />
          {/* 
          <ConversationHeader.Actions>
            <InfoButton />
          </ConversationHeader.Actions> */}
        </ConversationHeader>
        <MessageList typingIndicator={<TypingIndicator content="Bat is typing" />}>
          <MessageSeparator content="Saturday, 30 November 2019" />
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(
            (i, j) => (
              <Message
                key={j}
                model={{
                  message: 'Hello my friend, how are you doing today?',
                  sentTime: 'just now',
                  sender: j % 2 === 0 ? 'Robot' : 'You',
                  direction: j % 2 === 0 ? 'incoming' : 'outgoing',
                  position: 'single',
                }}
              >
                <Avatar src={j % 2 === 0 ? robotImg : femaleImg} name="Robot" />
              </Message>
            ),
          )}
        </MessageList>
        <MessageInput
          value={chatText}
          onChange={setChatText}
          onSend={handleSend}
          disabled={false}
          attachButton={false}
          placeholder="Scriobh anseo"
          autoFocus
        />
      </ChatContainer>
    </>
  );
}

export default Chat;
