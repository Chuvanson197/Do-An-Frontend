import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Row } from 'antd';
import { css } from 'emotion';

import { actions as layoutActions } from '../modules/layout/store';
import { actions as customerActions } from '../modules/customer/cutomers/store';

import HeaderTitle from '../components/Content/HeaderTitle';
import Layout from '../modules/layout/components/Layout';
import Customers from '../modules/customer/cutomers/components/Customers';

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
  const { customersList } = useSelector((state) => state.customers);
  const { responCreateCustomer } = useSelector((state) => state.createCustomer);
  console.log(`createCustomer ${responCreateCustomer}`);
  const { responEdit } = useSelector((state) => state.editCustomer);

  useEffect(() => {
    dispatch(customerActions.getCustomers({
      path: 'customers'
    }));
  }, [dispatch, responCreateCustomer, responEdit]);

  useEffect(() => {
    dispatch(layoutActions.selectItem(['customers']));
    dispatch(customerActions.getCustomers({
      path: 'customers'
    }));
  }, [dispatch]);

  useEffect(() => {
    if (!authenticated) {
      history.push('/login');
    }
  }, [authenticated, history]);

  const deleteCustomer = useCallback(
    (selectedKeys) => {
      const body = {};
      dispatch(customerActions.deleteCustomers({
        path: 'customers',
        body
      }));
    },
    [dispatch]
  );

  const addNewCustomer = useCallback(
    (body) => {
      dispatch(customerActions.addCustomer({
        path: 'customers',
        body
      }));
    },
    [dispatch]
  );

  return (
    <Layout>
      <Row className={styles.container}>
        <Row>
          <HeaderTitle title={<FormattedMessage id="customers.header.title" />} />
        </Row>
        <Row>
          <Customers
            customers={customersList}
            deleteCustomer={deleteCustomer}
            addNewCustomer={addNewCustomer}
          />
        </Row>
      </Row>
    </Layout>
  );
};

CustomersPage.propTypes = propTypes;

CustomersPage.defaultProps = defaultProps;

export default injectIntl(CustomersPage, {});
