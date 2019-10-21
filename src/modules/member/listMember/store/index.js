import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'getMemberList',
    stateName: 'members',
    method: 'GET'
  },
  {
    actionName: 'delMember',
    stateName: 'responDel',
    method: 'POST'
  }
];

const reducerActions = [
  {
    actionName: 'cleanError',
    stateName: 'getMembersError'
  },
  {
    actionName: 'cleanDelError',
    stateName: 'delMembersError'
  }
];

const defaultState = {
  members: null,
  responDel: null,
  isDeleted: false
};

const store = createResourceHandler('memberList', apiActions, reducerActions, defaultState);

export const { actions, reducer } = store;
