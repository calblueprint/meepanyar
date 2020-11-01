import { base } from '../airtable/airtable';

const signupUser = async (username, password) => {
    try {
        const res = await base.register({
            username: username,
            password: password,
        })

        console.log("Request successful with following res");
        console.log(res);

        return res.body;
    } catch (err) {
        console.log(err)
    }

    return
}

const loginUser = async (username, password) => {
    try {
        const res = await base.login({
            username: username,
            password: password
        })
        return res.body.success;
    } catch (err) {
        console.log(err);
        return false
    }
}

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
}



export { signupUser, loginUser, logoutUser };