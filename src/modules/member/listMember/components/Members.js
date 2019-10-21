import React, { useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Table, Tooltip, Row, Popconfirm, Button } from 'antd';
import PropTypes from 'prop-types';
import { css } from 'emotion';

import CreateMember from '../../createMember/components/CreateMember';
import EditMember from '../../editMember/components/EditMember';
import { actions as delMemberActions } from '../store';

const propTypes = {
  intl: PropTypes.shape({}).isRequired,
  members: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

const defaultProps = {};
const styles = {
  addMemberButton: css`
    margin-left: 15px;
    background: #49a32b !important;
    color: #fff !important;
  `
};

const Members = ({ intl, members, createMember }) => {
  const dispatch = useDispatch();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [dataItem, setDataItem] = useState({});

  const handleConfirmDelete = (record) => {
    dispatch(delMemberActions.delMember({ path: 'members/remove', param: record.staff_code }));
    // message.success(intl.formatMessage({ id: 'members.deleted.success' }));
  };
  const handleEditSelected = (data) => {
    setOpenEditModal(!openEditModal);
    setDataItem(data);
  };
  const handleCreateModal = () => {
    setOpenCreateModal(!openCreateModal);
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
      title: <FormattedMessage id="members.membersTable.effort.title" />,
      dataIndex: 'effort',
      key: 'effort'
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
              onConfirm={() => handleConfirmDelete(record)}
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

  return (
    <React.Fragment>
      <Row style={{ marginBottom: 15 }}>
        <Button
          icon="user-add"
          className={styles.addMemberButton}
          onClick={() => handleCreateModal()}>
          <FormattedMessage id="members.memberTable.buttonAdd.title" />
        </Button>
      </Row>
      <Table
        columns={columns}
        rowKey={(record, index) => index}
        dataSource={members}
        pagination={false}
      />
      {openCreateModal && (
        <CreateMember
          createMember={createMember}
          visible={openCreateModal}
          close={() => handleCreateModal()}
        />
      )}
      {openEditModal && (
        <EditMember
          visible={openEditModal}
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
