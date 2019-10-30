import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formShape } from 'rc-form';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage, injectIntl } from 'react-intl';
import { css } from 'emotion';

import {
  Row,
  Col,
  Modal,
  Button,
  DatePicker,
  Select,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Descriptions,
  Icon,
  Spin
} from 'antd';

import ErrorNotification from '../../../../components/Notification/Error';
import SuccessNotification from '../../../../components/Notification/Success';
import { actions as memberActions } from '../../../member/store';
import { actions as projectActions } from '../../store';
import { roles } from '../../../../utils/roles';

const propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  form: formShape.isRequired,
  intl: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,

  selectedMember: PropTypes.shape({}),
  joinedMembers: PropTypes.arrayOf(PropTypes.shape({}))
};

const defaultProps = {
  selectedMember: {},
  joinedMembers: []
};

const styles = {
  descItem: css`
    padding-bottom: 0 !important;
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

const listStatus = [{ id: 1, name: 'working' }, { id: 2, name: 'leave' }, { id: 3, name: 'idle' }];

const AddMemberModal = ({
  visible,
  close,
  form,
  selectedMember,
  joinedMembers,
  intl,
  match,
  getMembers,
  getJoinedMembers,
  getProject,
  addMember,
}) => {
  const dispatch = useDispatch();
  const { list, getMembersError } = useSelector((state) => state.members);
  const memberLoading = useSelector((state) => state.members.loading);
  const { addMemberError, addMemberErrors, addMemberResult, loading } = useSelector(
    (state) => state.projects
  );
  const [memberDetail, setMemberDetail] = useState(selectedMember);

  // Get all members after open modal
  useEffect(() => {
    getMembers();
    // dispatch(
    //   memberActions.getMembers({
    //     path: 'members'
    //   })
    // );
  }, [getMembers]);

  // show notification if get members failure
  useEffect(() => {
    if (getMembersError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({ id: 'members.membersList.message.error' });
      ErrorNotification(title, message);
      // clean error
      dispatch(memberActions.cleanError(false));
    }
  }, [dispatch, getMembersError, intl]);

  // Handle showing notification after add new members into project
  useEffect(() => {
    if (addMemberResult) {
      const title = intl.formatMessage({ id: 'notification.success' });
      const message = intl.formatMessage({ id: addMemberResult.message });
      SuccessNotification(title, message);
      // close the modal and clean state
      close();
      // re-call get project detail api
      getProject();
      // dispatch(
      //   projectActions.getProject({
      //     param: match.params.id,
      //     path: 'projects'
      //   })
      // );
      // re-call get project's members api
      getJoinedMembers();
      // dispatch(
      //   projectActions.getJoinedMembers({
      //     param: match.params.id,
      //     path: 'projects/membersList'
      //   })
      // );
    }
    // // show error notification
    // if (addMemberError) {
    //   const title = intl.formatMessage({ id: 'notification.error' });
    //   const message = intl.formatMessage({
    //     id: addMemberErrors.message
    //       ? addMemberErrors.message
    //       : 'projects.addMemberIntoProject.message.error'
    //   });
    //   ErrorNotification(title, message);
    //   // clean state
    //   dispatch(projectActions.cleanError(false));
    // }
  }, [close, intl, addMemberResult, getJoinedMembers, getProject]);

  useEffect(() => {
    // show error notification
    if (addMemberError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({
        id: addMemberErrors.message
          ? addMemberErrors.message
          : 'projects.addMemberIntoProject.message.error'
      });
      ErrorNotification(title, message);
      // clean state
      dispatch(projectActions.cleanError(false));
    }
  }, [dispatch, intl, addMemberError, addMemberErrors]);

  // Form submit
  const handleSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        const body = {
          ...values,
          project_id: match.params.id,
          time_in: parseInt(moment(values.time_in).format('x'), 10),
          time_out: values.time_out ? parseInt(moment(values.time_out).format('x'), 10) : null
        };
        // call api when valid data
        addMember(body);
        // dispatch(projectActions.addMember({ body, path: 'projects/membersList' }));
      } else {
        // showing error form input notification
        const title = intl.formatMessage({ id: 'notification.error' });
        const message = intl.formatMessage({ id: 'notification.message.form.error' });
        ErrorNotification(title, message);
      }
    });
  };

  const handleSelect = (value) => {
    list.map((member) => {
      if (member.staff_code === value) {
        setMemberDetail(member);
      }
      return member;
    });
  };

  return (
    <Modal
      title={<FormattedMessage id="projects.addMember.title" />}
      cancelText="Close"
      visible={visible}
      width="50vw"
      className={styles.modal}
      onCancel={() => close()}
      maskClosable={false}
      footer={[
        <Row type="flex" key="am_footer" justify="end">
          <Popconfirm
            title={<FormattedMessage id="projects.addMember.confirm.add" />}
            onConfirm={() => handleSubmit()}
            okText={<FormattedMessage id="button.confirm.yes" />}
            cancelText={<FormattedMessage id="button.confirm.no" />}>
            <Button icon="plus" type="primary" loading={loading}>
              {<FormattedMessage id="button.add" />}
            </Button>
          </Popconfirm>

          <Button icon="close-circle" type="default" key="close" onClick={() => close()}>
            {<FormattedMessage id="button.close" />}
          </Button>
        </Row>
      ]}>
      <Form onSubmit={() => handleSubmit()} {...formItemLayout}>
        <Row style={{ marginBottom: 10 }}>
          <Icon type="user" style={{ marginRight: 10 }} />
          <Typography.Text style={{ fontWeight: 'bold' }}>
            {<FormattedMessage id="projects.addMember.memberInformation" />}
          </Typography.Text>
        </Row>
        <Form.Item
          style={{ display: 'flex' }}
          label={<FormattedMessage id="projects.addMember.member" />}
          validateStatus={form.getFieldError('staff_code') ? 'error' : 'validating'}>
          {form.getFieldDecorator('staff_code', {
            rules: [
              {
                required: true,
                message: intl.formatMessage({ id: 'projects.addMember.error.member' })
              }
            ]
          })(
            <Select
              showSearch
              allowClear
              autoClearSearchValue
              notFoundContent={memberLoading && <Spin size="small" />}
              onSelect={(value) => handleSelect(value)}>
              {(list || []).map((member) => {
                return (
                  <Select.Option
                    disabled={
                      !!joinedMembers.filter(
                        (joinedMember) =>
                          joinedMember.member_detail.staff_code === member.staff_code
                      ).length
                    }
                    key={member.staff_code}
                    value={member.staff_code}>
                    {member.staff_code} - {member.full_name}
                  </Select.Option>
                );
              })}
            </Select>
          )}
        </Form.Item>

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
            ]
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
            ]
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
            ]
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
            rules: []
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
            ]
          })(<InputNumber min={0.1} max={1} step={0.1} />)}
        </Form.Item>

        <Row>
          <Col span={5}></Col>
          <Col span={19}>
            <Descriptions column={1}>
              <Descriptions.Item label={<FormattedMessage id="projects.addMember.email" />}>
                {memberDetail.email || null}
              </Descriptions.Item>
              <Descriptions.Item
                className={styles.descItem}
                label={<FormattedMessage id="projects.addMember.phone_number" />}>
                {memberDetail.phone_number || null}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

AddMemberModal.propTypes = propTypes;

AddMemberModal.defaultProps = defaultProps;

const AddMemberForm = Form.create({ name: 'memberAdd' })(AddMemberModal);

export default injectIntl(AddMemberForm, {});
