import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Icon } from 'antd';
import GoogleLogin from 'react-google-login';
import { authApi } from '../api/auth/authApi';
import jwtDecode from 'jwt-decode';

import '../assets/styles/login.scss';
import { dispatchHideLayout } from '../actions/layout';

const LoginPage = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatchHideLayout(dispatch);
  }, [dispatch]);

  const redirectLoginGoogle = () => {
    window.location.href = process.env.REACT_APP_AUTH;
  };
  const responseGoogle = (reponse) => {
    console.log('reponse', reponse);
    console.log('profileObj', reponse.profileObj);
    console.log('accessToken', reponse.accessToken);


    authApi.login(reponse.accessToken).then((userLogin) => {
      const userInfo = jwtDecode(userLogin.data.access_token);
      console.log('userLogin', userLogin);
      console.log('userInfo', userInfo);


      // localStorage.setItem('expresIn', userInfo.exp * 1000);
      // Cookies.set('access-token', userLogin.data.access_token, { secure: false, path: '/' });
      // dispatchShowLayout(dispatch);
      // dispatchLogin(dispatch, { ...userInfo, role: 'normal' });
      // props.history.push('/project');
    });
  };

  return (
    <div className="wrap-login-page">
      <div className="wrap-form-login">
        <h2 style={{ color: 'white' }}>Đăng Nhập</h2>
        <div className="shadow-line-login"></div>
        <GoogleLogin
        clientId="711266978182-1btqe433pbtpc5hjfe69pk5hpejq9a8r.apps.googleusercontent.com"
        buttonText={
        <i style={{ fontSize: 20 }}>Đăng nhập bằng google nhé</i>
        }
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
        // uxMode="redirect"
        // redirectUri={`${window.location.origin}/callback`}
      />
        {/* <div className="button-login-google" onClick={redirectLoginGoogle}>
          <i style={{ fontSize: 16 }}>Đăng nhập bằng google nhé</i>
          <div className="border-between-button-login"></div>
          <Icon style={{ fontSize: 30, color: '#fff', marginLeft: 5 }} type="google-plus" />
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
