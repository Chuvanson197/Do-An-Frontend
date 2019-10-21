import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Row } from 'antd';
import { css } from 'emotion';

import { actions as layoutActions } from '../modules/layout/store';
import { actions as customerActions } from '../modules/customer/store';

import HeaderTitle from '../components/Content/HeaderTitle';
import Layout from '../modules/layout/components/Layout';
import Customers from '../modules/customer/cutomers/components/CustomersTable';
import ErrorNotification from '../components/Notification/Error';

const styles = {
  container: css`
    height: 100% !important;
  `
};

const propTypes = {
  history: PropTypes.shape({}).isRequired
};

const defaultProps = {};

const CustomersPage = ({ history, intl }) => {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.authentication);
  const { list, getCustomersError, getCustomersErrors } = useSelector((state) => state.customers);

  // check authencation
  useEffect(() => {
    if (!authenticated) {
      history.push('/login');
    }
  }, [authenticated, history]);

  // get customers list api
  useEffect(() => {
    dispatch(layoutActions.selectItem(['customers']));
    dispatch(
      customerActions.getCustomers({
        path: 'customers'
      })
    );
  }, [dispatch]);

  // show notification if get customers list failure
  useEffect(() => {
    if (getCustomersError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({
        id: getCustomersErrors.message
          ? getCustomersErrors.message
          : 'customers.getCustomers.message.error'
      });
      ErrorNotification(title, message);
      dispatch(customerActions.getCustomersCleanError());
    }
  }, [dispatch, getCustomersError, getCustomersErrors, intl]);

  return (
    <Layout>
      <Row className={styles.container}>
        <Row>
          <HeaderTitle title={<FormattedMessage id="customers.header.title" />} />
        </Row>
        <Row>
          <Customers customers={list} />
        </Row>
      </Row>
    </Layout>
  );
};

CustomersPage.propTypes = propTypes;

CustomersPage.defaultProps = defaultProps;

export default injectIntl(CustomersPage, {});
