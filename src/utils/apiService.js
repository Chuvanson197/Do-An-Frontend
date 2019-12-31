import axios from 'axios';
import { authApi } from '../api/auth/authApi';
import Cookies from 'js-cookie';

import { Env } from './environment';

const getHeaders = () => ({});

const refreshToken = async () => {
  let expresIn = localStorage.getItem('expresIn');
  let now = new Date();
  if (expresIn && parseInt(expresIn) < now.getTime()) {
    authApi.refreshToken().then((res) => {
      if (res.data.statusCode !== 400) {
        Cookies.set('access-token', res.data.access_token, { secure: false, path: '/' });
      }
    });
  }
};

const apiGet = (payload) => {
  const option = payload && payload.option ? payload.option : {};
  refreshToken();
  return axios
    .get(
      payload && payload.param
        ? `${Env.apiUrl}/${payload.path}/${payload.param}`
        : `${Env.apiUrl}/${payload.path}`,
      {
        ...option,
        headers: getHeaders(),
        withCredentials: true
      }
    )
    .then((res) => res.data);
};

const apiPost = (payload) => {
  const body = payload && payload.body ? payload.body : {};
  const option = payload && payload.option ? payload.option : {};
  refreshToken();
  return axios
    .post(
      payload.param
        ? `${Env.apiUrl}/${payload.path}/${payload.param}`
        : `${Env.apiUrl}/${payload.path}`,
      body,
      {
        ...option,
        headers: getHeaders(),
        withCredentials: true
      }
    )
    .then((res) => res.data);
};

const apiPut = (payload) => {
  const body = payload && payload.body ? payload.body : {};
  const option = payload && payload.option ? payload.option : {};
  refreshToken();
  return axios
    .put(
      payload.param
        ? `${Env.apiUrl}/${payload.path}/${payload.param}`
        : `${Env.apiUrl}/${payload.path}`,
      body,
      {
        ...option,
        headers: getHeaders(),
        withCredentials: true
      }
    )
    .then((res) => res.data);
};

const apiDelete = (payload) => {
  const option = payload && payload.option ? payload.option : {};
  refreshToken();
  return axios
    .delete(
      payload.param
        ? `${Env.apiUrl}/${payload.path}/${payload.param}`
        : `${Env.apiUrl}/${payload.path}`,
      {
        ...option,
        headers: getHeaders(),
        withCredentials: true
      }
    )
    .then((res) => res.data);
};

const Api = {
  GET: apiGet,
  POST: apiPost,
  PUT: apiPut,
  DELETE: apiDelete
};

export default Api;
