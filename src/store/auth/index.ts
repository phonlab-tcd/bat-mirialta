import { atom, useRecoilState } from 'recoil';

import { Session } from '@supabase/supabase-js';

import { Database } from '../../../types/supabase';

const sessionState = atom<Session | null>({
  key: 'session',
  default: null,
});

const useSession = () => {
  const [session, setSession] = useRecoilState(sessionState);
  return { session, setSession };
};

const profileState = atom<Database['public']['Tables']['profiles']['Row'] | null>({
  key: 'profile',
  default: null,
});

const useProfile = () => {
  const [profile, setProfile] = useRecoilState(profileState);
  return { profile, setProfile };
};

export { useSession, useProfile };
