import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingPage from '../pages/LoadingPage';

function RouteWithAdmin({ component: Component, ...rest }) {
  const user = useSelector((state) => state.auth);
  const checkAuth = user.user.role;
  const checkRole = user.user.role === 'admin';
  const renderRoute = (props) => {
    if (checkRole) {
      return <Component {...props}></Component>;
    } else {
      return <p>Ban khong co quyen</p>;
    }
  };
  return (
    <>
      {checkAuth ? (
        <Route {...rest} render={(props) => renderRoute(props)}></Route>
      ) : (
        <Route {...rest} component={LoadingPage}></Route>
      )}
    </>
  );
}

export default RouteWithAdmin;
