import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'editMember',
    stateName: 'members',
    apiUrl: 'members',
    method: 'PUT'
  }
];
const defaultState = {
  members: [],
};

const store = createResourceHandler('memberList', apiActions, [], defaultState);

export const { actions, reducer } = store;
