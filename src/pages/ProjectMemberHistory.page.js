import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { css } from 'emotion';

import { Row, Col } from 'antd';

import { actions as layoutActions } from '../modules/layout/store';

import Layout from '../modules/layout/components/Layout';

import HeaderTitle from '../components/Content/HeaderTitle';
import ProjectMemberHistory from '../modules/project/projectMemberHistory/components/ProjectMemberHistory';
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

const ProjectMemberHistoryPage = ({ match, history }) => {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.authentication);
  useEffect(() => {
    dispatch(layoutActions.selectItem(['project']));
  }, [dispatch]);

  useEffect(() => {
    if (!authenticated) {
      history.push('/login');
    }
  }, [authenticated, history]);

  const onBack = () => {
    history.push(`/project/detail/${match.params.id}`);
  };

  return (
    <Layout>
      <Row>
        <Row>
          <HeaderTitle title={<FormattedMessage id="projects.memberHistory.title" />} />
        </Row>
        <Row>
          <ProjectMemberHistory match={match} />
        </Row>
        <Row className={styles.footer}>
          <Col span={12}>
            <BackButton onBack={() => onBack()} />
          </Col>
        </Row>
      </Row>
    </Layout>
  );
};

ProjectMemberHistoryPage.propTypes = propTypes;

export default ProjectMemberHistoryPage;
