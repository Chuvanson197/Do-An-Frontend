import React, { useEffect } from 'react';
import { formShape } from 'rc-form';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Row, Modal, Button, Input, Form, notification, Icon, Popconfirm, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { css } from 'emotion';

import { actions as memberActions } from '../../store';
import ErrorNotification from '../../../../components/Notification/Error';
import SuccessNotification from '../../../../components/Notification/Success';
import modalConfig from '../../../../utils/modal.config';

const propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  form: formShape.isRequired,

  listStatus: PropTypes.arrayOf(PropTypes.shape({})),
  listMember: PropTypes.arrayOf(PropTypes.shape({})),
  selectedMember: PropTypes.shape({}),

  getMembers: PropTypes.func.isRequired,
  createMember: PropTypes.func.isRequired
};

const defaultProps = [];

const styles = {
  modal: css``
};

const formItemLayout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 17
  }
};

const CreateMember = ({ visible, close, form, intl, getMembers, createMember }) => {
  const dispatch = useDispatch();
  const { createMemberResult, createMemberError, createMemberErrors, loading } = useSelector(
    (state) => state.members
  );

  useEffect(() => {
    return () => {
      dispatch(memberActions.createMemberCleanError(false));
      dispatch(memberActions.createMemberCleanData());
    };
  }, [dispatch]);

  useEffect(() => {
    // show success notification
    if (createMemberResult) {
      const title = intl.formatMessage({ id: 'notification.success' });
      const message = intl.formatMessage({ id: createMemberResult.message });
      SuccessNotification(title, message);
      // close the modal and clean data
      close();
      // re-call get all customers api
      getMembers && getMembers();
    }
  }, [createMemberResult, intl, getMembers, close]);

  useEffect(() => {
    // show error notification
    if (createMemberError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({
        id: createMemberErrors.message
          ? createMemberErrors.message
          : 'projects.createProject.message.error'
      });
      ErrorNotification(title, message);
      // clean error
      dispatch(memberActions.createMemberCleanError());
    }
  }, [createMemberError, createMemberErrors, dispatch, intl]);

  const handleSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        const body = {
          staff_code: values.staff_code,
          full_name: values.full_name,
          phone_number: values.phone_number,
          email: values.email
        };
        createMember && createMember(body);
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
      title={<FormattedMessage id="members.memberModal.headerCreateMember.title" />}
      cancelText="Close"
      visible={visible}
      width="40vw"
      className={styles.modal}
      onCancel={() => close()}
      maskClosable={false}
      footer={[
        <Row type="flex" key="abc" justify="end">
          <Popconfirm
            title={<FormattedMessage id="members.memberModal.confirm.create" />}
            onConfirm={() => handleSubmit()}
            okText={<FormattedMessage id="members.memberModal.button.confirm.yes" />}
            cancelText={<FormattedMessage id="members.memberModal.button.confirm.no" />}>
            <Button icon="plus" type="primary" loading={loading}>
              <FormattedMessage id="members.memberModal.createButton.title" />
            </Button>
          </Popconfirm>
          <Button icon="close-circle" type="default" key="close" onClick={() => close()}>
            <FormattedMessage id="members.memberModal.cancelButton.title" />
          </Button>
        </Row>
      ]}
      {...modalConfig}>
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

CreateMember.propTypes = propTypes;

CreateMember.defaultProps = defaultProps;

const CreateMemberForm = Form.create({ name: 'createMember' })(CreateMember);

export default injectIntl(CreateMemberForm, {});
