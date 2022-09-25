interface AbButtonProps {
  disabled?: boolean;
  label: string;
  color: 'primary' | 'secondary';
  selected: boolean;
  variation: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  width?: string;
  height?: string;
}

interface AbButtonStyles {
  margin: number;
}

export type { AbButtonProps, AbButtonStyles };
