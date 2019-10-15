import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'addMember',
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
    stateName: 'addMemberError'
  }
];
const defaultState = {
  result: null
};

const store = createResourceHandler('memberAdd', apiActions, reducerActions, defaultState);

export const { actions, reducer } = store;
