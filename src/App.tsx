import { Fragment, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Pages from '@/routes/Pages';
import Header from '@/sections/Header';
import supabase from '@/services/supabase';

import { CenteredFlexBox } from './components/styled';
import { useSession } from './store/auth';

function App() {
  const { setSession } = useSession();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    supabase.auth.setSession('u4tnu1nTDxD8J7siCokOew').then(({ data: { session } }) => {
      console.log('session:', session);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
