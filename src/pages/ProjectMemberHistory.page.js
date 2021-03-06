import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { css } from 'emotion';

import { Row, Col } from 'antd';

import { actions as layoutActions } from '../modules/layout/store';
import { actions as projectActions } from '../modules/project/store';
import HeaderTitle from '../components/Content/HeaderTitle';
import ProjectMemberHistory from '../modules/project/projectMemberHistory/components/ProjectMemberHistory';
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

const ProjectMemberHistoryPage = ({ match, history }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layoutActions.selectItem(['project']));
  }, [dispatch]);

  const getMemberHistory = useCallback(
    (body) => {
      dispatch(
        projectActions.getMemberHistory({
          body,
          path: 'projects/membersList',
          param: match.params.id
        })
      );
    },
    [dispatch, match.params.id]
  );

  const onBack = () => {
    history.push(`/project/detail/${match.params.id}`);
  };

  return (
    <Row>
      <Row>
        <HeaderTitle title={<FormattedMessage id="projects.memberHistory.title" />} />
      </Row>
      <Row>
        <ProjectMemberHistory match={match} getMemberHistory={getMemberHistory} />
      </Row>
      <Row className={styles.footer}>
        <Col span={12}>
          <BackButton onBack={() => onBack()} />
        </Col>
      </Row>
    </Row>
  );
};

ProjectMemberHistoryPage.propTypes = propTypes;

export default ProjectMemberHistoryPage;
