import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'getProjectDetail',
    stateName: 'projectDetail',
    method: 'GET'
  }
];
const defaultState = {
  projectDetail: {}
};

const store = createResourceHandler('projectDetail', apiActions, [], defaultState);

export const { actions, reducer } = store;
