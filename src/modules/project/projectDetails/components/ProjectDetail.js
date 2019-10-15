import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  Table,
  Row,
  Typography,
  Button,
  Col,
  Tooltip,
  Descriptions,
  Divider,
  Popconfirm,
  Skeleton
} from 'antd';

import MemberDiagram from '../../../member/memberDiagram/MemberDiagram';
import MemberAdd from '../../../member/memberAdd/components/MemberAdd';
import ErrorNotification from '../../../../components/Notification/Error';
import SuccessNotification from '../../../../components/Notification/Success';

import { actions as memberAddActions } from '../../../member/memberAdd/store';
import { actions as projectActions } from '../store';

const propTypes = {
  match: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired,

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

const ProjectDetail = ({ project, joinedMembers, loading, match, intl }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const {
    removeMemberError,
    getProjectDetailError,
    getMembersError,
    removeMemberResult
  } = useSelector((state) => state.projectDetail);

  // show notification error when get project detail failure
  useEffect(() => {
    if (getProjectDetailError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({ id: 'projectDetail.getDetail.message.error' });
      ErrorNotification(title, message);
      dispatch(projectActions.cleanProjectDetailError(false));
    }
  }, [dispatch, getProjectDetailError, intl]);

  // show notification error when get project members failure
  useEffect(() => {
    if (getMembersError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({ id: 'projectDetail.getMembers.message.error' });
      ErrorNotification(title, message);
      dispatch(projectActions.cleanGetMembersError(false));
    }
  }, [dispatch, getMembersError, intl]);

  // handle showing notification when remove member from project
  useEffect(() => {
    // show notification
    if (removeMemberResult) {
      const title = intl.formatMessage({ id: 'notification.success' });
      const message = intl.formatMessage({ id: removeMemberResult.message });
      SuccessNotification(title, message);
      // re-call api request and clean error state
      dispatch(
        projectActions.getProjectDetail({
          param: match.params.id,
          path: 'projects'
        })
      );
      dispatch(
        projectActions.getMembers({
          param: match.params.id,
          path: 'projects/membersList'
        })
      );
      dispatch(projectActions.cleanRemoveMemberResult(null));
    } else if (removeMemberError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({ id: 'projects.removeMemberFromProject.message.error' });
      ErrorNotification(title, message);
      dispatch(projectActions.cleanError(false));
    }
  }, [dispatch, intl, removeMemberError, match.params.id, removeMemberResult]);

  const handleConfirmDelete = (data) => {
    dispatch(
      projectActions.removeMember({
        param: data.id,
        path: 'projects/membersList/remove'
      })
    );
  };

  const columns = [
    {
      title: <FormattedMessage id="projects.detail.member.staff_code" />,
      dataIndex: 'member_detail',
      key: 'staff_code',
      render: (memberDetail) => {
        return memberDetail.staff_code;
      }
    },
    {
      title: <FormattedMessage id="projects.detail.member.name" />,
      dataIndex: 'member_detail',
      key: 'name',
      render: (memberDetail) => {
        return memberDetail.full_name;
      }
    },
    {
      title: <FormattedMessage id="projects.detail.member.status" />,
      dataIndex: 'member_status',
      key: 'member_status',
      render: (status) => {
        return <FormattedMessage id={`projects.addMember.status.${status}`} />;
      }
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
      dataIndex: 'join_at',
      key: 'join_at',
      render: (date) => {
        return moment(date).format('DD/MM/YYYY');
      }
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      align: 'right',
      render: (record) => (
        <React.Fragment>
          <Tooltip placement="top" title={<FormattedMessage id="button.tooltip.removeMember" />}>
            <Popconfirm
              title={<FormattedMessage id="projectDetail.removeMember.confirm.delete" />}
              onConfirm={() => handleConfirmDelete(record)}
              okText={<FormattedMessage id="button.confirm.yes" />}
              cancelText={<FormattedMessage id="button.confirm.no" />}>
              <Button
                shape="circle"
                icon="minus-circle"
                type="danger"
                style={{ margin: '0px 5px' }}
              />
            </Popconfirm>
          </Tooltip>
          <Tooltip placement="top" title={<FormattedMessage id="button.tooltip.editMember" />}>
            <Button shape="circle" icon="edit" type="primary" style={{ margin: '0px 5px' }} />
          </Tooltip>
        </React.Fragment>
      )
    }
  ];

  const handleControlModal = () => {
    setOpenAddModal(!openAddModal);
    dispatch(memberAddActions.cleanResult(null));
    dispatch(memberAddActions.cleanError(false));
  };

  return (
    <React.Fragment>
      <Row style={{ marginBottom: 75 }}>
        <Skeleton active loading={loading}>
          <Descriptions title={project && project.name ? project.name : ''} column={1}>
            <Descriptions.Item label={<FormattedMessage id="projects.detail.customer" />}>
              {project && project.customer ? project.customer.name : ''}
            </Descriptions.Item>
            <Descriptions.Item label={<FormattedMessage id="projects.detail.totalMember" />}>
              {joinedMembers && joinedMembers.total ? joinedMembers.total : ''}
            </Descriptions.Item>
            <Descriptions.Item label={<FormattedMessage id="projects.detail.start_time" />}>
              {project && project.start_time
                ? moment(parseInt(project.start_time, 10)).format('DD/MM/YYYY')
                : ''}
            </Descriptions.Item>
            <Descriptions.Item label={<FormattedMessage id="projects.detail.end_time" />}>
              {project && project.end_time
                ? moment(parseInt(project.end_time, 10)).format('DD/MM/YYYY')
                : ''}
            </Descriptions.Item>
          </Descriptions>
        </Skeleton>

        <Divider />
        <Row>
          <Row>
            <Col span={12} style={{ display: 'flex' }}>
              <Typography.Title level={4}>
                <FormattedMessage id="projects.detail.currentMember" />
              </Typography.Title>
              <Tooltip
                placement="bottom"
                title={<FormattedMessage id="button.tooltip.addMember" />}>
                <Button
                  style={{ marginLeft: 10 }}
                  type="primary"
                  shape="circle"
                  icon="usergroup-add"
                  onClick={() => handleControlModal(!openAddModal)}
                />
              </Tooltip>
            </Col>
            <Col span={12}>
              <Row type="flex" justify="end">
                <Tooltip
                  placement="bottom"
                  title={<FormattedMessage id="button.tooltip.memberDiagram" />}>
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
          close={() => handleControlModal(!openAddModal)}
          match={match}
        />
      )}
    </React.Fragment>
  );
};

ProjectDetail.propTypes = propTypes;
ProjectDetail.defaultProps = defaultProps;

export default injectIntl(ProjectDetail, {});
