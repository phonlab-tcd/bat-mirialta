import { ReactNode } from 'react';

import Box from '@mui/material/Box';

interface BatBoxProps {
  children: ReactNode | ReactNode[];
  width?: number | string;
  height?: number | string;
  padding?: number | string;
  button?: boolean;
  backgroundColor?: string;
}

const BatBox = ({
  children,
  width = '90%',
  button = false,
  height = '100%',
  padding = 2,
  backgroundColor = '#67add6',
}: BatBoxProps) => {
  return (
    <Box
      sx={{ backgroundColor: backgroundColor, zIndex: 1 }}
      width={width}
      height={height}
      border={button ? 2 : 4}
      borderRadius={button ? 2.5 : 4}
      borderColor={'#3e435a'}
      p={button ? 0 : padding}
      maxWidth={400}
    >
      {children}
    </Box>
  );
};

export default BatBox;
