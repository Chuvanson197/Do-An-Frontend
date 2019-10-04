import React, { useState } from 'react';
import { formShape } from 'rc-form';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Modal,
  Button,
  Input,
  DatePicker,
  Select,
  Form,
  Typography,
  Descriptions,
  Icon
} from 'antd';
import { css } from 'emotion';

const propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  form: formShape.isRequired,

  listStatus: PropTypes.arrayOf(PropTypes.shape({})),
  listCustomer: PropTypes.arrayOf(PropTypes.shape({})),
  selectedCustomer: PropTypes.shape({})
};

const defaultProps = {
  listStatus: [
    { id: 1, name: 'running' },
    { id: 2, name: 'completed' },
    { id: 3, name: 'stopped' }
  ],
  listCustomer: [
    {
      id: 1,
      name: 'Muji.jp',
      email: 'muji.jp@gmail.com',
      phoneNumber: '0123456789',
      address: 'Tokyo, Japan'
    },
    {
      id: 2,
      name: 'Tekmate.co',
      email: 'tekamte@tek.vn',
      phoneNumber: '0123456',
      address: 'Hanoi, VietNam'
    }
  ],
  selectedCustomer: {}
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

const CreateProject = ({ visible, close, form, listStatus, listCustomer, selectedCustomer }) => {
  const [customerDetail, setCustomerDetail] = useState(selectedCustomer);
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
        setCustomerDetail({
          id: 1,
          name: 'Muji.jp',
          email: 'muji.jp@gmail.com',
          phoneNumber: '0123456789',
          address: 'Tokyo, Japan'
        });
        break;
      case 2:
        setCustomerDetail({
          id: 2,
          name: 'Tekmate.co',
          email: 'tekamte@tek.vn',
          phoneNumber: '0123456',
          address: 'Hanoi, VietNam'
        });
        break;
      default:
        break;
    }
  };

  return (
    <Modal
      title="Create Project"
      cancelText="Close"
      visible={visible}
      width="50vw"
      className={styles.modal}
      onCancel={() => close()}
      maskClosable={false}
      footer={[
        <Row type="flex" key="abc" justify="end">
          <Button icon="plus" type="primary" onClick={() => handleSubmit()}>
            Create
          </Button>
          <Button icon="close-circle" type="default" key="close" onClick={() => close()}>
            Close
          </Button>
        </Row>
      ]}>
      <Form onSubmit={() => handleSubmit()} {...formItemLayout}>
        <Row style={{ marginBottom: 10 }}>
          <Icon type="project" style={{ marginRight: 10 }} />
          <Typography.Text style={{ fontWeight: 'bold' }}>Project information</Typography.Text>
        </Row>

        <Form.Item
          style={{ display: 'flex' }}
          label="Project name"
          validateStatus={form.getFieldError('name') ? 'error' : 'validating'}>
          {form.getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Project name is required !'
              }
            ]
          })(<Input />)}
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

        <Row style={{ marginBottom: 10 }}>
          <Icon type="user" style={{ marginRight: 10 }} />
          <Typography.Text style={{ fontWeight: 'bold' }}>Customer information</Typography.Text>
        </Row>

        <Form.Item
          style={{ display: 'flex' }}
          label="Customer"
          validateStatus={form.getFieldError('customer') ? 'error' : 'validating'}>
          {form.getFieldDecorator('customer', {
            rules: [
              {
                required: true,
                message: 'Please select customer !'
              }
            ]
          })(
            <Select
              showSearch
              allowClear
              autoClearSearchValue
              onSelect={(value) => handleSelect(value)}>
              {(listCustomer || []).map((e) => {
                return (
                  <Select.Option key={e.id} value={e.id}>
                    {e.name}
                  </Select.Option>
                );
              })}
            </Select>
          )}
        </Form.Item>

        <Row>
          <Col span={5}></Col>
          <Col span={19}>
            <Descriptions column={1}>
              <Descriptions.Item label="Email">{customerDetail.email || null}</Descriptions.Item>
              <Descriptions.Item label="Phone Number">
                {customerDetail.phoneNumber || null}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {customerDetail.address || null}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

CreateProject.propTypes = propTypes;

CreateProject.defaultProps = defaultProps;

const CreateProjectForm = Form.create({ name: 'createProject' })(CreateProject);

export default CreateProjectForm;
