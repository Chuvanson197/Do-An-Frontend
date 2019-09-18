import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tag } from 'antd';
import moment from 'moment';

const propTypes = {
  projectMemberHistory: PropTypes.arrayOf
};

const defaultProps = {
  projectMemberHistory: []
};

const TableMemberHistory = ({ projectMemberHistory }) => {
  const columns = [
    {
      title: 'Staff Code',
      dataIndex: 'staff_code',
      key: 'staff_code'
    },
    {
      title: 'Full name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position'
    },
    {
      title: 'Effort',
      dataIndex: 'effort',
      key: 'effort'
    },
    {
      title: 'Joined date',
      dataIndex: 'join_at',
      key: 'join_at',
      render: (date) => {
        return moment(date).format('DD/MM/YYYY');
      }
    },
    {
      title: 'Out date',
      dataIndex: 'out_at',
      key: 'out_at',
      render: (date) => {
        return moment(date).format('DD/MM/YYYY');
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        switch (status) {
          case 'working':
            return <Tag color="#87d068">Working</Tag>;
          case 'busy':
            return <Tag color="#ffe58f">Busy</Tag>;
          case 'out':
            return <Tag color="#f5222D">Out</Tag>;
          default:
            return null;
        }
      }
    }
  ];

  return (
    <Table
      rowKey={(record) => record.id}
      pagination={false}
      columns={columns}
      dataSource={projectMemberHistory}
    />
  );
};

TableMemberHistory.propTypes = propTypes;
TableMemberHistory.defaultProps = defaultProps;

export default TableMemberHistory;
