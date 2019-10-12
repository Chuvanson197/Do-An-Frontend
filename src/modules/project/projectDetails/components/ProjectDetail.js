import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, Row, Typography, Button, Col, Tooltip, Descriptions, Divider } from 'antd';

import MemberDiagram from '../../../member/memberDiagram/MemberDiagram';
import MemberAdd from '../../../member/memberAdd/components/MemberAdd';

const propTypes = {
  project: PropTypes.shape({}),
  joinedMembers: PropTypes.shape({}),
  loading: PropTypes.bool
};

const defaultProps = {
  loading: false,
  project: {},
  joinedMembers: {
    list: [],
    total: 0
  }
};

const ProjectDetail = ({ project, joinedMembers, loading }) => {
  const [visible, setVisible] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  const columns = [
    {
      title: 'Staff Code',
      dataIndex: 'member_detail',
      key: 'staff_code',
      render: (memberDetail) => {
        return memberDetail.staff_code;
      }
    },
    {
      title: 'Full name',
      dataIndex: 'member_detail',
      key: 'name',
      render: (memberDetail) => {
        return memberDetail.full_name;
      }
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role'
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
    }
  ];

  return (
    <React.Fragment>
      <Row style={{ marginBottom: 75 }}>
        <Descriptions title={project && project.name ? project.name : 'empty'} column={1}>
          <Descriptions.Item label="Customer">
            {project && project.customer ? project.customer.name : 'empty'}
          </Descriptions.Item>
          <Descriptions.Item label="Members">
            {joinedMembers && joinedMembers.total ? joinedMembers.total : 0}
          </Descriptions.Item>
          <Descriptions.Item label="Start day">
            {project && project.start_time
              ? moment(parseInt(project.start_time, 10)).format('DD/MM/YYYY')
              : 'empty'}
          </Descriptions.Item>
          <Descriptions.Item label="End day">
            {project && project.end_time
              ? moment(parseInt(project.end_time, 10)).format('DD/MM/YYYY')
              : 'empty'}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <Row>
          <Row>
            <Col span={5} style={{ display: 'flex' }}>
              <Typography.Title level={4}>Current members</Typography.Title>
              <Tooltip placement="bottom" title="member add">
                <Button
                  style={{ marginLeft: 10 }}
                  type="primary"
                  shape="circle"
                  icon="usergroup-add"
                  onClick={() => setOpenAddModal(!openAddModal)}
                />
              </Tooltip>
            </Col>
            <Col span={19}>
              <Row type="flex" justify="end">
                <Tooltip placement="bottom" title="member diagram">
                  <Button
                    type="primary"
                    shape="circle"
                    icon="line-chart"
                    onClick={() => setVisible(!visible)}
                  />
                </Tooltip>
              </Row>
            </Col>
          </Row>
          <Table
            columns={columns}
            rowKey={(record) => record.member_detail.staff_code}
            dataSource={joinedMembers ? joinedMembers.list : []}
            loading={loading}
            pagination={false}
          />
        </Row>
      </Row>
      <MemberDiagram visible={visible} close={() => setVisible(!visible)} />
      {openAddModal && (
        <MemberAdd
          joinedMembers={joinedMembers.list}
          visible={openAddModal}
          close={() => setOpenAddModal(!openAddModal)}></MemberAdd>
      )}
    </React.Fragment>
  );
};

ProjectDetail.propTypes = propTypes;
ProjectDetail.defaultProps = defaultProps;

export default ProjectDetail;
