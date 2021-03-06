export default ({ actions = {}, process = () => {} }) => (payload) => async (
  dispatch,
  getState
) => {
  const execute = async () => {
    const { startAction, successAction, failAction } = actions;

    startAction && dispatch(startAction(payload));
    try {
      const result = await process({ payload, dispatch, getState });

      successAction && dispatch(successAction({ result, params: payload }));

      return result;
    } catch (error) {
      if (error.response && error.response.status) {
        return failAction && dispatch(failAction(error.response.data));
      }
      return failAction && dispatch(failAction(error));
    }
  };

  return execute();
};
