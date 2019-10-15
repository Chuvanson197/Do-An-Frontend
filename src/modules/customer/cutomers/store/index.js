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
const defaultState = {
  customersList: [],
  isDeleted: false,
  result: null
};

const store = createResourceHandler('customers', apiActions, [], defaultState);

export const { actions, reducer } = store;
