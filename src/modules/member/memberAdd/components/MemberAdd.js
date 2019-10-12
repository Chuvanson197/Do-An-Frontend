import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formShape } from 'rc-form';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Modal,
  Button,
  DatePicker,
  Select,
  Input,
  InputNumber,
  Form,
  Typography,
  Descriptions,
  Icon
} from 'antd';
import { css } from 'emotion';

import { actions as memberActions } from '../../listMember/store';
import { actions as createMemberActions } from '../store';
import { roles } from '../../../../utils/roles';

const propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  form: formShape.isRequired,

  selectedMember: PropTypes.shape({}),
  joinedMembers: PropTypes.arrayOf(PropTypes.shape({}))
};

const defaultProps = {
  selectedMember: {},
  joinedMembers: []
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

const listStatus = [{ id: 1, name: 'working' }, { id: 2, name: 'leave' }, { id: 3, name: 'idle' }];

const MemberAdd = ({ visible, close, form, selectedMember, joinedMembers }) => {
  const dispatch = useDispatch();
  const { members } = useSelector((state) => state.memberList);
  useEffect(() => {
    dispatch(memberActions.getMembers());
  }, [dispatch]);

  const [memberDetail, setMemberDetail] = useState(selectedMember);
  const handleSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      } else {
        console.log(err);
      }
    });
  };

  const handleSelect = (value) => {
    members.map((member) => {
      if (member.staff_code === value) {
        setMemberDetail(member);
      }
      return member;
    });
  };

  return (
    <Modal
      title="Add Member"
      cancelText="Close"
      visible={visible}
      width="50vw"
      className={styles.modal}
      onCancel={() => close()}
      maskClosable={false}
      footer={[
        <Row type="flex" key="abc" justify="end">
          <Button icon="plus" type="primary" onClick={() => handleSubmit()}>
            Add Member
          </Button>
          <Button icon="close-circle" type="default" key="close" onClick={() => close()}>
            Close
          </Button>
        </Row>
      ]}>
      <Form onSubmit={() => handleSubmit()} {...formItemLayout}>
        <Row style={{ marginBottom: 10 }}>
          <Icon type="user" style={{ marginRight: 10 }} />
          <Typography.Text style={{ fontWeight: 'bold' }}>Member information</Typography.Text>
        </Row>
        <Form.Item
          style={{ display: 'flex' }}
          label="Member"
          validateStatus={form.getFieldError('member') ? 'error' : 'validating'}>
          {form.getFieldDecorator('member', {
            rules: [
              {
                required: true,
                message: 'Please select member !'
              }
            ]
          })(
            <Select
              showSearch
              allowClear
              autoClearSearchValue
              onSelect={(value) => handleSelect(value)}>
              {(members || []).map((member) => {
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
          label="Status"
          validateStatus={form.getFieldError('status') ? 'error' : 'validating'}>
          {form.getFieldDecorator('status', {
            rules: [
              {
                required: true,
                message: 'Project status is required !'
              }
            ]
          })(
            <Select allowClear>
              {(listStatus || []).map((e) => {
                return (
                  <Select.Option key={e.id} value={e.name}>
                    {e.name}
                  </Select.Option>
                );
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          style={{ display: 'flex' }}
          label="Role"
          validateStatus={form.getFieldError('role') ? 'error' : 'validating'}>
          {form.getFieldDecorator('role', {
            rules: [
              {
                required: true,
                message: 'Role is required !'
              }
            ]
          })(
            <Select allowClear>
              {(roles || []).map((e) => {
                return (
                  <Select.Option key={e.id} value={e.name}>
                    {e.name}
                  </Select.Option>
                );
              })}
            </Select>
          )}
        </Form.Item>

        <Form.Item
          style={{ display: 'flex' }}
          label="Joined time"
          validateStatus={form.getFieldError('time_in') ? 'error' : 'validating'}>
          {form.getFieldDecorator('time_in', {
            rules: [
              {
                required: true,
                message: 'Project estimated time is required !'
              }
            ]
          })(<DatePicker format="DD/MM/YYYY" placeholder={['Start time', 'End time']} />)}
        </Form.Item>

        <Form.Item
          style={{ display: 'flex' }}
          label="End time"
          validateStatus={form.getFieldError('time_out') ? 'error' : 'validating'}>
          {form.getFieldDecorator('time_out', {
            rules: []
          })(<DatePicker format="DD/MM/YYYY" placeholder={['Start time', 'End time']} />)}
        </Form.Item>

        <Form.Item
          style={{ display: 'flex' }}
          label="Effort"
          validateStatus={form.getFieldError('effort') ? 'error' : 'validating'}>
          {form.getFieldDecorator('effort', {
            rules: [
              {
                required: true,
                message: 'Effort is required !'
              }
            ]
          })(<InputNumber min={0.1} max={1} step={0.1} />)}
        </Form.Item>

        <Row>
          <Col span={5}></Col>
          <Col span={19}>
            <Descriptions column={1}>
              <Descriptions.Item label="Email">{memberDetail.email || null}</Descriptions.Item>
              <Descriptions.Item label="Phone Number">
                {memberDetail.phone_number || null}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

MemberAdd.propTypes = propTypes;

MemberAdd.defaultProps = defaultProps;

const MemberAddForm = Form.create({ name: 'memberAdd' })(MemberAdd);

export default MemberAddForm;
