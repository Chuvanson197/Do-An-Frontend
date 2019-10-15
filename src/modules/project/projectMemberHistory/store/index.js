import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'getProjectMemberHistory',
    stateName: 'projectMemberHistory',
    method: 'GET'
  }
];
const defaultState = {
  projectMemberHistory: []
};

const store = createResourceHandler('projectMemberHistory', apiActions, [], defaultState);

export const { actions, reducer } = store;
