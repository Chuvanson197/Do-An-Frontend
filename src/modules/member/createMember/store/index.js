import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'createMember',
    stateName: 'responCreate',
    method: 'POST'
  }
];

const reducerActions = [
  {
    actionName: 'cleanResult',
    stateName: 'responCreate'
  },
  {
    actionName: 'cleanError',
    stateName: 'createMemberError'
  }
];

const defaultState = {
  responCreate: null,
};

const store = createResourceHandler('createMember', apiActions, reducerActions, defaultState);

export const { actions, reducer } = store;
