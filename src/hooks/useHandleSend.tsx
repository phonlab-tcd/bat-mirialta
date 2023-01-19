/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { patchMessage } from '@/services/supabase';
import { useAdjacencyPairs } from '@/store/adjacencyPairs';
import { useChatText, useMessageInputDisabled } from '@/store/textInput';

// import { replaceFinalMessage } from '@/store/utils';

const useHandleSend = () => {
  const { adjacencyPairs /*, setAdjacencyPairs */ } = useAdjacencyPairs();

  const { chatText, setChatText } = useChatText();
  const { setMessageInputDisabled } = useMessageInputDisabled();
  const handleSend = () => {
    // const correct =
    // chatText === adjacencyPairs[adjacencyPairs.length - 1].question?.answer ? true : false;
    const correct = true;

    patchMessage(adjacencyPairs[adjacencyPairs.length - 1].id, chatText, correct).then(() => {
      // (data: any) => {
      // const question: any = data?.bat_questions;
      // setAdjacencyPairs(
      //   replaceFinalMessage(adjacencyPairs, {
      //     id: data?.id,
      //     question_id: data?.question_id,
      //     text: data?.text,
      //     correct: data?.correct,
      //     retry_attempt: data?.retry_attempt,
      //     response_id: data?.response_id,
      //   }),
      // );
      setChatText('');
      setMessageInputDisabled(true);
    });
  };

  return handleSend;
};

export default useHandleSend;
