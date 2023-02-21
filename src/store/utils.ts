/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseModel } from '@/models';

import { Database } from '../../types/supabase';

const removeNumberAtIndex = (arr: number[], index: number) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

const replaceFinalAdjacencyPair = (
  arr: Database['public']['Tables']['bat_adjacency_pairs']['Row'][],
  newValue: Database['public']['Tables']['bat_adjacency_pairs']['Row'],
) => {
  return [...arr.slice(0, arr.length - 1), newValue];
};

const updateCorrectionInFinalAdjacencyPair = (
  c: boolean,
  e_d: any,
  a_p: Database['public']['Tables']['bat_adjacency_pairs']['Row'],
) => {
  const newAdjacencyPair = { ...a_p, correct: c, error_data: e_d, response: [] };
  return newAdjacencyPair;
};

const updateResponsesInFinalAdjacencyPair = (
  r: ResponseModel[],
  a_p: Database['public']['Tables']['bat_adjacency_pairs']['Row'],
) => {
  const newAdjacencyPair = { ...a_p, response: r };
  return newAdjacencyPair;
};

export {
  removeNumberAtIndex,
  replaceFinalAdjacencyPair,
  updateResponsesInFinalAdjacencyPair,
  updateCorrectionInFinalAdjacencyPair,
};
