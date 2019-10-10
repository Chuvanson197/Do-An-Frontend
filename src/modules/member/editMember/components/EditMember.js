import React from 'react';
import { formShape } from 'rc-form';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Modal, Button, Input, Form } from 'antd';
import { css } from 'emotion';

const propTypes = {
  // Member: PropTypes.shape({
  //   full_name: PropTypes.string,
  //   staff_code: PropTypes.string,
  //   phone_number: PropTypes.string,
  //   email: PropTypes.string
  // })
};

const defaultProps = {
  // Member: {
  //   full_name: PropTypes.string,
  //   staff_code: PropTypes.string,
  //   phone_number: PropTypes.string,
  //   email: PropTypes.string
  // }
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

const EditMember = ({ visible, close, form, data }) => {
  const handleSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      } else {
        console.log(err);
      }
    });
  };

  return (
    <Modal
      title={<FormattedMessage id="members.memberModal.headerEditMember.title" />}
      cancelText="Close"
      visible={visible}
      width="40vw"
      className={styles.modal}
      onCancel={() => close()}
      maskClosable={false}
      footer={[
        <Row type="flex" key="abc" justify="end">
          <Button icon="edit" type="primary" onClick={() => handleSubmit()}>
            <FormattedMessage id="members.memberModal.editButton.title" />
          </Button>
          <Button icon="close-circle" type="default" key="close" onClick={() => close()}>
            <FormattedMessage id="members.memberModal.cancelButton.title" />
          </Button>
        </Row>
      ]}>
      <Form onSubmit={() => handleSubmit()} {...formItemLayout}>
        <Form.Item
          style={{ display: 'flex' }}
          label={<FormattedMessage id="members.memberModal.form.memberStaffcode.title" />}
          validateStatus={form.getFieldError('staff_code') ? 'error' : 'validating'}>
          {form.getFieldDecorator('staff_code', {
            initialValue: data.staff_code,
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
            initialValue: data.full_name,

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
            initialValue: data.phone_number,

            rules: [
              {
                required: true,
                message: (
                  <FormattedMessage id="members.memberModal.form.memberPhonenumber.validate" />
                )
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item
          style={{ display: 'flex' }}
          label={<FormattedMessage id="members.memberModal.form.memberEmail.title" />}
          validateStatus={form.getFieldError('email') ? 'error' : 'validating'}>
          {form.getFieldDecorator('email', {
            initialValue: data.email,

            rules: [
              {
                type: 'email',
                message: (
                  <FormattedMessage id="members.memberModal.form.memberEmail.validate.type" />
                )
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

EditMember.propTypes = propTypes;

EditMember.defaultProps = defaultProps;

const EditMemberForm = Form.create({ name: 'editMember' })(EditMember);

export default EditMemberForm;
