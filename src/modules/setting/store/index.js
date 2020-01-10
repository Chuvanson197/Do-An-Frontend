import createResourceHandler from '../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'createCustomField',
    stateName: 'createCustomFieldResult',
    method: 'POST'
  },
];

const reducerActions = [
  {
    actionName: 'cleanCustomFieldError',
    stateName: 'getCustomFieldError'
  }
];

const defaultState = {
  createCustomFieldResult: null,
};

const store = createResourceHandler('setting', apiActions, reducerActions, defaultState);

export const { actions, reducer } = store;
