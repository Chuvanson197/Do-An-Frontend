import React from 'react';
import { Router } from 'react-router-dom';
import { ConfigProvider, Layout as AntdLayout } from 'antd';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { history } from './store';
import AppLocale from './languageProvider';
import { css } from 'emotion';

import AppRoutes from './AppRoutes';
import Header from './modules/layout/components/Header';
import Sider from './modules/layout/components/Sider';
// import Routes from './routes';

const App = () => {
  const { locale } = useSelector((state) => state.languageSwitcher);
  const layoutCheck = useSelector((state) => state.layout);
  const currentAppLocale = AppLocale[locale];

  const styles = {
    container: css`
      min-height: 100vh !important;
    `,
    content: css`
      background: #fff;
      padding: 24px;
      margin: 0;
      minheight: 280px;
      border-radius: 3px;
    `
  };

  return (
    <ConfigProvider locale={currentAppLocale.antd}>
      <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
        <Router history={history}>
          <AntdLayout className={styles.container}>
            <Sider></Sider>
            <Header />
            <AntdLayout style={{ padding: layoutCheck.isShow ? '88px 24px 24px 24px' : '0' }}>
              {/* <BackTop style={{ right: '15px' }} visibilityHeight={250} /> */}
              <AntdLayout.Content className={layoutCheck.isShow ? styles.content : null}>
                <AppRoutes></AppRoutes>
              </AntdLayout.Content>
            </AntdLayout>
          </AntdLayout>
        </Router>
      </IntlProvider>
    </ConfigProvider>
  );
};

export default App;
