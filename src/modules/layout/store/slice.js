import { createSlice } from 'redux-starter-kit';

const initialState = {
  sider: {
    selectedItem: ['0'],
    selectedSubMenu: [],
    isCollapsed: false
  }
};

const slice = createSlice({
  slice: 'example',
  initialState,
  reducers: {
    handleSelect: (state, action) => ({
      ...initialState,
      sider: {
        ...state.sider,
        selectedItem: action.payload
      }
    }),
    handleSelectSubMenu: (state, action) => ({
      ...initialState,
      sider: {
        ...state.sider,
        selectedSubMenu: action.payload
      }
    }),
    handleSetCollapse: (state) => ({
      ...state,
      sider: {
        ...state.sider,
        isCollapsed: !state.sider.isCollapsed
      }

    }),
    setDefault: () => ({
      sider: {
        selectedItem: 0,
        selectedSubMenu: null
      }
    })
  }
});

export default slice;
