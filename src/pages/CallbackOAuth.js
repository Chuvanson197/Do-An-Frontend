import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SyncLoader } from 'react-spinners';
import { css } from '@emotion/core';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

import { dispatchHideLayout, dispatchShowLayout } from '../actions/layout';
import { dispatchLogin } from '../actions/auth';
import { authApi } from '../api/auth/authApi';

function CallbackOAuth(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatchHideLayout(dispatch);

    if (props.location.search) {
      const query = props.location.search;
      const accessCode = query.split('=');
      authApi.login(accessCode[1]).then((userLogin) => {
        const userInfo = jwtDecode(userLogin.data.access_token);
        localStorage.setItem('expresIn', userInfo.exp * 1000);
        Cookies.set('access-token', userLogin.data.access_token, { secure: false });
        dispatchShowLayout(dispatch);
        dispatchLogin(dispatch, { ...userInfo, role: 'normal' });
        props.history.push('/project');
      });
    }
  // eslint-disable-next-line react/destructuring-assignment
  }, [dispatch, props.location.search, props.history]);

  const override = css`
    display: block;

    color: red;
  `;

  return (
    <div
      style={{
        backgroundColor: '#fff',
        width: '100vw',
        height: '100vh',
        paddingTop: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <h2 style={{ color: '#747CDD', marginRight: 10 }}>Loading</h2>
      <SyncLoader css={override} sizeUnit="px" size={10} color="#747CDD" />
    </div>
  );
}

export default CallbackOAuth;
