import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'updateMemberInProject',
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
    stateName: 'updateMemberInProjectError'
  }
];

const defaultState = {
  result: null
};

const store = createResourceHandler(
  'updateMemberInProject',
  apiActions,
  reducerActions,
  defaultState
);

export const { actions, reducer } = store;
