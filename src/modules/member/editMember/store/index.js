import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'editMember',
    stateName: 'members',
    method: 'PUT'
  }
];
const defaultState = {
  members: [],
};

const store = createResourceHandler('member', apiActions, [], defaultState);

export const { actions, reducer } = store;
