import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Table, Tooltip, Popconfirm, Button } from 'antd';
import PropTypes from 'prop-types';

import EditMember from '../../editMember/components/EditMember';
import SuccessNotification from '../../../../components/Notification/Success';
import ErrorNotification from '../../../../components/Notification/Error';

import { actions as memberActions } from '../../store';

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
}) => {
  const dispatch = useDispatch();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [dataItem, setDataItem] = useState({});
  const { removeMemberResult, removeMemberError, removeMemberErrors, loading } = useSelector(
    (state) => state.members
  );

  const handleEditSelected = (data) => {
    data && setDataItem(data);
    setDrawerVisible(!drawerVisible);
    dispatch(memberActions.updateMemberCleanError(false));
    dispatch(memberActions.updateMemberCleanData());
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
    if (removeMemberResult) {
      // show success notification
      const title = intl.formatMessage({ id: 'notification.success' });
      const message = intl.formatMessage({ id: removeMemberResult.message });
      SuccessNotification(title, message);
      // clean data
      dispatch(memberActions.removeMemberCleanData());
      // re-call get Members list
      getMembers();
    }
  }, [removeMemberResult, intl, getMembers, dispatch]);

  useEffect(() => {
    if (removeMemberError) {
      // show error notification
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({
        id: removeMemberErrors.message
          ? removeMemberErrors.message
          : 'members.removeMember.message.error'
      });
      ErrorNotification(title, message);
      // clean error
      dispatch(memberActions.removeMemberCleanError(false));
    }
  }, [intl, removeMemberError, removeMemberErrors, dispatch]);

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
