import axios from 'axios';

const login = async (accessCode) => {
  let userLogin = await axios.post(
    'http://localhost:8080/api/auth/login',
    { accessCode },
    { withCredentials: true }
  );
  return userLogin;
};

const refreshLogin = async () => {
  let userLogin = await axios.get('http://localhost:8080/api/auth/refreshLogin', {
    withCredentials: true
  });
  return userLogin;
};

const refreshToken = async () => {
  let refreshToken = await axios.get('http://localhost:8080/api/auth/refreshToken', {
    withCredentials: true
  });
  return refreshToken;
};

export const authApi = {
  login,
  refreshLogin,
  refreshToken
};
