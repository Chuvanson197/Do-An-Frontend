import createResourceHandler from '../../../../ultis/createResourceHandler';

const apiActions = [
  {
    actionName: 'createMember',
    stateName: 'members',
    apiUrl: 'members',
    method: 'POST'
  }
];
const defaultState = {
  membersList: []
};

const store = createResourceHandler('memberList', apiActions, [], defaultState);

export const { actions, reducer } = store;
