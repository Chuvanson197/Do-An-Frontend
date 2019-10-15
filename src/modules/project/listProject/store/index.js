import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'getProjects',
    stateName: 'list',
    method: 'GET'
  }
];

const reducerActions = [
  {
    actionName: 'cleanError',
    stateName: 'getProjectsError'
  }
];

const defaultState = {
  list: []
};

const store = createResourceHandler('projectList', apiActions, reducerActions, defaultState);

export const { actions, reducer } = store;
