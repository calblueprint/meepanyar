<<<<<<< HEAD
import React from "react";
import * as Styles from "../styles/LoginStyles";
=======
import React from 'react';
import * as Styles from '../styles/LoginStyles';
>>>>>>> main
import Container from '@material-ui/core/Container';

class Login extends React.Component {
  render() {
    return (
      <Container component="main" maxWidth="xs">
<<<<<<< HEAD
          <form noValidate>
            <Styles.Label>Email</Styles.Label>
            <Styles.Field
              id='standard-secondary'
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              color="primary"
              autoComplete="email"
            />
            <br></br>
            <br></br>
            <Styles.Label>Password</Styles.Label>
            <Styles.Field
              id='standard-secondary'
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              color="primary"
              type="password"
            />
            <br></br>
            <br></br>
            <Styles.LoginButton
              type="submit"
              variant="contained"
              color="primary"
            >
              Login
            </Styles.LoginButton>
            <br></br>
            <Styles.LoginButton
              type="submit"
              variant="contained"
              color="secondary"
            >
              Create Account
            </Styles.LoginButton>
            <br></br>
            <Styles.SignUpLink href="#">Forgot Password ?</Styles.SignUpLink>
          </form>
        </Container>
=======
        <Styles.MainDiv>
          <form noValidate>
            <Styles.FieldDiv>
              <Styles.Label>Email</Styles.Label>
              <Styles.Field
                id="email"
                InputProps={{ disableUnderline: true }}
                InputLabelProps={{ shrink: true }}
                color="primary"
                autoComplete="email"
              />
            </Styles.FieldDiv>
            <Styles.FieldDiv>
              <Styles.Label>Password</Styles.Label>
              <Styles.Field
                id="password"
                InputProps={{ disableUnderline: true }}
                InputLabelProps={{ shrink: true }}
                color="primary"
                type="password"
              />
            </Styles.FieldDiv>
            <Styles.LoginButton type="submit" variant="contained" color="primary">
              Login
            </Styles.LoginButton>
            <Styles.LoginButton type="submit" variant="contained" color="secondary">
              Create Account
            </Styles.LoginButton>
            <Styles.SignUpLink href="#">Forgot Password ?</Styles.SignUpLink>
          </form>
        </Styles.MainDiv>
      </Container>
>>>>>>> main
    );
  }
}

export default Login;
