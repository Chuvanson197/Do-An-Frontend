import React from 'react';
import { useSelector } from 'react-redux';

function WithRole({ component: Component, type = [], ...rest }) {
  const user = useSelector((state) => state.auth);
  const checkRole = type.includes(user.user.type);

  return <>{checkRole ? <Component {...rest}/> : null }</>;
}

export default WithRole;
