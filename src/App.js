import React from 'react';
import Routes from './routes';
import { ConfigProvider } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import store, { persistor } from './store';
import Provider from 'react-redux/es/components/Provider';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => (
  <ConfigProvider locale={viVN}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes></Routes>
      </PersistGate>
    </Provider>
  </ConfigProvider>
);

export default App;
