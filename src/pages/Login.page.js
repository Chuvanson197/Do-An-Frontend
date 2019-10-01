import React from 'react';
import { Row } from 'antd';
import LoginForm from '../modules/login/components/Login';

const LoginPage = () => {
  return (
    <Row type="flex" justify="center" style={{marginTop: 100}}>
      <LoginForm />
    </Row>
  );
};

export default LoginPage;
