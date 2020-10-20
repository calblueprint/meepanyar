import React from "react";
import Container from '@material-ui/core/Container';
import { Button, TextField, Typography, Link } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#E5E5E5',
    },
    secondary: {
      main: '#F8F8F8',
    },
  },
});

const main = {
  marginTop: '4%',
}

const textFieldLabel = {
  color: '#828282',
  fontSize: '12px',
  fontWeight: 'bold' as 'bold',
  textAlign: 'left' as 'left',
  marginLeft: '8%',
  padding: '6px 0px',
}

const textField = {
  backgroundColor: '#F8F8F8',
  outlined: 'false',
  borderRadius: '15px',
  width: '340px',
  height: '69x',
  padding: '18px 20px',
};

const button = {
  color: '#828282',
  fontSize: '12px',
  fontWeight: 'bold' as 'bold',
  borderRadius: '15px',
  boxShadow: 'none',
  width: '187px',
  height: '48px',
  margin: '8px 0px',
  textTransform: 'none' as 'none',
}

const link = {
  color: '#828282',
  fontSize: '12px',
  fontWeight: 'bold' as 'bold',
}

class Login extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={main}>
        <form noValidate>
          <Typography component="h1" variant="h5" style={textFieldLabel}>Email</Typography>
          <TextField
            id='standard-secondary'
            InputProps={{ disableUnderline: true }}
            InputLabelProps={{ shrink: true }}
            color="primary"
            style={textField}
            autoComplete="email"
          />
          <br></br><br></br>
          <Typography component="h1" variant="h5" style={textFieldLabel}>Password</Typography>
          <TextField
            id='standard-secondary'
            InputProps={{ disableUnderline: true }}
            InputLabelProps={{ shrink: true }}
            color="primary"
            style={textField}
            type="password"
          />
          <br></br><br></br>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={button}
          >
            Login
          </Button>
          <br></br>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={button}
          >
            Create Account
          </Button>
          <br></br>
          <Link
            href="#"
            style={link}
          >
            Forgot Password ?
           </Link>
        </form>
      </Container>
      </ThemeProvider>
    );
  }
};

export default Login;
