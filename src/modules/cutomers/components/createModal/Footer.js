import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Button } from 'antd';

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

const Footer = ({ onSubmit, onCancel }) => {
  return (
    <React.Fragment>
      <Row type="flex" key="abc" justify="end">
        <Button icon="plus" type="primary" onClick={() => onSubmit()}>
          <FormattedMessage id="customers.customerModal.createButton.title" />
        </Button>
        <Button icon="close-circle" type="default" key="close" onClick={() => onCancel()}>
          <FormattedMessage id="customers.customerModal.cancelButton.title" />
        </Button>
      </Row>
    </React.Fragment>
  );
};

Footer.propTypes = propTypes;

export default Footer;
