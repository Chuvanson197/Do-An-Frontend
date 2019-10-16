import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'updateProject',
    stateName: 'result',
    method: 'PUT'
  }
];

const reducerActions = [
  {
    actionName: 'cleanResult',
    stateName: 'result'
  },
  {
    actionName: 'cleanError',
    stateName: 'updateProjectError'
  }
];

const defaultState = {
  result: null
};

const store = createResourceHandler('updateProject', apiActions, reducerActions, defaultState);

export const { actions, reducer } = store;
