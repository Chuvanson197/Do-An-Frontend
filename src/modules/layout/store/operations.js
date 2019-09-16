import slice from './slice';

const {
  actions: { handleSelect, handleSelectSubMenu, setDefault, handleSetCollapse }
} = slice;

export const selectItem = (selectedKeys) => {
  return handleSelect(selectedKeys);
};

export const selectSubMenu = (selectedKeys) => {
  return handleSelectSubMenu(selectedKeys);
};

export const setDefaultSider = () => {
  return setDefault();
};

export const setCollapse = () => {
  return handleSetCollapse();
};
