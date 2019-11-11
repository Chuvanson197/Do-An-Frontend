import React from 'react';
import { Route, Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { history } from './store';
import AppLocale from './languageProvider';

import Routes from './Routes';

const App = () => {
  const { locale } = useSelector((state) => state.languageSwitcher);
  const currentAppLocale = AppLocale[locale];

  return (
    <ConfigProvider locale={currentAppLocale.antd}>
      <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
        <Router history={history}>
          <Routes></Routes>
        </Router>
      </IntlProvider>
    </ConfigProvider>
  );
};

export default App;
