import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import { css } from 'emotion';

import { actions as layoutActions } from '../modules/layout/store';
import { actions as projectActions } from '../modules/projectMemberHistory/store';

import Layout from '../modules/layout/components/Layout';

import HeaderTitle from '../components/Content/HeaderTitle';
import ProjectMemberHistory from '../modules/projectMemberHistory/components/ProjectMemberHistory';
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

const dummyData = [
  {
    id: 'member_001',
    staff_code: 'impl_S01',
    name: 'Nguyễn Xuân An',
    phonenumber: '0975352786',
    email: 'an.nguyen@impl.vn',
    time_in: 1568271275000,
    time_out: 1599893675000,
    status: 'working',
    effort: 1,
    position: 'Developer'
  },
  {
    id: 'member_002',
    staff_code: 'impl_S02',
    name: 'Nguyễn Xuân An',
    phonenumber: '0975352786',
    email: 'an.nguyen@impl.vn',
    time_in: 1568271275000,
    time_out: 1599893675000,
    status: 'out',
    effort: 1,
    position: 'Developer'
  },
  {
    id: 'member_003',
    staff_code: 'impl_S03',
    name: 'Nguyễn Xuân An',
    phonenumber: '0975352786',
    email: 'an.nguyen@impl.vn',
    time_in: 1568271275000,
    time_out: 1599893675000,
    status: 'busy',
    effort: 1,
    position: 'Developer'
  }
];

const ProjectMemberHistoryPage = ({ match, history }) => {
  const dispatch = useDispatch();
  const { projectMemberHistory } = useSelector((state) => state.projectMemberHistory);
  const { authenticated } = useSelector((state) => state.authentication);

  useEffect(() => {
    dispatch(layoutActions.selectItem(['project']));
    dispatch(projectActions.getProjectMemberHistory());
  }, [dispatch]);

  useEffect(() => {
    if (!authenticated) {
      // eslint-disable-next-line react/prop-types
      history.push('/login');
    }
  }, [authenticated, history]);

  const onBack = () => {
    // eslint-disable-next-line react/prop-types
    history.push(`/project/detail/${match.params.id}`);
  };

  return (
    <Layout>
      <Row>
        <Row>
          <HeaderTitle title="Project member history" />
        </Row>
        <Row>
          <ProjectMemberHistory projectMemberHistory={dummyData} />
        </Row>
        <Row className={styles.footer}>
          <Col span={12}>
            <BackButton onBack={() => onBack()} />
          </Col>
        </Row>
      </Row>
    </Layout>
  );
};

ProjectMemberHistoryPage.propTypes = propTypes;

export default ProjectMemberHistoryPage;
