import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Icon } from 'antd';
import { css } from 'emotion';
import { history } from '../store';

import Layout from '../modules/layout/components/Layout';

import HeaderTitle from '../components/Content/HeaderTitle';
import ProjectDetail from '../modules/projectDetails/components/ProjectDetail.container';
import BackButton from '../components/Button/BackButton';

const propTypes = {
  match: PropTypes.shape({}).isRequired
};

const styles = {
  footer: css`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  `,
  container: css`
    height: 100%;
  `
};

const ProjectDetailPage = ({ match }) => {
  const onBack = () => {
    history.push('/project/list');
  };

  const toMemberHistory = () => {
    // eslint-disable-next-line react/prop-types
    history.push(`/project/memberHistory/${match.params.id}`);
  };

  return (
    <Layout>
      <Row className={styles.container}>
        <Row>
          <HeaderTitle title="Project detail" />
        </Row>
        <Row>
          <ProjectDetail />
        </Row>
        <Row className={styles.footer}>
          <Col span={12}>
            <BackButton onBack={() => onBack()} />
          </Col>
          <Col span={12}>
            <Row type="flex" justify="end">
              <Button type="primary" onClick={() => toMemberHistory()}>
                <Icon type="history" />
                Member History
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
