import createOperation from '../../../ultis/createOperation';
import slice from './slice';
import service from '../service';

const {
  actions: { getProjectDetailStart, getProjectDetailSuccess, getProjectDetailFailed }
} = slice;

export const getProjectDetail = createOperation({
  actions: {
    startAction: getProjectDetailStart,
    successAction: getProjectDetailSuccess,
    failAction: getProjectDetailFailed
  },
  process: ({ payload }) => service.getProjectDetail(payload)
});
