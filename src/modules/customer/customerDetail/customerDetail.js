import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
import {
  Table,
  Row,
  Typography,
  Button,
  Col,
  Descriptions,
  Divider,
  Skeleton,
  Tag
} from 'antd';

import WithRole from '../../../hocs/WithRole';
import { actions as customerActions } from '../store';
import UpdateCustomerDrawer from '../updateCustomer/components/UpdateCustomerDrawer';


const propTypes = {
  match: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired,

  project: PropTypes.shape({}),
  loading: PropTypes.bool,
};

const defaultProps = {
  loading: false,
  customer: null,
  joinedProjects: [],
};

const ButtonEditCustomer = ({ handleEditCustomerDrawer, customer }) => {
  return (
    <Button icon="edit" type="primary" disabled={!customer} onClick={handleEditCustomerDrawer}>
      <FormattedMessage id="button.update" />
    </Button>
  );
};

const CustomerDetail = ({
  customer,
  joinedProjects,
  loading,
  history,
  getCustomer
}) => {
  const dispatch = useDispatch();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const handleEditCustomerDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

    // Handle control open/close update customer drawer
  const handleControlDrawer = () => {
    setDrawerVisible(!drawerVisible);
    dispatch(customerActions.updateCustomerCleanError());
    dispatch(customerActions.updateCustomerCleanData());
  };

  const onSelectProject = (item) => {
    history.push(`/project/detail/${item.id}`);
  };

  const columns = [
    {
      title: <FormattedMessage id="projects.detail.name" />,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <FormattedMessage id="projects.detail.start_time" />,
      dataIndex: 'start_time',
      key: 'start_time',
      render: (date) => {
        return moment(date).format('DD/MM/YYYY')
      }
    },
    {
      title: <FormattedMessage id="projects.detail.end_time" />,
      dataIndex: 'end_time',
      key: 'end_time',
      render: (date) => {
        return moment(date).format('DD/MM/YYYY');
      }
    },
    {
      title: <FormattedMessage id="projects.detail.totalMember" />,
      dataIndex: 'project_member_detail.length',
      key: 'total',
    },
    {
      title: <FormattedMessage id="projects.detail.member.status" />,
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        switch (status) {
          case 'running':
            return (
              <Tag color="#108ee9">
                <FormattedMessage id="projects.status.running" />
              </Tag>
            );
          case 'completed':
            return (
              <Tag color="#87d068">
                <FormattedMessage id="projects.status.completed" />
              </Tag>
            );
          case 'stopped':
            return (
              <Tag color="#f5222D">
                <FormattedMessage id="projects.status.stopped" />
              </Tag>
            );
          default:
            return null;
        }
      }
    }
  ];

  return (
    <React.Fragment>
      <Row style={{ marginBottom: 75 }}>
        <Skeleton active loading={loading} paragraph={{ rows: 4 }}>
          <Row>
            <Col span={12}>
              <Descriptions title={customer && customer.name ? customer.name : ''} column={1}>
                <Descriptions.Item label={<FormattedMessage id="customerDetail.email" />}>
                  {customer ? customer.email : ''}
                </Descriptions.Item>
                <Descriptions.Item label={<FormattedMessage id="customerDetail.address" />}>
                  {customer ? customer.address : ''}
                </Descriptions.Item>
                <Descriptions.Item label={<FormattedMessage id="customerDetail.phoneNumber" />}>
                  {customer ? customer.phone_number : ''}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Skeleton>
        <Row>
          <WithRole
            type={['admin', 'manager']}
            component={ButtonEditCustomer}
            customer={customer}
            handleEditCustomerDrawer={handleEditCustomerDrawer}
          />
        </Row>

        <Divider />
        <Row>
          <Row>
            <Col span={12} style={{ display: 'flex' }}>
              <Typography.Title level={4}>
                <FormattedMessage id="customerDetail.currentProjects.title" />
              </Typography.Title>
            </Col>
          </Row>
          <Table
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={joinedProjects ? joinedProjects : []}
            loading={loading}
            onRow={(item) => ({
              onClick: () => onSelectProject(item)
            })}
          />
        </Row>
        {drawerVisible && (
        <UpdateCustomerDrawer
          drawerVisible={drawerVisible}
          onClose={() => handleControlDrawer()}
          customer={customer}
          getCustomer={getCustomer}
        />
      )}
      </Row>
    </React.Fragment>
  );
};

CustomerDetail.propTypes = propTypes;
CustomerDetail.defaultProps = defaultProps;

export default injectIntl(CustomerDetail, {});
