import createResourceHandler from '../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'getCustomers',
    stateName: 'list',
    method: 'GET'
  },
  {
    actionName: 'createCustomer',
    stateName: 'createCustomerResult',
    method: 'POST'
  },
  {
    actionName: 'updateCustomer',
    stateName: 'updateCustomerResult',
    apiUrl: 'customers',
    method: 'PUT'
  },
  {
    actionName: 'removeCustomer',
    stateName: 'removeCustomerResult',
    method: 'POST'
  },
];

const reducerActions = [
  {
    actionName: 'cleanGetCustomersError',
    stateName: 'getCustomersError'
  }
];

const defaultState = {
  list: [],
  createCustomerResult: null,
  updateCustomerResult: null,
  removeCustomerResult: null
};

const store = createResourceHandler('customers', apiActions, reducerActions, defaultState);

export const { actions, reducer } = store;
