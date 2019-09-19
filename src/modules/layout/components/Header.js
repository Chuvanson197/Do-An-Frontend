import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store';
import { Layout, Icon } from 'antd';
import { css } from 'emotion';

const styles = {
  header: css`
    align-items: center;
    display: flex;
    padding: 0px 24px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  `,
  trigger: css`
    color: #fff;
    font-size: 25px;
    &:hover {
      color: #1890ff;
    }
  `
};

const Header = () => {
  const dispatch = useDispatch();
  const { isCollapsed } = useSelector((state) => state.layout.sider);

  const toggle = () => {
    dispatch(actions.setCollapse());
  };

  return (
    <Layout.Header className={styles.header}>
      <Icon
        className={styles.trigger}
        type={isCollapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={() => toggle()}
      />
    </Layout.Header>
  );
};

export default Header;
