import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions } from '../modules/layout/store';

import Layout from '../modules/layout/components/Layout';

const propTypes = {
  selectItem: PropTypes.func.isRequired
};

class DashbroadPage extends Component {
  componentWillMount() {
    const { selectItem } = this.props;
    selectItem(['dashboard']);
  }

  render() {
    return <Layout>Dashboard</Layout>;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  selectItem: (selectedKeys) => dispatch(actions.selectItem(selectedKeys))
});

DashbroadPage.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashbroadPage);
