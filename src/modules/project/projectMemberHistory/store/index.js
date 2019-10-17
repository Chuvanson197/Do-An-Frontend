import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'getMemberHistory',
    stateName: 'members',
    method: 'POST'
  }
];

const reducerActions = [
  {
    actionName: 'cleanError',
    stateName: 'getMemberHistoryError'
  }
];
const defaultState = {
  members: []
};

const store = createResourceHandler(
  'projectMemberHistory',
  apiActions,
  reducerActions,
  defaultState
);

export const { actions, reducer } = store;
