import { Table } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

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
      <div>
        <div display="flex">
          <h2>Ten Project</h2>
          <p>{`Khach hang: ${
            projectDetail && projectDetail.customer_name ? projectDetail.customer_name : ''
          }`}</p>
          <p>{`So thanh vien: ${
            projectDetail && projectDetail.total_member ? projectDetail.total_member : 0
          }`}</p>
          <p>{`Ngay bat dau: ${
            projectDetail && projectDetail.start_date ? projectDetail.start_date : ''
          }`}</p>
          <p>{`Ngay ket thuc: ${
            projectDetail && projectDetail.end_date ? projectDetail.end_date : ''
          }`}</p>
        </div>
        <div display="flex">
          <h2>Danh sach cac thanh vien trong du an</h2>
          <Table {...tableProps} />
        </div>
      </div>
    </React.Fragment>
  );
};

ProjectDetail.propTypes = propTypes;
ProjectDetail.defaultProps = defaultProps;

export default ProjectDetail;
