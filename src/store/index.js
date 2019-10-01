import { configureStore, getDefaultMiddleware, combineReducers } from 'redux-starter-kit';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';

import { reducer as layoutReducer } from '../modules/layout/store';
import { reducer as projectDetailReducer } from '../modules/projectDetails/store';
import { reducer as projectListReducer } from '../modules/listProject/store';
import { reducer as projectMemberHistoryReducer } from '../modules/projectMemberHistory/store';
// import { reducer as projectCreateReducer } from '../modules/createProject/store';
import { reducer as languageSwitcherReducer } from '../modules/languageSwitcher/store';

export const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);

export const rootReducer = combineReducers({
  router: routerReducer,
  layout: layoutReducer,
  projectDetail: projectDetailReducer,
  projectList: projectListReducer,
  projectMemberHistory: projectMemberHistoryReducer,
  // projectCreate: projectCreateReducer,
  languageSwitcher: languageSwitcherReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [routeMiddleware, ...getDefaultMiddleware({ serializableCheck: false })],
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
