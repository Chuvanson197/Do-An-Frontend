import createResourceHandler from '../../ultis/createResourceHandler';

const apiActions = [
  {
    actionName: 'login',
    stateName: 'account',
    apiUrl: '/login',
    method: 'POST'
  }
];
const defaultState = {
  account: {}
};

const store = createResourceHandler('login', apiActions, [], defaultState);

export const { actions, reducer } = store;
