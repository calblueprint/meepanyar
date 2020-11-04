import React from 'react';
import * as Styles from '../styles/LoginStyles';
import Container from '@material-ui/core/Container';
import { signupUser, loginUser } from '../lib/airlock/airlock';

interface LoginState {
  username: string;
  password: string;
  isLoading: boolean;
}

class Login extends React.Component<{}, LoginState> {
  state = {
    username: '',
    password: '',
    isLoading: false,
  };

  onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ username: event.target.value });
  };

  onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ password: event.target.value });
  };

  onLoginClicked = async (event: React.MouseEvent) => {
    event.preventDefault();
    const { username, password } = this.state;
    const loginSuccessful = await loginUser(username, password);

    // Navigate to new screen
    if (loginSuccessful) {
      window.location.replace('/home');
    } else {
      // TODO: Change to pop up error.
      // Gracefully deal with failed login (ask Ashley)
      console.log('Login unsuccessful');
    }
  };

  onCreateAccountClicked = async (event: React.MouseEvent) => {
    event.preventDefault();
    const { username, password } = this.state;
    const registerSuccessful = await signupUser(username, password);

    if (registerSuccessful) {
      this.onLoginClicked(event);
    } else {
      // TODO: Change to pop up error
      // Gracefully deal with existing user with registered name (ask Ashley)
      console.log('Register unsuccessful');
    }
  };

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <Styles.MainDiv>
          <form noValidate>
            <Styles.FieldDiv>
              <Styles.Label>Username</Styles.Label>
              <Styles.Field
                id="username"
                InputProps={{ disableUnderline: true }}
                InputLabelProps={{ shrink: true }}
                onChange={this.onUsernameChange}
                color="primary"
                autoComplete="username"
              />
            </Styles.FieldDiv>
            <Styles.FieldDiv>
              <Styles.Label>Password</Styles.Label>
              <Styles.Field
                id="password"
                InputProps={{ disableUnderline: true }}
                InputLabelProps={{ shrink: true }}
                onChange={this.onPasswordChange}
                color="primary"
                type="password"
              />
            </Styles.FieldDiv>
            <Styles.LoginButton type="submit" variant="contained" color="primary" onClick={this.onLoginClicked}>
              Login
            </Styles.LoginButton>
            <Styles.LoginButton
              type="submit"
              variant="contained"
              color="secondary"
              onClick={this.onCreateAccountClicked}
            >
              Create Account
            </Styles.LoginButton>
            <Styles.SignUpLink href="#">Forgot Password ?</Styles.SignUpLink>
          </form>
        </Styles.MainDiv>
      </Container>
    );
  }
}

export default Login;
