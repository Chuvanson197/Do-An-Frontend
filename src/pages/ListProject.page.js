import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Tabs, Tag, Button } from 'antd';
import { css } from 'emotion';

import { actions as layoutActions } from '../modules/layout/store';
import { actions as projectActions } from '../modules/project/listProject/store';

import Layout from '../modules/layout/components/Layout';
import HeaderTitle from '../components/Content/HeaderTitle';
import ListProject from '../modules/project/listProject/components/ListProject';
import CreateProject from '../modules/project/createProject/components/CreateProject';

const propTypes = {
  history: PropTypes.shape({}).isRequired
};

const defaultProps = {};

const styles = {
  addCustomerButton: css`
    background: #49a32b !important;
    color: #fff !important;
    margin-bottom: 15px;
  `
};

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
  const { authenticated } = useSelector((state) => state.authentication);
  const { list } = useSelector((state) => state.projectList);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(layoutActions.selectItem(['project']));
    dispatch(projectActions.getProjects());
  }, [dispatch]);

  useEffect(() => {
    if (!authenticated) {
      history.push('/login');
    }
  }, [authenticated, history]);

  return (
    <Layout>
      <React.Fragment>
        <HeaderTitle title={<FormattedMessage id="projects.listProject.title" />} />
        <Button
          icon="folder-add"
          className={styles.addCustomerButton}
          onClick={() => setVisible(!visible)}>
          <FormattedMessage id="button.add" />
        </Button>
        <Row gutter={16}>
          <Col span={12}>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab={<Tag color="#108ee9">Running</Tag>} key="1">
                <ListProject listProject={list.filter((item) => item.status === 'running')} />
              </Tabs.TabPane>
              <Tabs.TabPane tab={<Tag color="#87d068">Completed</Tag>} key="3">
                <ListProject listProject={list.filter((item) => item.status === 'completed')} />
              </Tabs.TabPane>
              <Tabs.TabPane tab={<Tag color="#f5222D">Stopped</Tag>} key="2">
                <ListProject listProject={list.filter((item) => item.status === 'stopped')} />
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
