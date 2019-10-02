import React from 'react';
import { Row } from 'antd';
import RegisterForm from '../modules/register/components/Register';

const RegisterPage = () => {
  return (
    <Row type="flex" justify="center" style={{marginTop: 100}}>
      <RegisterForm />
    </Row>
  );
};

export default RegisterPage;
