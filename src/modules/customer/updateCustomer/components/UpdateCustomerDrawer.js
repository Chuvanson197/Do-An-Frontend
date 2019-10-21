import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { css } from 'emotion';
import { formShape } from 'rc-form';

import { Row, Drawer, Button, Input, Form, Popconfirm, notification, Icon, Typography } from 'antd';

import ErrorNotification from '../../../../components/Notification/Error';
import SuccessNotification from '../../../../components/Notification/Success';
import { actions as customerActions } from '../../store';

const propTypes = {
  intl: PropTypes.shape({}).isRequired,
  onClose: PropTypes.func.isRequired,
  drawerVisible: PropTypes.bool.isRequired,
  form: formShape.isRequired,

  customer: PropTypes.shape({})
};

const defaultProps = {
  customer: {}
};

const styles = {
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
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

const UpdateCustomer = ({ intl, drawerVisible, onClose, form, customer }) => {
  const dispatch = useDispatch();
  const { loading, updateCustomerResult, updateCustomerError, updateCustomerErrors } = useSelector(
    (state) => state.customers
  );

  // Handle showing notification after update project
  useEffect(() => {
    // show success notification
    if (updateCustomerResult) {
      const title = intl.formatMessage({ id: 'notification.success' });
      const message = intl.formatMessage({ id: updateCustomerResult.message });
      SuccessNotification(title, message);
      // close the modal and clean data
      onClose();
      // re-call get customers list
      dispatch(
        customerActions.getCustomers({
          path: 'customers'
        })
      );
    }
    // show error notification
    if (updateCustomerError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({
        id: updateCustomerErrors.message
          ? updateCustomerErrors.message
          : 'projects.updateProject.message.error'
      });
      ErrorNotification(title, message);
      // clean error
      dispatch(customerActions.updateCustomerCleanError(false));
    }
  }, [onClose, dispatch, intl, updateCustomerError, updateCustomerResult, updateCustomerErrors]);

  // Form submit
  const handleSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        const body = {
          staff_code: values.staff_code,
          address: values.address,
          phone_number: values.phone_number,
          email: values.email
        };

        const oldBody = {
          staff_code: customer.staff_code,
          address: customer.address,
          phone_number: customer.phone_number,
          email: customer.email
        };
        // check if value is not change
        if (JSON.stringify(body) === JSON.stringify(oldBody)) {
          const title = intl.formatMessage({ id: 'notification.error' });
          const message = intl.formatMessage({ id: 'notification.message.form.noChanging' });
          return ErrorNotification(title, message);
        }

        dispatch(customerActions.updateCustomer({ body, path: 'customers', param: customer.id }));
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
      return null;
    });
  };

  return (
    <Drawer
      title={<FormattedMessage id="projects.updateProject.title" />}
      placement="right"
      onClose={onClose}
      visible={drawerVisible}
      maskClosable={false}
      width={550}>
      <Form onSubmit={() => handleSubmit()} {...formItemLayout}>
        <Row style={{ marginBottom: 10 }}>
          <Icon type="user" style={{ marginRight: 10 }} />
          <Typography.Text style={{ fontWeight: 'bold' }}>
            {<FormattedMessage id="customers.createCustomers.customerInformation" />}
          </Typography.Text>
        </Row>

        <Form.Item
          style={{ display: 'flex' }}
          label={<FormattedMessage id="customers.customerModal.form.customerName.title" />}
          validateStatus={form.getFieldError('name') ? 'error' : 'validating'}>
          {form.getFieldDecorator('name', {
            initialValue: customer.name,
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
            initialValue: customer.address,

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
            initialValue: customer.email,

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
            initialValue: customer.phone_number,

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
      <Row className={styles.drawerFooter}>
        <Popconfirm
          title={<FormattedMessage id="projects.updateProject.confirm.add" />}
          onConfirm={() => handleSubmit()}
          okText={<FormattedMessage id="button.confirm.yes" />}
          cancelText={<FormattedMessage id="button.confirm.no" />}>
          <Button icon="edit" type="primary" loading={loading}>
            {<FormattedMessage id="button.update" />}
          </Button>
        </Popconfirm>
        <Button
          style={{ marginLeft: 15 }}
          icon="close-circle"
          type="default"
          key="close"
          onClick={onClose}>
          {<FormattedMessage id="button.close" />}
        </Button>
      </Row>
    </Drawer>
  );
};

UpdateCustomer.propTypes = propTypes;

UpdateCustomer.defaultProps = defaultProps;

const UpdateCustomerForm = Form.create({ name: 'updateCustomer' })(UpdateCustomer);

export default injectIntl(UpdateCustomerForm, {});
