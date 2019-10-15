import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'memberAdd',
    stateName: 'member',
    method: 'PUT'
  }
];
const defaultState = {
  member: {}
};

const store = createResourceHandler('memberAdd', apiActions, [], defaultState);

export const { actions, reducer } = store;
