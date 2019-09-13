import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { actions } from '../store';
import Example from './Example';

const mapStateToProps = (state) => ({
  repos: state.example.repos,
  loading: state.example.loading
});

const mapDispatchToProps = (dispatch) => ({
  getRepos: (username) => dispatch(actions.getRepos(username))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Example)
);
