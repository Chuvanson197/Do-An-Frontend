import createResourceHandler from '../../../ultis/createResourceHandler';

const apiActions = [
  {
    actionName: 'register',
    stateName: 'authentication',
    apiUrl: '/login',
    method: 'POST'
  }
];

const reducerActions = [
  {
    actionName: 'setAuthentication',
    stateName: 'authenticated'
  }
];

const defaultState = {
  authentication: {},
  authenticated: false
};

const store = createResourceHandler('register', apiActions, reducerActions, defaultState);

export const { actions, reducer } = store;
