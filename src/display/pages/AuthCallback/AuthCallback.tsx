import { useNavigate } from 'react-router-dom';

import supabase from '@/services/supabase';
import { useSession } from '@/store/auth';

const AuthCallback = () => {
  const searchParams = new URLSearchParams(document.location.search);
  const access_token = searchParams.get('access_token') as string;
  const refresh_token = searchParams.get('refresh_token') as string;
  const { setSession } = useSession();

  const navigate = useNavigate();
  console.log(access_token, refresh_token);

  if (access_token && refresh_token) {
    supabase.auth
      .setSession({
        refresh_token: refresh_token,
        access_token: access_token,
      })
      .then(({ data: { session } }) => {
        setSession(session);
        navigate('/');
      });
  } else {
    supabase.auth.signOut().then(() => {
      navigate('/');
    });
  }

  return <h1>in callback</h1>;
};

export default AuthCallback;
