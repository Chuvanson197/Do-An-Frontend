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
  Skeleton,
  Tag
} from 'antd';

import MemberDiagram from '../../../member/memberDiagram/MemberDiagram';
import AddMemberModal from '../../addMember/components/AddMemberModal';
import ErrorNotification from '../../../../components/Notification/Error';
import SuccessNotification from '../../../../components/Notification/Success';
import UpdateProjectDrawer from '../../updateProject/components/UpdateProjectDrawer';
import UpdateMemberDrawer from '../../updateMember/components/UpdateMemberDrawer';

import { actions as projectActions } from '../../store';

const propTypes = {
  match: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired,

  project: PropTypes.shape({}),
  joinedMembers: PropTypes.shape({}),
  loading: PropTypes.bool
};

const defaultProps = {
  loading: false,
  project: null,
  joinedMembers: {
    list: [],
    total: 0
  }
};

const ProjectDetail = ({ project, joinedMembers, loading, match, intl }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [memberDrawerVisible, setMemberDrawerVisible] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedMember, selectMember] = useState(null);
  const {
    removeMemberError,
    removeMemberErrors,
    getProjectError,
    getProjectErrors,
    getJoinedMembersError,
    getJoinedMembersErrors,
    removeMemberResult
  } = useSelector((state) => state.projects);

  // show notification error when get project detail failure
  useEffect(() => {
    if (getProjectError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({
        id: getProjectErrors.message
          ? getProjectErrors.message
          : 'projectDetail.getDetail.message.error'
      });
      ErrorNotification(title, message);
      dispatch(projectActions.getProjectCleanError());
    }
  }, [dispatch, getProjectError, getProjectErrors, intl]);

  // show notification error when get project members failure
  useEffect(() => {
    if (getJoinedMembersError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({
        id: getJoinedMembersErrors.message
          ? getJoinedMembersErrors.message
          : 'projectDetail.getMembers.message.error'
      });
      ErrorNotification(title, message);
      dispatch(projectActions.removeProjectCleanError());
    }
  }, [dispatch, getJoinedMembersError, getJoinedMembersErrors, intl]);

  // handle showing notification when remove member from project
  useEffect(() => {
    // show notification
    if (removeMemberResult) {
      const title = intl.formatMessage({ id: 'notification.success' });
      const message = intl.formatMessage({ id: removeMemberResult.message });
      SuccessNotification(title, message);
      // re-call api request and clean error state
      dispatch(
        projectActions.getProject({
          param: match.params.id,
          path: 'projects'
        })
      );
      dispatch(
        projectActions.getJoinedMembers({
          param: match.params.id,
          path: 'projects/membersList'
        })
      );
      dispatch(projectActions.removeProjectCleanData());
    } else if (removeMemberError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({
        id: removeMemberErrors.message
          ? removeMemberErrors.message
          : 'projects.removeMemberFromProject.message.error'
      });
      ErrorNotification(title, message);
      dispatch(projectActions.cleanError(false));
    }
  }, [dispatch, intl, removeMemberError, removeMemberErrors, match.params.id, removeMemberResult]);

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
            <Button
              shape="circle"
              icon="edit"
              type="primary"
              style={{ margin: '0px 5px' }}
              // eslint-disable-next-line no-use-before-define
              onClick={() => handleControlMemberDrawer(record)}
            />
          </Tooltip>
        </React.Fragment>
      )
    }
  ];

  // Handle control open/close add member modal
  const handleControlModal = () => {
    setOpenAddModal(!openAddModal);
    dispatch(projectActions.addMemberCleanError());
    dispatch(projectActions.addMemberCleanData());
  };

  // Handle control open/close update project drawer
  const handleControlDrawer = () => {
    setDrawerVisible(!drawerVisible);
    dispatch(projectActions.updateProjectCleanError());
    dispatch(projectActions.updateProjectCleanData());
  };

  // Handle control open/close update member in project drawer
  const handleControlMemberDrawer = (member) => {
    if (member) {
      selectMember(member);
    } else {
      selectMember(null);
    }
    setMemberDrawerVisible(!memberDrawerVisible);
    dispatch(projectActions.updateMemberCleanError());
    dispatch(projectActions.updateMemberCleanData(false));
  };

  return (
    <React.Fragment>
      <Row style={{ marginBottom: 75 }}>
        <Skeleton active loading={loading} paragraph={{ rows: 4 }}>
          <Descriptions title={project && project.name ? project.name : ''} column={1}>
            <Descriptions.Item label={<FormattedMessage id="projects.detail.customer" />}>
              {project && project.customer ? project.customer.name : ''}
            </Descriptions.Item>
            <Descriptions.Item label={<FormattedMessage id="projects.detail.totalMember" />}>
              {joinedMembers && joinedMembers.total ? joinedMembers.total : 0}
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

        <Row>
          <Button
            icon="edit"
            type="primary"
            disabled={!project}
            onClick={() => handleControlDrawer()}>
            <FormattedMessage id="button.update" />
          </Button>
        </Row>

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
                  onClick={() => handleControlModal()}
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
        {memberDrawerVisible && (
          <UpdateMemberDrawer
            drawerVisible={memberDrawerVisible}
            onClose={() => handleControlMemberDrawer()}
            member={selectedMember}
            match={match}
          />
        )}
        {drawerVisible && (
          <UpdateProjectDrawer
            drawerVisible={drawerVisible}
            onClose={() => handleControlDrawer()}
            project={project}
          />
        )}
      </Row>
      <MemberDiagram visible={visible} close={() => setVisible(!visible)} />
      {openAddModal && (
        <AddMemberModal
          joinedMembers={joinedMembers.list}
          visible={openAddModal}
          close={() => handleControlModal()}
          match={match}
        />
      )}
    </React.Fragment>
  );
};

ProjectDetail.propTypes = propTypes;
ProjectDetail.defaultProps = defaultProps;

export default injectIntl(ProjectDetail, {});
