import createResourceHandler from '../../../../ultis/createResourceHandler';

const apiActions = [
  {
    actionName: 'editMember',
    stateName: 'members',
    apiUrl: 'members',
    method: 'PUT'
  }
];
const defaultState = {
  members: [],
};

const store = createResourceHandler('member', apiActions, [], defaultState);

export const { actions, reducer } = store;
