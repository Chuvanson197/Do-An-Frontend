import React, { useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Table, Tag, Tooltip, Row, Popconfirm, Button, message } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import { css } from 'emotion';

import CreateMember from '../../createMember/components/CreateMember';

const propTypes = {
  intl: PropTypes.shape({}).isRequired
};

const defaultProps = {};
const styles = {
  addMemberButton: css`
    margin-left: 15px;
    background: #49a32b !important;
    color: #fff !important;
  `
};

const members = [
  {
    key: '1',
    id: 'member_001',
    full_name: 'Chu Van Son',
    staff_code: 'impl_S01',
    phone_number: '123456798',
    status: 'working',
    email: 'son.chu@impl.com',
    time_in: 1568271275000,
    time_out: 1599893675000,
    effort: 1
  },
  {
    key: '2',
    id: 'member_002',
    full_name: 'Chu Van Son',
    staff_code: 'impl_S01',
    phone_number: '123456798',
    status: 'out',
    email: 'son.chu@impl.com',
    time_in: 1568271275000,
    time_out: 1599893675000,
    effort: 1
  }
];

const Members = ({ intl }) => {
  const [selectedItemKeys, setSelectedItemKeys] = useState([]);
  const [visible, setVisible] = useState(false);

  const handleConfirmDelete = (record) => {
    console.log(record);
    message.success(intl.formatMessage({ id: 'members.deleted.success' }));
  };
  const handleDeleteSelected = () => {
    console.log(selectedItemKeys);
    message.success(intl.formatMessage({ id: 'members.deleted.success' }));
  };
  const columns = [
    {
      title: <FormattedMessage id="members.memberTable.staffCode.title" />,
      dataIndex: 'staff_code',
      key: 'staff_code'
    },
    {
      title: <FormattedMessage id="members.memberTable.id.title" />,
      dataIndex: 'id',
      key: 'id'
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
      title: <FormattedMessage id="members.memberTable.timeIn.title" />,
      dataIndex: 'time_in',
      key: 'time_in',
      render: (date) => {
        return moment(date).format('DD/MM/YYYY');
      }
    },
    {
      title: <FormattedMessage id="members.memberTable.timeOut.title" />,
      dataIndex: 'time_out',
      key: 'time_out',
      render: (date) => {
        return moment(date).format('DD/MM/YYYY');
      }
    },
    {
      title: <FormattedMessage id="members.memberTable.status.title" />,
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        switch (status) {
          case 'working':
            return <Tag color="#87d068">Working</Tag>;
          case 'out':
            return <Tag color="#f5222D">Out</Tag>;
          default:
            return null;
        }
      }
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
          title={<FormattedMessage id="members.confirm.deleteSelected" />}
          onConfirm={() => handleDeleteSelected()}
          okText={<FormattedMessage id="members.button.confirm.yes" />}
          cancelText={<FormattedMessage id="members.button.confirm.no" />}
          disabled={!selectedItemKeys.length}>
          <Button icon="delete" type="danger" disabled={!selectedItemKeys.length}>
            <FormattedMessage id="members.memberTable.buttonDelete.title" />
          </Button>
        </Popconfirm>

        <Button
          icon="user-add"
          className={styles.addMemberButton}
          onClick={() => setVisible(!visible)}>
          <FormattedMessage id="members.memberTable.buttonAdd.title" />
        </Button>
      </Row>

      <Table
        columns={columns}
        rowKey={(record, index) => index}
        dataSource={members}
        pagination={false}
        rowSelection={handleSelect}
      />
      {visible && <CreateMember visible={visible} close={() => setVisible(!visible)} />}
    </React.Fragment>
  );
};

Members.propTypes = propTypes;
Members.defaultProps = defaultProps;

export default injectIntl(Members, {});
