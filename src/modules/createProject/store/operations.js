import createOperation from '../../../ultis/createOperation';
import slice from './slice';
// import serviceApi from '../serviceApi';

const {
  actions: { postProjectNewStart, postProjectNewSuccess, postProjectNewFailed }
} = slice;

export const getProjectDetail = createOperation({
  actions: {
    startAction: postProjectNewStart,
    successAction: postProjectNewSuccess,
    failAction: postProjectNewFailed
  },
  // process: ({ payload }) => serviceApi.getProjectDetail()
});
