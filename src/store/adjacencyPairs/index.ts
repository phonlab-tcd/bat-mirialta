import { atom, selector, useRecoilState } from 'recoil';

import { Database } from '../../../types/supabase';

const adjacencyPairsState = atom<Database['public']['Tables']['bat_adjacency_pairs']['Row'][]>({
  key: 'adjacency-pairs-state',
  default: [],
});

const useAdjacencyPairs = () => {
  const [adjacencyPairs, setAdjacencyPairs] = useRecoilState(adjacencyPairsState);
  return { adjacencyPairs, setAdjacencyPairs };
};

const currentAdjacencyPairState = selector({
  key: 'current-adjacency-pair',
  get: ({ get }) => {
    const adjacencyPairs = get(adjacencyPairsState);
    if (adjacencyPairs.length > 0) {
      return adjacencyPairs.reduce((max, aP) => (max.id > aP.id ? max : aP));
    } else {
      return undefined;
    }
  },
});

// const hintsGivenState = selector({
//   key: 'hints-given',
//   get: ({ get }) => {
//     const adjacencyPairs = get(adjacencyPairsState);
//     let hints = 0;
//     adjacencyPairs.map((aP) => {
//       if (aP.retry_attempt === 0) {
//         hints = 0;
//       }
//       if (aP.hints !== null) {
//         hints += aP.hints.length;
//       }
//     });
//     return hints;
//   },
// });

const awaitingHintState = atom<boolean>({
  key: 'awaiting-hint-state',
  default: false,
});

const useAwaitingHint = () => {
  const [awaitingHint, setAwaitingHint] = useRecoilState(awaitingHintState);
  return { awaitingHint, setAwaitingHint };
};

const receivedAdjacencyPairHistoryState = atom<boolean>({
  key: 'received-adjacency-pair-history-state',
  default: false,
});

const useReceivedAdjacencyPairHistory = () => {
  const [receivedAdjacencyPairHistory, setReceivedAdjacencyPairHistory] = useRecoilState(
    receivedAdjacencyPairHistoryState,
  );
  return { receivedAdjacencyPairHistory, setReceivedAdjacencyPairHistory };
};

export {
  useAdjacencyPairs,
  adjacencyPairsState,
  currentAdjacencyPairState,
  useReceivedAdjacencyPairHistory,
  // hintsGivenState,
  useAwaitingHint,
};
