import createOperation from '../../../ultis/createOperation';
import slice from './slice';
import serviceApi from '../serviceApi';

const {
  actions: { getProjectDetailStart, getProjectDetailSuccess, getProjectDetailFailed }
} = slice;

export const getProjectDetail = createOperation({
  actions: {
    startAction: getProjectDetailStart,
    successAction: getProjectDetailSuccess,
    failAction: getProjectDetailFailed
  },
  process: ({ payload }) => serviceApi.getProjectDetail()
});
