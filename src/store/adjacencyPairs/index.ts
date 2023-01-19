import { atom, useRecoilState } from 'recoil';

import { Database } from '../../../types/supabase';

const adjacencyPairsState = atom<Database['public']['Tables']['bat_adjacency_pairs']['Row'][]>({
  key: 'adjacency-pairs-state',
  default: [],
});

const useAdjacencyPairs = () => {
  const [adjacencyPairs, setAdjacencyPairs] = useRecoilState(adjacencyPairsState);
  return { adjacencyPairs, setAdjacencyPairs };
};

export { useAdjacencyPairs, adjacencyPairsState };
