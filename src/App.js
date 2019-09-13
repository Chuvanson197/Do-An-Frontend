import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import Routes from './routes';
import { ConfigProvider } from 'antd';
import viVN from 'antd/es/locale/vi_VN';

function App() {
  return (
    <ConfigProvider locale={viVN}>
      <Provider store={store}>
        <Routes></Routes>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
