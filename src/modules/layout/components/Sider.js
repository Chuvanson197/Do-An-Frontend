import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { actions } from '../store';
// import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { css } from 'emotion';
import CustomMenu from './CustomMenu';
import WithRole from '../../../hocs/WithRole';

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
  const { selectedItem, selectedSubMenu, isCollapsed } = useSelector((state) => state.layout);

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
            {/* <Menu.Item key="dashboard">
      <Link to="/">
        <Icon type="pie-chart" />
        <FormattedMessage id="dashboard.title" />
      </Link>
    </Menu.Item> */}
            <WithRole
              component={CustomMenu}
              key={'dashboard'}
              to={'/'}
              typeIcon={'pie-chart'}
              message={'dashboard.title'}
              role={['admin']}></WithRole>
            <WithRole
              component={CustomMenu}
              key={'project'}
              to={'/project'}
              typeIcon={'project'}
              message={'projects.title'}
              role={['admin', 'manager', 'normal']}></WithRole>
            <WithRole
              component={CustomMenu}
              key={'customers'}
              to={'/customers'}
              typeIcon={'team'}
              message={'customers.title'}
              role={['admin', 'manager', 'normal']}></WithRole>
            <WithRole
              component={CustomMenu}
              key={'member'}
              to={'/member/list'}
              typeIcon={'smile'}
              message={'members.title'}
              role={['admin', 'manager']}></WithRole>
            {/* <Menu.Item key="project">
      <Link to="/project">
        <Icon type="project" />
        <FormattedMessage id="projects.title" />
      </Link>
    </Menu.Item>
    <Menu.Item key="customers">
      <Link to="/customers">
        <Icon type="team" />
        <FormattedMessage id="customers.title" />
      </Link>
    </Menu.Item>
    <Menu.Item key="member">
      <Link to="/member/list">
        <Icon type="smile" />
        <FormattedMessage id="members.title" />
      </Link>
    </Menu.Item> */}
          </Menu>
        </Layout.Sider>
      )}
    </>
  );
};

export default Sider;
