import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'createMember',
    stateName: 'members',
    method: 'POST'
  }
];
const defaultState = {
  membersList: []
};

const store = createResourceHandler('memberList', apiActions, [], defaultState);

export const { actions, reducer } = store;
