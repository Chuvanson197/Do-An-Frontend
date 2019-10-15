import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button, Icon } from 'antd';

const propTypes = {
  onBack: PropTypes.func.isRequired
};

const BackButton = ({ onBack }) => (
  <Button type="primary" onClick={onBack}>
    <Icon type="left" />
    <FormattedMessage id="button.back" />
  </Button>
);

BackButton.propTypes = propTypes;

export default BackButton;
