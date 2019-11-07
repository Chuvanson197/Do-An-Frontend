import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { formShape } from 'rc-form';
import { FormattedMessage, injectIntl } from 'react-intl';

import {
  Drawer,
  Form,
  Icon,
  Row,
  Col,
  Select,
  Descriptions,
  Typography,
  Button,
  Popconfirm,
  Spin
} from 'antd';

import ErrorNotification from '../../../../components/Notification/Error';
import SuccessNotification from '../../../../components/Notification/Success';
import { actions as userActions } from '../../store';

const propTypes = {
  intl: PropTypes.shape({}).isRequired,
  onClose: PropTypes.func.isRequired,
  drawerVisible: PropTypes.bool.isRequired,
  form: formShape.isRequired,

  data: PropTypes.shape({}),

  getUsers: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired
};

const defaultProps = {
  data: {}
};

const styles = {
  drawerFooter: css`
    position: absolute;
    bottom: 0;
    right: 24px;
    left: 24px;
    padding: 24px 0px;
  `,
  deletedUserMsg: css`
    color: red !important;
  `
};

const listRole = [
  { role: 'Admin', permission: 'All' },
  { role: 'Manager', permission: 'View, Edit' },
  { role: 'Normal', permission: 'View' }
];

const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

const UpdateUserDrawer = ({ getUsers, updateUser, intl, onClose, drawerVisible, form, data }) => {
  const dispatch = useDispatch();
  const [userChange, setUserChange] = useState({ ...data });
  const { updateUserResult, updateUserError, updateUserErrors, loading } = useSelector(
    (state) => state.users
  );
  // const usersList = useSelector((state) => state.users.list);

  const userLoading = useSelector((state) => state.users.loading);

  useEffect(() => {
    return () => {
      dispatch(userActions.updateUserCleanError(false));
      dispatch(userActions.updateUserCleanData());
    };
  }, [dispatch]);
  // Handle showing notification after update project
  useEffect(() => {
    // show success notification
    if (updateUserResult) {
      const title = intl.formatMessage({ id: 'notification.success' });
      const message = intl.formatMessage({ id: updateUserResult.message });
      SuccessNotification(title, message);
      // close the modal and clean state
      onClose();
      // re-call get User detail api
      getUsers && getUsers();
    }
    // show error notification
  }, [onClose, intl, updateUserResult, dispatch, getUsers]);

  useEffect(() => {
    if (updateUserError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({ id: 'users.updateUser.message.error' });
      ErrorNotification(title, message);
      // clean state
      dispatch(userActions.updateUserCleanError());
    }
  }, [dispatch, intl, updateUserError, updateUserErrors]);

  const handleSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        const body = {
          id: userChange.id,
          name: userChange.name,
          email: userChange.email,
          permission: userChange.permission,
          role: userChange.role
        };

        const oldBody = {
          id: data.id,
          name: data.name,
          email: data.email,
          permission: data.permission,
          role: data.role
        };
        // check if value is not change
        if (JSON.stringify(body) === JSON.stringify(oldBody)) {
          const title = intl.formatMessage({ id: 'notification.error' });
          const message = intl.formatMessage({ id: 'notification.message.form.noChanging' });
          return ErrorNotification(title, message);
        }

        if (userChange.hidden) {
          const title = intl.formatMessage({ id: 'notification.error' });
          const message = intl.formatMessage({ id: 'notification.message.form.deletedUser' });
          return ErrorNotification(title, message);
        }
        updateUser && updateUser(body);
      } else {
        // showing error form input notification
        const title = intl.formatMessage({ id: 'notification.error' });
        const message = intl.formatMessage({ id: 'notification.message.form.error' });
        ErrorNotification(title, message);
      }
      return null;
    });
  };

  const handleSelect = (value) => {
    const newRole = listRole.filter((item) => item.role === value)[0];
    setUserChange({ ...userChange, ...newRole });
    return userChange;
  };

  return (
    <Drawer
      title={<FormattedMessage id="users.drawerUpdate.tile" />}
      placement="right"
      onClose={onClose}
      visible={drawerVisible}
      maskClosable={false}
      width={550}>
      <Form onSubmit={() => handleSubmit()} {...formItemLayout}>
        <Row style={{ marginBottom: 10 }}>
          <Icon type="user" style={{ marginRight: 10 }} />
          <Typography.Text style={{ fontWeight: 'bold' }}>
            <FormattedMessage id="users.drawerUpdate.userInformation" />
          </Typography.Text>
        </Row>
        <Form.Item
          style={{ display: 'flex' }}
          label={<FormattedMessage id="users.role.title" />}
          validateStatus={form.getFieldError('role') ? 'error' : 'validating'}>
          {form.getFieldDecorator('role', {
            rules: [
              {
                required: true,
                message: intl.formatMessage({ id: 'projects.createProject.error.status' })
              }
            ],
            initialValue: listRole.find((e) => {
              return e.role === data.role;
            }).role
          })(
            <Select
              allowClear
              autoClearSearchValue
              onSelect={(value) => handleSelect(value)}
              notFoundContent={userLoading && <Spin size="small" />}>
              {(listRole || []).map((e) => {
                return (
                  <Select.Option key={e.role} value={e.role}>
                    {e.role}
                  </Select.Option>
                );
              })}
            </Select>
          )}
        </Form.Item>
        <Row>
          <Col span={8}></Col>
          <Col span={16}>
            <Descriptions column={1}>
              <Descriptions.Item label={<FormattedMessage id="users.name.title" />}>
                {userChange.name || null}
              </Descriptions.Item>
              <Descriptions.Item label={<FormattedMessage id="users.email.title" />}>
                {userChange.email || null}
              </Descriptions.Item>
              <Descriptions.Item label={<FormattedMessage id="users.permission.title" />}>
                {userChange.permission || null}
              </Descriptions.Item>
              <Descriptions.Item label={<FormattedMessage id="users.role.title" />}>
                {userChange.role || null}
              </Descriptions.Item>
            </Descriptions>
            {userChange.hidden && (
              <Typography.Text className={styles.deletedUserMsg}>
                <FormattedMessage id="projects.updateProject.deletedCustomer" />
              </Typography.Text>
            )}
          </Col>
        </Row>
      </Form>
      <Row className={styles.drawerFooter}>
        <Popconfirm
          title={<FormattedMessage id="users.drawerUpdate.confirm.add" />}
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

UpdateUserDrawer.propTypes = propTypes;

UpdateUserDrawer.defaultProps = defaultProps;

const UpdateUserForm = Form.create({ name: 'updateUser' })(UpdateUserDrawer);

export default injectIntl(UpdateUserForm, {});
