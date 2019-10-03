import createResourceHandler from '../../../ultis/createResourceHandler';

const apiActions = [
  {
    actionName: 'getMemberList',
    stateName: 'memberList',
    apiUrl: '/members',
    method: 'GET'
  }
];
const defaultState = {
  projectList: []
};

const store = createResourceHandler('memberList', apiActions, [], defaultState);

export const { actions, reducer } = store;
