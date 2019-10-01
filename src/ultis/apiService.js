import axios from 'axios';

const base = 'https://api.com/v1';

const getHeaders = () => ({});

const apiGet = (path, payload) => {
  const option = payload && payload.option ? payload.option : {};
  return axios
    .get(`${base}/${path}`, {
      ...option,
      headers: getHeaders()
    })
    .then(res => res.data);
};

const apiPost = (path, payload) => {
  const body = payload && payload.body ? payload.body : {};
  const option = payload && payload.option ? payload.option : {};
  return axios
    .post(`${base}/${path}`, body, {
      ...option,
      headers: getHeaders()
    })
    .then(res => res.data);
};

const apiPut = (path, payload) => {
  const body = payload && payload.body ? payload.body : {};
  const option = payload && payload.option ? payload.option : {};
  return axios
    .put(`${base}/${path}`, body, {
      ...option,
      headers: getHeaders()
    })
    .then(res => res.data);
};

const apiDelete = (path, payload) => {
  const option = payload && payload.option ? payload.option : {};
  return axios
    .delete(`${base}/${path}`, {
      ...option,
      headers: getHeaders()
    })
    .then(res => res.data);
};

const Api = {
  GET: apiGet,
  POST: apiPost,
  PUT: apiPut,
  DELETE: apiDelete
};

export default Api;
