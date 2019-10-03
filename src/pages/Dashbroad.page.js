import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { actions } from '../modules/layout/store';

import Layout from '../modules/layout/components/Layout';

const DashbroadPage = ({ location }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(location);
    dispatch(actions.selectItem(['dashboard']));
  }, [dispatch]);

  return <Layout>Dashboard</Layout>;
};

export default DashbroadPage;
