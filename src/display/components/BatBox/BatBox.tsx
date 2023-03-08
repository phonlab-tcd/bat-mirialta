import { ReactNode } from 'react';

import Box from '@mui/material/Box';

interface BatBoxProps {
  children: ReactNode | ReactNode[];
  width?: number | string;
  button?: boolean;
}

const BatBox = ({ children, width = '90%', button = false }: BatBoxProps) => {
  return (
    <Box
      sx={{ backgroundColor: '#67add6' }}
      width={width}
      border={4}
      borderRadius={3}
      borderColor={'#3e435a'}
      p={button ? 0 : 2}
      maxWidth={400}
      minWidth={200}
    >
      {children}
    </Box>
  );
};

export default BatBox;
