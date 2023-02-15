/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilValue } from 'recoil';

import { patchAdjacencyPairText } from '@/services/supabase';
import { currentAdjacencyPairState, useAdjacencyPairs } from '@/store/adjacencyPairs';
import { currentQuestionState } from '@/store/questions';
import { useChatText, useMessageInputDisabled } from '@/store/textInput';
import { replaceFinalAdjacencyPair } from '@/store/utils';

const useHandleSend = () => {
  const currentAdjacencyPair = useRecoilValue(currentAdjacencyPairState);
  const currentQuestion = useRecoilValue(currentQuestionState);
  const { adjacencyPairs, setAdjacencyPairs } = useAdjacencyPairs();
  const { chatText, setChatText } = useChatText();
  const { setMessageInputDisabled } = useMessageInputDisabled();
  const handleSend = () => {
    if (currentQuestion !== undefined && currentAdjacencyPair !== undefined) {
      setChatText('');
      setMessageInputDisabled(true);
      const correct = chatText === currentQuestion.answer ? true : false;
      patchAdjacencyPairText(currentAdjacencyPair.id, chatText, correct).then((a_p) => {
        setAdjacencyPairs(replaceFinalAdjacencyPair(adjacencyPairs, a_p));
      });
    } else {
      alert('currentQuestion is undefined');
    }
  };

  return handleSend;
};

export default useHandleSend;
