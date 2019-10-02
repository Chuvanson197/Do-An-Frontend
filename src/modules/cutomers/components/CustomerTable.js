import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Table } from 'antd';
import PropTypes from 'prop-types';

const propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      address: PropTypes.string,
      project_name: PropTypes.string
    })
  ),

  onRowSelected: PropTypes.func.isRequired
};

const defaultProps = {
  customers: [
    {
      id: '1',
      name: 'Muji',
      address: '260 Tokyo',
      project_name: 'MUJI Admin'
    }
  ]
};

const CustomerTable = ({ customers, onRowSelected }) => {
  const columns = [
    {
      title: <FormattedMessage id="customers.customerTable.name.title" />,
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: <FormattedMessage id="customers.customerTable.address.title" />,
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: <FormattedMessage id="customers.customerTable.projectName.title" />,
      dataIndex: 'project_name',
      key: 'project_name'
    }
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      onRowSelected(selectedRowKeys);
    }
  };

  return (
    <Table
      columns={columns}
      rowKey={(record, index) => index}
      dataSource={customers}
      pagination={false}
      rowSelection={rowSelection}
    />
  );
};

CustomerTable.propTypes = propTypes;
CustomerTable.defaultProps = defaultProps;

export default CustomerTable;
