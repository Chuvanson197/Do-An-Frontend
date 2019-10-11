import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Table, Row, Button, Tooltip, Popconfirm, message } from 'antd';
import { css } from 'emotion';

const propTypes = {
  intl: PropTypes.shape({}).isRequired
};

const defaultProps = {};

const styles = {
  addCustomerButton: css`
    margin-left: 15px;
    background: #49a32b !important;
    color: #fff !important;
  `
};

const listCustomer = [
  {
    id: 1,
    name: 'MUJI Japan',
    email: 'muji.japan@muji.jp',
    phone_number: '333-455-666',
    address: 'Tokyo, Japan'
  },
  {
    id: 2,
    name: 'Tekmate',
    email: 'Tekmate@tek.vn',
    phone_number: '0975352786',
    address: 'Hanoi, Viet Nam'
  }
];

const Customer = ({ intl }) => {
  const [selectedItemKeys, setSelectedItemKeys] = useState([]);

  const handleConfirmDelete = (record) => {
    console.log(record);
    message.success(intl.formatMessage({ id: 'customers.deleted.success' }));
  };

  const handleDeleteSelected = () => {
    console.log(selectedItemKeys);
    message.success(intl.formatMessage({ id: 'customers.deleted.success' }));
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
            <Popconfirm
              title={<FormattedMessage id="customers.confirm.delete" />}
              onConfirm={() => handleConfirmDelete(record)}
              okText={<FormattedMessage id="button.confirm.yes" />}
              cancelText={<FormattedMessage id="button.confirm.no" />}>
              <Button shape="circle" icon="delete" type="danger" style={{ margin: '0px 5px' }} />
            </Popconfirm>
          </Tooltip>
          <Tooltip placement="top" title={<FormattedMessage id="customers.button.edit" />}>
            <Button shape="circle" icon="edit" type="primary" style={{ margin: '0px 5px' }} />
          </Tooltip>
        </React.Fragment>
      )
    }
  ];

  const handleSelect = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedItemKeys(selectedRowKeys);
    }
  };

  return (
    <React.Fragment>
      <Row style={{ marginBottom: 15 }}>
        <Popconfirm
          title={<FormattedMessage id="customers.confirm.deleteSelected" />}
          onConfirm={() => handleDeleteSelected()}
          okText={<FormattedMessage id="customers.button.confirm.yes" />}
          cancelText={<FormattedMessage id="customers.button.confirm.no" />}
          disabled={!selectedItemKeys.length}>
          <Button icon="delete" type="danger" disabled={!selectedItemKeys.length}>
            <FormattedMessage id="customers.button.delete" />
          </Button>
        </Popconfirm>

        <Button icon="user-add" className={styles.addCustomerButton}>
          <FormattedMessage id="customers.button.add" />
        </Button>
      </Row>

      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={listCustomer}
        pagination={false}
        rowSelection={handleSelect}
      />
    </React.Fragment>
  );
};

Customer.propTypes = propTypes;
Customer.defaultProps = defaultProps;

export default injectIntl(Customer, {});
