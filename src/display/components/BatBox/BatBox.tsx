import { ReactNode } from 'react';

import Box from '@mui/material/Box';

interface BatBoxProps {
  children: ReactNode | ReactNode[];
  width?: number | string;
  height?: number | string;
  padding?: number | string;
  button?: boolean;
}

const BatBox = ({
  children,
  width = '90%',
  button = false,
  height = '100%',
  padding = 2,
}: BatBoxProps) => {
  return (
    <Box
      sx={{ backgroundColor: '#67add6' }}
      width={width}
      height={height}
      border={button ? 3 : 4}
      borderRadius={button ? 1.5 : 3}
      borderColor={'#3e435a'}
      p={button ? 0 : padding}
      maxWidth={400}
    >
      {children}
    </Box>
  );
};

export default BatBox;
