import createResourceHandler from '../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'getProjects',
    stateName: 'list',
    method: 'GET'
  },
  {
    actionName: 'getProject',
    stateName: 'project',
    method: 'GET'
  },
  {
    actionName: 'createProject',
    stateName: 'createProjectResult',
    method: 'POST'
  },
  {
    actionName: 'updateProject',
    stateName: 'updateProjectResult',
    method: 'PUT'
  },
  {
    actionName: 'removeProject',
    stateName: 'removeProjectResult',
    method: 'POST'
  },
  {
    actionName: 'getJoinedMembers',
    stateName: 'joinedMembers',
    method: 'GET'
  },
  {
    actionName: 'addMember',
    stateName: 'addMemberResult',
    method: 'POST'
  },
  {
    actionName: 'removeMember',
    stateName: 'removeMemberResult',
    method: 'POST'
  },
  {
    actionName: 'updateMember',
    stateName: 'updateMemberResult',
    method: 'PUT'
  },
  {
    actionName: 'getMemberHistory',
    stateName: 'members',
    method: 'POST'
  }
];

const reducerActions = [];

const defaultState = {
  list: [],
  project: null,
  members: null,
  joinedMembers: null,
  createProjectResult: null,
  updateProjectResult: null,
  removeProjectResult: null,
  addMemberResult: null,
  updateMemberResult: null,
  removeMemberResult: null
};

const store = createResourceHandler('projects', apiActions, reducerActions, defaultState);

export const { actions, reducer } = store;
