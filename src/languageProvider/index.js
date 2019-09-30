import Enlang from './entries/en_US';
import Vilang from './entries/vi_VN';

import { addLocaleData } from 'react-intl';

const AppLocale = {
  en: Enlang,
  vi: Vilang
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.vi.data);

export default AppLocale;
