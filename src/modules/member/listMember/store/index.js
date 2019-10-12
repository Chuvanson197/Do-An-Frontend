import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'getMembers',
    stateName: 'members',
    apiUrl: 'members',
    method: 'GET'
  },
  {
    actionName: 'deleteMembers',
    stateName: 'isDeleted',
    apiUrl: 'members',
    method: 'DELETE'
  },
  {
    actionName: 'addMember',
    stateName: 'members',
    apiUrl: 'members',
    method: 'POST'
  }
];
const defaultState = {
  members: [],
  isDeleted: false
};

const store = createResourceHandler('memberList', apiActions, [], defaultState);

export const { actions, reducer } = store;
