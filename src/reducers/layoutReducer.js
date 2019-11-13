const initState = {
  isShow: true
};

export const layoutReducer = (state = initState, action) => {
  switch (action.type) {
    case 'HIDE_LAYOUT':
      return {
        ...state,
        isShow: false
      };
    case 'SHOW_LAYOUT':
      return {
        ...state,
        isShow: true
      };
    default:
      return state;
  }
};
