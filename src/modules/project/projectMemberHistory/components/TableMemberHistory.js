import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

import { Table, Tag } from 'antd';

const propTypes = {};

const defaultProps = {};

const TableMemberHistory = () => {
  const { members, loading } = useSelector((state) => state.projectMemberHistory);
  const columns = [
    {
      title: <FormattedMessage id="projects.detail.member.staff_code" />,
      dataIndex: 'member_detail',
      key: 'staff_code',
      render: (memberDetail) => memberDetail.staff_code
    },
    {
      title: <FormattedMessage id="projects.detail.member.name" />,
      dataIndex: 'member_detail',
      key: 'fullname',
      render: (memberDetail) => memberDetail.full_name
    },
    {
      title: <FormattedMessage id="projects.detail.member.role" />,
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: <FormattedMessage id="projects.detail.member.effort" />,
      dataIndex: 'effort',
      key: 'effort'
    },
    {
      title: <FormattedMessage id="projects.detail.member.time_in" />,
      dataIndex: 'time_in',
      key: 'time_in',
      render: (date) => {
        return moment(parseInt(date, 10)).format('DD/MM/YYYY');
      }
    },
    {
      title: <FormattedMessage id="projects.detail.member.time_out" />,
      dataIndex: 'time_out',
      key: 'time_out',
      render: (date) => {
        if (!date) {
          return null;
        }
        return moment(parseInt(date, 10)).format('DD/MM/YYYY');
      }
    },
    {
      title: <FormattedMessage id="projects.detail.member.status" />,
      dataIndex: 'member_status',
      key: 'member_status',
      render: (status) => {
        switch (status) {
          case 'working':
            return (
              <Tag color="#87d068">
                <FormattedMessage id="projects.addMember.status.working" />
              </Tag>
            );
          case 'leave':
            return (
              <Tag color="#f5222D">
                <FormattedMessage id="projects.addMember.status.leave" />
              </Tag>
            );
          case 'idle':
            return (
              <Tag color="#ffe58f">
                <FormattedMessage id="projects.addMember.status.idle" />
              </Tag>
            );
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
      dataSource={members}
      loading={loading}
    />
  );
};

TableMemberHistory.propTypes = propTypes;
TableMemberHistory.defaultProps = defaultProps;

export default TableMemberHistory;
