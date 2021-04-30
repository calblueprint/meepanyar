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
import { useInternationalization } from '../lib/i18next/translator';
import words from '../lib/i18next/words';


enum LoginAction {
  LOGIN = 'login',
  CREATE = 'create',
}

function Login() {
  const intl = useInternationalization(); 
  const [errorMessage, setErrorMessage] = useState('');
  // Indicates which button (login or create) should be loading
  const [loadingButton, setLoadingButton] = useState('');
  const isOnline = useSelector(selectIsOnline);
  const history = useHistory();

  const validationSchema = yup.object({
    username: yup.string().required(intl(words.must_enter_an_x, words.username)),
    // TODO: set more reasonable minimum number of characters + other constraints
    password: yup.string().min(4, intl(words.password_should_be_of_minimum_x_characters_length, '4')).required(intl(words.must_enter_a_x, words.password)),
    submitAction: yup.string(),
  });

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
        setErrorMessage(`${intl(words.x_unsuccessful, words.register)}.` + message);
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
      setErrorMessage(`${intl(words.x_unsuccessful, words.login)}. ${intl(words.incorrect_username_or_password)}.`);
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
              label={intl(words.username)}
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              required
            />
            <TextField
              id="password"
              label={intl(words.password)}
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
            label={intl(words.login)}
            fullWidth
            onClick={() => {
              formik.setFieldValue('submitAction', LoginAction.LOGIN);
            }}
          />
          <Button
            loading={loadingButton === LoginAction.CREATE}
            label={intl(words.create_x, words.account)}
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
        disableAutoHide
        noBottomMargin
        message={`${intl(words.you_are_not_connected_to_a_network)}. ${intl(words.please_x, words.reconnect_to_log_in)}.`}
        // You are not connected to a network. Please reconnect to log in. words
      />
    </Container>
  );
}

export default Login;
