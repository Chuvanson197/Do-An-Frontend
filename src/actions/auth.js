const login = 'LOGIN';

export const dispatchLogin = (dispatch, user) => {
  dispatch({ type: login, user });
};
