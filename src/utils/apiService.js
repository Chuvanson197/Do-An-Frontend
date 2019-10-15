import axios from 'axios';

const base = 'http://localhost:8080/api';

const getHeaders = () => ({});

/**
 * All api method get into param payload
 * @param payload: object include:
 * @property path: string is required - api path
 * @property body: object is optional - body request if need
 * @property option: object is optional - option for request
 */

const apiGet = (payload) => {
  const path = payload && payload.path ? payload.path : "";
  const option = payload && payload.option ? payload.option : {};
  return axios
    .get(`${base}/${path}`, {
      ...option,
      headers: getHeaders()
    })
    .then((res) => res.data);
};

const apiPost = (payload) => {
  const path = payload && payload.path ? payload.path : "";
  const body = payload && payload.body ? payload.body : {};
  const option = payload && payload.option ? payload.option : {};
  return axios
    .post(`${base}/${path}`, body, {
      ...option,
      headers: getHeaders()
    })
    .then((res) => res.data);
};

const apiPut = (payload) => {
  const path = payload && payload.path ? payload.path : "";
  const body = payload && payload.body ? payload.body : {};
  const option = payload && payload.option ? payload.option : {};
  return axios
    .put(`${base}/${path}`, body, {
      ...option,
      headers: getHeaders()
    })
    .then((res) => res.data);
};

const apiDelete = (payload) => {
  const path = payload && payload.path ? payload.path : "";
  const option = payload && payload.option ? payload.option : {};
  return axios
    .delete(`${base}/${path}`, {
      ...option,
      headers: getHeaders()
    })
    .then((res) => res.data);
};

const Api = {
  GET: apiGet,
  POST: apiPost,
  PUT: apiPut,
  DELETE: apiDelete
};

export default Api;
