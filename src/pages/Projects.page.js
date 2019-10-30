import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Tabs, Tag, Button, Skeleton } from 'antd';
import { css } from 'emotion';

import { actions as layoutActions } from '../modules/layout/store';
import { actions as projectActions } from '../modules/project/store';
import { actions as customerActions } from '../modules/customer/store';

import Layout from '../modules/layout/components/Layout';
import HeaderTitle from '../components/Content/HeaderTitle';
import ProjectsList from '../modules/project/projects/components/ProjectsList';
import CreateProject from '../modules/project/createProject/components/CreateProject';
import ErrorNotification from '../components/Notification/Error';

const propTypes = {
  history: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired
};

const defaultProps = {};

const styles = {
  addCustomerButton: css`
    background: #49a32b !important;
    color: #fff !important;
    margin-bottom: 15px;
  `
};

const ProjectsPage = ({ history, intl }) => {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.authentication);
  const { list, loading, getProjectsError, getProjectsErrors } = useSelector(
    (state) => state.projects
  );
  const [visible, setVisible] = useState(false);

  // check authencation if not redirect to login page
  useEffect(() => {
    if (!authenticated) {
      history.push('/login');
    }
  }, [authenticated, history]);

  // get projects list
  useEffect(() => {
    dispatch(layoutActions.selectItem(['project']));
    dispatch(
      projectActions.getProjects({
        path: 'projects'
      })
    );
  }, [dispatch]);

  // show notification if get projects list failure
  useEffect(() => {
    if (getProjectsError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({
        id: getProjectsErrors.message
          ? getProjectsErrors.message
          : 'projects.getProjects.message.error'
      });
      ErrorNotification(title, message);
      dispatch(projectActions.getProjectsCleanError());
    }
  }, [dispatch, getProjectsError, getProjectsErrors, intl]);

  const handleControlModal = () => {
    setVisible(!visible);
    // clean modal state after close or open
    dispatch(projectActions.createProjectCleanData());
    dispatch(projectActions.createProjectCleanError());
  };

  const getProjects = useCallback(() => {
    dispatch(
      projectActions.getProjects({
        path: 'projects'
      })
    );
  }, [dispatch]);

  const getCustomers = useCallback(() => {
    dispatch(
      customerActions.getCustomers({
        path: 'customers'
      })
    );
  }, [dispatch]);

  const createProject = useCallback(
    (body) => {
      dispatch(projectActions.createProject({ body, path: 'projects' }));
    },
    [dispatch]
  );
  return (
    <Layout>
      <React.Fragment>
        <HeaderTitle title={<FormattedMessage id="projects.getProjects.title" />} />
        <Button
          icon="folder-add"
          className={styles.addCustomerButton}
          onClick={() => handleControlModal()}>
          <FormattedMessage id="button.add" />
        </Button>
        <Row gutter={16}>
          <Col span={12}>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane
                tab={
                  <Tag color="#108ee9">
                    <FormattedMessage id="projects.status.running" />
                  </Tag>
                }
                key="1">
                <Skeleton loading={loading} active paragraph={{ rows: 10 }}>
                  <ProjectsList list={list.filter((item) => item.status === 'running')} />
                </Skeleton>
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={
                  <Tag color="#87d068">
                    <FormattedMessage id="projects.status.completed" />
                  </Tag>
                }
                key="3">
                <Skeleton loading={loading} active paragraph={{ rows: 10 }}>
                  <ProjectsList list={list.filter((item) => item.status === 'completed')} />
                </Skeleton>
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={
                  <Tag color="#f5222D">
                    <FormattedMessage id="projects.status.stopped" />
                  </Tag>
                }
                key="2">
                <Skeleton loading={loading} active paragraph={{ rows: 10 }}>
                  <ProjectsList list={list.filter((item) => item.status === 'stopped')} />
                </Skeleton>
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
        {visible && (
          <CreateProject
            visible={visible}
            close={() => handleControlModal()}
            getProjects={getProjects}
            createProject={createProject}
            getCustomers={getCustomers}
          />
        )}
      </React.Fragment>
    </Layout>
  );
};

ProjectsPage.propTypes = propTypes;

ProjectsPage.defaultProps = defaultProps;

export default injectIntl(ProjectsPage, {});
