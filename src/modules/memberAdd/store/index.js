import createResourceHandler from '../../../ultis/createResourceHandler';

const apiActions = [
  {
    actionName: 'memberAdd',
    stateName: 'member',
    apiUrl: '/project/_members/',
    method: 'PUT'
  }
];
const defaultState = {
  member: {}
};

const store = createResourceHandler('memberAdd', apiActions, [], defaultState);

export const { actions, reducer } = store;
