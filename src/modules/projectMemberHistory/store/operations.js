import createOperation from '../../../ultis/createOperation';
import slice from './slice';
import serviceApi from '../serviceApi';

const {
  actions: {
    getProjectMemeberHistoryStart,
    getProjectMemeberHistorySuccess,
    getProjectMemeberHistoryFailed
  }
} = slice;

export const getProjectMemberHistory = createOperation({
  actions: {
    startAction: getProjectMemeberHistoryStart,
    successAction: getProjectMemeberHistorySuccess,
    failAction: getProjectMemeberHistoryFailed
  },
  process: ({ payload }) => serviceApi.getProjectMemberHistory()
});
