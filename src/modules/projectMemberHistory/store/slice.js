import { createSlice } from './node_modules/redux-starter-kit';

const initialState = {
  projectMemberHistory: [],
  loading: false,
  loaded: false,
  isError: false,
  errors: undefined
};

const slice = createSlice({
  slice: 'projectMemberHistory',
  initialState,
  reducers: {
    getReposStart: (state) => ({
      ...state,
      loading: true,
      projectMemberHistory: [],
      isError: false,
      errors: undefined
    }),
    getReposSuccess: (state, { payload }) => ({
      ...state,
      loading: false,
      loaded: true,
      projectMemberHistory: payload.result
    }),
    getReposFailed: (state, { payload }) => ({
      ...state,
      loading: false,
      isError: true,
      errors: payload
    })
  }
});

export default slice;
