import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Icon, Popconfirm } from 'antd';
import { css } from 'emotion';

import { actions as layoutActions } from '../modules/layout/store';
import { actions as projectActions } from '../modules/project/store';
import { actions as customerActions } from '../modules/customer/store';
import { actions as memberActions } from '../modules/member/store';
import HeaderTitle from '../components/Content/HeaderTitle';
import ProjectDetail from '../modules/project/projectDetails/components/ProjectDetail';
import BackButton from '../components/Button/BackButton';
import ErrorNotification from '../components/Notification/Error';
import SuccessNotification from '../components/Notification/Success';

const propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired
};

const styles = {
  footer: css`
    position: absolute !important;
    bottom: 0;
    left: 0;
    right: 0;
  `
};

const ProjectDetailPage = ({ match, history, intl }) => {
  const dispatch = useDispatch();
  const {
    project,
    joinedMembers,
    removeProjectResult,
    removeProjectError,
    removeProjectErrors,
    loading
  } = useSelector((state) => state.projects);

  const getProject = useCallback(() => {
    dispatch(
      projectActions.getProject({
        param: match.params.id,
        path: 'projects'
      })
    );
  }, [dispatch, match.params.id]);

  const getJoinedMembers = useCallback(() => {
    dispatch(
      projectActions.getJoinedMembers({
        param: match.params.id,
        path: 'projects/membersList'
      })
    );
  }, [dispatch, match.params.id]);

  const cleanError = useCallback(() => {
    dispatch(projectActions.cleanError(false));
  }, [dispatch]);

  const removeMember = useCallback(
    (data) => {
      dispatch(
        projectActions.removeMember({
          param: data.id,
          path: 'projects/membersList/remove'
        })
      );
    },
    [dispatch]
  );

  const getCustomers = useCallback(() => {
    dispatch(
      customerActions.getCustomers({
        path: 'customers'
      })
    );
  }, [dispatch]);

  const updateProject = useCallback(
    (body) => {
      dispatch(projectActions.updateProject({ body, path: 'projects', param: project.id }));
    },
    [dispatch, project]
  );

  const addMember = useCallback(
    (body) => {
      dispatch(projectActions.addMember({ body, path: 'projects/membersList' }));
    },
    [dispatch]
  );
  const getMembers = useCallback(() => {
    dispatch(
      memberActions.getMembers({
        path: 'members'
      })
    );
  }, [dispatch]);
  const updateMember = useCallback(
    (body, member) => {
      dispatch(
        projectActions.updateMember({
          body,
          path: 'projects/membersList',
          param: member.id
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(layoutActions.selectItem(['project']));
    // clean state
    // clean old joined members state
    dispatch(projectActions.getJoinedMembersCleanData());
    // clean old project detail state
    dispatch(projectActions.getProjectCleanData());
    // get project detail
    dispatch(
      projectActions.getProject({
        param: match.params.id,
        path: 'projects'
      })
    );
    // get joined members
    dispatch(
      projectActions.getJoinedMembers({
        param: match.params.id,
        path: 'projects/membersList'
      })
    );
  }, [dispatch, match.params.id]);

  // check authencation if not redirect to login page

  // show notification after remove project
  useEffect(() => {
    if (removeProjectResult) {
      const title = intl.formatMessage({ id: 'notification.success' });
      const message = intl.formatMessage({ id: removeProjectResult.message });
      SuccessNotification(title, message);

      dispatch(projectActions.removeProjectCleanData());
      history.push('/project/list');
    }
  }, [dispatch, history, intl, removeProjectResult]);

  useEffect(() => {
    if (removeProjectError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({
        id: removeProjectErrors.message
          ? removeProjectErrors.message
          : 'projects.removeProject.message.error'
      });
      ErrorNotification(title, message);
      dispatch(projectActions.removeProjectCleanError());
    }
  }, [dispatch, intl, removeProjectError, removeProjectErrors]);

  // redirect functions
  const onBack = () => {
    history.push('/project/list');
  };

  const toMemberHistory = () => {
    history.push(`/project/memberHistory/${match.params.id}`);
  };

  return (
    <Row>
      <Row>
        <HeaderTitle title={<FormattedMessage id="projects.detail.title" />} />
      </Row>
      <Row>
        <ProjectDetail
          getProject={getProject}
          getJoinedMembers={getJoinedMembers}
          cleanError={cleanError}
          removeMember={removeMember}
          getCustomers={getCustomers}
          updateProject={updateProject}
          project={project}
          joinedMembers={joinedMembers}
          loading={loading}
          match={match}
          addMember={addMember}
          getMembers={getMembers}
          updateMember={updateMember}
        />
      </Row>
      <Row className={styles.footer}>
        <Col span={12}>
          <BackButton onBack={() => onBack()} />
        </Col>
        <Col span={12}>
          <Row type="flex" justify="end">
            <Popconfirm
              title={<FormattedMessage id="projectDetail.removeProject.confirm.remove" />}
              onConfirm={
                () =>
                  dispatch(
                    projectActions.removeProject({
                      path: 'projects/remove',
                      param: match.params.id
                    })
                  )
                // eslint-disable-next-line react/jsx-curly-newline
              }
              okText={<FormattedMessage id="button.confirm.yes" />}
              cancelText={<FormattedMessage id="button.confirm.no" />}>
              <Button style={{ marginRight: 15 }} type="danger" disabled={loading}>
                <Icon type={loading ? 'loading' : 'delete'} />
                <FormattedMessage id="projectDetail.removeProject" />
              </Button>
            </Popconfirm>

            <Button type="primary" onClick={() => toMemberHistory()}>
              <Icon type="history" />
              <FormattedMessage id="projects.detail.memberHistory" />
            </Button>
          </Row>
        </Col>
      </Row>
    </Row>
  );
};

ProjectDetailPage.propTypes = propTypes;

export default injectIntl(ProjectDetailPage, {});
