import createResourceHandler from '../../../ultis/createResourceHandler';

const apiActions = [
  {
    actionName: 'fecthCustomers',
    stateName: 'customers',
    apiUrl: 'customers',
    method: 'GET'
  },
  {
    actionName: 'deleteCustomers',
    stateName: 'isDeleted',
    apiUrl: 'customers',
    method: 'DELETE'
  },
  {
    actionName: 'addCustomer',
    stateName: 'customers',
    apiUrl: 'customers',
    method: 'POST'
  }
];
const defaultState = {
  customers: [],
  isDeleted: false
};

const store = createResourceHandler('customers', apiActions, [], defaultState);

export const { actions, reducer } = store;
