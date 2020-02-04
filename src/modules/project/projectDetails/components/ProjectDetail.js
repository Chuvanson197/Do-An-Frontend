import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
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

import { actions as projectActions } from '../../store';

import MemberDiagram from '../../../member/memberDiagram/MemberDiagram';
import AddMemberModal from '../../addMember/components/AddMemberModal';
import ErrorNotification from '../../../../components/Notification/Error';
import SuccessNotification from '../../../../components/Notification/Success';
import UpdateProjectDrawer from '../../updateProject/components/UpdateProjectDrawer';
import UpdateMemberDrawer from '../../updateMember/components/UpdateMemberDrawer';
import WithRole from '../../../../hocs/WithRole';

const propTypes = {
  match: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired,

  project: PropTypes.shape({}),
  joinedMembers: PropTypes.shape({}),
  loading: PropTypes.bool,

  getProject: PropTypes.func.isRequired,
  getJoinedMembers: PropTypes.func.isRequired,
  getMembers: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
  addMember: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  getCustomers: PropTypes.func.isRequired,
  updateMember: PropTypes.func.isRequired
};

const defaultProps = {
  loading: false,
  project: null,
  joinedMembers: {
    list: [],
    total: 0
  }
};

const ButtonEditProject = ({ handleEditProjectDrawer, project }) => {
  return (
    <Button icon="edit" type="primary" disabled={!project} onClick={handleEditProjectDrawer}>
      <FormattedMessage id="button.update" />
    </Button>
  );
};

const ButtonEditMember = ({ handleControlMemberDrawer, record }) => {
  return (
    <Button
      shape="circle"
      icon="edit"
      type="primary"
      style={{ margin: '0px 5px' }}
      // eslint-disable-next-line no-use-before-define
      onClick={() => handleControlMemberDrawer(record)}
    />
  );
};

const ButtonDeleteMember = ({ handleConfirmDelete, record }) => {
  return (
    <Popconfirm
      title={<FormattedMessage id="projectDetail.removeMember.confirm.delete" />}
      onConfirm={() => handleConfirmDelete(record)}
      okText={<FormattedMessage id="button.confirm.yes" />}
      cancelText={<FormattedMessage id="button.confirm.no" />}>
      <Button shape="circle" icon="minus-circle" type="danger" style={{ margin: '0px 5px' }} />
    </Popconfirm>
  );
};

const ButtonAddMember = ({ handleAddMemberModal }) => {
  return (
    <Button
      style={{ marginLeft: 10 }}
      type="primary"
      shape="circle"
      icon="usergroup-add"
      onClick={handleAddMemberModal}
    />
  );
};

const ProjectDetail = ({
  project,
  joinedMembers,
  loading,
  match,
  intl,
  getProject,
  getJoinedMembers,
  removeMember,
  getCustomers,
  updateProject,
  addMember,
  updateMember,
  getMembers
}) => {
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
      dispatch(projectActions.getJoinedMembersCleanError());
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
      getProject && getProject();
      getJoinedMembers && getJoinedMembers();
      dispatch(projectActions.removeMemberCleanData());
    }
  }, [dispatch, getProject, getJoinedMembers, intl, removeMemberResult]);

  useEffect(() => {
    if (removeMemberError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({
        id: removeMemberErrors.message
          ? removeMemberErrors.message
          : 'projects.removeMemberFromProject.message.error'
      });
      ErrorNotification(title, message);
      dispatch(projectActions.cleanError(false));
    }
  }, [dispatch, intl, removeMemberError, removeMemberErrors]);

  const handleConfirmDelete = (data) => {
    removeMember && removeMember(data);
  };

  const handleEditProjectDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  // Handle control open/close update member in project drawer
  const handleControlMemberDrawer = (member) => {
    if (member) {
      selectMember(member);
    } else {
      selectMember(null);
    }
    setMemberDrawerVisible(!memberDrawerVisible);
  };

  const handleAddMemberModal = () => {
    setOpenAddModal(!openAddModal);
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
      key: 'role',
      render: (role) => <FormattedMessage id={`projects.addMember.role.${role}`} />
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
            <WithRole
              type={['admin', 'manager']}
              component={ButtonDeleteMember}
              record={record}
              handleConfirmDelete={handleConfirmDelete}
            />
          </Tooltip>
          <Tooltip placement="top" title={<FormattedMessage id="button.tooltip.editMember" />}>
            <WithRole
              type={['admin', 'manager']}
              component={ButtonEditMember}
              record={record}
              handleControlMemberDrawer={handleControlMemberDrawer}
            />
          </Tooltip>
        </React.Fragment>
      )
    }
  ];

  return (
    <React.Fragment>
      <Row style={{ marginBottom: 75 }}>
        <Skeleton active loading={loading} paragraph={{ rows: 4 }}>
          <Row>
            <Col span={12}>
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
            </Col>
            <Col span={12}>
              <Typography.Text
                style={{
                  fontWeight: 'normal',
                  display: 'block',
                  marginBottom: '20px',
                  fontSize: '16px'
                }}>
                <FormattedMessage id="projects.createProject.descriptions" />
              </Typography.Text>
              <Descriptions column={1}>
                {project
                  ? project.customField.map((obj) => (
                      <Descriptions.Item key={obj.idInfoCustomField} label={obj.name}>
                        {obj && obj.value ? obj.value : ''}
                      </Descriptions.Item>
                    ))
                  : null}
              </Descriptions>
            </Col>
          </Row>
        </Skeleton>

        <Row>
          <WithRole
            type={['admin', 'manager']}
            component={ButtonEditProject}
            project={project}
            handleEditProjectDrawer={handleEditProjectDrawer}
          />
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
                <WithRole
                  type={['manager', 'admin']}
                  component={ButtonAddMember}
                  handleAddMemberModal={handleAddMemberModal}
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
            getProject={getProject}
            getJoinedMembers={getJoinedMembers}
            updateMember={updateMember}
          />
        )}
        {drawerVisible && (
          <UpdateProjectDrawer
            drawerVisible={drawerVisible}
            onClose={() => setDrawerVisible(!drawerVisible)}
            project={project}
            getCustomers={getCustomers}
            updateProject={updateProject}
            getProject={getProject}
          />
        )}
      </Row>
      <MemberDiagram
        joinedMembers={joinedMembers}
        visible={visible}
        close={() => setVisible(!visible)}
      />
      {openAddModal && (
        <AddMemberModal
          getMembers={getMembers}
          getJoinedMembers={getJoinedMembers}
          getProject={getProject}
          joinedMembers={joinedMembers.list}
          visible={openAddModal}
          close={() => setOpenAddModal(!openAddModal)}
          match={match}
          addMember={addMember}
        />
      )}
    </React.Fragment>
  );
};

ProjectDetail.propTypes = propTypes;
ProjectDetail.defaultProps = defaultProps;

export default injectIntl(ProjectDetail, {});
