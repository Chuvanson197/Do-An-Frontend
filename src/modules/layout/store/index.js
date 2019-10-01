import createResourceHandler from '../../../ultis/createResourceHandler';

const reducerActions = [
  {
    actionName: 'selectItem',
    stateName: 'selectedItem'
  },
  {
    actionName: 'selectSubMenu',
    stateName: 'selectedSubMenu'
  },
  {
    actionName: 'setCollapse',
    stateName: 'isCollapsed'
  }
];
const defaultState = {
  selectedItem: [],
  selectedSubMenu: [],
  isCollapsed: false
};

const store = createResourceHandler('layout', [], reducerActions, defaultState);

export const { actions, reducer } = store;
