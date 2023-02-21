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
      patchAdjacencyPairText(currentAdjacencyPair.id, chatText).then((a_p) => {
        setAdjacencyPairs(replaceFinalAdjacencyPair(adjacencyPairs, a_p));
      });
    } else {
      console.log('useHandleSend: currentQuestion or currentAdjacencyPair is undefined');
      console.log('currentQuestion: ', currentQuestion);
      console.log('currentAdjacencyPair: ', currentAdjacencyPair);
    }
  };

  return handleSend;
};

export default useHandleSend;
