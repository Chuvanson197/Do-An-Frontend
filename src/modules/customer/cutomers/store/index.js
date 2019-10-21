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
    actionName: 'createCustomer',
    stateName: 'responCustomer',
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
  responCustomer: null
};

const store = createResourceHandler('customers', apiActions, reducerActions, defaultState);

export const { actions, reducer } = store;
