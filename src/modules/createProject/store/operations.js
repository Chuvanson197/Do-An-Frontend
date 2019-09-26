import createOperation from '../../../ultis/createOperation';
import slice from './slice';
// import serviceApi from '../serviceApi';

const {
  actions: { createProjectStart, createProjectSuccess, createProjectFailed }
} = slice;

export const getProjectDetail = createOperation({
  actions: {
    startAction: createProjectStart,
    successAction: createProjectSuccess,
    failAction: createProjectFailed
  },
  // process: ({ payload }) => serviceApi.getProjectDetail()
});
