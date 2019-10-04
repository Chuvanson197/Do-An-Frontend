import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Icon } from 'antd';
import { css } from 'emotion';

import { actions as layoutActions } from '../modules/layout/store';
import { actions as projectActions } from '../modules/projectDetails/store';

import Layout from '../modules/layout/components/Layout';

import HeaderTitle from '../components/Content/HeaderTitle';
import ProjectDetail from '../modules/projectDetails/components/ProjectDetail';
import BackButton from '../components/Button/BackButton';

const propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired
};

const styles = {
  footer: css`
    position: absolute !important;
    bottom: 0;
    left: 0;
    right: 0;
  `
};

const dummyData = {
  name: 'MUJI-ADMIN',
  customer_name: 'MUJI.jp',
  total_member: 5,
  start_date: 1568626107000,
  end_date: 1600248507000,
  members: [
    {
      staff_code: 'A123',
      name: 'Nguyen Van A',
      position: 'Developer',
      effort: '1',
      join_at: 1568626107000
    },
    {
      staff_code: 'A124',
      name: 'Nguyen Van A',
      position: 'Developer',
      effort: '2',
      join_at: 1568626107000
    },
    {
      staff_code: 'A125',
      name: 'Nguyen Van A',
      position: 'Developer',
      effort: '3',
      join_at: 1568626107000
    },
    {
      staff_code: 'A126',
      name: 'Nguyen Van A',
      position: 'Developer',
      effort: '4',
      join_at: 1568626107000
    },
    {
      staff_code: 'A127',
      name: 'Nguyen Van A',
      position: 'Developer',
      effort: '5',
      join_at: 1568626107000
    }
  ],
  service_detail: {
    home_page: 'https://homepage.abc.com.vn',
    details:
      'abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc',
    folder_link: 'https://driver.folder.com.vn',
    admin_page: 'https://admin.abc.com.vn'
  }
};

const ProjectDetailPage = ({ match, history }) => {
  const dispatch = useDispatch();
  const { projectDetail, loading } = useSelector((state) => state.projectDetail);
  const { authenticated } = useSelector((state) => state.authentication);

  useEffect(() => {
    dispatch(layoutActions.selectItem(['project']));
    dispatch(projectActions.getProjectDetail());
  }, [dispatch]);

  useEffect(() => {
    if (!authenticated) {
      // eslint-disable-next-line react/prop-types
      history.push('/login');
    }
  }, [authenticated, history]);

  const updateServiceDetail = (customOption) => {
    const detail = { ...dummyData };
    if (detail.custom_options) {
      detail.custom_options.push(customOption);
    } else {
      // eslint-disable-next-line dot-notation
      detail['custom_options'] = [customOption];
    }
    dispatch(projectActions.updateProjectDetail(detail));
  };

  const onBack = () => {
    // eslint-disable-next-line react/prop-types
    history.push('/project/list');
  };

  const toMemberHistory = () => {
    // eslint-disable-next-line react/prop-types
    history.push(`/project/memberHistory/${match.params.id}`);
  };

  return (
    <Layout>
      <Row>
        <Row>
          <HeaderTitle title="Project detail" />
        </Row>
        <Row>
          <ProjectDetail
            projectDetail={dummyData}
            loading={loading}
            updateServiceDetail={updateServiceDetail}
          />
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
