import React from 'react';
import * as Styles from '../styles/LoginStyles';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import { signupUser, loginUser } from '../lib/airlock/airlock';
import { RouteComponentProps } from 'react-router-dom';

interface LoginState {
  username: string;
  password: string;
  errorMessage: string;
}

class Login extends React.Component<RouteComponentProps, LoginState> {
  state = {
    username: '',
    password: '',
    errorMessage: '',
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
    const { history } = this.props;
    const loginSuccessful = await loginUser(username, password);

    // Navigate to new screen
    if (loginSuccessful) {
      history.push('/home');
    } else {
      this.setState({ errorMessage: 'Login unsuccessful. Incorrect username or password.' });
    }
  };

  onCreateAccountClicked = async (event: React.MouseEvent) => {
    event.preventDefault();
    const { username, password } = this.state;
    const { success, message } = await signupUser(username, password);

    if (success) {
      this.onLoginClicked(event);
    } else {
      this.setState({ errorMessage: `Register unsuccessful. ${message}` });
    }
  };

  renderErrorMessage = () => {
    return (
      <Typography color="error" display="block" gutterBottom>
        {this.state.errorMessage}
      </Typography>
    );
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
                autoComplete="off"
              />
            </Styles.FieldDiv>
            {this.state.errorMessage ? this.renderErrorMessage() : ''}
            <Styles.LoginButton type="submit" variant="contained" color="primary" onClick={this.onLoginClicked}>
              Login
            </Styles.LoginButton>
            <Styles.LoginButton
              type="submit"
              variant="contained"
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
