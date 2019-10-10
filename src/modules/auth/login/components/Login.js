import React from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { FormattedMessage } from 'react-intl';
import { css } from 'emotion';

import { actions } from '../store';

const propTypes = {};

const defaultProps = {};

const styles = {
  googleButton: css`
    div {
      display: flex;
      align-items: center;
    }
    span {
      font-weight: bold !important;
    }
    &:hover {
      opacity: 0.5 !important;
    }
  `
};

const Login = () => {
  const dispatch = useDispatch();
  const responseGoogle = (response) => {
    const body = {
      googleAccessToken: response.tokenObj.access_token
    };
    dispatch(actions.authentication({ body }));
  };

  return (
    <GoogleLogin
      className={styles.googleButton}
      clientId="284407640052-rh5lil9td3r1dluc93sc2vqr3coe7c1t.apps.googleusercontent.com"
      buttonText={<FormattedMessage id="login.form.google.button.title" />}
      onSuccess={responseGoogle}
      onFailure={() => responseGoogle}
      prompt="consent"
      cookiePolicy="single_host_origin"
    />
  );
};

Login.propTypes = propTypes;

Login.defaultProps = defaultProps;

export default Login;
