import { createSlice } from 'redux-starter-kit';
import createOperation from './createOperation';
import api from './apiService';

/**
 * // name of module
 * @param moduleName : string
 * // provide api action list you want generate
 * // parm method include ['GET', 'POST', 'PUT', 'DELETE']
 * @param apiActions : arrayOf[
 *   {actionName: string, stateName: string, method: string}
 * ]
 * // provide reducer actions list you want generate
 * @param reducerActions: arrayOf[{actionName: string, stateName: string}]
 * // provide default value for state if need
 * @param defaultState: object
 */

const CreateResourceHandler = (
  moduleName,
  apiActions = [],
  reducerActions = [],
  defaultState = {}
) => {
  let initialState = {
    loading: false
  };
  apiActions.forEach((value) => {
    const lastState = initialState;
    initialState = {
      ...lastState,
      [value.stateName]: undefined
    };
  });
  reducerActions.forEach((value) => {
    const lastState = initialState;
    initialState = {
      ...lastState,
      [value.stateName]: undefined
    };
  });
  if (defaultState) {
    const lastState = initialState;
    initialState = {
      ...lastState,
      ...defaultState
    };
  }

  let initialReducerActions = {};
  apiActions.forEach((value) => {
    const lastReducer = initialReducerActions;
    initialReducerActions = {
      ...lastReducer,
      [`${value.actionName}Started`]: (state) => ({
        ...state,
        loading: true,
        [`is${value.actionName}Error`]: false,
        [`${value.actionName}Error`]: {}
      }),
      [`${value.actionName}Success`]: (state, { payload }) => ({
        ...state,
        loading: false,
        [value.stateName]: payload.result
      }),
      [`${value.actionName}Failed`]: (state, { payload }) => ({
        ...state,
        loading: false,
        isError: true,
        [`${value.actionName}Error`]: true
      })
    };
  });
  reducerActions.forEach((value) => {
    const lastReducer = initialReducerActions;
    initialReducerActions = {
      ...lastReducer,
      [value.actionName]: (state, { payload }) => ({
        ...state,
        [value.stateName]: payload
      })
    };
  });

  const slice = createSlice({
    slice: moduleName,
    initialState,
    reducers: initialReducerActions
  });

  let exportApiActions = {};
  apiActions.forEach((value) => {
    const lastExportActions = exportApiActions;
    exportApiActions = {
      ...lastExportActions,
      [value.actionName]: createOperation({
        actions: {
          startAction: slice.actions[`${value.actionName}Started`],
          successAction: slice.actions[`${value.actionName}Success`],
          failAction: slice.actions[`${value.actionName}Failed`]
        },
        process: ({ payload }) => api[value.method](payload)
      })
    };
  });

  return {
    reducer: slice.reducer,
    actions: { ...slice.actions, ...exportApiActions }
  };
};

export default CreateResourceHandler;
