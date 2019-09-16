import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon } from 'antd';
import { css } from 'emotion';

const propTypes = {
  handleSetCollapse: PropTypes.func.isRequired,

  isCollapsed: PropTypes.bool
};

const defaultProps = {
  isCollapsed: false
};

const styles = {
  header: css`
    align-items: center;
    display: flex;
    padding: 0px 24px;
  `,
  trigger: css`
    color: #fff;
    font-size: 25px;
    &:hover {
      color: #1890ff;
    }
  `
};

const Header = ({ isCollapsed, handleSetCollapse }) => {
  const toggle = () => {
    handleSetCollapse && handleSetCollapse();
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

Header.propTypes = propTypes;

Header.defaultProps = defaultProps;

export default Header;
