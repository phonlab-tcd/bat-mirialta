import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Pages from '@/routes/Pages';
import Header from '@/sections/Header';
import supabase from '@/services/supabase';
import { getProfile } from '@/services/supabase';

import { CenteredFlexBox } from './components/styled';
import { useSession } from './store/auth';

function App() {
  const { session, setSession } = useSession();

  // Log in fake user for development
  const [email] = useState('test@test.com');
  const [password] = useState('xxxxxx');
  useEffect(() => {
    supabase.auth.signInWithPassword({ email, password }).then(() => {
      console.log('logged in');
    });

    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   setSession(session);
    // });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (session !== null) {
      getProfile(session).then((p) => {
        console.log('p:', p);
      });
    }
  }, [session]);

  return (
    <Fragment>
      <CssBaseline />
      <BrowserRouter>
        <CenteredFlexBox sx={{ backgroundColor: 'background.dark' }}>
          <Box sx={{ maxWidth: 'sm', width: '100%' }}>
            <Header />
            <Pages />
          </Box>
        </CenteredFlexBox>
      </BrowserRouter>
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
