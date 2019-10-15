import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'getMemberList',
    stateName: 'memberList',
    method: 'GET'
  },
  {
    actionName: 'deleteMembers',
    stateName: 'isDeleted',
    method: 'DELETE'
  },
  {
    actionName: 'addMember',
    stateName: 'members',
    method: 'POST'
  }
];
const defaultState = {
  membersList: [],
  isDeleted: false
};

const store = createResourceHandler('memberList', apiActions, [], defaultState);

export const { actions, reducer } = store;
