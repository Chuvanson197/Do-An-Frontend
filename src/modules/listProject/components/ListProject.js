import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import moment from 'moment';

import { history } from '../../../store';

const propTypes = {
  listProject: PropTypes.arrayOf(PropTypes.shape({}))
};

const defaultProps = {
  listProject: [
    {
      id: 1,
      name: 'MUJI-ADMIN',
      customer: 'MUJI.jp',
      start_time: 1568626107000,
      end_time: 1600248507000
    }
  ]
};

const ListProject = ({ listProject }) => {
  const onSelectProject = (record) => {
    history.push(`/project/detail/${record.id}`);
  };

  const columns = [
    {
      title: 'Project name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer'
    },
    {
      title: 'Start',
      dataIndex: 'start_time',
      key: 'start_time',
      render: (time) => {
        return moment(time).format('DD/MM/YYYY');
      }
    },
    {
      title: 'End',
      dataIndex: 'end_time',
      key: 'end_time',
      render: (time) => {
        return moment(time).format('DD/MM/YYYY');
      }
    }
  ];
  return (
    <Table
      rowKey={(record) => record.id}
      columns={columns}
      dataSource={listProject}
      pagination={false}
      onRow={(record) => {
        return {
          onClick: () => onSelectProject(record)
        };
      }}
    />
  );
};

ListProject.propTypes = propTypes;

ListProject.defaultProps = defaultProps;

export default ListProject;
