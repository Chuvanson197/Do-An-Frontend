import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { css } from 'emotion';

const styles = {
  sider: css`
    width: 200px;
    margin-top: 64px;
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

const Sider = () => {
  const dispacth = useDispatch();
  const { selectedItem, selectedSubMenu, isCollapsed } = useSelector((state) => state.layout);

  const handleSelectSubMenu = (selectedKeys) => {
    dispacth(actions.selectSubMenu(selectedKeys));
  };

  return (
    <Layout.Sider className={styles.sider} trigger={null} collapsible collapsed={isCollapsed}>
      <Menu
        mode="inline"
        theme="dark"
        className={styles.menu}
        selectedKeys={selectedItem}
        openKeys={selectedSubMenu}
        onOpenChange={(selectedKeys) => handleSelectSubMenu(selectedKeys)}>
        <Menu.Item key="dashboard">
          <Link to="/">
            <Icon type="pie-chart" />
            <span>Dashboard</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="project">
          <Link to="/project/list">
            <Icon type="project" />
            <span>Project</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

export default Sider;
