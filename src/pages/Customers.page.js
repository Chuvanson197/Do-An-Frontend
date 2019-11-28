import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
import { css } from 'emotion';
import { Row, Button, Col, Input } from 'antd';

import { actions as layoutActions } from '../modules/layout/store';
import { actions as customerActions } from '../modules/customer/store';

import HeaderTitle from '../components/Content/HeaderTitle';
import Customers from '../modules/customer/cutomers/components/CustomersTable';
import ErrorNotification from '../components/Notification/Error';
import WithRole from '../hocs/WithRole';

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

const ButtonCreateCustomer = ({ handleCreateModal, intl }) => {
  return (
    <Button icon="user-add" className={styles.addCustomerButton} onClick={handleCreateModal}>
      {intl.formatMessage({ id: 'button.add' })}
    </Button>
  );
};

const CustomersPage = React.memo(({ history, intl }) => {
  const dispatch = useDispatch();

  // selector
  const { list, getCustomersError, getCustomersErrors } = useSelector((state) => state.customers);

  // state
  const [visible, setVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);

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

  const removeCustomer = useCallback(
    (record) => {
      dispatch(
        customerActions.removeCustomer({
          path: 'customers/remove',
          param: record.id
        })
      );
    },
    [dispatch]
  );

  // check authencation

  // get customers at first render
  useEffect(() => {
    dispatch(layoutActions.selectItem(['customers']));
    getCustomers();
  }, [dispatch, getCustomers]);

  useEffect(() => {
    setFilteredData(list);
  }, [list]);

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

  const handleCreateModal = () => {
    setVisible(!visible);
  };

  const handleChange = (e) => {
    const currValue = e.target.value;
    setSearchInput(currValue);
    const data = list.filter((value) => {
      return (
        value.name
          .replace(/\s/g, '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/đ/g, 'd')
          .replace(/Đ/g, 'D')
          .toLowerCase()
          .includes(
            currValue
              .replace(/\s/g, '')
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd')
              .replace(/Đ/g, 'D')
          ) ||
        value.email
          .replace(/\s/g, '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/đ/g, 'd')
          .replace(/Đ/g, 'D')
          .toLowerCase()
          .includes(
            currValue
              .replace(/\s/g, '')
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd')
              .replace(/Đ/g, 'D')
          )
      );
    });
    setFilteredData(data);
  };

  return (
    <Row className={styles.container}>
      <Row>
        <HeaderTitle title={intl.formatMessage({ id: 'customers.header.title' })} />
      </Row>
      <Row>
        <Col>
          <WithRole
            type={['admin']}
            component={ButtonCreateCustomer}
            handleCreateModal={handleCreateModal}
            intl={intl}
          />
        </Col>
        <Col span={10} offset={14}>
          <Input placeholder="Search" value={searchInput} onChange={handleChange} />
        </Col>
      </Row>
      <Row style={{paddingTop: 20}}>
        <Customers
          customers={filteredData}
          removeCustomer={removeCustomer}
          getCustomers={getCustomers}
        />
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
  );
});

CustomersPage.propTypes = propTypes;

CustomersPage.defaultProps = defaultProps;

export default injectIntl(CustomersPage, {});
