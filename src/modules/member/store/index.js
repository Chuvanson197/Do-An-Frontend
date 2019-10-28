import createResourceHandler from '../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'getMembers',
    stateName: 'list',
    method: 'GET'
  },
  {
    actionName: 'createMember',
    stateName: 'createMemberResult',
    method: 'POST'
  },
  {
    actionName: 'updateMember',
    stateName: 'updateMemberResult',
    apiUrl: 'members',
    method: 'PUT'
  },
  {
    actionName: 'removeMember',
    stateName: 'removeMemberResult',
    method: 'POST'
  },
];

const reducerActions = [
  {
    actionName: 'cleanGetMembersError',
    stateName: 'getMembersError'
  }
];

const defaultState = {
  list: [],
  createMemberResult: null,
  updateMemberResult: null,
  removeMemberResult: null,
};

const store = createResourceHandler('members', apiActions, reducerActions, defaultState);

export const { actions, reducer } = store;
