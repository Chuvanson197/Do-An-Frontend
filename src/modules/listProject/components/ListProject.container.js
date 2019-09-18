import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ListProject from './ListProject';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ListProject)
);
