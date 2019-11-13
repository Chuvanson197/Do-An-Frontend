import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'authentication',
    stateName: 'authentication',
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
  authentication: {
<<<<<<< HEAD
    // role: 'admin'
=======
    role: 'admin'
>>>>>>> fix language
  },
  authenticated: true
};

const store = createResourceHandler('register', apiActions, reducerActions, defaultState);

export const { actions, reducer } = store;
