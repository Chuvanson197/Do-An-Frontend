import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Icon } from 'antd';

import '../assets/styles/login.scss';
import { dispatchHideLayout } from '../actions/layout';

const LoginPage = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatchHideLayout(dispatch);
  }, [dispatch]);

  const redirectLoginGoogle = () => {
    window.location.href =
      'http://auth.impl.vn/oauth/authorize?client_id=14&response_type=code&scope=user-info';
  };

  return (
    <div className="wrap-login-page">
      <div className="wrap-form-login">
        <h2>Đăng Nhập</h2>
        <div className="shadow-line-login"></div>
        <div className="button-login-google" onClick={redirectLoginGoogle}>
          <i style={{ fontSize: 16 }}>Đăng nhập bằng google nhé</i>
          <div className="border-between-button-login"></div>
          <Icon style={{ fontSize: 30, color: '#fff', marginLeft: 5 }} type="google-plus" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
