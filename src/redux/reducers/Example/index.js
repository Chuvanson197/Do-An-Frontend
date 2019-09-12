import { createSlice } from 'redux-starter-kit';

const initialState = { count: 1 };

const todosSlice = createSlice({
  slice: 'example',
  initialState,
  reducers: {
    increment(state, action) {
      return { ...state, count: state.count + 1 };
    },
    decrement(state, action) {
      return { ...state, count: state.count - 1 };
    }
  }
});

export const { decrement, increment } = todosSlice.actions;

export default todosSlice.reducer;
