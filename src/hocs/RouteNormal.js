import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RouteNormal({ component: Component, ...rest }) {
  const user = useSelector((state) => state.authentication);
  const checkAuth = user.authentication.role;
  return (
    <Route
      {...rest}
      render={(props) =>
        checkAuth ? <Component {...props}></Component> : <Redirect path="/login"></Redirect>
      }></Route>
  );
}

export default RouteNormal;
