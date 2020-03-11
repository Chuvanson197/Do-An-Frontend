import createResourceHandler from '../../../utils/createResourceHandler';

const apiActions = [
  {
    actionName: 'getValueTypes',
    stateName: 'valueTypes',
    method: 'GET'
  },
  {
    actionName: 'getBaseCustomFields',
    stateName: 'baseCustomFields',
    method: 'GET'
  },
  {
    actionName: 'createCustomField',
    stateName: 'createCustomFieldResult',
    method: 'POST'
  },
  {
    actionName: 'getCustomFields',
    stateName: 'customfields',
    method: 'GET'
  },
  {
    actionName: 'removeCustomField',
    stateName: 'removeCustomFieldResult',
    method: 'DELETE'
  },
  {
    actionName: 'updateCustomField',
    stateName: 'updateCustomFieldResult',
    method: 'PUT'
  },
  {
    actionName: 'createAssigneeProject',
    stateName: 'createAssigneeProjectResult',
    method: 'POST'
  },
  {
    actionName: 'removeAssigneeProject',
    stateName: 'removeAssigneeProjectResult',
    method: 'DELETE'
  },
];

const reducerActions = [
  {
    actionName: 'cleanCustomFieldError',
    stateName: 'getCustomFieldError'
  }
];

const defaultState = {
  customfields: [],
  customfield: null,
  createCustomFieldResult: null,
  removeCustomFieldResult: null,
  getCustomFieldResult: null,
  updateCustomFieldResult: null,
  createAssigneeProjectResult: null,
  removeAssigneeProjectResult: null
};

const store = createResourceHandler('setting', apiActions, reducerActions, defaultState);

export const { actions, reducer } = store;
