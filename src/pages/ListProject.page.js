import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

import { actions } from '../modules/layout/store';

import Layout from '../modules/layout/components/Layout';

import HeaderTitle from '../components/Content/HeaderTitle';
import ListProject from '../modules/listProject/components/ListProject.container';

const propTypes = {
  selectItem: PropTypes.func.isRequired
};

class ListProjectPage extends Component {
  componentWillMount() {
    const { selectItem } = this.props;
    selectItem(['project']);
  }

  render() {
    return (
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
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  selectItem: (selectedKeys) => dispatch(actions.selectItem(selectedKeys))
});

ListProjectPage.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListProjectPage);
