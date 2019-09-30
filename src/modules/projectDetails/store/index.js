import createResourceHandler from '../../../ultis/createResourceHandler';

const apiActions = [
  {
    actionName: 'getProjectDetail',
    stateName: 'projectDetail',
    apiUrl: 'project_detail',
    method: 'GET'
  }
];
const defaultState = {
  projectDetail: {}
};

const store = createResourceHandler('projectDetail', apiActions, [], defaultState);

export const { actions, reducer } = store;
