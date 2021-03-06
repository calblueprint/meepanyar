import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      dark: '#C66300',
      main: '#FF922E',
      light: '#FFC96F',
    },
    secondary: {
      main: '#757575',
    },
    text: {
      primary: '#424242',
      secondary: '#757575',
      disabled: '#BDBDBD',
    },
    error: {
      main: '#FF6142',
    },
    success: {
      main: '#64DD17',
    },
    divider: '#E5E5E5',
    background: {
      default: '#F7F9FC',
    }
  },
  typography: {
    fontFamily: 'Helvetica Neue',
    //title
    h1: {
      fontSize: '30px',
      fontWeight: 500,
    },
    //subHeader
    h2: {
      fontSize: '18px',
      fontWeight: 700,
    },
    //body
    h3: {
      fontSize: '22px',
      fontWeight: 700,
    },
    //bolded version of body1
    h4: {
      fontSize: '14px',
      fontWeight: 700,
    },
    //caption
    body1: {
      fontSize: '14px',
      fontWeight: 500,
    },
    body2: {
      fontSize: '12px',
      fontWeight: 500,
    },
    caption: {
      fontSize: '10px',
      fontWeight: 700,
    },
    button: {
      fontSize: '12px',
      fontWeight: 500,
      letterSpacing: '.14em',
    },
  },
});
