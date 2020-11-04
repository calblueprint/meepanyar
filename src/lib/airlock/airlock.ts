import { base } from '../airtable/airtable';
import { refreshUserData } from '../redux/userData';

const signupUser = async (username: string, password: string) => {
  try {
    const res = await base.register({
      username: username,
      password: password,
    });

    console.log('Request successful with following res');
    console.log(res);

    return res.body;
  } catch (err) {
    console.log(err);
  }

  return;
};

const loginUser = async (username: string, password: string) => {
  try {
    const res = await base.login({
      username: username,
      password: password,
    });

    refreshUserData(res.body.user);
    return res.body.success;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const logoutUser = async () => {
  try {
    const res = await base.logout();
    if (!res.body.success) {
      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export { signupUser, loginUser, logoutUser };
