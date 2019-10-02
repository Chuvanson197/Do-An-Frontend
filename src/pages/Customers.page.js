import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Row } from 'antd';
import { css } from 'emotion';

import { actions as layoutActions } from '../modules/layout/store';
import { actions as customerActions } from '../modules/cutomers/store';

import HeaderTitle from '../components/Content/HeaderTitle';
import Layout from '../modules/layout/components/Layout';
import Customers from '../modules/cutomers/components/Customers';

const styles = {
  container: css`
    height: 100% !important;
  `
};

const dummyData = [
  {
    id: '1',
    name: 'Muji',
    address: '260 Tokyo',
    project_name: 'MUJI Admin'
  },
  {
    id: '2',
    name: 'Muji',
    address: '260 Tokyo',
    project_name: 'MUJI Admin'
  },
  {
    id: '3',
    name: 'Muji',
    address: '260 Tokyo',
    project_name: 'MUJI Admin'
  },
  {
    id: '4',
    name: 'Muji',
    address: '260 Tokyo',
    project_name: 'MUJI Admin'
  },
  {
    id: '5',
    name: 'Muji',
    address: '260 Tokyo',
    project_name: 'MUJI Admin'
  },
  {
    id: '6',
    name: 'Muji',
    address: '260 Tokyo',
    project_name: 'MUJI Admin'
  }
];

const CustomersPage = () => {
  const dispatch = useDispatch();
  const { customers, isDeleted } = useSelector((state) => state.customers);

  useEffect(() => {
    dispatch(layoutActions.selectItem(['customers']));
    dispatch(customerActions.fecthCustomers());
  }, [dispatch]);

  const deleteCustomer = useCallback(
    (selectedKeys) => {
      const body = {};
      dispatch(customerActions.deleteCustomers(body));
    },
    [dispatch]
  );

  const addNewCustomer = useCallback(
    (body) => {
      dispatch(customerActions.addCustomer(body));
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
            customers={dummyData}
            deleteCustomer={deleteCustomer}
            addNewCustomer={addNewCustomer}
          />
        </Row>
      </Row>
    </Layout>
  );
};

export default CustomersPage;
