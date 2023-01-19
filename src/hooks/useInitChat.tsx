/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

// import IntroMessages from '@/display/controllers/IntroMessages';
import {
  useBatTyping,
  useChatBubbles,
  useCurrentQuestionID,
  useMessages,
} from '@/store/adjacencyPairs';
import { useQuestionIDs } from '@/store/scripts';
import generateNewQuestionID from '@/utils/generateNewQuestionID';

const useInitChat = () => {
  const { chatBubbles, setChatBubbles } = useChatBubbles();
  const { questionIDs, setQuestionIDs } = useQuestionIDs();
  const { setCurrentQuestionID } = useCurrentQuestionID();
  const { messages, setMessages } = useMessages();
  const { setBatTyping } = useBatTyping();

  const initiateDialogueIntroduction = () => {
    setTimeout(() => {
      setBatTyping(true);
    }, 1000);
    setTimeout(() => {
      setChatBubbles([...chatBubbles, { message: 'Conas atá tú?', sender: 'robot' }]);
      setBatTyping(false);
    }, 3000);
  };

  useEffect(() => {
    if (messages.length !== 0) {
      if (messages.length === 1) {
        if (messages[0].text === null) {
          initiateDialogueIntroduction();
        }
      } else {
        console.log('in go to next message');
      }
      console.log('messages:', messages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

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
  return null;
};

export default useInitChat;
