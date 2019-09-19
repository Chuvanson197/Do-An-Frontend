import { createSlice } from 'redux-starter-kit';

const initialState = {
  projectList: [],
  loading: false,
  loaded: false,
  isError: false,
  error: null
};

const slice = createSlice({
  slice: 'projectList',
  initialState,
  reducers: {
    getProjectListStart: (state) => ({
      ...state,
      loading: true,
      loaded: false,
      isError: false,
      error: null
    }),
    getProjectListSuccess: (state, { payload }) => ({
      ...state,
      projectList: payload.result,
      loading: false,
      loaded: true
    }),
    getProjectListFailed: (state, { payload }) => ({
      ...state,
      loading: false,
      loaded: false,
      isError: true,
      error: payload.result
    })
  }
});

export default slice;
