import axios from 'axios';

const base = 'http://localhost:8080/api';

const getHeaders = () => ({});

const apiGet = (payload) => {
  const option = payload && payload.option ? payload.option : {};
  return axios
    .get(
      payload && payload.param
        ? `${base}/${payload.path}/${payload.param}`
        : `${base}/${payload.path}`,
      {
        ...option,
        headers: getHeaders()
      }
    )
    .then((res) => res.data);
};

const apiPost = (payload) => {
  const body = payload && payload.body ? payload.body : {};
  const option = payload && payload.option ? payload.option : {};
  return axios
    .post(
      payload.param ? `${base}/${payload.path}/${payload.param}` : `${base}/${payload.path}`,
      body,
      {
        ...option,
        headers: getHeaders()
      }
    )
    .then((res) => res.data);
};

const apiPut = (payload) => {
  const body = payload && payload.body ? payload.body : {};
  const option = payload && payload.option ? payload.option : {};
  return axios
    .put(
      payload.param ? `${base}/${payload.path}/${payload.param}` : `${base}/${payload.path}`,
      body,
      {
        ...option,
        headers: getHeaders()
      }
    )
    .then((res) => res.data);
};

const apiDelete = (payload) => {
  const option = payload && payload.option ? payload.option : {};
  return axios
    .delete(
      payload.param ? `${base}/${payload.path}/${payload.param}` : `${base}/${payload.path}`,
      {
        ...option,
        headers: getHeaders()
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
