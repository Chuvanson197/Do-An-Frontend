import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import { css } from 'emotion';

import { history } from '../store';
import { actions } from '../modules/layout/store';

import Layout from '../modules/layout/components/Layout';

import HeaderTitle from '../components/Content/HeaderTitle';
import ProjectMemberHistory from '../modules/projectMemberHistory/components/ProjectMemberHistory';
import BackButton from '../components/Button/BackButton';

const propTypes = {
  match: PropTypes.shape({}).isRequired
};

const styles = {
  footer: css`
    position: absolute !important;
    bottom: 0;
    left: 0;
    right: 0;
  `,
  container: css`
    height: 100% !important;
  `
};

const ProjectMemberHistoryPage = ({ match }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.selectItem(['project']));
  }, [dispatch]);

  const onBack = () => {
    // eslint-disable-next-line react/prop-types
    history.push(`/project/detail/${match.params.id}`);
  };

  return (
    <Layout>
      <Row className={styles.container}>
        <Row>
          <HeaderTitle title="Project member history" />
        </Row>
        <Row>
          <ProjectMemberHistory />
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
