import React from 'react';
import { Table } from 'antd';
import moment from 'moment';

const columns = [
  {
    title: 'Mã nhân viên',
    dataIndex: 'staffId'
  },
  {
    title: 'Họ & Tên',
    dataIndex: 'fullname'
  },
  {
    title: 'Vị trí',
    dataIndex: 'level'
  },
  {
    title: 'Effort',
    dataIndex: 'effort'
  },
  {
    title: 'Thời gian tham gia',
    dataIndex: 'time_in',
    render: (text, record, index) => <p>{moment(parseInt(text, 10)).format('DD/MM/YYYY')}</p>
  },
  {
    title: 'Thời gian kết thúc',
    dataIndex: 'time_out',
    render: (text, record, index) => <p>{moment(parseInt(text, 10)).format('DD/MM/YYYY')}</p>
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status'
  }
];

const data = [
  {
    id: 'member_001',
    staffId: 'impl_S01',
    fullname: 'Nguyễn Xuân An',
    phonenumber: '0975352786',
    email: 'an.nguyen@impl.vn',
    time_in: 1568271275000,
    time_out: 1599893675000,
    status: 'on-working',
    effort: 1,
    level: 'Dev'
  },
  {
    id: 'member_002',
    staffId: 'impl_S02',
    fullname: 'Nguyễn Xuân An',
    phonenumber: '0975352786',
    email: 'an.nguyen@impl.vn',
    time_in: 1568271275000,
    time_out: 1599893675000,
    status: 'on-working',
    effort: 1,
    level: 'Dev'
  },
  {
    id: 'member_003',
    staffId: 'impl_S03',
    fullname: 'Nguyễn Xuân An',
    phonenumber: '0975352786',
    email: 'an.nguyen@impl.vn',
    time_in: 1568271275000,
    time_out: 1599893675000,
    status: 'on-working',
    effort: 1,
    level: 'Dev'
  }
];

const TableMemberHistory = () => {
  //   const rowSelection = {
  //     onChange: (selectedRowKeys, selectedRows) => {
  //       console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  //     },
  //     getCheckboxProps: (record) => ({
  //       //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
  //       name: record.fullname
  //     })
  //   };

  return (
    <Table rowKey={(record) => record.id} pagination={false} columns={columns} dataSource={data} />
  );
};

export default TableMemberHistory;
