import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingPage from '../pages/LoadingPage';

function RouteNormal({ component: Component, ...rest }) {
  const user = useSelector((state) => state.auth);
  const checkAuth = user.isLogin;
  return (
    <>
      {checkAuth ? (
        <Route {...rest} render={(props) => <Component {...props}></Component>} />
      ) : (
        <Route {...rest} component={LoadingPage} />
      )}
    </>
  );
}

export default RouteNormal;
