import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { actions } from '../store';
import { Select } from 'antd';
import { languageOptions } from './options';

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const { locale } = useSelector((state) => state.languageSwitcher);

  const defaultValue = () => {
    const { value } = languageOptions.find((item) => item.id === locale);
    return <FormattedMessage id={value} />;
  };

  const handleChangeLanguage = (value) => {
    dispatch(actions.switchLanguage(value));
  };

  return (
    <React.Fragment>
      <Select
        style={{ width: 140 }}
        defaultValue={defaultValue()}
        onChange={(value) => handleChangeLanguage(value)}>
        {languageOptions.map((item, index) => (
          <Select.Option key={index} value={item.id}>
            <FormattedMessage id={item.value} />
          </Select.Option>
        ))}
      </Select>
    </React.Fragment>
  );
};

export default LanguageSwitcher;
