import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Table, Button, Tooltip, Popconfirm } from 'antd';

const propTypes = {};

const defaultProps = {};

const UsersTable = ({ users }) => {
  const columns = [
    {
      title: <FormattedMessage id="users.name.title" />,
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: <FormattedMessage id="users.email.title" />,
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: <FormattedMessage id="users.permission.title" />,
      dataIndex: 'permission',
      key: 'permission'
    },
    {
      title: <FormattedMessage id="users.role.title" />,
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      align: 'right',
      render: (record) => (
        <React.Fragment>
          <Tooltip placement="top" title={<FormattedMessage id="users.button.edit" />}>
            <Button
              shape="circle"
              icon="edit"
              type="primary"
              style={{ margin: '0px 5px' }}
              // eslint-disable-next-line no-use-before-define
              //   onClick={() => handleControlDrawer(record)}
            />
          </Tooltip>
        </React.Fragment>
      )
    }
  ];

  return (
    <React.Fragment>
      <Table
        columns={columns}
        // rowKey={(record) => record.id}
        dataSource={users}
        pagination={false}
      />
    </React.Fragment>
  );
};

UsersTable.propTypes = propTypes;

UsersTable.defaultProps = defaultProps;

export default injectIntl(UsersTable, {});
