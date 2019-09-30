import slice from './slice';

const {
  actions: { handleChangeLanguage }
} = slice;

export const switchLanguage = (locale) => {
  return handleChangeLanguage(locale);
};
