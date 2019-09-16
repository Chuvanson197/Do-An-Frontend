import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { css } from 'emotion';

const propTypes = {
  selectedItem: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectItem: PropTypes.func.isRequired,
  selectSubMenu: PropTypes.func.isRequired,

  selectedSubMenu: PropTypes.arrayOf(PropTypes.string),
  isCollapsed: PropTypes.bool
};

const defaultProps = {
  selectedSubMenu: [],
  isCollapsed: false
};

const styles = {
  sider: css`
    width: 200px;
    background-color: #fff;
  `,
  menu: css`
    height: 100%;
    border-right: 0;
  `,
  logo: css`
    height: 56px;
    background-color: transparent;
    margin: 4px;
  `
};

const Header = ({ selectedItem, selectedSubMenu, selectItem, selectSubMenu, isCollapsed }) => {
  const handleSelect = (item) => {
    selectItem && selectItem(item.selectedKeys);
  };

  const handleSelectSubMenu = (selectedKeys) => {
    selectSubMenu && selectSubMenu(selectedKeys);
  };

  return (
    <Layout.Sider className={styles.sider} trigger={null} collapsible collapsed={isCollapsed}>
      <Menu
        mode="inline"
        theme="dark"
        className={styles.menu}
        defaultSelectedKeys={selectedItem}
        defaultOpenKeys={selectedSubMenu}
        onSelect={(item) => handleSelect(item)}
        onOpenChange={(selectedKeys) => handleSelectSubMenu(selectedKeys)}>
        <div className={styles.logo}>
          <img
            src="https://static.wixstatic.com/media/60bb3f_974f57225e7243bab110fd17afb4f4f2~mv2.png/v1/fill/w_194,h_77,al_c,q_80,usm_0.66_1.00_0.01/1544942609.webp"
            alt=""
            style={{ height: '100%', width: '100%'}}
          />
        </div>
        <Menu.Item key="0">
          <Link to="/">
            <Icon type="pie-chart" />
            <span>Dashboard</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link to="/project/list">
            <Icon type="project" />
            <span>Project</span>
          </Link>
        </Menu.Item>
        <Menu.SubMenu
          key="sub1"
          title={
            <React.Fragment>
              <Icon type="file" />
              <span>Example</span>
            </React.Fragment>
          }>
          <Menu.Item key="sub1.1">
            <Link to="/example/redux-example">Redux example</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/projectDetail">Project Detail</Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Layout.Sider>
  );
};

Header.propTypes = propTypes;

Header.defaultProps = defaultProps;

export default Header;
