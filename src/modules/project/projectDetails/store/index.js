import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'getProjectDetail',
    stateName: 'project',
    method: 'GET'
  },
  {
    actionName: 'getMembers',
    stateName: 'joinedMembers',
    method: 'GET'
  },
  {
    actionName: 'removeMember',
    stateName: 'removeMemberResult',
    method: 'POST'
  }
];

const reducerActions = [
  {
    actionName: 'cleanRemoveMemberResult',
    stateName: 'removeMemberResult'
  },
  {
    actionName: 'cleanError',
    stateName: 'removeMemberError'
  },
  {
    actionName: 'cleanProjectDetailError',
    stateName: 'getProjectDetailError'
  },
  {
    actionName: 'cleanGetMembersError',
    stateName: 'getMembersError'
  },
  {
    actionName: 'cleanJoinedMember',
    stateName: 'joinedMembers'
  },
  {
    actionName: 'cleanProjectDetail',
    stateName: 'project'
  }
];

const defaultState = {
  project: null,
  isError: false,
  joinedMembers: {
    list: [],
    total: 0
  },
  removeMemberResult: null
};

const store = createResourceHandler('projectDetail', apiActions, reducerActions, defaultState);

export const { actions, reducer } = store;
