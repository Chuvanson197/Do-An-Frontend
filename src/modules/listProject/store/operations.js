import createOperation from '../../../ultis/createOperation';
import slice from './slice';
import serviceApi from '../serviceApi';

const {
  actions: { getProjectListStart, getProjectListSuccess, getProjectListFailed }
} = slice;

export const getProjectList = createOperation({
  actions: {
    startAction: getProjectListStart,
    successAction: getProjectListSuccess,
    failAction: getProjectListFailed
  },
  process: ({ payload }) => serviceApi.getProjectList()
});
