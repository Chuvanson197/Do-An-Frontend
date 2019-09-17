import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, Row, Typography, Button, Col, Tooltip } from 'antd';

const propTypes = {
  getProjectDetail: PropTypes.func.isRequired,

  projectDetail: PropTypes.shape({
    customer_name: PropTypes.string,
    total_member: PropTypes.number,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    members: PropTypes.array
  }),
  loading: PropTypes.bool
};

const defaultProps = {
  projectDetail: {
    customer_name: '',
    total_member: 0,
    start_date: '',
    end_date: '',
    members: []
  },
  loading: false
};

const ProjectDetail = ({ getProjectDetail, projectDetail, loading }) => {
  useEffect(() => {
    getProjectDetail && getProjectDetail({});
  }, []);

  const columnNames = ['staff_code', 'name', 'position', 'effort', 'join_at'];
  const columnConfigs = {
    staff_code: {
      render: (value) => {
        return <span>{value || ''}</span>;
      }
    },
    name: {
      render: (value) => {
        return <span>{value || ''}</span>;
      }
    },
    position: {
      render: (value) => {
        return <span>{value || ''}</span>;
      }
    },
    effort: {
      render: (value) => {
        return <span>{value || ''}</span>;
      }
    },
    join_at: {
      render: (value) => {
        return <span>{value || ''}</span>;
      }
    }
  };
  const columns = columnNames.reduce((columnList, value) => {
    const column = {
      title: value,
      dataIndex: value,
      key: value,
      ...columnConfigs[value]
    };
    return columnList.concat(column);
  }, []);
  const tableProps = {
    rowKey: 'staff_code',
    dataSource: projectDetail && projectDetail.members ? projectDetail.members : [],
    pagination: false,
    columns,
    loading
  };

  return (
    <React.Fragment>
      <Row>
        <Row>
          <Typography.Title level={4}>Project information</Typography.Title>
          <Typography.Paragraph>{`Customer: ${
            projectDetail && projectDetail.customer_name ? projectDetail.customer_name : ''
          }`}</Typography.Paragraph>
          <Typography.Paragraph>{`Members: ${
            projectDetail && projectDetail.total_member ? projectDetail.total_member : 0
          }`}</Typography.Paragraph>
          <Typography.Paragraph>{`Start day: ${
            projectDetail && projectDetail.start_date ? projectDetail.start_date : ''
          }`}</Typography.Paragraph>
          <Typography.Paragraph>{`End day: ${
            projectDetail && projectDetail.end_date ? projectDetail.end_date : ''
          }`}</Typography.Paragraph>
        </Row>
        <Row>
          <Row>
            <Col span={12}>
              <Typography.Title level={4}>List current member joined project</Typography.Title>
            </Col>
            <Col span={12}>
              <Row type="flex" justify="end">
                <Tooltip placement="bottom" title="member diagram">
                  <Button type="primary" shape="circle" icon="line-chart" />
                </Tooltip>
              </Row>
            </Col>
          </Row>

          <Table {...tableProps} />
        </Row>
      </Row>
    </React.Fragment>
  );
};

ProjectDetail.propTypes = propTypes;
ProjectDetail.defaultProps = defaultProps;

export default ProjectDetail;
