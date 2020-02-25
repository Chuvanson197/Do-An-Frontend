import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store';
import { Layout, Menu, Icon } from 'antd';
import { css } from 'emotion';
import { FormattedMessage } from 'react-intl';
import CustomMenu from './CustomMenu';
import WithRole from '../../../hocs/WithRole';
import Cookies from 'js-cookie';
import { authApi } from '../../../api/auth/authApi';

const { SubMenu } = Menu;

const styles = {
  sider: css`
    width: 200px;
    margin-top: 64px;
    background-color: #fff;
  `,
  menu: css`
    height: 100%;
    border-right: 0;
    width: 200px !important;
    position: fixed
  `,
  menu_collapse: css`
    height: 100%;
    border-right: 0;
    position: fixed
  `,
  logo: css`
    height: 56px;
    background-color: transparent;
    margin: 4px;
  `,
  //change style when collapse
  user: css`
    position: fixed;
    bottom: 0;
    width: 200px
  `,
  user_collapse: css`
    position: fixed;
    bottom: 0;
  `
};
const Sider = () => {
  const {
    user: { staff_code },
    user
  } = useSelector((state) => state.auth);
  const dispacth = useDispatch();
  const layoutCheck = useSelector((state) => state.layout);
  const { selectedItem, selectedSubMenu, isCollapsed } = useSelector((state) => state.layoutSlider);
  const handleSelectSubMenu = (selectedKeys) => {
    dispacth(actions.selectSubMenu(selectedKeys));
  };
  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove('access-token');
    authApi.logout(staff_code);
    window.location.reload();
  };
  return (
    <>
      {layoutCheck.isShow && (
        <Layout.Sider className={styles.sider} trigger={null} collapsible collapsed={isCollapsed}>
          <Menu
            mode="inline"
            theme="dark"
            className={isCollapsed ? styles.menu_collapse : styles.menu}
            selectedKeys={selectedItem}
            openKeys={selectedSubMenu}
            onOpenChange={(selectedKeys) => handleSelectSubMenu(selectedKeys)}>
            <WithRole
              component={CustomMenu}
              key="dashboard"
              to="/"
              typeIcon="pie-chart"
              message="dashboard.title"
              type={['admin']}></WithRole>
            <WithRole
              component={CustomMenu}
              key="project"
              to="/project"
              typeIcon="project"
              message="projects.title"
              type={['admin', 'manager', 'normal']}
            />
            <WithRole
              component={CustomMenu}
              key="customers"
              to="/customers"
              typeIcon="team"
              message="customers.title"
              type={['admin', 'manager']}
            />
            <WithRole
              component={CustomMenu}
              key="member"
              to="/member/list"
              typeIcon="smile"
              message="members.title"
              type={['admin', 'manager']}
            />
            <WithRole
              component={CustomMenu}
              key="roles"
              to="/admin/roles"
              typeIcon="user"
              message="users.title"
              type={['admin']}
            />
            <WithRole
              key="sub1-2"
              title={
                <span>
                  <Icon type="setting" />
                  <FormattedMessage id="setting.title" />
                </span>
              }
              component={SubMenu}
              type={['admin']}>
              <WithRole
                component={CustomMenu}
                key="setting"
                to="/admin/setting"
                typeIcon="project"
                message="setting.customfield.title"
                type={['admin']}
              />
            </WithRole>
            <WithRole
              key="logout"
              title={<span>
                <Icon type="user" />
                {isCollapsed ? null : user.full_name}
              </span>}
              component={SubMenu}
              className={isCollapsed ? styles.user_collapse : styles.user}
              type={['admin', 'manager', 'normal']}>
              <WithRole
                component={CustomMenu}
                to=""
                typeIcon="logout"
                onClick={handleLogout}
                key="logout-option"
                message="logout.title"
                type={['admin', 'manager', 'normal']}
              />
            </WithRole>
          </Menu>
        </Layout.Sider>
      )}
    </>
  );
};

export default Sider;
