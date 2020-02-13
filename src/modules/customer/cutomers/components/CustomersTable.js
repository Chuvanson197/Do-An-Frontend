import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Table } from 'antd';

import { history } from '../../../../store';


const propTypes = {
  intl: PropTypes.shape({}).isRequired,
  customers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getCustomers: PropTypes.func.isRequired,
  removeCustomer: PropTypes.func.isRequired
};

const defaultProps = {};


const CustomersTable = ({ intl, customers }) => {
  const { loading } = useSelector(
    (state) => state.customers
  );
  const onSelectCustomer = (item) => {
    history.push(`/customer/detail/${item.id}`);    
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
    }
  ];

  return (
    <React.Fragment>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={customers}
        loading={loading}
        onRow={(item) => ({
          onClick: () => onSelectCustomer(item)
        })}
      />
      {/* {drawerVisible && (
        <UpdateCustomerDrawer
          drawerVisible={drawerVisible}
          onClose={() => handleControlDrawer()}
          customer={customer}
          getCustomers={getCustomers}
        />
      )} */}
    </React.Fragment>
  );
};

CustomersTable.propTypes = propTypes;

CustomersTable.defaultProps = defaultProps;

export default injectIntl(CustomersTable, {});
