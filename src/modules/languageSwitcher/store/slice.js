import { createSlice } from 'redux-starter-kit';

const initialState = {
  locale: 'vi'
};

const slice = createSlice({
  slice: 'languageSwitcher',
  initialState,
  reducers: {
    handleChangeLanguage: (state, action) => ({
      ...initialState,
      locale: action.payload
    })
  }
});

export default slice;
