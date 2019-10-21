import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'editMember',
    stateName: 'responEdit',
    method: 'PUT'
  }
];

const reducerActions = [
  {
    actionName: 'cleanResult',
    stateName: 'responEdit'
  },
  {
    actionName: 'cleanError',
    stateName: 'editMemberError'
  }
];

const defaultState = {
  responEdit: null,
};

const store = createResourceHandler('editMember', apiActions, reducerActions, defaultState);

export const { actions, reducer } = store;
