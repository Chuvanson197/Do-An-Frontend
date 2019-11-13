import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingPage from '../pages/LoadingPage';

function RouteNormal({ component: Component, ...rest }) {
  const user = useSelector((state) => state.auth);
  const checkAuth = user.user.role;
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
