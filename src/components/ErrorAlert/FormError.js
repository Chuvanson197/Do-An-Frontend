import React from 'react';
import { formShape } from 'rc-form';
import { Typography, Icon } from 'antd';
import PropTypes from 'prop-types';
import { css } from 'emotion';

const propTypes = {
  form: formShape.isRequired,
  label: PropTypes.string.isRequired
};

const defaultProps = {};

const styles = {
  errorMsg: css`
    font-size: 12px;
    color: red !important;
    margin-left: 5px;
  `
};

const FormError = ({ form, label }) => {
  return form.getFieldError(label) ? (
    <Typography.Paragraph className={styles.errorMsg}>
      <Icon type="stop" theme="filled" style={{ marginRight: 5 }} />
      {form.getFieldError(label)[0]}
    </Typography.Paragraph>
  ) : null;
};

FormError.propTypes = propTypes;

FormError.defaultProps = defaultProps;

export default FormError;
