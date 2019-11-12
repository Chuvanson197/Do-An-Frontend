import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../modules/layout/store';

import Layout from '../modules/layout/components/Layout';
import WithRole from '../hocs/WithRole';

const propTypes = {
  history: PropTypes.shape({}).isRequired
};

const defaultProps = {};

const DashbroadPage = ({ history }) => {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.authentication);

  useEffect(() => {
    dispatch(actions.selectItem(['dashboard']));
  }, [dispatch]);

  useEffect(() => {
    if (!authenticated) {
      history.push('/login');
    }
  }, [authenticated, history]);

  const TestComponent = () => <p>Test nhe</p>;

  return (
    <Layout>
      Dashboard
      <WithRole role={['managera']} component={TestComponent}></WithRole>
    </Layout>
  );
};

DashbroadPage.propTypes = propTypes;

DashbroadPage.defaultProps = defaultProps;

export default DashbroadPage;
