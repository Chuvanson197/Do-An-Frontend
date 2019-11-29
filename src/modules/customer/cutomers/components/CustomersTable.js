import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Table, Button, Tooltip, Popconfirm } from 'antd';

import UpdateCustomerDrawer from '../../updateCustomer/components/UpdateCustomerDrawer';
import ErrorNotification from '../../../../components/Notification/Error';
import SuccessNotification from '../../../../components/Notification/Success';
import WithRole from '../../../../hocs/WithRole';

import { actions as customerActions } from '../../store';

const propTypes = {
  intl: PropTypes.shape({}).isRequired,
  customers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getCustomers: PropTypes.func.isRequired,
  removeCustomer: PropTypes.func.isRequired
};

const defaultProps = {};

const ButtonEditCustomer = ({ handleControlDrawer, record }) => {
  return (
    <Button
      shape="circle"
      icon="edit"
      type="primary"
      style={{ margin: '0px 5px' }}
      // eslint-disable-next-line no-use-before-define
      onClick={() => handleControlDrawer(record)}
    />
  );
};

const ButtonDeleteCustomer = ({ removeCustomer, record }) => {
  return (
    <Popconfirm
      title={<FormattedMessage id="customers.confirm.delete" />}
      onConfirm={() => removeCustomer && removeCustomer(record)}
      okText={<FormattedMessage id="button.confirm.yes" />}
      cancelText={<FormattedMessage id="button.confirm.no" />}>
      <Button shape="circle" icon="delete" type="danger" style={{ margin: '0px 5px' }} />
    </Popconfirm>
  );
};

const CustomersTable = ({ intl, customers, getCustomers, removeCustomer }) => {
  const dispatch = useDispatch();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [customer, selectCustomer] = useState(null);
  const { loading, removeCustomerResult, removeCustomerError, removeCustomerErrors } = useSelector(
    (state) => state.customers
  );
  // Handle control open/close update customer drawer
  const handleControlDrawer = (selectedCustomer) => {
    selectedCustomer && selectCustomer(selectedCustomer);
    setDrawerVisible(!drawerVisible);
    dispatch(customerActions.updateCustomerCleanError());
    dispatch(customerActions.updateCustomerCleanData());
  };
  const columns = [
    {
      title: <FormattedMessage id="customers.name.title" />,
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: <FormattedMessage id="customers.email.title" />,
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: <FormattedMessage id="customers.phone.title" />,
      dataIndex: 'phone_number',
      key: 'phone_number'
    },
    {
      title: <FormattedMessage id="customers.address.title" />,
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      align: 'right',
      render: (record) => (
        <React.Fragment>
          <Tooltip placement="top" title={<FormattedMessage id="customers.button.delete" />}>
            <WithRole
              type={['admin']}
              component={ButtonDeleteCustomer}
              record={record}
              removeCustomer={removeCustomer}
            />
          </Tooltip>
          <Tooltip placement="top" title={<FormattedMessage id="customers.button.edit" />}>
            <WithRole
              type={['admin']}
              component={ButtonEditCustomer}
              handleControlDrawer={handleControlDrawer}
              record={record}
            />
          </Tooltip>
        </React.Fragment>
      )
    }
  ];

  // Handle showing notification after remove customer
  useEffect(() => {
    // show success notification
    if (removeCustomerResult) {
      const title = intl.formatMessage({ id: 'notification.success' });
      const message = intl.formatMessage({ id: removeCustomerResult.message });
      SuccessNotification(title, message);
      // clean data
      dispatch(customerActions.removeCustomerCleanData(false));
      // re-call get customers list
      getCustomers && getCustomers();
    }
  }, [dispatch, getCustomers, intl, removeCustomerResult]);

  // Showing error if remove customer failure
  useEffect(() => {
    if (removeCustomerError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({
        id: removeCustomerErrors.message
          ? removeCustomerErrors.message
          : 'customers.removeCustomer.message.error'
      });
      ErrorNotification(title, message);
      // clean error
      dispatch(customerActions.removeCustomerCleanError(false));
    }
  }, [dispatch, intl, removeCustomerError, removeCustomerErrors]);

  return (
    <React.Fragment>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={customers}
        loading={loading}
      />
      {drawerVisible && (
        <UpdateCustomerDrawer
          drawerVisible={drawerVisible}
          onClose={() => handleControlDrawer()}
          customer={customer}
          getCustomers={getCustomers}
        />
      )}
    </React.Fragment>
  );
};

CustomersTable.propTypes = propTypes;

CustomersTable.defaultProps = defaultProps;

export default injectIntl(CustomersTable, {});
