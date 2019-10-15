import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'getCustomers',
    stateName: 'customersList',
    method: 'GET'
  },
  {
    actionName: 'deleteCustomers',
    stateName: 'isDeleted',
    method: 'DELETE'
  },
  {
    actionName: 'addCustomer',
    stateName: 'result',
    method: 'POST'
  }
];

const reducerActions = [
  {
    actionName: 'cleanError',
    stateName: 'getCustomersError'
  }
];

const defaultState = {
  customersList: [],
  isDeleted: false,
  result: null
};

const store = createResourceHandler('customers', apiActions, reducerActions, defaultState);

export const { actions, reducer } = store;
