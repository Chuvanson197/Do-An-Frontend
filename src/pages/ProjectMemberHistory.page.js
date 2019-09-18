import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { css } from 'emotion';

import { history } from '../store';
import { actions } from '../modules/layout/store';

import Layout from '../modules/layout/components/Layout';

import HeaderTitle from '../components/Content/HeaderTitle';
import ProjectMemberHistory from '../modules/projectMemberHistory/components/ProjectMemberHistory';
import BackButton from '../components/Button/BackButton';

const propTypes = {
  match: PropTypes.shape({}).isRequired,
  selectItem: PropTypes.func.isRequired
};

const styles = {
  footer: css`
    position: absolute !important;
    bottom: 0;
    left: 0;
    right: 0;
  `,
  container: css`
    height: 100% !important;
  `
};

class ProjectMemberHistoryPage extends Component {
  componentWillMount() {
    const { selectItem } = this.props;
    selectItem(['project']);
  }

  onBack = () => {
    const { match } = this.props;
    // eslint-disable-next-line react/prop-types
    history.push(`/project/detail/${match.params.id}`);
  };

  render() {
    return (
      <Layout>
        <Row className={styles.container}>
          <Row>
            <HeaderTitle title="Project member history" />
          </Row>
          <Row>
            <ProjectMemberHistory />
          </Row>
          <Row className={styles.footer}>
            <Col span={12}>
              <BackButton onBack={() => this.onBack()} />
            </Col>
          </Row>
        </Row>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  selectItem: (selectedKeys) => dispatch(actions.selectItem(selectedKeys))
});

ProjectMemberHistoryPage.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectMemberHistoryPage);
