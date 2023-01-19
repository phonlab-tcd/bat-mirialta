import { Database } from '../../types/supabase';

const removeNumberAtIndex = (arr: number[], index: number) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

function replaceFinalMessage(
  arr: Database['public']['Tables']['bat_adjacency_pairs']['Row'][],
  newValue: Database['public']['Tables']['bat_adjacency_pairs']['Row'],
) {
  return [...arr.slice(0, arr.length - 1), newValue];
}

export { removeNumberAtIndex, replaceFinalMessage };
