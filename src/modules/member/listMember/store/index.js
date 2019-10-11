import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'getMemberList',
    stateName: 'memberList',
    apiUrl: '/members',
    method: 'GET'
  }
];
const defaultState = {
  membersList: []
};

const store = createResourceHandler('memberList', apiActions, [], defaultState);

export const { actions, reducer } = store;
