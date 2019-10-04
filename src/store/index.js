import { configureStore, getDefaultMiddleware, combineReducers } from 'redux-starter-kit';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';

import { reducer as layoutReducer } from '../modules/layout/store';
import { reducer as authenticationReducer } from '../modules/auth/login/store';
import { reducer as projectDetailReducer } from '../modules/project/projectDetails/store';
import { reducer as projectListReducer } from '../modules/project/listProject/store';
import { reducer as projectMemberHistoryReducer } from '../modules/project/projectMemberHistory/store';
// import { reducer as projectCreateReducer } from '../modules/createProject/store';
// import { reducer as memberAddReducer } from '../modules/memberAdd/store';
import { reducer as languageSwitcherReducer } from '../modules/languageSwitcher/store';
import { reducer as customersReducer } from '../modules/customer/cutomers/store';

export const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);

export const rootReducer = combineReducers({
  router: routerReducer,
  layout: layoutReducer,
  authentication: authenticationReducer,
  projectDetail: projectDetailReducer,
  projectList: projectListReducer,
  projectMemberHistory: projectMemberHistoryReducer,
  // projectCreate: projectCreateReducer,
  // memberAdd: memberAddReducer,
  languageSwitcher: languageSwitcherReducer,
  customers: customersReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [routeMiddleware, ...getDefaultMiddleware({ serializableCheck: false })],
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
