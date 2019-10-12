import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'getProjectDetail',
    stateName: 'project',
    apiUrl: 'projects',
    method: 'GET'
  },
  {
    actionName: 'getMembers',
    stateName: 'joinedMembers',
    apiUrl: 'projects/membersList',
    method: 'GET'
  }
];
const defaultState = {
  project: null,
  joinedMembers: {
    list: [],
    total: 0
  }
};

const store = createResourceHandler('projectDetail', apiActions, [], defaultState);

export const { actions, reducer } = store;
