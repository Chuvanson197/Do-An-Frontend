import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Table, Tag, Row} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';

const propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      staff_code: PropTypes.string,
      id: PropTypes.string,
      full_name: PropTypes.string,
      phone_number: PropTypes.string,
      email: PropTypes.string,
      time_in: PropTypes.number,
      time_out: PropTypes.number,
      status: PropTypes.string,
      effort: PropTypes.number
    })
  ),

  onRowSelected: PropTypes.func.isRequired
};

const defaultProps = {
  members: [
    {
      key: '1',
      id: 'member_001',
      full_name: 'Chu Van Son',
      staff_code: 'impl_S01',
      phone_number: +123456798,
      status: ['running'],
      email: 'son.chu@impl.com',
      time_in: 1568271275000,
      time_out: 1599893675000,
      effort: 1
    }
  ]
};

const MemberTable = ({ members, onRowSelected }) => {
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
        return (
        <Row>
        {status === 'on-working' && <Tag color="#108ee9">RUNNING</Tag>}
        {status === 'stopped' && <Tag color="#f5222D">STOPPED</Tag>}
        </Row>
        );
      }
    },
    {
      title: <FormattedMessage id="members.membersTable.effort.title" />,
      dataIndex: 'effort',
      key: 'effort'
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
      dataSource={members}
      pagination={false}
      rowSelection={rowSelection}
    />
  );
};

MemberTable.propTypes = propTypes;
MemberTable.defaultProps = defaultProps;

export default MemberTable;
