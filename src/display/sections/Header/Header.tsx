import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';

import { AbIconButton } from 'abair-components';
import { AbMenu } from 'abair-components';

import { basePath, domain } from '@/config';
import { title } from '@/config';
import { FlexBox } from '@/display/components/styled';
import supabase from '@/services/supabase';
import { useProfile } from '@/store/auth';

function Header() {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const [items, setItems] = useState<string[]>(['log in/sign up']);

  const handleMenuChoice = async (item: string) => {
    if (item === 'logout') {
      supabase.auth.signOut().then(() => {
        setItems(['log in/sign up']);
      });
    } else if (item === 'profile') {
      window.location.href = `${domain}profile?origin=applications/bat-mirialta`;
    } else if (item === 'log in/sign up') {
      window.location.href = `${domain}login?origin=applications/bat-mirialta`;
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

  // useEffect(() => {
  //   console.log('items:', items);
  // }, [items]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: 'primary.dark' }} elevation={0} position="static">
        <Toolbar>
          <FlexBox width={'100%'} sx={{ justifyContent: 'space-between' }}>
            <AbIconButton
              selected={true}
              color="info"
              onClick={() => {
                console.log('menu clicked');
              }}
              icon={MenuIcon}
              fontSize="large"
            />
            <Button
              color="info"
              onClick={() => {
                navigate(`${basePath}`);
              }}
            >
              {title}
            </Button>

            <AbMenu items={items} handleMenuChoice={handleMenuChoice} />
          </FlexBox>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
