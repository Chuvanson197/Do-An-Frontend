import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { formShape } from 'rc-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { css } from 'emotion';

import { Row, Modal, Button, Input, Form, Icon, Popconfirm, Typography } from 'antd';

import { actions as customerActions } from '../../store';
import ErrorNotification from '../../../../components/Notification/Error';
import SuccessNotification from '../../../../components/Notification/Success';
import modalConfig from '../../../../utils/modal.config';

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

const CreateCustomerModal = ({ visible, close, form, intl }) => {
  const dispatch = useDispatch();
  const { createCustomerResult, createCustomerError, createCustomerErrors, loading } = useSelector(
    (state) => state.customers
  );

  // Handle showing notification after add new customer
  useEffect(() => {
    // show success notification
    if (createCustomerResult) {
      const title = intl.formatMessage({ id: 'notification.success' });
      const message = intl.formatMessage({ id: createCustomerResult.message });
      SuccessNotification(title, message);
      // close the modal and clean data
      close();
      // re-call get all customers api
      dispatch(
        customerActions.getCustomers({
          path: 'customers'
        })
      );
    }
    // show error notification
    if (createCustomerError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({
        id: createCustomerErrors.message
          ? createCustomerErrors.message
          : 'projects.createProject.message.error'
      });
      ErrorNotification(title, message);
      // clean error
      dispatch(customerActions.createCustomerCleanError(false));
    }
  }, [close, dispatch, intl, createCustomerError, createCustomerErrors, createCustomerResult]);

  // Form submit
  const handleSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        const body = {
          address: values.address,
          name: values.name,
          phone_number: values.phone_number,
          email: values.email
        };
        // call api when valid data
        dispatch(customerActions.createCustomer({ body, path: 'customers' }));
      } else {
        // showing error form input notification
        const title = intl.formatMessage({ id: 'notification.error' });
        const message = intl.formatMessage({ id: 'notification.message.form.error' });
        ErrorNotification(title, message);
      }
    });
  };

  return (
    <Modal
      title={<FormattedMessage id="customers.customerModal.headerCreateCustomer.title" />}
      visible={visible}
      width={550}
      className={styles.modal}
      onCancel={() => close()}
      footer={[
        <Row type="flex" key="abc" justify="end">
          <Popconfirm
            title={<FormattedMessage id="customers.createCustomers.confirm.create" />}
            onConfirm={() => handleSubmit()}
            okText={<FormattedMessage id="button.confirm.yes" />}
            cancelText={<FormattedMessage id="button.confirm.no" />}>
            <Button icon="plus" type="primary" loading={loading}>
              <FormattedMessage id="button.add" />
            </Button>
          </Popconfirm>
          <Button
            icon="close-circle"
            type="default"
            key="close"
            onClick={() => close()}
            disabled={loading}>
            <FormattedMessage id="button.close" />
          </Button>
        </Row>
      ]}
      {...modalConfig}>
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

CreateCustomerModal.propTypes = propTypes;

CreateCustomerModal.defaultProps = defaultProps;

const CreateCustomerForm = Form.create({ name: 'createCustomer' })(CreateCustomerModal);

export default injectIntl(CreateCustomerForm, {});
