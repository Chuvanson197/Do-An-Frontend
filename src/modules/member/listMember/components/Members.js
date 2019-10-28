import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Table, Tooltip, Popconfirm, Button } from 'antd';
import PropTypes from 'prop-types';

import EditMember from '../../editMember/components/EditMember';
import SuccessNotification from '../../../../components/Notification/Success';
import ErrorNotification from '../../../../components/Notification/Error';

const propTypes = {
  intl: PropTypes.shape({}).isRequired,
  members: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

const defaultProps = {};

const Members = ({
  intl,
  members,
  getMembers,
  updateMember,
  removeMember,
  updateMemberCleanData,
  updateMemberCleanError,
  removeMemberCleanData,
  removeMemberCleanError
}) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [dataItem, setDataItem] = useState({});
  const { removeMemberResult, removeMemberError, removeMemberErrors, loading } = useSelector(
    (state) => state.members
  );

  const handleEditSelected = (data) => {
    data && setDataItem(data);
    setDrawerVisible(!drawerVisible);
    updateMemberCleanError();
    updateMemberCleanData();
  };
  const columns = [
    {
      title: <FormattedMessage id="members.memberTable.staffCode.title" />,
      dataIndex: 'staff_code',
      key: 'staff_code'
    },
    {
      title: <FormattedMessage id="members.memberTable.name.title" />,
      dataIndex: 'full_name',
      key: 'full_name'
    },
    {
      title: <FormattedMessage id="members.memberTable.phoneNumber.title" />,
      dataIndex: 'phone_number',
      key: 'phone_number'
    },
    {
      title: <FormattedMessage id="members.memberTable.email.title" />,
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      align: 'right',
      render: (record) => (
        <React.Fragment>
          <Tooltip
            placement="top"
            title={<FormattedMessage id="members.memberTable.buttonDelete.title" />}>
            <Popconfirm
              title={<FormattedMessage id="members.confirm.delete" />}
              onConfirm={() => removeMember(record)}
              okText={<FormattedMessage id="members.button.confirm.yes" />}
              cancelText={<FormattedMessage id="members.button.confirm.no" />}>
              <Button shape="circle" icon="delete" type="danger" style={{ margin: '0px 5px' }} />
            </Popconfirm>
          </Tooltip>
          <Tooltip
            placement="top"
            title={<FormattedMessage id="members.memberTable.buttonEdit.title" />}>
            <Button
              onClick={() => {
                handleEditSelected(record);
              }}
              shape="circle"
              icon="edit"
              type="primary"
              style={{ margin: '0px 5px' }}
            />
          </Tooltip>
        </React.Fragment>
      )
    }
  ];

  useEffect(() => {
    // show success notification
    if (removeMemberResult) {
      const title = intl.formatMessage({ id: 'notification.success' });
      const message = intl.formatMessage({ id: removeMemberResult.message });
      SuccessNotification(title, message);
      // clean data
      removeMemberCleanData();
      // re-call get Members list
      getMembers();
    }
    // show error notification
    if (removeMemberError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({
        id: removeMemberErrors.message
          ? removeMemberErrors.message
          : 'members.removeMember.message.error'
      });
      ErrorNotification(title, message);
      // clean error
      removeMemberCleanError();
    }
  }, [
    intl,
    removeMemberError,
    removeMemberErrors,
    removeMemberResult,
    removeMemberCleanData,
    removeMemberCleanError,
    getMembers
  ]);

  return (
    <React.Fragment>
      <Table
        columns={columns}
        rowKey={(record, index) => index}
        dataSource={members}
        pagination={false}
        loading={loading}
      />
      {drawerVisible && (
        <EditMember
          visible={drawerVisible}
          updateMember={updateMember}
          updateMemberCleanError={updateMemberCleanError}
          getMembers={getMembers}
          close={() => handleEditSelected()}
          data={dataItem}
        />
      )}
    </React.Fragment>
  );
};

Members.propTypes = propTypes;
Members.defaultProps = defaultProps;

export default injectIntl(Members, {});
