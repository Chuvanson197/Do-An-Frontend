// import createResourceHandler from '../../../../utils/createResourceHandler';

// const apiActions = [
//   {
//     actionName: 'addMember',
//     stateName: 'members',
//     method: 'POST'
//   }
// ];
// const defaultState = {
//   membersList: []
// };

// const store = createResourceHandler('members', apiActions, [], defaultState);

// export const { actions, reducer } = store;
import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'createMember',
    stateName: 'result',
    method: 'POST'
  }
];

const reducerActions = [
  {
    actionName: 'cleanResult',
    stateName: 'result'
  },
  {
    actionName: 'cleanError',
    stateName: 'createMemberError'
  }
];

const defaultState = {
  result: null
};

const store = createResourceHandler('createMember', apiActions, reducerActions, defaultState);

export const { actions, reducer } = store;
