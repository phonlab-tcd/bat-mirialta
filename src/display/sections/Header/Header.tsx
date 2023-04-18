import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import LoginIcon from '@mui/icons-material/Login';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { AbMenu } from 'abair-components';
import Image from 'mui-image';

import { basePath, domain } from '@/config';
import { title } from '@/config';
import { FlexBox, FullSizeCenteredFlexBox } from '@/display/components/styled';
import supabase from '@/services/supabase';
import { useProfile, useSession } from '@/store/auth';

import abairFullLogo from '/assets/images/abair-logo-old.png';

function Header() {
  const navigate = useNavigate();
  const { profile, setProfile } = useProfile();
  const [items, setItems] = useState<string[]>(['log in/sign up']);
  const { i18n } = useTranslation();
  const { session, setSession } = useSession();

  const handleMenuChoice = async (item: string) => {
    if (item === 'logout') {
      supabase.auth.signOut().then(() => {
        setItems(['log in/sign up']);
        setProfile(null);
        setSession(null);
        navigate(`${basePath}`);
      });
    } else if (item === 'profile') {
      window.location.href = `${domain}/profile?origin=applications/bat-mirialta`;
    } else if (item === 'log in/sign up') {
      window.location.href = `${domain}/login?origin=applications/bat-mirialta`;
    }
  };

  useEffect(() => {
    if (profile) {
      // console.log('profile:', profile);
      if (profile.username !== null) {
        setItems([profile.username, 'profile', 'logout']);
      } else {
        setItems(['log in/sign up']);
      }
    } else {
      // console.log('profile:', profile);
    }
  }, [profile]);

  const changeLang = () => {
    i18n.language === 'en' ? i18n.changeLanguage('ga') : i18n.changeLanguage('en');
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
                  window.location.href = `${domain}`;
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
                    navigate(`${basePath}`);
                  }}
                >
                  {title}
                </Button>
              </FullSizeCenteredFlexBox>
            </Grid>

            <Grid item xs={2.5}>
              <FlexBox justifyContent="flex-end" alignItems="center" height={'100%'}>
                <Button size={'large'} onClick={changeLang}>
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
                      window.location.href = `${domain}/login`;
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
