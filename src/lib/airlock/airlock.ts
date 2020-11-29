import { base } from '../airtable/airtable';
import { refreshUserData } from '../redux/userData';

const signupUser = async (username: string, password: string): Promise<{ success: boolean; message: string }> => {
  let success, message;
  try {
    const res = await base.register({
      username: username,
      password: password,
    });

    success = res.body.success;
    message = res.body.message;
  } catch (err) {
    success = false;

    if (!username) {
      message = 'Username required.';
    } else if (!password) {
      message = 'Password required.';
    } else {
      message = err.message;
    }
  }

  return { success, message };
};

const loginUser = async (username: string, password: string): Promise<boolean> => {
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

const logoutUser = async (): Promise<boolean> => {
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
