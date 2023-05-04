/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import { production } from '@/config';
import { CenteredFlexBox } from '@/display/components/styled';
import Header from '@/display/sections/Header';
import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import { useChangeLanguage } from '@/hooks';
import Pages from '@/routes/Pages';
import supabase from '@/services/supabase';
import { getProfile } from '@/services/supabase';
import { useProfile, useSession } from '@/store/auth';

function App() {
  const { session, setSession } = useSession();
  const { setProfile } = useProfile();
  const [email] = useState('johnsloan88@hotmail.com');
  const [password] = useState('A1!aaaaa');
  const { i18n } = useTranslation();
  const changeLanguage = useChangeLanguage();

  useEffect(() => {
    if (!production && session === null) {
      supabase.auth.signInWithPassword({ email, password }).then(() => {
        console.log('signed in');
      });
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
    } else {
      const supabaseLocalStorage = localStorage['sb-pdntukcptgktuzpynlsv-auth-token'];
      console.log('supabaseLocalStorage:', supabaseLocalStorage);
      if (supabaseLocalStorage !== undefined) {
        setSession(JSON.parse(supabaseLocalStorage));
      }
    }
  }, []);

  useEffect(() => {
    console.log('session changed');
    if (session !== null) {
      console.log('session:', session);
      getProfile(session).then((p) => {
        setProfile(p);
        if (i18n.language !== p.language_preference) {
          changeLanguage();
        }
        // console.log('profile:', p);
      });
    } else {
      console.log('session is null');
    }
  }, [session]);

  return (
    <Fragment>
      <CssBaseline />
      <BrowserRouter>
        <CenteredFlexBox sx={{ backgroundColor: 'background.dark' }}>
          <Box sx={{ maxWidth: 'sm', width: '100%', minHeight: '100vh' }}>
            <Header />
            <Pages />
          </Box>
        </CenteredFlexBox>
      </BrowserRouter>
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
