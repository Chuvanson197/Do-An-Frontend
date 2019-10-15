import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'getMembers',
    stateName: 'members',
    method: 'GET'
  },
  {
    actionName: 'deleteMembers',
    stateName: 'isDeleted',
    method: 'DELETE'
  },
  {
    actionName: 'addMember',
    stateName: 'members',
    method: 'POST'
  }
];

const reducerActions = [
  {
    actionName: 'cleanError',
    stateName: 'getMembersError'
  }
];

const defaultState = {
  members: [],
  isDeleted: false
};

const store = createResourceHandler('memberList', apiActions, reducerActions, defaultState);

export const { actions, reducer } = store;
