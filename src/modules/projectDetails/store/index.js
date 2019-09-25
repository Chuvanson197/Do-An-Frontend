import slice from './slice';
import * as operations from './operations';

export const { reducer } = slice;

export const actions = {
  ...slice.actions,
  ...operations
};
