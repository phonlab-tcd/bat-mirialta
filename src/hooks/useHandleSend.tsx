/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { patchMessage } from '@/services/supabase';
import { useAdjacencyPairs, useChatText, useMessageInputDisabled } from '@/store/adjacencyPairs';
import { replaceFinalMessage } from '@/store/utils';

const useHandleSend = () => {
  const { adjacencyPairs, setAdjacencyPairs } = useAdjacencyPairs();

  const { chatText, setChatText } = useChatText();
  const { setMessageInputDisabled } = useMessageInputDisabled();
  const handleSend = () => {
    const correct =
      chatText === adjacencyPairs[adjacencyPairs.length - 1].question?.answer ? true : false;

    patchMessage(adjacencyPairs[adjacencyPairs.length - 1].id, chatText, correct).then(
      (data: any) => {
        const question: any = data?.bat_questions;
        setAdjacencyPairs(
          replaceFinalMessage(adjacencyPairs, {
            id: data?.id,
            question: question,
            text: data?.text,
            correct: data?.correct,
            retry_attempt: data?.retry_attempt,
            bat_response: data?.bat_response,
          }),
        );
        setChatText('');
        setMessageInputDisabled(true);
      },
    );
  };

  return handleSend;
};

export default useHandleSend;
