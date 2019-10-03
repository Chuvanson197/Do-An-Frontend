import React from 'react';
import { Row, Typography, Icon } from 'antd';
import { FormattedMessage } from 'react-intl';
import { css } from 'emotion';

import LoginForm from '../modules/login/components/Login';
import LanguageSwitcher from '../modules/languageSwitcher/components/LanguagaSwitcher';

const styles = {
  loginContainer: css`
    min-height: 100vh;
    align-items: center;
    flex-direction: column;
  `,
  loginHeading: css`
    position: fixed;
    top: 15px;
    right: 15px;
  `,
  jokeIcon: css`
    font-size: 20px;
    margin-left: 10px;
  `
};

const LoginPage = () => {
  return (
    <Row className={styles.loginContainer} type="flex" justify="center">
      <Row className={styles.loginHeading}>
        <LanguageSwitcher />
      </Row>
      <Row type="flex" style={{ marginBottom: 15 }}>
        <Typography.Text strong>
          <FormattedMessage id="login.form.title" />
        </Typography.Text>
        <Icon className={styles.jokeIcon} type="smile" theme="twoTone" twoToneColor="#f9a602" />
      </Row>
      <Row>
        <LoginForm />
      </Row>
    </Row>
  );
};

export default LoginPage;
