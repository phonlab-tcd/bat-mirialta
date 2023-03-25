import type { Theme } from '@mui/material';

function getPageHeight(theme: Theme) {
  const topSpacing = Number(theme.mixins.toolbar.minHeight);
  return `calc(100vh - ${topSpacing}px)`;
}

function getChatHeight() {
  return `calc(100vh - 380px)`;
}

export { getPageHeight, getChatHeight };
