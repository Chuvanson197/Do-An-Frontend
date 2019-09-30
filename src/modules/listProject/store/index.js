import createResourceHandler from '../../../ultis/createResourceHandler';

const apiActions = [
  {
    actionName: 'getProjectList',
    stateName: 'projectList',
    apiUrl: 'project_list',
    method: 'GET'
  }
];
const defaultState = {
  projectList: []
};

const store = createResourceHandler('projectList', apiActions, [], defaultState);

export const { actions, reducer } = store;
