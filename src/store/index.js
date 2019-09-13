import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from 'redux-starter-kit';

import { reducer as exampleReducer } from '../modules/example/store';

const reducer = combineReducers({
  example: exampleReducer
});

const rootReducer = (state, action) => reducer(state, action);

const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer,
  middleware
});

export default store;
