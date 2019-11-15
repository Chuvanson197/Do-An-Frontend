import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingPage from '../pages/LoadingPage';

function RouteWithManager({ component: Component, ...rest }) {
  const user = useSelector((state) => state.auth);
  const checkAuth = user.user.type;
  const checkRole = user.user.type === 'manager' || user.user.type === 'admin';
  const renderRoute = (props) => {
    if (checkRole) {
      return <Component {...props}></Component>;
    }
    return <p>Ban khong co quyen truy cap</p>;
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

export default RouteWithManager;
