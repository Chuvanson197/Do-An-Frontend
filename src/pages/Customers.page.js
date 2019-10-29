import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
import { css } from 'emotion';
import { Row, Button } from 'antd';

import { actions as layoutActions } from '../modules/layout/store';
import { actions as customerActions } from '../modules/customer/store';

import HeaderTitle from '../components/Content/HeaderTitle';
import Layout from '../modules/layout/components/Layout';
import Customers from '../modules/customer/cutomers/components/CustomersTable';
import ErrorNotification from '../components/Notification/Error';

import CreateModal from '../modules/customer/createCustomer/components/CreateCustomerModal';

const styles = {
  container: css`
    height: 100% !important;
  `,
  addCustomerButton: css`
    background: #49a32b !important;
    color: #fff !important;
    margin-bottom: 10px;
  `
};

const propTypes = {
  history: PropTypes.shape({}).isRequired
};

const defaultProps = {};

const CustomersPage = React.memo(({ history, intl }) => {
  const dispatch = useDispatch();

  // selector
  const { authenticated } = useSelector((state) => state.authentication);
  const { list, getCustomersError, getCustomersErrors } = useSelector((state) => state.customers);

  // state
  const [visible, setVisible] = useState(false);

  // get customers function
  const getCustomers = useCallback(() => {
    dispatch(
      customerActions.getCustomers({
        path: 'customers'
      })
    );
  }, [dispatch]);

  // add customers function
  const addCustomer = useCallback(
    (body) => {
      dispatch(customerActions.createCustomer({ body, path: 'customers' }));
    },
    [dispatch]
  );

  // check authencation
  useEffect(() => {
    if (!authenticated) {
      history.push('/login');
    }
  }, [authenticated, history]);

  // get customers at first render
  useEffect(() => {
    dispatch(layoutActions.selectItem(['customers']));
    getCustomers();
  }, [dispatch, getCustomers]);

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
          <HeaderTitle title={intl.formatMessage({ id: 'customers.header.title' })} />
        </Row>
        <Row>
          <Button
            icon="user-add"
            className={styles.addCustomerButton}
            onClick={() => setVisible(!visible)}>
            {intl.formatMessage({ id: 'button.add' })}
          </Button>
          <Customers customers={list} getCustomers={getCustomers} />
        </Row>
        {visible && (
          <CreateModal
            visible={visible}
            close={() => setVisible(!visible)}
            getCutomers={getCustomers}
            addCustomer={addCustomer}
          />
        )}
      </Row>
    </Layout>
  );
});

CustomersPage.propTypes = propTypes;

CustomersPage.defaultProps = defaultProps;

export default injectIntl(CustomersPage, {});
