/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import useDelayBatFeedback from '@/hooks/animate/useDelayBatFeedback';
import { ResponseModel } from '@/models';
import { useAdjacencyPairs } from '@/store/adjacencyPairs';
import { currentAdjacencyPairState } from '@/store/adjacencyPairs';
import { useAwaitingHint } from '@/store/adjacencyPairs';
import { activeChatState } from '@/store/chats';
import { replaceFinalObject } from '@/store/utils';
import { updateHintsInFinalAdjacencyPair } from '@/store/utils';

import { Database } from '../../../types/supabase';

const useAnimateHints = () => {
  const { adjacencyPairs, setAdjacencyPairs } = useAdjacencyPairs();
  const currentAdjacencyPair = useRecoilValue(currentAdjacencyPairState);
  const [animatingHints, setAnimatingHints] = useState(false);
  const [hints, setHints] = useState<ResponseModel[]>([]);
  const delayBatFeedback = useDelayBatFeedback();
  const { setAwaitingHint } = useAwaitingHint();

  const activeChat = useRecoilValue(activeChatState);

  useEffect(() => {
    if (activeChat !== undefined && animatingHints && currentAdjacencyPair !== undefined) {
      setAnimatingHints(false);
      let updatedAdjacencyPairs: Database['public']['Tables']['bat_adjacency_pairs']['Row'][];
      let tempUpdatedAdjacencyPairs: Database['public']['Tables']['bat_adjacency_pairs']['Row'][];
      if (currentAdjacencyPair.hints === null) {
        const tempUpdatedAdjacencyPair = updateHintsInFinalAdjacencyPair(
          [{ text: 'temp', form: 'statement' }],
          currentAdjacencyPair,
        );
        tempUpdatedAdjacencyPairs = replaceFinalObject(adjacencyPairs, tempUpdatedAdjacencyPair);
        setAdjacencyPairs(tempUpdatedAdjacencyPairs);

        const updatedAdjacencyPair = updateHintsInFinalAdjacencyPair(hints, currentAdjacencyPair);
        updatedAdjacencyPairs = replaceFinalObject(adjacencyPairs, updatedAdjacencyPair);
      } else if (currentAdjacencyPair.hints.length === 1) {
        const tempUpdatedAdjacencyPair = updateHintsInFinalAdjacencyPair(
          currentAdjacencyPair.hints.concat([{ text: 'temp', form: 'statement' }]),
          currentAdjacencyPair,
        );
        tempUpdatedAdjacencyPairs = replaceFinalObject(adjacencyPairs, tempUpdatedAdjacencyPair);
        setAdjacencyPairs(tempUpdatedAdjacencyPairs);

        const updatedAdjacencyPair = updateHintsInFinalAdjacencyPair(
          currentAdjacencyPair.hints.concat(hints[1]),
          currentAdjacencyPair,
        );
        updatedAdjacencyPairs = replaceFinalObject(adjacencyPairs, updatedAdjacencyPair);
      }
      delayBatFeedback(
        () => {
          setAdjacencyPairs(updatedAdjacencyPairs);
          setAwaitingHint(false);
        },
        2000,
        false,
      );
    }
  }, [animatingHints]);

  const animateHints = (a_p: Database['public']['Tables']['bat_adjacency_pairs']['Row']) => {
    if (currentAdjacencyPair && a_p.hints !== null) {
      setHints(a_p.hints);
      setAnimatingHints(true);
    }
  };

  return animateHints;
};

export default useAnimateHints;
