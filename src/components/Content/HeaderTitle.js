import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider } from 'antd';

const propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]).isRequired
};

const defaultProps = {};

const HeaderTitle = ({ title }) => (
  <React.Fragment>
    <Typography.Title level={2}>{title}</Typography.Title>
    <Divider />
  </React.Fragment>
);

HeaderTitle.propTypes = propTypes;

HeaderTitle.defaultProps = defaultProps;

export default HeaderTitle;
