import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';

const propTypes = {
  onBack: PropTypes.func.isRequired
};

const BackButton = ({ onBack }) => (
  <Button type="primary" onClick={onBack}>
    <Icon type="left" />
    Backward
  </Button>
);

BackButton.propTypes = propTypes;

export default BackButton;
