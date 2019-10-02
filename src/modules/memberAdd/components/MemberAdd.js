import React, { useState } from 'react';
import { createForm, formShape } from 'rc-form';
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

import FormError from '../../../components/ErrorAlert/FormError';

const propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  form: formShape.isRequired,

  listStatus: PropTypes.arrayOf(PropTypes.shape({})),
  listMember: PropTypes.arrayOf(PropTypes.shape({})),
  selectedMember: PropTypes.shape({})
};

const defaultProps = {
  listStatus: [
    { id: 1, name: 'running' },
    { id: 2, name: 'completed' },
    { id: 3, name: 'stopped' }
  ],
  listMember: [
    {
      id: 1,
      fullname: 'Muji.jp',
      email: 'muji.jp@gmail.com',
      phoneNumber: '0123456789'
    },
    {
      id: 2,
      fullname: 'Tekmate.co',
      email: 'tekamte@tek.vn',
      phoneNumber: '0123456'
    }
  ],
  selectedMember: {}
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

const MemberAdd = ({ visible, close, form, listStatus, listMember, selectedMember }) => {
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
    switch (value) {
      case 1:
        setMemberDetail({
          id: 1,
          fullname: 'Muji.jp',
          email: 'muji.jp@gmail.com',
          phoneNumber: '0123456789'
        });
        break;
      case 2:
        setMemberDetail({
          id: 2,
          fullname: 'Tekmate.co',
          email: 'tekamte@tek.vn',
          phoneNumber: '0123456'
        });
        break;
      default:
        break;
    }
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
              {(listMember || []).map((e) => {
                return (
                  <Select.Option key={e.id} value={e.id}>
                    {e.fullname}
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
          })(<Input />)}
        </Form.Item>

        <Form.Item
          style={{ display: 'flex' }}
          label="Estimated time"
          validateStatus={form.getFieldError('estimate') ? 'error' : 'validating'}>
          {form.getFieldDecorator('estimate', {
            rules: [
              {
                required: true,
                message: 'Project estimated time is required !'
              }
            ]
          })(
            <DatePicker.RangePicker format="DD/MM/YYYY" placeholder={['Start time', 'End time']} />
          )}
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
          })(<InputNumber min={0} max={1} step={0.1} />)}
        </Form.Item>

        <Row>
          <Col span={5}></Col>
          <Col span={19}>
            <Descriptions column={1}>
              <Descriptions.Item label="Email">{memberDetail.email || null}</Descriptions.Item>
              <Descriptions.Item label="Phone Number">
                {memberDetail.phoneNumber || null}
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
