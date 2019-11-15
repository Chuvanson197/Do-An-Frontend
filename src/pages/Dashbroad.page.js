import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { actions } from '../modules/layout/store';
import WithRole from '../hocs/WithRole';

const propTypes = {
  history: PropTypes.shape({}).isRequired
};

const defaultProps = {};

const DashbroadPage = ({ history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.selectItem(['dashboard']));
  }, [dispatch]);

  const TestComponent = () => <p>Test nhe</p>;

  return (
    <>
      Dashboard
      <WithRole type={['manager']} component={TestComponent}/>
    </>
  );
};

DashbroadPage.propTypes = propTypes;

DashbroadPage.defaultProps = defaultProps;

export default DashbroadPage;
