import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'creatProject',
    stateName: 'result',
    apiUrl: 'projects',
    method: 'POST'
  }
];

const reducerActions = [
  {
    actionName: 'cleanResult',
    stateName: 'result'
  },
  {
    actionName: 'cleanError',
    stateName: 'isError'
  }
];

const defaultState = {
  result: null
};

const store = createResourceHandler('createProject', apiActions, reducerActions, defaultState);

export const { actions, reducer } = store;
