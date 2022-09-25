import Button from '@mui/material/Button';

import { AbButtonProps } from './types';

const AbButton = ({ onClick, label, selected, color, disabled, height, width }: AbButtonProps) => {
  return (
    <Button
      variant={selected ? 'contained' : 'outlined'}
      disabled={disabled}
      onClick={onClick}
      sx={{
        borderColor: !selected && disabled ? 'rgba(0,0,0,0)' : null,
        height: height ? height : null,
        width: width ? width : null,
      }}
      color={color}
    >
      {label}
    </Button>
  );
};

export default AbButton;
