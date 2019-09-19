import { createSlice } from 'redux-starter-kit';

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
    getProjectMemeberHistoryStart: (state) => ({
      ...state,
      projectMemberHistory: [],
      loading: true,
      loaded: false,
      isError: false,
      errors: undefined
    }),
    getProjectMemeberHistorySuccess: (state, { payload }) => ({
      ...state,
      projectMemberHistory: payload.result,
      loading: false,
      loaded: true
    }),
    getProjectMemeberHistoryFailed: (state, { payload }) => ({
      ...state,
      loading: false,
      isError: true,
      errors: payload
    })
  }
});

export default slice;
