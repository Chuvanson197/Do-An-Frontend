import { configureStore, getDefaultMiddleware, combineReducers } from 'redux-starter-kit';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';

import { reducer as layoutReducer } from '../modules/layout/store';
import { reducer as authenticationReducer } from '../modules/auth/login/store';
import { reducer as projectDetailReducer } from '../modules/project/projectDetails/store';
import { reducer as projectListReducer } from '../modules/project/listProject/store';
import { reducer as createProjectReducer } from '../modules/project/createProject/store';
import { reducer as updateProjectReducer } from '../modules/project/updateProject/store';
import { reducer as updateMemberInProjectReducer } from '../modules/project/updateMemberInProject/store';
import { reducer as projectMemberHistoryReducer } from '../modules/project/projectMemberHistory/store';
import { reducer as languageSwitcherReducer } from '../modules/languageSwitcher/store';
import { reducer as customersReducer } from '../modules/customer/store';
import { reducer as membersReducer } from '../modules/member/store';

export const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);

export const rootReducer = combineReducers({
  router: routerReducer,
  layout: layoutReducer,
  authentication: authenticationReducer,
  projectDetail: projectDetailReducer,
  projectList: projectListReducer,
  createProject: createProjectReducer,
  updateProject: updateProjectReducer,
  updateMemberInProject: updateMemberInProjectReducer,
  projectMemberHistory: projectMemberHistoryReducer,
  languageSwitcher: languageSwitcherReducer,
  customers: customersReducer,
  members: membersReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [routeMiddleware, ...getDefaultMiddleware({ serializableCheck: false })],
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
