import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import * as yup from 'yup';
import Button from '../components/Button';
import Snackbar from '../components/Snackbar';
import TextField from '../components/TextField';
import { loginUser, signupUser } from '../lib/airlock/airlock';
import { selectIsOnline } from '../lib/redux/userData';

const validationSchema = yup.object({
  username: yup.string().required('Must enter a username'),
  // TODO: set more reasonable minimum number of characters + other constraints
  password: yup.string().min(4, 'Password should be of minimum 4 characters length').required('Must enter a password'),
  submitAction: yup.string(),
});

enum LoginAction {
  LOGIN = 'login',
  CREATE = 'create',
}

function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  // Indicates which button (login or create) should be loading
  const [loadingButton, setLoadingButton] = useState('');
  const isOnline = useSelector(selectIsOnline);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      submitAction: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: any) => {
    const { username, password, submitAction } = values;
    if (submitAction === LoginAction.CREATE) {
      setLoadingButton(LoginAction.CREATE);
      const { success, message } = await signupUser(username, password);
      if (!success) {
        setErrorMessage('Register unsuccessful.' + message);
        console.error(message);
        setLoadingButton('');
        return;
      }
    } else {
      setLoadingButton(LoginAction.LOGIN);
    }
    const loginSuccessful = await loginUser(username, password);
    // Navigate to new screen
    if (loginSuccessful) {
      history.push('/home');
    } else {
      setLoadingButton('');
      setErrorMessage('Login unsuccessful. Incorrect username or password.');
    }
  };

  return (
    // TODO replace inline styling
    <Container component="main" maxWidth="xs">
      <div style={{ marginTop: 80 }}>
        <form onSubmit={formik.handleSubmit} noValidate>
          <div style={{ marginBottom: 24 }}>
            <TextField
              id="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              required
            />
            <TextField
              id="password"
              label="Password"
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              type="password"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </div>
          <Typography color="error">{errorMessage}</Typography>
          <Button
            loading={loadingButton === LoginAction.LOGIN}
            label="Login"
            fullWidth
            onClick={() => {
              formik.setFieldValue('submitAction', LoginAction.LOGIN);
            }}
          />
          <Button
            loading={loadingButton === LoginAction.CREATE}
            label="Create Account"
            onClick={() => {
              formik.setFieldValue('submitAction', LoginAction.CREATE);
            }}
            fullWidth
            variant="outlined"
          />
          {/* TODO: add Forgot Password functionality */}
          {/* <Button label="Forgot password?" fullWidth variant="text" /> */}
        </form>
      </div>
      <Snackbar
        open={!isOnline}
        noBottomMargin
        message="You are not connected to a network. Please reconnect to log in."
      />
    </Container>
  );
}

export default Login;
