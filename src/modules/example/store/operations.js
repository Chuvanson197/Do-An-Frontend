import createOperation from '../../../ultis/createOperation';
import exampleService from '../service';
import slice from './slice';

const {
  actions: { getReposStart, getReposSuccess, getReposFailed }
} = slice;

export const getRepos = createOperation({
  actions: {
    startAction: getReposStart,
    successAction: getReposSuccess,
    failAction: getReposFailed
  },
  process: ({ payload }) => exampleService.getReposByUsername(payload)
});
