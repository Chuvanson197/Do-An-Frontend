import React from 'react';
import { useSelector } from 'react-redux';

function WithRole({ component: Component, role = [], ...rest }) {
  const user = useSelector((state) => state.auth);
  const checkRole = role.includes(user.user.role);

  return <>{checkRole ? <Component {...rest}></Component> : <p>deo pahi ban dau</p>}</>;
}

export default WithRole;
