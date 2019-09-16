import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { actions } from '../store';
import Sider from './Sider';

const mapStateToProps = (state) => ({
  selectedItem: state.layout.sider.selectedItem,
  selectedSubMenu: state.layout.sider.selectedSubMenu,
  isCollapsed: state.layout.sider.isCollapsed
});

const mapDispatchToProps = (dispatch) => ({
  selectItem: (selectedKeys) => dispatch(actions.selectItem(selectedKeys)),
  selectSubMenu: (selectedKey) => dispatch(actions.selectSubMenu(selectedKey))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Sider)
);
