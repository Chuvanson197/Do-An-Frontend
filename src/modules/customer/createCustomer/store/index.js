import createResourceHandler from '../../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'createCustomer',
    stateName: 'responCreateCustomer',
    method: 'POST'
  }
];
const reducerActions = [
  {
    actionName: 'cleanResult',
    stateName: 'responCreateCustomer'
  },
  {
    actionName: 'cleanError',
    stateName: 'createCustomerError'
  }
];
const defaultState = {
  responCreateCustomer: null
};

const store = createResourceHandler('createCustomer', apiActions, reducerActions, defaultState);

export const { actions, reducer } = store;
