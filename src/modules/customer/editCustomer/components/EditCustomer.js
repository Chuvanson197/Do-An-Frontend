import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Row, Drawer, Button, Input, Form, Popconfirm, notification, Icon } from 'antd';
import { useDispatch } from 'react-redux';
import { css } from 'emotion';

import { actions as editCustomerActions } from '../store';

const propTypes = {
  intl: PropTypes.shape({}).isRequired
  // Customer: PropTypes.shape({
  //   address: PropTypes.string,
  //   staff_code: PropTypes.string,
  //   phone_number: PropTypes.string,
  //   email: PropTypes.string
  // })
};

const defaultProps = {
  // Customer: {
  //   address: PropTypes.string,
  //   staff_code: PropTypes.string,
  //   phone_number: PropTypes.string,
  //   email: PropTypes.string
  // }
};

const styles = {
  modal: css``,
  drawerFooter: css`
    position: absolute;
    bottom: 0;
    right: 24px;
    left: 24px;
    padding: 24px 0px;
  `
};

const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 19
  }
};

const EditCustomer = ({ intl, visible, close, form, data }) => {
  const dispath = useDispatch();

  const handleSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        const body = {
          staff_code: values.staff_code,
          address: values.address,
          phone_number: values.phone_number,
          email: values.email
        };
        dispath(editCustomerActions.editCustomer({ body, path: 'customers', param: data.id }));
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
    <Drawer
      title={<FormattedMessage id="customers.customerModal.headerEditCustomer.title" />}
      visible={visible}
      width={550}
      className={styles.modal}
      onClose={close}
      maskClosable={false}>
      <Form onSubmit={() => handleSubmit()} {...formItemLayout}>
        <Form.Item
          style={{ display: 'flex' }}
          label={<FormattedMessage id="customers.customerModal.form.customerName.title" />}
          validateStatus={form.getFieldError('name') ? 'error' : 'validating'}>
          {form.getFieldDecorator('name', {
            initialValue: data.name,
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
            initialValue: data.address,

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
            initialValue: data.email,

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
            initialValue: data.phone_number,

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
      <Row type="flex" key="abc" justify="end" className={styles.drawerFooter}>
        <Popconfirm
          title={<FormattedMessage id="customers.customerModal.confirm.edit" />}
          onConfirm={() => {
            handleSubmit();
            close();
          }}
          okText={<FormattedMessage id="customers.customerModal.button.confirm.yes" />}
          cancelText={<FormattedMessage id="customers.customerModal.button.confirm.no" />}>
          <Button icon="edit" type="primary">
            <FormattedMessage id="customers.customerModal.editButton.title" />
          </Button>
        </Popconfirm>
        <Button icon="close-circle" type="default" key="close" onClick={() => close()}>
          <FormattedMessage id="customers.customerModal.cancelButton.title" />
        </Button>
      </Row>
    </Drawer>
  );
};

EditCustomer.propTypes = propTypes;

EditCustomer.defaultProps = defaultProps;

const EditCustomerForm = Form.create({ name: 'editCustomer' })(EditCustomer);

export default injectIntl(EditCustomerForm, {});
