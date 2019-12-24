import axios from 'axios';

const login = async (accessCode) => {
  let userLogin = await axios.post(
<<<<<<< HEAD
    `${process.env.REACT_APP_API}/auth/login`,
=======
    'http://localhost:8081/api/auth/login',
>>>>>>> fix port
    { accessCode },
    { withCredentials: true }
  );
  return userLogin;
};

const refreshLogin = async () => {
<<<<<<< HEAD
  let userLogin = await axios.get(`${process.env.REACT_APP_API}/auth/refreshLogin`, {
=======
  let userLogin = await axios.get('http://localhost:8081/api/auth/refreshLogin', {
>>>>>>> fix port
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

const logout = async (staff_code) =>
  axios.post(
    `${process.env.REACT_APP_API}/auth/logout`,
    { staff_code },
    {
      withCredentials: true
    }
  );

export const authApi = {
  login,
  refreshLogin,
  refreshToken,
  logout
};
