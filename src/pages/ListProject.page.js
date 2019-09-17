import React from 'react';
import { Row, Col } from 'antd';

import Layout from '../modules/layout/components/Layout';

import HeaderTitle from '../components/Content/HeaderTitle';
import ListProject from '../modules/listProject/components/ListProject';

const ListProjectPage = () => (
  <Layout>
    <React.Fragment>
      <Row>
        <HeaderTitle title="List of projects" />
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <ListProject />
        </Col>
        <Col span={12}></Col>
      </Row>
    </React.Fragment>
  </Layout>
);

export default ListProjectPage;
