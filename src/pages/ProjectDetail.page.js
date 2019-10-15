import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Icon, Popconfirm } from 'antd';
import { css } from 'emotion';

import { actions as layoutActions } from '../modules/layout/store';
import { actions as projectActions } from '../modules/project/projectDetails/store';

import Layout from '../modules/layout/components/Layout';

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
  const { authenticated } = useSelector((state) => state.authentication);
  const { project, joinedMembers, removeProjectResult, removeProjectError, loading } = useSelector(
    (state) => state.projectDetail
  );

  useEffect(() => {
    dispatch(layoutActions.selectItem(['project']));
    // clean state
    // clean old joined members state
    dispatch(
      projectActions.cleanJoinedMember({
        list: [],
        total: 0
      })
    );
    // clean old project detail state
    dispatch(projectActions.cleanProjectDetail(null));
    // get project detail
    dispatch(
      projectActions.getProjectDetail({
        param: match.params.id,
        path: 'projects'
      })
    );
    // get joined members
    dispatch(
      projectActions.getMembers({
        param: match.params.id,
        path: 'projects/membersList'
      })
    );
  }, [dispatch, match.params.id]);

  // check authencation if not redirect to login page
  useEffect(() => {
    if (!authenticated) {
      history.push('/login');
    }
  }, [authenticated, history]);

  // show notification after remove project

  useEffect(() => {
    if (removeProjectResult) {
      const title = intl.formatMessage({ id: 'notification.success' });
      const message = intl.formatMessage({ id: removeProjectResult.message });
      SuccessNotification(title, message);

      dispatch(projectActions.cleanRemoveProjectResult(null));
      history.push('/project/list');
    } else if (removeProjectError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({ id: 'projects.removeProject.message.error' });
      ErrorNotification(title, message);
      dispatch(projectActions.cleanRemoveProjectError(false));
    }
  }, [dispatch, history, intl, removeProjectError, removeProjectResult]);

  // redirect functions
  const onBack = () => {
    history.push('/project/list');
  };

  const toMemberHistory = () => {
    history.push(`/project/memberHistory/${match.params.id}`);
  };

  return (
    <Layout>
      <Row>
        <Row>
          <HeaderTitle title={<FormattedMessage id="projects.detail.title" />} />
        </Row>
        <Row>
          <ProjectDetail
            project={project}
            joinedMembers={joinedMembers}
            loading={loading}
            match={match}
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
    </Layout>
  );
};

ProjectDetailPage.propTypes = propTypes;

export default injectIntl(ProjectDetailPage, {});
