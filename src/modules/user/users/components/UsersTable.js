import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Table, Button, Tooltip, Row } from 'antd';

import UpdateUserDrawer from '../../editUser/components/UpdateUserDrawer';

const propTypes = {
  intl: PropTypes.shape({}).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  getMembers: PropTypes.func.isRequired,
  updateMember: PropTypes.func.isRequired
};

const defaultProps = {};

const UsersTable = ({ users, updateMember, getMembers }) => {
  const [dataItem, setDataItem] = useState({});
  const [drawerVisible, setDrawerVisible] = useState(false);

  const columns = [
    {
      title: <FormattedMessage id="users.name.title" />,
      dataIndex: 'full_name',
      key: 'full_name'
    },
    {
      title: <FormattedMessage id="users.email.title" />,
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: <FormattedMessage id="users.role.title" />,
      dataIndex: 'type',
      key: 'type'
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
              onClick={() => handleEditSelected(record)}
            />
          </Tooltip>
        </React.Fragment>
      )
    }
  ];
  const handleEditSelected = (data) => {
    data && setDataItem(data);
    setDrawerVisible(!drawerVisible);
  };

  return (
    <React.Fragment>
      <Row>
        <Table
          columns={columns}
          rowKey={(record, index) => index}
          dataSource={users}
        />
      </Row>
      {drawerVisible && (
        <UpdateUserDrawer
          drawerVisible={drawerVisible}
          updateMember={updateMember}
          getMembers={getMembers}
          onClose={() => handleEditSelected()}
          data={dataItem}
        />
      )}
    </React.Fragment>
  );
};

UsersTable.propTypes = propTypes;

UsersTable.defaultProps = defaultProps;

export default injectIntl(UsersTable, {});
