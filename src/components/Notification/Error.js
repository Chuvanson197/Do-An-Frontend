import React from 'react';
import PropTypes from 'prop-types';
import { notification, Icon } from 'antd';

const propTypes = {
  title: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]).isRequired,
  message: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]).isRequired
};

const ErrorNotification = (title, message) =>
  notification.open({
    message: <span style={{ color: '#f5222d', fontWeight: 'bold' }}>{title}</span>,
    description: message,
    duration: 2.5,
    icon: <Icon type="frown" style={{ color: '#f5222d' }} />
  });

ErrorNotification.propTypes = propTypes;

export default ErrorNotification;
