import React from 'react';
import { Table, Divider, Tag } from 'antd';

const columns = [
  {
    title: 'Staff code',
    dataIndex: 'staff_code',
    key: 'staff_code',
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'full_name',
    key: 'full_name',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Phone number',
    dataIndex: 'phone_number',
    key: 'phone_number',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Time in',
    dataIndex: 'time_in',
    key: 'time_in'
  },
  {
    title: 'Time out',
    dataIndex: 'time_out',
    key: 'time_out'
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (status) => (
      <span>
        {status.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    )
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    )
  }
];

const data = [
  {
    key: '1',
    id: 'member_001',
    full_name: 'Chu Van Son',
    staff_code: 'impl_S01',
    phonenumbe: 123456798,
    status: ['on-working'],
    email: 'son.chu@impl.com',
    time_in: 1568271275000,
    time_out: 1599893675000,
    effort: 1
  },
  {
    key: '2',
    id: 'member_001',
    full_name: 'Jim Green',
    staff_code: 'impl_S01',
    phonenumbe: 123456798,
    email: 'son.chu@impl.com',
    time_in: 1568271275000,
    time_out: 1599893675000,
    effort: 1,
    status: ['on-working']
  },
  {
    key: '3',
    id: 'member_001',
    full_name: 'Joe',
    staff_code: 'impl_S01',
    phonenumbe: 123456798,
    email: 'son.chu@impl.com',
    time_in: 1568271275000,
    time_out: 1599893675000,
    effort: 1,
    status: ['runing']
  }
];
const ListMember = () => {
  return <Table columns={columns} dataSource={data} />;
};
export default ListMember;
