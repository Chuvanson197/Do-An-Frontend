import { configureStore, getDefaultMiddleware, combineReducers } from 'redux-starter-kit';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import { reducer as exampleReducer } from '../modules/example/store';

export const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);

const rootReducer = combineReducers({ example: exampleReducer, router: routerReducer });

const store = configureStore({
  reducer: rootReducer,
  middleware: [routeMiddleware, ...getDefaultMiddleware({ serializableCheck: false })],
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
