import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { actions } from '../modules/layout/store';

import Layout from '../modules/layout/components/Layout';

const DashbroadPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.selectItem(['dashboard']));
  }, [dispatch]);

  return <Layout>Dashboard</Layout>;
};

export default DashbroadPage;
