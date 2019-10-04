import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Tabs, Tag, Tooltip, Button } from 'antd';

import { actions as layoutActions } from '../modules/layout/store';
import { actions as projectActions } from '../modules/listProject/store';

import Layout from '../modules/layout/components/Layout';
import HeaderTitle from '../components/Content/HeaderTitle';
import ListProject from '../modules/listProject/components/ListProject';
import CreateProject from '../modules/createProject/components/CreateProject';

const propTypes = {
  history: PropTypes.shape({}).isRequired
};

const defaultProps = {};

const dummyData = [
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
];

const ListProjectPage = ({ history }) => {
  const dispatch = useDispatch();
  const { projectList } = useSelector((state) => state.projectList);
  const { authenticated } = useSelector((state) => state.authentication);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(layoutActions.selectItem(['project']));
    dispatch(projectActions.getProjectList());
  }, [dispatch]);

  useEffect(() => {
    if (!authenticated) {
      // eslint-disable-next-line react/prop-types
      history.push('/login');
    }
  }, [authenticated, history]);

  return (
    <Layout>
      <React.Fragment>
        <Row type="flex" justify="space-between">
          <Col>
            <HeaderTitle title="List of projects" />
          </Col>
          <Col>
            <Tooltip title="Create Project">
              <Button
                type="primary"
                shape="circle"
                icon="plus"
                onClick={() => setVisible(!visible)}
              />
            </Tooltip>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab={<Tag color="#108ee9">Running</Tag>} key="1">
                <ListProject listProject={dummyData.filter((item) => item.status === 'running')} />
              </Tabs.TabPane>
              <Tabs.TabPane tab={<Tag color="#87d068">Completed</Tag>} key="3">
                <ListProject
                  listProject={dummyData.filter((item) => item.status === 'completed')}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab={<Tag color="#f5222D">Stopped</Tag>} key="2">
                <ListProject listProject={dummyData.filter((item) => item.status === 'stopped')} />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
        {visible && <CreateProject visible={visible} close={() => setVisible(!visible)} />}
      </React.Fragment>
    </Layout>
  );
};

ListProjectPage.propTypes = propTypes;

ListProjectPage.defaultProps = defaultProps;

export default ListProjectPage;
