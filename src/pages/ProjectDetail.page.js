import React from 'react';
import { Row } from 'antd';

import Layout from '../modules/layout/components/Layout';

import HeaderTitle from '../components/Content/HeaderTitle';
import ProjectDetail from '../modules/projectDetails/components/ProjectDetail.container';

const ProjectDetailPage = () => (
  <Layout>
    <React.Fragment>
      <Row>
        <HeaderTitle title="Project detail" />
      </Row>
      <Row>
        <ProjectDetail />
      </Row>
    </React.Fragment>
  </Layout>
);

export default ProjectDetailPage;
