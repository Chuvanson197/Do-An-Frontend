import { createSlice } from 'redux-starter-kit';

const initialState = {
  projectNew: {},
  loading: false,
  loaded: false,
  isError: false,
  error: null
};

const slice = createSlice({
  slice: 'projectNew',
  initialState,
  reducers: {
    createProjectStart: (state) => ({
      ...state,
      loading: true,
      loaded: false,
      isError: false,
      error: null
    }),
    createProjectSuccess: (state, { payload }) => ({
      ...state,
      projectNew: payload.result,
      loading: false,
      loaded: true
    }),
    createProjectFailed: (state, { payload }) => ({
      ...state,
      loading: false,
      loaded: false,
      isError: true,
      error: payload.result
    })
  }
});

export default slice;
