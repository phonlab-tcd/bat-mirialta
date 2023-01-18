import { atom, useRecoilState } from 'recoil';

import { Database } from '../../../types/supabase';

const responsesState = atom<Database['public']['Tables']['bat_responses']['Row'][]>({
  key: 'responses-state',
  default: [],
});

const useResponses = () => {
  const [responses, setResponses] = useRecoilState(responsesState);
  return { responses, setResponses };
};

export { responsesState, useResponses };
