import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { actions } from '../store';
import ProjectDetail from './ProjectDetail';

const mapStateToProps = (state) => ({
  projectDetail: state.projectDetail.projectDetail,
  loading: state.projectDetail.loading
});

const mapDispatchToProps = (dispatch) => ({
  getProjectDetail: (body) => dispatch(actions.getProjectDetail(body))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectDetail)
);
