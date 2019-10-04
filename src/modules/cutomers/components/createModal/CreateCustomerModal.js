import React, { useCallback } from 'react';
import { formShape } from 'rc-form';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Modal, Input, Form } from 'antd';
import { css } from 'emotion';

import Footer from './Footer';

const propTypes = {
  createCustomer: PropTypes.func.isRequired,
  onClickCloseModal: PropTypes.func.isRequired,
  form: formShape.isRequired,
  isVisibleModal: PropTypes.bool.isRequired
};

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

const CreateCusmomer = ({ form, createCustomer, onClickCloseModal, isVisibleModal }) => {
  const handleSubmit = useCallback(() => {
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        createCustomer(values);
      } else {
        console.log(err);
      }
    });
  }, [form, createCustomer]);

  const onClickCancel = useCallback(() => {
    onClickCloseModal();
  }, [onClickCloseModal]);

  return (
    <Modal
      title={<FormattedMessage id="customers.customerModal.header.title" />}
      width="50vw"
      visible={isVisibleModal}
      className={styles.modal}
      onCancel={() => onClickCancel()}
      maskClosable={false}
      footer={<Footer onSubmit={handleSubmit} onCancel={onClickCancel} />}>
      <Form onSubmit={handleSubmit} {...formItemLayout}>
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
          label={<FormattedMessage id="customers.customerModal.form.projectName.title" />}
          validateStatus={form.getFieldError('project_name') ? 'error' : 'validating'}>
          {form.getFieldDecorator('project_name', {
            rules: [
              {
                required: true,
                message: <FormattedMessage id="customers.customerModal.form.projectName.validate" />
              }
            ]
          })(<Input />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

CreateCusmomer.propTypes = propTypes;

const CreateCusmomerModal = Form.create({ name: 'createCustomer' })(CreateCusmomer);

export default CreateCusmomerModal;
