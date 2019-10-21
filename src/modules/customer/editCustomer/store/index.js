import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'editCustomer',
    stateName: 'responCustomer',
    method: 'PUT'
  }
];
const defaultState = {
  responCustomer: null,
};

const store = createResourceHandler('editCustomer', apiActions, [], defaultState);

export const { actions, reducer } = store;
