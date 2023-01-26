import type { Theme } from '@mui/material';

function getPageHeight(theme: Theme) {
  const topSpacing = Number(theme.mixins.toolbar.minHeight) + parseInt(theme.spacing(1));
  return `calc(95vh - ${topSpacing}px)`;
}

export { getPageHeight };
