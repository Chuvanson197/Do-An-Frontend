const initState = {
  isLogin: false,
  user: {}
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLogin: true,
        user: action.user
      };
    default:
      return state;
  }
};
