import { createSlice } from 'redux-starter-kit';

const initialState = {
  projectDetail: {},
  loading: false,
  loaded: false,
  isError: false,
  error: null
};

const slice = createSlice({
  slice: 'projectDetail',
  initialState,
  reducers: {
    getProjectDetailStart: (state) => ({
      ...state,
      loading: true,
      loaded: false,
      isError: false,
      error: null
    }),
    getProjectDetailSuccess: (state, { payload }) => ({
      ...state,
      projectDetail: payload.result,
      loading: false,
      loaded: true
    }),
    getProjectDetailFailed: (state, { payload }) => ({
      ...state,
      loading: false,
      loaded: false,
      isError: true,
      error: payload.result
    }),
    updateProjectDetail: (state, { payload }) => ({
      ...state,
      projectDetail: {
        ...payload
      }
    })
  }
});

export default slice;
