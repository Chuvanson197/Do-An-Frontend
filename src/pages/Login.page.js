import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Icon } from 'antd';

import '../assets/styles/login.scss';
import { dispatchHideLayout } from '../actions/layout';

// import { Row, Typography, Icon } from 'antd';
// import { FormattedMessage } from 'react-intl';
// import { css } from 'emotion';

// import LoginForm from '../modules/auth/login/components/Login';
// import LanguageSwitcher from '../modules/languageSwitcher/components/LanguagaSwitcher';

// const styles = {
//   loginContainer: css`
//     min-height: 100vh;
//     align-items: center;
//     flex-direction: column;
//   `,
//   loginHeading: css`
//     position: fixed;
//     top: 15px;
//     right: 15px;
//   `,
//   jokeIcon: css`
//     font-size: 20px;
//     margin-left: 10px;
//   `
// };

const LoginPage = (props) => {
  // const layout = useSelector((state) => state.layout);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatchHideLayout(dispatch);
  }, [dispatch]);

  const redirectLoginGoogle = () => {
    window.location.href =
      'http://auth.impl.vn/oauth/authorize?client_id=4&response_type=code&scope=user-info';
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
