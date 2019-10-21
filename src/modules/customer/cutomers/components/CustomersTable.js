import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Table, Row, Button, Tooltip, Popconfirm } from 'antd';
import { css } from 'emotion';

import CreateCustomer from '../../createCustomer/components/CreateCustomerModal';
import UpdateCustomerDrawer from '../../updateCustomer/components/UpdateCustomerDrawer';
import ErrorNotification from '../../../../components/Notification/Error';
import SuccessNotification from '../../../../components/Notification/Success';
import { actions as customerActions } from '../../store';

const propTypes = {
  intl: PropTypes.shape({}).isRequired,
  customers: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

const defaultProps = {};

const styles = {
  addCustomerButton: css`
    background: #49a32b !important;
    color: #fff !important;
  `
};

const CustomersTable = ({ intl, customers }) => {
  const dispatch = useDispatch();
  const [OpenCreateModal, setOpenCreateModal] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [customer, selectCustomer] = useState(null);
  const { loading, removeCustomerResult, removeCustomerError, removeCustomerErrors } = useSelector(
    (state) => state.customers
  );

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
            <Popconfirm
              title={<FormattedMessage id="customers.confirm.delete" />}
              onConfirm={() =>
                dispatch(
                  customerActions.removeCustomer({
                    path: 'customers/remove',
                    param: record.id
                  })
                )
              // eslint-disable-next-line react/jsx-curly-newline
              }
              okText={<FormattedMessage id="button.confirm.yes" />}
              cancelText={<FormattedMessage id="button.confirm.no" />}>
              <Button shape="circle" icon="delete" type="danger" style={{ margin: '0px 5px' }} />
            </Popconfirm>
          </Tooltip>
          <Tooltip placement="top" title={<FormattedMessage id="customers.button.edit" />}>
            <Button
              shape="circle"
              icon="edit"
              type="primary"
              style={{ margin: '0px 5px' }}
              // eslint-disable-next-line no-use-before-define
              onClick={() => handleControlDrawer(record)}
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
      dispatch(
        customerActions.getCustomers({
          path: 'customers'
        })
      );
    }
    // show error notification
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
  }, [dispatch, intl, removeCustomerError, removeCustomerErrors, removeCustomerResult]);

  // Handle control open/close add customer modal
  const handleControlCreateModal = () => {
    setOpenCreateModal(!OpenCreateModal);
    dispatch(customerActions.createCustomerCleanError());
    dispatch(customerActions.createCustomerCleanData());
  };

  // Handle control open/close update customer drawer
  const handleControlDrawer = (selectedCustomer) => {
    selectedCustomer && selectCustomer(selectedCustomer);
    setDrawerVisible(!drawerVisible);
    dispatch(customerActions.updateCustomerCleanError());
    dispatch(customerActions.updateCustomerCleanData());
  };

  return (
    <React.Fragment>
      <Row style={{ marginBottom: 15 }}>
        <Button
          icon="user-add"
          className={styles.addCustomerButton}
          onClick={() => handleControlCreateModal()}>
          <FormattedMessage id="button.add" />
        </Button>
      </Row>

      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={customers}
        pagination={false}
        loading={loading}
      />
      {OpenCreateModal && (
        <CreateCustomer visible={OpenCreateModal} close={() => handleControlCreateModal()} />
      )}
      {drawerVisible && (
        <UpdateCustomerDrawer
          drawerVisible={drawerVisible}
          onClose={() => handleControlDrawer()}
          customer={customer}
        />
      )}
    </React.Fragment>
  );
};

CustomersTable.propTypes = propTypes;

CustomersTable.defaultProps = defaultProps;

export default injectIntl(CustomersTable, {});
