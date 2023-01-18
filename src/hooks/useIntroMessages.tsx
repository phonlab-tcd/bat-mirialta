/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import { postMessage } from '@/services/supabase';
import {
  useBatTyping,
  useChatBubbles,
  useCurrentQuestionID,
  useMessageInputDisabled,
  useMessages,
  useRepeatAttempt,
} from '@/store/adjacencyPairs';
import {
  useQuestionIDs,
  useSelectedForm,
  useSelectedTense,
  useSelectedVerb,
} from '@/store/scripts';
// import { selectedFormState, selectedTenseState, selectedVerbState } from '@/store/scripts';
import generateNewQuestionID from '@/utils/generateNewQuestionID';

const useIntroMessages = () => {
  const { currentQuestionID, setCurrentQuestionID } = useCurrentQuestionID();
  const { chatBubbles, setChatBubbles } = useChatBubbles();
  const { setBatTyping } = useBatTyping();
  const { messages, setMessages } = useMessages();
  const { selectedVerb } = useSelectedVerb();
  const { selectedTense } = useSelectedTense();
  const { selectedForm } = useSelectedForm();
  const { setMessageInputDisabled } = useMessageInputDisabled();
  const { repeatAttempt, setRepeatAttempt } = useRepeatAttempt();
  const { questionIDs, setQuestionIDs } = useQuestionIDs();

  useEffect(() => {
    if (chatBubbles.length === 1) {
      setTimeout(() => {
        setBatTyping(true);
      }, 500);
      setTimeout(() => {
        setChatBubbles([
          ...chatBubbles,
          { message: 'déanfaimid cleachtadh ar an...', sender: 'robot' },
        ]);
        setBatTyping(false);
      }, 1000 + Math.random() * 1000);
    } else if (chatBubbles.length === 2) {
      setTimeout(() => {
        setBatTyping(true);
      }, 500);
      setTimeout(() => {
        setChatBubbles([
          ...chatBubbles,
          {
            message: `briathar - <strong>${selectedVerb?.name}</strong>, aimsir - <strong>${selectedTense?.name}</strong>, foirm - <strong>${selectedForm?.name}</strong>`,
            sender: 'robot',
          },
        ]);
        setBatTyping(false);
      }, 1000 + Math.random() * 1000);
    } else if (chatBubbles.length === 3) {
      setTimeout(() => {
        setBatTyping(true);
      }, 500);
      setTimeout(() => {
        setChatBubbles([
          ...chatBubbles,
          {
            message: `anois, cuirfimid tús leis an gcleachtadh`,
            sender: 'robot',
          },
        ]);
        setBatTyping(false);
      }, 1500 + Math.random() * 1000);
    } else if (chatBubbles.length === 4) {
      setTimeout(() => {
        setBatTyping(true);
      }, 500);
      setTimeout(() => {
        setChatBubbles([
          ...chatBubbles,
          {
            message: messages[0].question?.question_text,
            sender: 'robot',
          },
        ]);
        setBatTyping(false);
        setMessageInputDisabled(false);
      }, 3000 + Math.random() * 1000);
    } else if (chatBubbles.length !== 0) {
      const dM = chatBubbles[chatBubbles.length - 1];
      if (dM.sender === 'you') {
        setTimeout(() => {
          setBatTyping(true);
          if (messages[messages.length - 1].correct) {
            setChatBubbles([...chatBubbles, { message: 'ceart', sender: 'robot' }]);
          } else {
            setChatBubbles([...chatBubbles, { message: 'mícheart', sender: 'robot' }]);
          }
        }, 1000);
      } else if (dM.message === 'mícheart') {
        postMessage(currentQuestionID, repeatAttempt + 1).then((data: any) => {
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
        setRepeatAttempt((repeatAttempt) => {
          return repeatAttempt + 1;
        });
        setTimeout(() => {
          setChatBubbles([...chatBubbles, { message: 'Déan iarracht arís', sender: 'robot' }]);
        }, 2000);
      } else if (dM.message === 'ceart') {
        const qID = generateNewQuestionID(questionIDs);
        setQuestionIDs(qID[1]);
        setCurrentQuestionID(qID[0]);
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
        setRepeatAttempt(0);
        setTimeout(() => {
          setChatBubbles([...chatBubbles, { message: 'maith thú!!', sender: 'robot' }]);
        }, 2000);
      } else if (dM.message === 'maith thú!!') {
        setTimeout(() => {
          setChatBubbles([
            ...chatBubbles,
            {
              message: messages[messages.length - 1].question?.question_text,
              sender: 'robot',
            },
          ]);
          setBatTyping(false);
          setMessageInputDisabled(false);
          // if (messageInputRef.current !== null) {
          //   messageInputRef.current.focus();
          // }
        }, 1000 + Math.random() * 1000);
      } else if (dM.message === 'Déan iarracht arís') {
        setTimeout(() => {
          setChatBubbles([
            ...chatBubbles,
            {
              message: messages[messages.length - 1].question?.question_text,
              sender: 'robot',
            },
          ]);
          setBatTyping(false);
          setMessageInputDisabled(false);
          // if (messageInputRef.current !== null) {
          //   messageInputRef.current.focus();
          // }
        }, 1000 + Math.random() * 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatBubbles]);

  return null;
};

export default useIntroMessages;
