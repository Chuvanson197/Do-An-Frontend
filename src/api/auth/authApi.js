import axios from 'axios';
import { Env } from '../../utils/environment';

const login = async (accessCode) => {
  let userLogin = await axios.post(
    `${Env.apiUrl}/auth/login`,
    { accessCode },
    { withCredentials: true }
  );
  return userLogin;
};

const refreshLogin = async () => {
  let userLogin = await axios.get(`${Env.apiUrl}/auth/refreshLogin`, {
    withCredentials: true
  });
  return userLogin;
};

const refreshToken = async () => {
  let refreshToken = await axios.get(`${Env.apiUrl}/auth/refreshToken`, {
    withCredentials: true
  });
  return refreshToken;
};

export const authApi = {
  login,
  refreshLogin,
  refreshToken
};
