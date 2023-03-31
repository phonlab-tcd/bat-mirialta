import { red } from '@mui/material/colors';
import { ThemeOptions } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

import { Themes } from './types';

const sharedTheme = {
  palette: {
    background: {
      default: '#fff',
      paper: '#fafafa',
      dark: '#f1f1f1',
      main: '#e1eaf7',
    },
    primary: {
      wafer: '#ebf4fa',
      main: '#67add6',
      dark: '#3e435a',
    },
    secondary: {
      main: '#a4d96c',
    },
    warning: {
      wafer: red[50],
      light: red[100],
      main: red[600],
      dark: red[800],
    },
    info: {
      main: '#506d99',
    },
    // 5692d2
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiDivider: {
      styleOverrides: {
        vertical: {
          marginRight: 10,
          marginLeft: 10,
        },
        // TODO: open issue for missing "horizontal" CSS rule
        // in Divider API - https://mui.com/material-ui/api/divider/#css
        middle: {
          marginTop: 10,
          marginBottom: 10,
          width: '80%',
        },
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 64,
    },
  },
} as ThemeOptions; // the reason for this casting is deepmerge return type
// TODO (Suren): replace mui-utils-deepmerge with lodash or ramda deepmerge

const themes: Record<Themes, ThemeOptions> = {
  light: deepmerge(sharedTheme, {
    palette: {
      mode: 'light',
    },
  }),

  dark: deepmerge(sharedTheme, {
    palette: {
      mode: 'dark',
      background: {
        default: '#111',
        paper: '#171717',
      },
      primary: {
        main: '#333',
      },
    },
  }),
};

export default themes;
