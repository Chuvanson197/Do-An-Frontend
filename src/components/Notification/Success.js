import React from 'react';
import PropTypes from 'prop-types';
import { notification, Icon } from 'antd';

const propTypes = {
  title: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]).isRequired,
  message: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]).isRequired
};

const SuccessNotification = (title, message) =>
  notification.open({
    message: <span style={{ color: '#4cd964', fontWeight: 'bold' }}>{title}</span>,
    description: message,
    duration: 2.5,
    icon: <Icon type="smile" style={{ color: '#4cd964' }} />
  });

SuccessNotification.propTypes = propTypes;

export default SuccessNotification;
