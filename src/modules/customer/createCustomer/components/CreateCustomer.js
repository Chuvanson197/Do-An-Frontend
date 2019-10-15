import React from 'react';
import { formShape } from 'rc-form';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Row, Modal, Button, Input, Form, notification, Icon, Popconfirm } from 'antd';
import { useDispatch } from 'react-redux';
import { css } from 'emotion';

import { actions as AddCustomerActions } from '../store';

const propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  form: formShape.isRequired,

  listStatus: PropTypes.arrayOf(PropTypes.shape({})),
  listCustomer: PropTypes.arrayOf(PropTypes.shape({})),
  selectedCustomer: PropTypes.shape({})
};

const defaultProps = [];

const styles = {
  modal: css``
};

const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 19
  }
};

const CreateCustomer = ({ visible, close, form, intl }) => {
  const dispath = useDispatch();
  const handleSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        const body = {
          address: values.address,
          name: values.name,
          phone_number: values.phone_number,
          email: values.email
        };
        dispath(AddCustomerActions.createCustomer({ body }));
      } else {
        notification.open({
          message: (
            <span style={{ color: '#f5222d', fontWeight: 'bold' }}>
              {intl.formatMessage({ id: 'notification.error' })}
            </span>
          ),
          description: intl.formatMessage({ id: 'notification.message.form.error' }),
          duration: 2,
          icon: <Icon type="frown" style={{ color: '#f5222d' }} />
        });
      }
    });
  };

  return (
    <Modal
      title={<FormattedMessage id="customers.customerModal.headerCreateCustomer.title" />}
      cancelText="Close"
      visible={visible}
      width="40vw"
      className={styles.modal}
      onCancel={() => close()}
      maskClosable={false}
      footer={[
        <Row type="flex" key="abc" justify="end">
          <Popconfirm
            title={<FormattedMessage id="customers.customerModal.confirm.create" />}
            onConfirm={() => handleSubmit()}
            okText={<FormattedMessage id="customers.customerModal.button.confirm.yes" />}
            cancelText={<FormattedMessage id="customers.customerModal.button.confirm.no" />}>
            <Button icon="plus" type="primary">
              <FormattedMessage id="customers.customerModal.createButton.title" />
            </Button>
          </Popconfirm>
          <Button icon="close-circle" type="default" key="close" onClick={() => close()}>
            <FormattedMessage id="customers.customerModal.cancelButton.title" />
          </Button>
        </Row>
      ]}>
      <Form onSubmit={() => handleSubmit()} {...formItemLayout}>
        <Form.Item
          style={{ display: 'flex' }}
          label={<FormattedMessage id="customers.customerModal.form.customerName.title" />}
          validateStatus={form.getFieldError('name') ? 'error' : 'validating'}>
          {form.getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: (
                  <FormattedMessage id="customers.customerModal.form.customerName.validate" />
                )
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item
          style={{ display: 'flex' }}
          label={<FormattedMessage id="customers.customerModal.form.customerAddress.title" />}
          validateStatus={form.getFieldError('address') ? 'error' : 'validating'}>
          {form.getFieldDecorator('address', {
            rules: [
              {
                required: true,
                message: (
                  <FormattedMessage id="customers.customerModal.form.customerAddress.validate" />
                )
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item
          style={{ display: 'flex' }}
          label={<FormattedMessage id="customers.customerModal.form.customerEmail.title" />}
          validateStatus={form.getFieldError('email') ? 'error' : 'validating'}>
          {form.getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: (
                  <FormattedMessage id="customers.customerModal.form.customerEmail.validate.type" />
                )
              },
              {
                required: true,
                message: (
                  <FormattedMessage id="customers.customerModal.form.customerEmail.validate" />
                )
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item
          style={{ display: 'flex' }}
          label={<FormattedMessage id="customers.customerModal.form.customerPhonenumber.title" />}
          validateStatus={form.getFieldError('phone_number') ? 'error' : 'validating'}>
          {form.getFieldDecorator('phone_number', {
            rules: [
              {
                required: true,
                message: (
                  <FormattedMessage id="customers.customerModal.form.customerPhonenumber.validate" />
                )
              }
            ]
          })(<Input />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

CreateCustomer.propTypes = propTypes;

CreateCustomer.defaultProps = defaultProps;

const CreateCustomerForm = Form.create({ name: 'createCustomer' })(CreateCustomer);

export default injectIntl(CreateCustomerForm, {});
