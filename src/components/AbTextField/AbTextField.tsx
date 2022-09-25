import TextField from '@mui/material/TextField';

import styles from './styles';

interface AbTextFieldProps {
  variation: 'bat';
  value: string;
  onTextboxChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const AbTextField = (props: AbTextFieldProps) => {
  const style = styles[props.variation];

  return (
    <TextField
      sx={{ backgroundColor: 'white', mt: 0 }}
      onChange={(e) => props.onTextboxChange(e)}
      id="outlined-multiline-static"
      label={style.label}
      multiline
      rows={style.rows}
      value={props.value}
      autoFocus={style.autoFocus}
      disabled={style.disabled}
      fullWidth
    />
  );
};

export default AbTextField;
