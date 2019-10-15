import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'creatProject',
    stateName: 'result',
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
    stateName: 'iscreatProjectError'
  }
];

const defaultState = {
  result: null
};

const store = createResourceHandler('createProject', apiActions, reducerActions, defaultState);

export const { actions, reducer } = store;
