import { atom, useRecoilState } from 'recoil';

import { Session } from '@supabase/supabase-js';

const sessionState = atom<Session | null>({
  key: 'session',
  default: null,
});

const useSession = () => {
  const [session, setSession] = useRecoilState(sessionState);
  return { session, setSession };
};

export { useSession };
