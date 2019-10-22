import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Row, Button, Input, Form, Popconfirm, Drawer, Typography, Icon } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { css } from 'emotion';
import { formShape } from 'rc-form';

import { actions as memberActions } from '../../store';
import ErrorNotification from '../../../../components/Notification/Error';
import SuccessNotification from '../../../../components/Notification/Success';

const propTypes = {
  intl: PropTypes.shape({}).isRequired,
  close: PropTypes.func.isRequired,
  form: formShape.isRequired,
  data: PropTypes.shape({})
};

const defaultProps = {
  data: {}
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

const EditMember = ({ intl, visible, close, form, data }) => {
  const dispatch = useDispatch();
  const { updateMemberResult, updateMemberError, updateMemberErrors } = useSelector(
    (state) => state.members
  );
  useEffect(() => {
    // show success notification
    if (updateMemberResult) {
      const title = intl.formatMessage({ id: 'notification.success' });
      const message = intl.formatMessage({ id: updateMemberResult.message });
      SuccessNotification(title, message);
      // close the modal and clean data
      close();
      // re-call get members list
      dispatch(
        memberActions.getMembers({
          path: 'members'
        })
      );
    }
    // show error notification
    if (updateMemberError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({
        id: updateMemberErrors.message
          ? updateMemberErrors.message
          : 'projects.updateProject.message.error'
      });
      ErrorNotification(title, message);
      // clean error
      dispatch(memberActions.updateMemberCleanError(false));
    }
  }, [close, dispatch, intl, updateMemberError, updateMemberResult, updateMemberErrors]);

  const handleSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        const body = {
          staff_code: values.staff_code,
          full_name: values.full_name,
          phone_number: values.phone_number,
          email: values.email
        };
        const oldBody = {
          staff_code: data.staff_code,
          full_name: data.full_name,
          phone_number: data.phone_number,
          email: data.email
        };
        if (JSON.stringify(body) === JSON.stringify(oldBody)) {
          const title = intl.formatMessage({ id: 'notification.error' });
          const message = intl.formatMessage({ id: 'notification.message.form.noChanging' });
          return ErrorNotification(title, message);
        }
        dispatch(memberActions.updateMember({ body, path: 'members', param: data.staff_code }));
      } else {
        const title = intl.formatMessage({ id: 'notification.error' });
        const message = intl.formatMessage({ id: 'notification.message.form.error' });
        ErrorNotification(title, message);
      }
      return null;
    });
  };

  return (
    <Drawer
      title={<FormattedMessage id="members.memberModal.headerEditMember.title" />}
      visible={visible}
      width={550}
      className={styles.modal}
      onClose={close}
      maskClosable={false}>
      <Form onSubmit={() => handleSubmit()} {...formItemLayout}>
      <Row style={{ marginBottom: 10 }}>
          <Icon type="user" style={{ marginRight: 10 }} />
          <Typography.Text style={{ fontWeight: 'bold' }}>
            {<FormattedMessage id="members.createMembers.memberInformation" />}
          </Typography.Text>
        </Row>
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
      <Row type="flex" justify="end" className={styles.drawerFooter}>
        <Popconfirm
          title={<FormattedMessage id="members.memberModal.confirm.edit" />}
          onConfirm={() => handleSubmit()}
          okText={<FormattedMessage id="members.memberModal.button.confirm.yes" />}
          cancelText={<FormattedMessage id="members.memberModal.button.confirm.no" />}>
          <Button icon="edit" type="primary">
            <FormattedMessage id="members.memberModal.editButton.title" />
          </Button>
        </Popconfirm>
        <Button icon="close-circle" type="default" key="close" onClick={() => close()}>
          <FormattedMessage id="members.memberModal.cancelButton.title" />
        </Button>
      </Row>
    </Drawer>
  );
};

EditMember.propTypes = propTypes;

EditMember.defaultProps = defaultProps;

const EditMemberForm = Form.create({ name: 'editMember' })(EditMember);

export default injectIntl(EditMemberForm, {});
