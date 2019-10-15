import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'editCustomer',
    stateName: 'customers',
    apiUrl: 'customers',
    method: 'PUT'
  }
];
const defaultState = {
  customers: [],
};

const store = createResourceHandler('customerList', apiActions, [], defaultState);

export const { actions, reducer } = store;
