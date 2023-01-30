import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';

import { AbIconButton } from 'abair-components';
import { AbMenu } from 'abair-components';

import { rootURL } from '@/config';
import { title } from '@/config';
import { FlexBox } from '@/display/components/styled';
import supabase from '@/services/supabase';
import { useProfile } from '@/store/auth';

function Header() {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const [items, setItems] = useState<string[]>([]);

  const handleMenuChoice = async (item: string) => {
    console.log('item clicked:', item);
    if (item === 'log out') {
      await supabase.auth.signOut();
    } else if (item === 'profile') {
      window.location.href = 'https://abair.ie/qa/abair/profile?origin=bat';
    }
  };

  useEffect(() => {
    console.log('profile:', profile);
    if (profile) {
      if (profile.username !== null) {
        setItems([profile.username, 'profile', 'logout']);
      } else {
        setItems([]);
      }
    }
  }, [profile]);

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
                navigate(`${rootURL}`);
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
