import React from 'react';
import { Table, Tag } from 'antd';
import moment from 'moment';

const data = [
  {
    id: 'member_001',
    staff_code: 'impl_S01',
    name: 'Nguyễn Xuân An',
    phonenumber: '0975352786',
    email: 'an.nguyen@impl.vn',
    time_in: 1568271275000,
    time_out: 1599893675000,
    status: 'working',
    effort: 1,
    position: 'Developer'
  },
  {
    id: 'member_002',
    staff_code: 'impl_S02',
    name: 'Nguyễn Xuân An',
    phonenumber: '0975352786',
    email: 'an.nguyen@impl.vn',
    time_in: 1568271275000,
    time_out: 1599893675000,
    status: 'out',
    effort: 1,
    position: 'Developer'
  },
  {
    id: 'member_003',
    staff_code: 'impl_S03',
    name: 'Nguyễn Xuân An',
    phonenumber: '0975352786',
    email: 'an.nguyen@impl.vn',
    time_in: 1568271275000,
    time_out: 1599893675000,
    status: 'busy',
    effort: 1,
    position: 'Developer'
  }
];

const TableMemberHistory = () => {
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
    <Table rowKey={(record) => record.id} pagination={false} columns={columns} dataSource={data} />
  );
};

export default TableMemberHistory;
