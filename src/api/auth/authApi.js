import axios from 'axios';

const login = async (accessCode) => {
  let userLogin = await axios.post(
    `${process.env.REACT_APP_API}/auth/login`,
    { accessCode },
    { withCredentials: true }
  );
  return userLogin;
};

const refreshLogin = async () => {
  let userLogin = await axios.get(`${process.env.REACT_APP_API}/auth/refreshLogin`, {
    withCredentials: true
  });
  return userLogin;
};

const refreshToken = async () => {
  let refreshToken = await axios.get(`${process.env.REACT_APP_API}/auth/refreshToken`, {
    withCredentials: true
  });
  return refreshToken;
};

export const authApi = {
  login,
  refreshLogin,
  refreshToken
};
