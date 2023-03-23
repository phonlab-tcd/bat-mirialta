/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseModel } from '@/models';

import { Database } from '../../types/supabase';

const removeNumberAtIndex = (arr: number[], index: number) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

const replaceFinalObject = (arr: any[], newValue: any) => {
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

const updateHintsInFinalAdjacencyPair = (
  r: ResponseModel[],
  a_p: Database['public']['Tables']['bat_adjacency_pairs']['Row'],
) => {
  const newAdjacencyPair = { ...a_p, hints: r };
  return newAdjacencyPair;
};

const updateIntroInActiveChat = (
  intro: ResponseModel[],
  chat: Database['public']['Tables']['bat_chats']['Row'],
) => {
  const newActiveChat = { ...chat, intro: intro };
  return newActiveChat;
};

export {
  removeNumberAtIndex,
  replaceFinalObject,
  updateResponsesInFinalAdjacencyPair,
  updateCorrectionInFinalAdjacencyPair,
  updateIntroInActiveChat,
  updateHintsInFinalAdjacencyPair,
};
