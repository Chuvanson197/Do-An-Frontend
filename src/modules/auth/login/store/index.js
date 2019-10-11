import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'authentication',
    stateName: 'authentication',
    apiUrl: 'auth',
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
  authenticated: true
};

const store = createResourceHandler('register', apiActions, reducerActions, defaultState);

export const { actions, reducer } = store;
