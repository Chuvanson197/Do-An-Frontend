import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { formShape } from 'rc-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';

import {
  Drawer,
  Form,
  DatePicker,
  Icon,
  Row,
  Col,
  Select,
  InputNumber,
  Typography,
  Button,
  Popconfirm,
  Descriptions
} from 'antd';

import ErrorNotification from '../../../../components/Notification/Error';
import SuccessNotification from '../../../../components/Notification/Success';
import { roles } from '../../../../utils/roles';
import { actions as updateMemberActions } from '../store';
import { actions as projectActions } from '../../projectDetails/store';

const propTypes = {
  intl: PropTypes.shape({}).isRequired,
  onClose: PropTypes.func.isRequired,
  drawerVisible: PropTypes.bool.isRequired,
  form: formShape.isRequired,
  match: PropTypes.shape({}).isRequired
};

const defaultProps = {};

const styles = {
  drawerFooter: css`
    position: absolute;
    bottom: 0;
    right: 24px;
    left: 24px;
    padding: 24px 0px;
  `
};

const listStatus = [{ id: 1, name: 'working' }, { id: 2, name: 'leave' }, { id: 3, name: 'idle' }];

const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

const UpdateProjectDrawer = ({ intl, onClose, drawerVisible, form, member, match }) => {
  const dispatch = useDispatch();
  const { result, updateMemberInProjectError, loading } = useSelector(
    (state) => state.updateMemberInProject
  );
  // Handle showing notification after update project
  useEffect(() => {
    // show success notification
    if (result) {
      const title = intl.formatMessage({ id: 'notification.success' });
      const message = intl.formatMessage({ id: result.message });
      SuccessNotification(title, message);
      // close the modal and clean state
      onClose();
      // re-call get project detail api
      dispatch(
        projectActions.getProjectDetail({
          param: match.params.id,
          path: 'projects'
        })
      );
      // re-call get members list api
      dispatch(
        projectActions.getMembers({
          param: match.params.id,
          path: 'projects/membersList'
        })
      );
    }
    // show error notification
    if (updateMemberInProjectError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({ id: 'projects.updateMemberInProject.message.error' });
      ErrorNotification(title, message);
      // clean state
      dispatch(updateMemberActions.cleanError(false));
    }
  }, [onClose, dispatch, intl, updateMemberInProjectError, result, match.params.id]);

  const handleSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        const body = {
          time_in: parseInt(moment(values.time_in).format('x'), 10),
          time_out: values.time_out ? parseInt(moment(values.time_out).format('x'), 10) : null,
          effort: values.effort,
          role: values.role,
          member_status: values.member_status
        };
        const oldBody = {
          time_in: parseInt(member.time_in, 10),
          time_out: member.time_out ? parseInt(member.time_out, 10) : null,
          effort: member.effort,
          role: member.role,
          member_status: member.member_status
        };
        // check if value is not change
        if (JSON.stringify(body) === JSON.stringify(oldBody)) {
          const title = intl.formatMessage({ id: 'notification.error' });
          const message = intl.formatMessage({ id: 'notification.message.form.noChanging' });
          return ErrorNotification(title, message);
        }
        dispatch(
          updateMemberActions.updateMemberInProject({
            body,
            path: 'projects/membersList',
            param: member.id
          })
        );
      } else {
        // showing error form input notification
        const title = intl.formatMessage({ id: 'notification.error' });
        const message = intl.formatMessage({ id: 'notification.message.form.error' });
        ErrorNotification(title, message);
      }
      return null;
    });
  };

  return (
    <Drawer
      title={<FormattedMessage id="projects.updateMember.title" />}
      placement="right"
      onClose={onClose}
      visible={drawerVisible}
      maskClosable={false}
      width={500}>
      <Form onSubmit={() => handleSubmit()} {...formItemLayout}>
        <Row style={{ marginBottom: 10 }}>
          <Icon type="user" style={{ marginRight: 10 }} />
          <Typography.Text style={{ fontWeight: 'bold' }}>
            {<FormattedMessage id="projects.addMember.memberInformation" />}
          </Typography.Text>
        </Row>

        <Row>
          <Col span={8}></Col>
          <Col span={16}>
            <Descriptions column={1}>
              <Descriptions.Item
                className={styles.descItem}
                label={<FormattedMessage id="projects.updateMember.staff_code" />}>
                {member.member_detail.staff_code || null}
              </Descriptions.Item>
              <Descriptions.Item
                className={styles.descItem}
                label={<FormattedMessage id="projects.updateMember.full_name" />}>
                {member.member_detail.full_name || null}
              </Descriptions.Item>
              <Descriptions.Item label={<FormattedMessage id="projects.updateMember.email" />}>
                {member.member_detail.email || null}
              </Descriptions.Item>
              <Descriptions.Item
                className={styles.descItem}
                label={<FormattedMessage id="projects.updateMember.phone_number" />}>
                {member.member_detail.phone_number || null}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>

        <Form.Item
          style={{ display: 'flex' }}
          label={<FormattedMessage id="projects.addMember.status" />}
          validateStatus={form.getFieldError('member_status') ? 'error' : 'validating'}>
          {form.getFieldDecorator('member_status', {
            rules: [
              {
                required: true,
                message: intl.formatMessage({ id: 'projects.addMember.error.status' })
              }
            ],
            initialValue: listStatus.find((e) => {
              return e.name === member.member_status;
            }).name
          })(
            <Select allowClear>
              {(listStatus || []).map((e) => {
                return (
                  <Select.Option key={e.id} value={e.name}>
                    <FormattedMessage id={`projects.addMember.status.${e.name}`} />
                  </Select.Option>
                );
              })}
            </Select>
          )}
        </Form.Item>

        <Form.Item
          style={{ display: 'flex' }}
          label={<FormattedMessage id="projects.addMember.role" />}
          validateStatus={form.getFieldError('role') ? 'error' : 'validating'}>
          {form.getFieldDecorator('role', {
            rules: [
              {
                required: true,
                message: intl.formatMessage({ id: 'projects.addMember.error.role' })
              }
            ],
            initialValue: roles.find((e) => {
              return e.name === member.role;
            }).name
          })(
            <Select allowClear>
              {(roles || []).map((e) => {
                return (
                  <Select.Option key={e.id} value={e.name}>
                    <FormattedMessage id={`projects.addMember.role.${e.key}`} />
                  </Select.Option>
                );
              })}
            </Select>
          )}
        </Form.Item>

        <Form.Item
          style={{ display: 'flex' }}
          label={<FormattedMessage id="projects.addMember.time_in" />}
          validateStatus={form.getFieldError('time_in') ? 'error' : 'validating'}>
          {form.getFieldDecorator('time_in', {
            rules: [
              {
                required: true,
                message: intl.formatMessage({ id: 'projects.addMember.error.time_in' })
              }
            ],
            initialValue: moment(parseInt(member.time_in, 10))
          })(
            <DatePicker
              format="DD/MM/YYYY"
              placeholder={intl.formatMessage({ id: 'projects.addMember.placeholer.time_in' })}
            />
          )}
        </Form.Item>

        <Form.Item
          style={{ display: 'flex' }}
          label={<FormattedMessage id="projects.addMember.time_out" />}
          validateStatus={form.getFieldError('time_out') ? 'error' : 'validating'}>
          {form.getFieldDecorator('time_out', {
            rules: [],
            initialValue: member.time_out ? moment(parseInt(member.time_out, 10)) : null
          })(
            <DatePicker
              format="DD/MM/YYYY"
              placeholder={intl.formatMessage({ id: 'projects.addMember.placeholer.time_out' })}
            />
          )}
        </Form.Item>

        <Form.Item
          style={{ display: 'flex' }}
          label={<FormattedMessage id="projects.addMember.effort" />}
          validateStatus={form.getFieldError('effort') ? 'error' : 'validating'}>
          {form.getFieldDecorator('effort', {
            rules: [
              {
                required: true,
                message: intl.formatMessage({ id: 'projects.addMember.error.effort' })
              }
            ],
            initialValue: member.effort
          })(<InputNumber min={0.1} max={1} step={0.1} />)}
        </Form.Item>

        <Row className={styles.drawerFooter}>
          <Popconfirm
            title={<FormattedMessage id="projects.updateMember.confirm.add" />}
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
      </Form>
    </Drawer>
  );
};

UpdateProjectDrawer.propTypes = propTypes;

UpdateProjectDrawer.defaultProps = defaultProps;

const UpdateProjectForm = Form.create({ name: 'updateProject' })(UpdateProjectDrawer);

export default injectIntl(UpdateProjectForm, {});
