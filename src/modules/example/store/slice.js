import { createSlice } from 'redux-starter-kit';

const initialState = {
  repos: [],
  loading: false,
  loaded: false,
  isError: false,
  errors: undefined
};

const slice = createSlice({
  slice: 'example',
  initialState,
  reducers: {
    getReposStart: (state) => ({
      ...state,
      loading: true,
      repos: [],
      isError: false,
      errors: undefined
    }),
    getReposSuccess: (state, { payload }) => ({
      ...state,
      loading: false,
      loaded: true,
      repos: payload.result
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
