import React from 'react';
import { useSelector } from 'react-redux';

function WithRole({ component: Component, role = [] }) {
  const user = useSelector((state) => state.authentication);
  const checkRole = role.includes(user.authentication.role);

  return <>{checkRole ? <Component></Component> : <p>Khong phai nhe</p>}</>;
}

export default WithRole;
