import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Tabs, Tag, Tooltip, Button } from 'antd';

import { actions as layoutActions } from '../modules/layout/store';
import { actions as projectActions } from '../modules/listProject/store';

import Layout from '../modules/layout/components/Layout';
import HeaderTitle from '../components/Content/HeaderTitle';
import ListProject from '../modules/listProject/components/ListProject';
import CreateProject from '../modules/createProject/components/CreateProject';

const ListProjectPage = () => {
  const dispatch = useDispatch();
  const { projectList } = useSelector((state) => state.projectList);
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    dispatch(layoutActions.selectItem(['project']));
    dispatch(projectActions.getProjectList());
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
                  listProject={projectList.filter((item) => item.status === 'running')}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab={<Tag color="#87d068">Completed</Tag>} key="3">
                <ListProject
                  listProject={projectList.filter((item) => item.status === 'completed')}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab={<Tag color="#f5222D">Stopped</Tag>} key="2">
                <ListProject
                  listProject={projectList.filter((item) => item.status === 'stopped')}
                />
              </Tabs.TabPane>
            </Tabs>
          </Col>
          <Col span={12}>
            <Tooltip placement="bottom" title="Create Project">
              <Button
                type="primary"
                shape="circle"
                icon="plus"
                onClick={() => setVisible(!visible)}
              />
            </Tooltip>
          </Col>
        </Row>
        <CreateProject visible={visible} close={() => setVisible(!visible)} />
      </React.Fragment>
    </Layout>
  );
};

export default ListProjectPage;
