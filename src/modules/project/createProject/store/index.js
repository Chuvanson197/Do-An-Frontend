import createResourceHandler from '../../../ultis/createResourceHandler';

const apiActions = [
  {
    actionName: 'creatProject',
    stateName: 'project',
    apiUrl: '/project/create',
    method: 'POST'
  }
];
const defaultState = {
  project: {}
};

const store = createResourceHandler('createProject', apiActions, [], defaultState);

export const { actions, reducer } = store;
