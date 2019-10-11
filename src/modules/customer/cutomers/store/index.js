import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'getCustomers',
    stateName: 'customersList',
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
    stateName: 'result',
    apiUrl: 'customers',
    method: 'POST'
  }
];
const defaultState = {
  customersList: [],
  isDeleted: false,
  result: null
};

const store = createResourceHandler('customers', apiActions, [], defaultState);

export const { actions, reducer } = store;
