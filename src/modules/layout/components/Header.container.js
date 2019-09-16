import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { actions } from '../store';
import Header from './Header';

const mapStateToProps = (state) => ({
  isCollapsed: state.layout.sider.isCollapsed
});

const mapDispatchToProps = (dispatch) => ({
  handleSetCollapse: () => dispatch(actions.setCollapse())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
