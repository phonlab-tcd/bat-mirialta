/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import LoginIcon from '@mui/icons-material/Login';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Image from 'mui-image';

import { title } from '@/config';
import { AbMenu } from '@/display/components/AbMenu';
import { FlexBox, FullSizeCenteredFlexBox } from '@/display/components/styled';
import { useChangeLanguage } from '@/hooks';
import supabase from '@/services/supabase';
import { useProfile, useSession } from '@/store/auth';

import abairFullLogo from '/assets/images/abair-logo-old.png';

function Header() {
  const navigate = useNavigate();
  const { profile, setProfile } = useProfile();
  const { i18n, t } = useTranslation();
  const [items, setItems] = useState<string[]>([`${t('menu.logIn')}/${t('menu.signUp')}`]);
  const { session, setSession } = useSession();
  const changeLanguage = useChangeLanguage();

  useEffect(() => {
    if (profile) {
      setItems([
        profile.username === null ? 'anon' : profile.username,
        t('menu.profile'),
        t('menu.logOut'),
      ]);
    } else {
      setItems([`${t('menu.logIn')}/${t('menu.signUp')}`]);
    }
  }, [profile]);

  // check if the user has come from Scéalaí, then return no header
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  if (searchParams.get('ref') === 'scealai') {
    return null;
  }

  const callbackUrl = encodeURIComponent(
    `${window.location.protocol}//${window.location.host}/auth/callback`,
  );
  const authCallback = `${import.meta.env.VITE_PUBLIC_AUTH_URL}?ref=${callbackUrl}`;
  const signOutCallback = `${import.meta.env.VITE_PUBLIC_AUTH_URL}sign-out?ref=${callbackUrl}`;
  const profileCallback = `${import.meta.env.VITE_PUBLIC_AUTH_URL}profile?ref=${callbackUrl}`;

  const handleMenuChoice = async (item: string) => {
    if (item === t('menu.logOut')) {
      supabase.auth.signOut().then(() => {
        setItems([`${t('menu.logIn')}/${t('menu.signUp')}`]);
        setProfile(null);
        setSession(null);
        window.location.href = signOutCallback;
      });
    } else if (item === t('menu.profile')) {
      window.location.href = profileCallback;
    } else if (item === `${t('menu.logIn')}/${t('menu.signUp')}`) {
      window.location.href = authCallback;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: 'primary.dark' }} elevation={0} position="static">
        <Toolbar>
          {/* <FlexBox width={'100%'} sx={{ justifyContent: 'space-between' }}> */}
          <Grid container>
            <Grid item xs={2}>
              <Button
                size={'large'}
                onClick={() => {
                  window.location.href = import.meta.env.VITE_ABAIR_URL;
                }}
              >
                <Image
                  duration={1000}
                  height={40}
                  width={50}
                  easing="ease-out"
                  alt="abair.ie"
                  src={abairFullLogo}
                  showLoading
                />
              </Button>
            </Grid>
            {/* <Button size={'small'} sx={{ visibility: 'hidden' }}></Button> */}
            <Grid item xs={2}></Grid>

            <Grid item xs={4}>
              <FullSizeCenteredFlexBox>
                <Button
                  color="primary"
                  size={'large'}
                  onClick={() => {
                    navigate(`/`);
                  }}
                >
                  {title}
                </Button>
              </FullSizeCenteredFlexBox>
            </Grid>

            <Grid item xs={2.5}>
              <FlexBox justifyContent="flex-end" alignItems="center" height={'100%'}>
                <Button size={'large'} onClick={changeLanguage}>
                  <Typography color={i18n.language === 'ga' ? 'secondary' : 'primary'}>
                    ga
                  </Typography>
                  <Typography color={'primary'}>/</Typography>
                  <Typography color={i18n.language === 'en' ? 'secondary' : 'primary'}>
                    en
                  </Typography>
                </Button>
              </FlexBox>
            </Grid>
            <Grid item xs={1.5}>
              <FlexBox justifyContent="center" alignItems="center" height={'100%'}>
                {session ? (
                  <AbMenu
                    avatar={profile !== null ? profile.avatar : ''}
                    items={items}
                    handleMenuChoice={handleMenuChoice}
                  />
                ) : (
                  <IconButton
                    onClick={() => {
                      window.location.href = authCallback;
                    }}
                    size="medium"
                    edge="end"
                    sx={{ color: 'primary.main' }}
                    aria-label="log in"
                  >
                    <LoginIcon />
                  </IconButton>
                )}
              </FlexBox>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
