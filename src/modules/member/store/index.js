import createResourceHandler from '../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'addMember',
    stateName: 'responAddMember',
    method: 'POST'
  },
  {
    actionName: 'createMember',
    stateName: 'responCreateMember',
    method: 'POST'
  },
  {
    actionName: 'editMember',
    stateName: 'responEditMember',
    method: 'PUT'
  },
  {
    actionName: 'getMember',
    stateName: 'responGetMember',
    method: 'GET'
  },
  {
    actionName: 'delMember',
    stateName: 'responDelMember',
    method: 'POST'
  }
];

const reducerActions = [
  {
    actionName: 'cleanAddMember',
    stateName: 'responAddMember'
  },
  {
    actionName: 'cleanAddMemberError',
    stateName: 'addMemberError'
  },
  {
    actionName: 'cleanCreateMember',
    stateName: 'responCreateMember'
  },
  {
    actionName: 'cleanCreateMemberError',
    stateName: 'createMemberError'
  },
  {
    actionName: 'cleanEditMember',
    stateName: 'responEditMember'
  },
  {
    actionName: 'cleanEditMemberError',
    stateName: 'editMemberError'
  },
  {
    actionName: 'cleanGetMember',
    stateName: 'responGetMember'
  },
  {
    actionName: 'cleanGetMemberError',
    stateName: 'getMemberError'
  },
  {
    actionName: 'cleanDelMember',
    stateName: 'responDelMember'
  },
  {
    actionName: 'cleanDelMemberError',
    stateName: 'delMemberError'
  }
];
const defaultState = {
  responAddMember: null,
  responCreateMember: null,
  responEditMember: null,
  responGetMember: null,
  responDelMember: null
};

const store = createResourceHandler('Members', apiActions, reducerActions, defaultState);

export const { actions, reducer } = store;
