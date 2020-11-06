import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FF922E',
    },
    secondary: {
      main: '#FFE3CA',
    },
    text: {
      primary: '#828282',
      secondary: '#C4C4C4',
    },
    divider: '#E5E5E5',
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
    //caption
    h4: {
      fontSize: '12px',
      fontWeight: 500,
    },
    button: {
      fontSize: '12px',
    },
  },
});
