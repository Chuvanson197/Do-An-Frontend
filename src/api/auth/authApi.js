import axios from 'axios'
import api from '../../utils/api';
import { Env } from '../../utils/environment';

const login = accessCode =>
  api.post(`${Env.apiUrl}/auth/login`, { accessCode })

const refreshLogin = () =>
  api.get(`${Env.apiUrl}/auth/refreshLogin`)

const refreshToken = () =>
  axios.get(`${Env.apiUrl}/auth/refreshToken`, { withCredentials: true })

export const authApi = {
  login,
  refreshLogin,
  refreshToken
};
