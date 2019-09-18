import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, Row, Typography, Button, Col, Tooltip, Descriptions, Divider } from 'antd';

const propTypes = {
  getProjectDetail: PropTypes.func.isRequired,

  projectDetail: PropTypes.shape({
    name: PropTypes.name,
    customer_name: PropTypes.string,
    total_member: PropTypes.number,
    start_date: PropTypes.number,
    end_date: PropTypes.number,
    members: PropTypes.array
  }),
  loading: PropTypes.bool
};

const defaultProps = {
  projectDetail: {
    name: '',
    customer_name: '',
    total_member: 0,
    start_date: 1568626107000,
    end_date: 1600248507000,
    members: []
  },
  loading: false
};

const ProjectDetail = ({ getProjectDetail, projectDetail, loading }) => {
  useEffect(() => {
    getProjectDetail && getProjectDetail({});
  }, []);

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
    }
  ];

  return (
    <React.Fragment>
      <Row style={{ marginBottom: 75 }}>
        <Descriptions
          title={projectDetail && projectDetail.name ? projectDetail.name : 'empty'}
          column={2}>
          <Descriptions.Item label="Customer">
            {projectDetail && projectDetail.customer_name ? projectDetail.customer_name : 'empty'}
          </Descriptions.Item>
          <Descriptions.Item label="Members">
            {projectDetail && projectDetail.total_member ? projectDetail.total_member : 0}
          </Descriptions.Item>
          <Descriptions.Item label="Start day">
            {projectDetail && projectDetail.start_date
              ? moment(projectDetail.start_date).format('DD/MM/YYYY')
              : 'empty'}
          </Descriptions.Item>
          <Descriptions.Item label="End day">
            {projectDetail && projectDetail.end_date
              ? moment(projectDetail.end_date).format('DD/MM/YYYY')
              : 'empty'}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <Row>
          <Row>
            <Col span={12}>
              <Typography.Title level={4}>Current members</Typography.Title>
            </Col>
            <Col span={12}>
              <Row type="flex" justify="end">
                <Tooltip placement="bottom" title="member diagram">
                  <Button type="primary" shape="circle" icon="line-chart" />
                </Tooltip>
              </Row>
            </Col>
          </Row>
          <Table
            columns={columns}
            rowKey={(record) => record.staff_code}
            dataSource={projectDetail ? projectDetail.members : []}
            loading={loading}
            pagination={false}
          />
        </Row>
      </Row>
    </React.Fragment>
  );
};

ProjectDetail.propTypes = propTypes;
ProjectDetail.defaultProps = defaultProps;

export default ProjectDetail;
