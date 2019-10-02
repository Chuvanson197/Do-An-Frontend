import createResourceHandler from '../../../ultis/createResourceHandler';

const apiActions = [
  {
    actionName: 'register',
    stateName: 'account',
    apiUrl: '/register',
    method: 'POST'
  }
];
const defaultState = {
  account: {}
};

const store = createResourceHandler('register', apiActions, [], defaultState);

export const { actions, reducer } = store;
