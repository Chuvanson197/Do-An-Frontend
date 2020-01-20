import axios from 'axios';
import { authApi } from '../api/auth/authApi';
import Cookies from 'js-cookie';

const getHeaders = () => ({});

const refreshToken = async () => {
  let expresIn = localStorage.getItem('expresIn');
  let now = new Date();
  if (expresIn && parseInt(expresIn) < now.getTime()) {
    let res = await authApi.refreshToken();
    if (res.data.statusCode !== 400) {
      Cookies.set('access-token', res.data.access_token, { secure: false, path: '/' });
    }
  }
};

const apiGet = async (payload) => {
  const option = payload && payload.option ? payload.option : {};
  await refreshToken();
  return axios
    .get(
      payload && payload.param
        ? `${process.env.REACT_APP_API}/${payload.path}/${payload.param}`
        : `${process.env.REACT_APP_API}/${payload.path}`,
      {
        ...option,
        headers: getHeaders(),
        withCredentials: true
      }
    )
    .then((res) => res.data);
};

const apiPost = async (payload) => {
  const body = payload && payload.body ? payload.body : {};
  const option = payload && payload.option ? payload.option : {};
  await refreshToken();
  return axios
    .post(
      payload.param
        ? `${process.env.REACT_APP_API}/${payload.path}/${payload.param}`
        : `${process.env.REACT_APP_API}/${payload.path}`,
      body,
      {
        ...option,
        headers: getHeaders(),
        withCredentials: true
      }
    )
    .then((res) => res.data);
};

const apiPut = async (payload) => {
  const body = payload && payload.body ? payload.body : {};
  const option = payload && payload.option ? payload.option : {};
  await refreshToken();
  return axios
    .put(
      payload.param
        ? `${process.env.REACT_APP_API}/${payload.path}/${payload.param}`
        : `${process.env.REACT_APP_API}/${payload.path}`,
      body,
      {
        ...option,
        headers: getHeaders(),
        withCredentials: true
      }
    )
    .then((res) => res.data);
};

const apiDelete = async (payload) => {
  const body = payload && payload.body ? payload.body : {};
  const option = payload && payload.option ? payload.option : {};
  await refreshToken();
  return axios
    .delete(
      payload.param
        ? `${process.env.REACT_APP_API}/${payload.path}/${payload.param}`
        : `${process.env.REACT_APP_API}/${payload.path}`,
      {
        data: body,
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
