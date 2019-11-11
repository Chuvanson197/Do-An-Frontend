import axios from 'axios';
// import Cookies from 'js-cookie';

import { Env } from './environment';

const getHeaders = () => ({});

const apiGet = (payload) => {
  // Cookies.set('newCookie', 'new');
  const option = payload && payload.option ? payload.option : {};
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
