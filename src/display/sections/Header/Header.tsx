import { useNavigate } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';

import { AbIconButton } from 'abair-components';

import { title } from '@/config';
import { FlexBox } from '@/display/components/styled';

function Header() {
  const navigate = useNavigate();
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
              icon={AddCircleOutlineIcon}
              fontSize="small"
            />
            <Button
              color="info"
              onClick={() => {
                navigate('');
              }}
            >
              {title}
            </Button>
            <AbIconButton
              selected={true}
              color="info"
              onClick={() => {
                console.log('menu clicked');
              }}
              icon={AccountCircleIcon}
            />
          </FlexBox>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
