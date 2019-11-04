import { configureStore, getDefaultMiddleware, combineReducers } from 'redux-starter-kit';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';

import { reducer as layoutReducer } from '../modules/layout/store';
import { reducer as languageSwitcherReducer } from '../modules/languageSwitcher/store';
import { reducer as authenticationReducer } from '../modules/auth/login/store';
import { reducer as projectsReducer } from '../modules/project/store';
import { reducer as customersReducer } from '../modules/customer/store';
import { reducer as membersReducer } from '../modules/member/store';
import { reducer as usersReducer } from '../modules/user/store';


export const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);

export const rootReducer = combineReducers({
  router: routerReducer,
  layout: layoutReducer,
  languageSwitcher: languageSwitcherReducer,
  authentication: authenticationReducer,
  projects: projectsReducer,
  customers: customersReducer,
  members: membersReducer,
  users: usersReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [routeMiddleware, ...getDefaultMiddleware({ serializableCheck: false })],
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
