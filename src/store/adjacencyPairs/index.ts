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

const newAdjacencyPairNeededState = selector({
  key: 'adjacency-pairs-needed',
  get: ({ get }) => {
    const adjacencyPairs = get(adjacencyPairsState);
    if (adjacencyPairs.length === 0) {
      console.log('newAdjacencyPairNeededState returning False');

      return false;
    } else {
      const finalAdjacencyPair = adjacencyPairs[adjacencyPairs.length - 1];
      console.log('adjacencyPairs:', adjacencyPairs);
      console.log('finalAdjacencyPair:', finalAdjacencyPair);
      if (finalAdjacencyPair.response_id === null) {
        console.log('newAdjacencyPairNeededState returning False');
        return false;
      } else {
        console.log('newAdjacencyPairNeededState returning True');

        return true;
      }
    }
  },
});

export { useAdjacencyPairs, adjacencyPairsState, newAdjacencyPairNeededState };
