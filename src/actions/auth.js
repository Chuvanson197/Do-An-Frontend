const login = 'LOGIN';

export const dispatchLogin = (dispatch, user) => {
  console.log('user', user);
  dispatch({ type: login, user });
};
