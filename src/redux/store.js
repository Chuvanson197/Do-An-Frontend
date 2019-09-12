import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import exmapleReducer from './reducers/Example';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);

const store = configureStore({
  reducer: {
    example: exmapleReducer,
    router: routerReducer
  },
  middleware: [routeMiddleware, ...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
