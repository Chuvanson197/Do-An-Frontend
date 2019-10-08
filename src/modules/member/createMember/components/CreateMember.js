import React, { useCallback } from 'react';
import { formShape } from 'rc-form';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Modal, Input, Form } from 'antd';
import { css } from 'emotion';

import Footer from './Footer';

const propTypes = {
  createMember: PropTypes.func.isRequired,
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

const CreateMember = ({ form, createMember, onClickCloseModal, isVisibleModal }) => {
  const handleSubmit = useCallback(() => {
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        createMember(values);
      } else {
        console.log(err);
      }
    });
  }, [form, createMember]);

  const onClickCancel = useCallback(() => {
    onClickCloseModal();
  }, [onClickCloseModal]);

  return (
    <Modal
      title={<FormattedMessage id="members.memberModal.header.title" />}
      width="35vw"
      visible={isVisibleModal}
      className={styles.modal}
      onCancel={() => onClickCancel()}
      maskClosable={false}
      footer={<Footer onSubmit={handleSubmit} onCancel={onClickCancel} />}>
      <Form onSubmit={handleSubmit} {...formItemLayout}>
        <Form.Item
          style={{ display: 'flex' }}
          label={<FormattedMessage id="members.memberModal.form.memberStaffcode.title" />}
          validateStatus={form.getFieldError('staff_code') ? 'error' : 'validating'}>
          {form.getFieldDecorator('staff_code', {
            rules: [
              {
                required: true,
                message: <FormattedMessage id="members.memberModal.form.memberStaffcode.validate" />
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item
          style={{ display: 'flex' }}
          label={<FormattedMessage id="members.memberModal.form.memberFullname.title" />}
          validateStatus={form.getFieldError('full_name') ? 'error' : 'validating'}>
          {form.getFieldDecorator('full_name', {
            rules: [
              {
                required: true,
                message: <FormattedMessage id="members.memberModal.form.memberFullNname.validate" />
              }
            ]
          })(<Input />)}
        </Form.Item>

        <Form.Item
          style={{ display: 'flex' }}
          label={<FormattedMessage id="members.memberModal.form.memberPhonenumber.title" />}
          validateStatus={form.getFieldError('phone_number') ? 'error' : 'validating'}>
          {form.getFieldDecorator('phone_number', {
            rules: [
              {
                required: true,
                message: <FormattedMessage id="members.memberModal.form.memberPhonenumber.validate" />
              }
            ]
          })(<Input />)}
        </Form.Item>

        <Form.Item
          style={{ display: 'flex' }}
          label={<FormattedMessage id="members.memberModal.form.memberEmail.title" />}
          validateStatus={form.getFieldError('email') ? 'error' : 'validating'}>
          {form.getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: <FormattedMessage id="members.memberModal.form.memberEmail.validate.type" />,
              },
              {
                required: true,
                message: <FormattedMessage id="members.memberModal.form.memberEmail.validate" />
              }
            ]
          })(<Input />)}
        </Form.Item>

      </Form>
    </Modal>
  );
};

CreateMember.propTypes = propTypes;

const CreateMemberModal = Form.create({ name: 'createMember' })(CreateMember);

export default CreateMemberModal;
