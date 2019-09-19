import React from 'react';
import PropTypes from 'prop-types';
import { Layout as AntdLayout } from 'antd';
import { css } from 'emotion';

import Header from './Header';
import Sider from './Sider';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
};

const defaultProps = {
  children: undefined
};

const styles = {
  container: css`
    min-height: 100vh;
  `,
  content: css`
    background: #fff;
    padding: 24px;
    margin: 0;
    minheight: 280px;
    border-radius: 3px;
  `
};

const Layout = ({ children }) => (
  <AntdLayout className={styles.container}>
    <Sider />
    <AntdLayout>
      <Header />
      <AntdLayout style={{ padding: '88px 24px 24px 24px' }}>
        <AntdLayout.Content className={styles.content}>{children}</AntdLayout.Content>
      </AntdLayout>
    </AntdLayout>
  </AntdLayout>
);

Layout.propTypes = propTypes;

Layout.defaultProps = defaultProps;

export default Layout;
