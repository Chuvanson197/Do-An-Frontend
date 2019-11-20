const hideLayout = 'HIDE_LAYOUT';
const showLayout = 'SHOW_LAYOUT';

export const dispatchHideLayout = (dispatch) => {
  dispatch({ type: hideLayout });
};

export const dispatchShowLayout = (dispatch) => {
  dispatch({ type: showLayout });
};
