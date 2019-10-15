import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Icon } from 'antd';
import { css } from 'emotion';

import { actions as layoutActions } from '../modules/layout/store';
import { actions as projectActions } from '../modules/project/projectDetails/store';

import Layout from '../modules/layout/components/Layout';

import HeaderTitle from '../components/Content/HeaderTitle';
import ProjectDetail from '../modules/project/projectDetails/components/ProjectDetail';
import BackButton from '../components/Button/BackButton';

const propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired
};

const styles = {
  footer: css`
    position: absolute !important;
    bottom: 0;
    left: 0;
    right: 0;
  `
};

const ProjectDetailPage = ({ match, history }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.projectDetail);
  const { authenticated } = useSelector((state) => state.authentication);
  const { project, joinedMembers } = useSelector((state) => state.projectDetail);

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

export default ProjectDetailPage;
