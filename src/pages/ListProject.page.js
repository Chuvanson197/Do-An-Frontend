import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Row, Col, Tabs, Tag } from 'antd';

import { actions } from '../modules/layout/store';

import Layout from '../modules/layout/components/Layout';

import HeaderTitle from '../components/Content/HeaderTitle';
import ListProject from '../modules/listProject/components/ListProject.container';

const propTypes = {
  listProject: PropTypes.arrayOf(PropTypes.shape({}))
};

const defaultProps = {
  listProject: [
    {
      id: 1,
      name: 'MUJI-ADMIN',
      customer: 'MUJI.jp',
      start_time: 1568626107000,
      end_time: 1600248507000,
      status: 'running'
    },
    {
      id: 2,
      name: 'Project-Management',
      customer: 'Impl.vn',
      start_time: 1568626107000,
      end_time: 1600248507000,
      status: 'stopped'
    },
    {
      id: 3,
      name: 'Xaydung.co',
      customer: 'Tekmate.co',
      start_time: 1537256897000,
      end_time: 1563436097000,
      status: 'completed'
    },
    {
      id: 4,
      name: 'Epark',
      customer: 'EPARK.jp',
      start_time: 1568626107000,
      end_time: 1600248507000,
      status: 'running'
    }
  ]
};

const ListProjectPage = ({ listProject }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.selectItem(['project']));
  }, [dispatch]);

  return (
    <Layout>
      <React.Fragment>
        <Row>
          <HeaderTitle title="List of projects" />
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab={<Tag color="#108ee9">Running</Tag>} key="1">
                <ListProject
                  listProject={listProject.filter((item) => item.status === 'running')}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab={<Tag color="#87d068">Completed</Tag>} key="3">
                <ListProject
                  listProject={listProject.filter((item) => item.status === 'completed')}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab={<Tag color="#f5222D">Stopped</Tag>} key="2">
                <ListProject
                  listProject={listProject.filter((item) => item.status === 'stopped')}
                />
              </Tabs.TabPane>
            </Tabs>
          </Col>
          <Col span={12}></Col>
        </Row>
      </React.Fragment>
    </Layout>
  );
};

ListProjectPage.propTypes = propTypes;

ListProjectPage.defaultProps = defaultProps;

export default ListProjectPage;
