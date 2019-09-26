import React from 'react';
import { Route, Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import store, { history } from './store';
import Provider from 'react-redux/es/components/Provider';

import routes from './routes';

const App = () => (
  <ConfigProvider locale={viVN}>
    <Provider store={store}>
      <Router history={history}>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Router>
    </Provider>
  </ConfigProvider>
);

export default App;
