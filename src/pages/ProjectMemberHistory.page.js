import React from 'react';
import { Row } from 'antd';

import Layout from '../modules/layout/components/Layout';

import HeaderTitle from '../components/Content/HeaderTitle';
import ProjectMemberHistory from '../modules/projectMemberHistory/components/ProjectMemberHistory';

const ProjectMemberHistoryPage = () => (
  <Layout>
    <React.Fragment>
      <Row>
        <HeaderTitle title="Project member history" />
      </Row>
    </React.Fragment>
    <Row>
      <ProjectMemberHistory />
    </Row>
  </Layout>
);

export default ProjectMemberHistoryPage;
