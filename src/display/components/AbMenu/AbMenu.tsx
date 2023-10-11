import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import { AbIconButton } from '.';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface AbMenuProps {
  items: string[];
  avatar: string;
  handleMenuChoice: (item: string) => void;
}

const AbMenu = ({
  items = ['Profile', 'Log Out'],
  avatar = '',
  handleMenuChoice = (item) => {
    console.log('item:', item);
  },
}: AbMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChoice = (item: string) => {
    setAnchorEl(null);
    handleMenuChoice(item);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar
          src={
            avatar === ''
              ? 'https://pdntukcptgktuzpynlsv.supabase.co/storage/v1/object/public/abair-bucket/avatars/anon-avatar.png'
              : avatar
          }
          alt="me"
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        disableScrollLock={true}
      >
        {items.map((item, i) => (
          <MenuItem key={i} onClick={() => handleChoice(item)}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export { AbMenu, AbMenuProps };
