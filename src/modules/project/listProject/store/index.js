import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'getProjects',
    stateName: 'list',
    method: 'GET'
  }
];
const defaultState = {
  list: []
};

const store = createResourceHandler('projectList', apiActions, [], defaultState);

export const { actions, reducer } = store;
