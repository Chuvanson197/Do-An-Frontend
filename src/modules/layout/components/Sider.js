import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store';
import { Layout, Menu, Icon } from 'antd';
import { css } from 'emotion';
import { FormattedMessage } from 'react-intl';
import CustomMenu from './CustomMenu';
import WithRole from '../../../hocs/WithRole';

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
  `,
  logo: css`
    height: 56px;
    background-color: transparent;
    margin: 4px;
  `
};

const Sider = () => {
  const dispacth = useDispatch();
  const layoutCheck = useSelector((state) => state.layout);
  const { selectedItem, selectedSubMenu, isCollapsed } = useSelector((state) => state.layoutSlider);

  const handleSelectSubMenu = (selectedKeys) => {
    dispacth(actions.selectSubMenu(selectedKeys));
  };

  return (
    <>
      {layoutCheck.isShow && (
        <Layout.Sider className={styles.sider} trigger={null} collapsible collapsed={isCollapsed}>
          <Menu
            mode="inline"
            theme="dark"
            className={styles.menu}
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
              type={['admin', 'manager', 'normal']} />
            <WithRole
              component={CustomMenu}
              key="customers"
              to="/customers"
              typeIcon="team"
              message="customers.title"
              type={['admin', 'manager']} />
            <WithRole
              component={CustomMenu}
              key="member"
              to="/member/list"
              typeIcon="smile"
              message="members.title"
              type={['admin', 'manager']} />
            <WithRole
              component={CustomMenu}
              key="roles"
              to="/admin/roles"
              typeIcon="user"
              message="users.title"
              type={['admin']} />
            <WithRole key="sub1-2" title={
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
                type={['admin']} />
            </WithRole>
          </Menu>
        </Layout.Sider>
      )}
    </>
  );
};

export default Sider;
