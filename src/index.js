import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { ConfigProvider } from 'antd';
import Provider from 'react-redux/es/components/Provider';
import store from './store';
import App from './App';
import AppLocale from './languageProvider';

ReactDOM.render(
  <ConfigProvider locale={AppLocale.vi.antd}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
