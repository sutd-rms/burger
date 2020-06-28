import axios from 'axios';
import history from './../history';

// const urlLogin = `http://localhost:8000/auth/token/login/`;
// const urlUser = `http://localhost:8000/auth/users/me/`;

const urlLogin = `https://secret-sauce.azurewebsites.net/auth/token/login`;
const urlUser = `https://secret-sauce.azurewebsites.net/auth/users/me/`;

const loginUser = userObj => ({
  type: 'LOGIN_USER',
  payload: userObj
});

export const userLoginFetch = credentials => {
  return dispatch => {
    return axios
      .post(urlLogin, credentials)
      .then(res => {
        const token = res.data.auth_token;
        const expirationDuration = 1000 * 60 * 60 * 24 * 7; // 7 Days
        const currentTime = new Date().getTime();
        localStorage.setItem('token', token);
        localStorage.setItem('expiry', currentTime + expirationDuration);
        return axios.get(urlUser, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Token ${token}`
          }
        });
      })
      .then(res => {
        dispatch(loginUser(res.data));
        history.push('/dashboard/projects');
      })
      .catch(err => {
        const errMessage = err.response.data.non_field_errors[0];
        if (errMessage == 'Unable to log in with provided credentials.') {
          history.push({
            pathname: '/login',
            state: { error_message: errMessage }
          });
          window.location.reload();
        } else {
          history.push({
            pathname: '/login',
            state: { error_message: 'Login Error!' }
          });
          window.location.reload();
        }
      });
  };
};
