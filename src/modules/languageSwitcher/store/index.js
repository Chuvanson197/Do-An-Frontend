import createResourceHandler from '../../../ultis/createResourceHandler';

const reducerActions = [
  {
    actionName: 'switchLanguage',
    stateName: 'locale'
  }
];
const defaultState = {
  locale: 'vi'
};

const store = createResourceHandler('languageSwitcher', [], reducerActions, defaultState);

export const { actions, reducer } = store;
