import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RouteWithManager({ component: Component, ...rest }) {
  const user = useSelector((state) => state.authentication);
  const checkAuth = user.authentication.role;
  const checkRole = user.authentication.role === 'manager' || user.authentication.role === 'admin';
  const renderRoute = (props) => {
    if (checkAuth) {
      if (checkRole) {
        return <Component {...props}></Component>;
      } else {
        return <p>Ban khong co quyen</p>;
      }
    } else {
      return <Redirect path="/login"></Redirect>;
    }
  };
  return <Route {...rest} render={(props) => renderRoute(props)}></Route>;
}

export default RouteWithManager;
