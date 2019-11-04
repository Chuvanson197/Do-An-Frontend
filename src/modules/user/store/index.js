import createResourceHandler from '../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'getUsers',
    stateName: 'list',
    method: 'GET'
  },
  {
    actionName: 'createUser',
    stateName: 'createUserResult',
    method: 'POST'
  },
  {
    actionName: 'updateUser',
    stateName: 'updateUserResult',
    apiUrl: 'users',
    method: 'PUT'
  },
  {
    actionName: 'removeUser',
    stateName: 'removeUserResult',
    method: 'POST'
  },
];

const reducerActions = [
  {
    actionName: 'cleanGetUsersError',
    stateName: 'getUsersError'
  }
];

const defaultState = {
  list: [],
  createUserResult: null,
  updateUserResult: null,
  removeUserResult: null
};

const store = createResourceHandler('users', apiActions, reducerActions, defaultState);

export const { actions, reducer } = store;
