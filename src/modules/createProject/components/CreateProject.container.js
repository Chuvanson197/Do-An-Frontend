import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { actions } from '../store';
import CreateProject from './CreateProject';

const mapStateToProps = (state) => ({
  projectname: state.createproject.projectname,
  customer: state.createproject.customer,
  mentor: state.createproject.mentor
});

const mapDispatchToProps = (dispatch) => ({
  addProject: () => dispatch(actions.addProject())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateProject)
);
