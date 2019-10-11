import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { formShape } from 'rc-form';
import moment from 'moment';
import { css } from 'emotion';

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
  Icon,
  Popconfirm,
  notification
} from 'antd';

import { FormattedMessage, injectIntl } from 'react-intl';
import { actions as createProjectActions } from '../store';
import { actions as customerActions } from '../../../customer/cutomers/store';
import { actions as projectActions } from "../../listProject/store";

const propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  form: formShape.isRequired,
  intl: PropTypes.shape({}).isRequired,

  selectedCustomer: PropTypes.shape({})
};

const defaultProps = {
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

const listStatus = [
  {
    id: 1,
    name: 'running'
  },
  {
    id: 2,
    name: 'completed'
  },
  {
    id: 3,
    name: 'stopped'
  }
];

const CreateProject = ({ visible, close, form, selectedCustomer, intl }) => {
  const dispath = useDispatch();
  const [customerDetail, setCustomerDetail] = useState(selectedCustomer);
  const { customersList } = useSelector((state) => state.customers);
  const { isError, result } = useSelector((state) => state.createProject);

  useEffect(() => {
    dispath(customerActions.getCustomers());
  }, [dispath]);

  useEffect(() => {
    if (result || isError) {
      notification.open({
        message: isError ? (
          <span style={{ color: '#f5222d', fontWeight: 'bold' }}>
            {intl.formatMessage({ id: 'notification.error' })}
          </span>
        ) : (
          <span style={{ color: '#4cd964', fontWeight: 'bold' }}>
            {intl.formatMessage({ id: 'notification.success' })}
          </span>
        ),
        description: isError
          ? intl.formatMessage({ id: 'projects.createProject.message.error' })
          : intl.formatMessage({ id: result.message }),
        duration: 2.5,
        icon: (
          <Icon
            type={isError ? 'frown' : 'smile'}
            style={{ color: isError ? '#f5222d' : '#4cd964' }}
          />
        )
      });
    }
    if (result) {
      close();
      dispath(projectActions.getProjects());
    }
  }, [close, dispath, intl, isError, result]);

  const handleSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        const body = {
          customer_id: values.customer_id,
          name: values.name,
          status: values.status,
          start_time: parseInt(moment(values.estimated[0]).format('x'), 10),
          end_time: parseInt(moment(values.estimated[1]).format('x'), 10)
        };
        dispath(createProjectActions.creatProject({ body }));
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

  const handleSelect = (value) => {
    customersList.map((customer) => {
      if (customer.id === value) {
        setCustomerDetail(customer);
      }
      return customer;
    });
  };

  return (
    <Modal
      title={<FormattedMessage id="projects.createProject.title" />}
      cancelText="Close"
      visible={visible}
      width="50vw"
      className={styles.modal}
      onCancel={() => close()}
      maskClosable={false}
      footer={[
        <Row type="flex" key="abc" justify="end">
          <Popconfirm
            title={<FormattedMessage id="projects.createProject.confirm.add" />}
            onConfirm={() => handleSubmit()}
            okText={<FormattedMessage id="button.confirm.yes" />}
            cancelText={<FormattedMessage id="button.confirm.no" />}>
            <Button icon="plus" type="primary">
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
          <Icon type="project" style={{ marginRight: 10 }} />
          <Typography.Text style={{ fontWeight: 'bold' }}>
            {<FormattedMessage id="projects.createProject.projectInformation" />}
          </Typography.Text>
        </Row>

        <Form.Item
          style={{ display: 'flex' }}
          label={<FormattedMessage id="projects.createProject.projectName" />}
          validateStatus={form.getFieldError('name') ? 'error' : 'validating'}>
          {form.getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: intl.formatMessage({ id: 'projects.createProject.error.name' })
              }
            ]
          })(<Input />)}
        </Form.Item>

        <Form.Item
          style={{ display: 'flex' }}
          label={<FormattedMessage id="projects.createProject.status" />}
          validateStatus={form.getFieldError('status') ? 'error' : 'validating'}>
          {form.getFieldDecorator('status', {
            rules: [
              {
                required: true,
                message: intl.formatMessage({ id: 'projects.createProject.error.status' })
              }
            ]
          })(
            <Select allowClear>
              {(listStatus || []).map((e) => {
                return (
                  <Select.Option key={e.id} value={e.name}>
                    <FormattedMessage id={`projects.listProject.status.${e.name}`} />
                  </Select.Option>
                );
              })}
            </Select>
          )}
        </Form.Item>

        <Form.Item
          style={{ display: 'flex' }}
          label={<FormattedMessage id="projects.createProject.Estimated" />}
          validateStatus={form.getFieldError('estimated') ? 'error' : 'validating'}>
          {form.getFieldDecorator('estimated', {
            rules: [
              {
                required: true,
                message: intl.formatMessage({ id: 'projects.createProject.error.estimated' })
              }
            ]
          })(
            <DatePicker.RangePicker
              format="DD/MM/YYYY"
              placeholder={[
                intl.formatMessage({ id: 'projects.createProject.startDate' }),
                intl.formatMessage({ id: 'projects.createProject.endDate' })
              ]}
            />
          )}
        </Form.Item>

        <Row style={{ marginBottom: 10 }}>
          <Icon type="user" style={{ marginRight: 10 }} />
          <Typography.Text style={{ fontWeight: 'bold' }}>
            <FormattedMessage id="projects.createProject.customerInformation" />
          </Typography.Text>
        </Row>

        <Form.Item
          style={{ display: 'flex' }}
          label={<FormattedMessage id="projects.createProject.customer" />}
          validateStatus={form.getFieldError('customer_id') ? 'error' : 'validating'}>
          {form.getFieldDecorator('customer_id', {
            rules: [
              {
                required: true,
                message: intl.formatMessage({ id: 'projects.createProject.error.customer' })
              }
            ]
          })(
            <Select
              showSearch
              allowClear
              autoClearSearchValue
              onSelect={(value) => handleSelect(value)}>
              {(customersList || []).map((e) => {
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
              <Descriptions.Item
                label={<FormattedMessage id="projects.createProject.customerEmail" />}>
                {customerDetail.email || null}
              </Descriptions.Item>
              <Descriptions.Item
                label={<FormattedMessage id="projects.createProject.customerPhonenumber" />}>
                {customerDetail.phone_number || null}
              </Descriptions.Item>
              <Descriptions.Item
                label={<FormattedMessage id="projects.createProject.customerAddress" />}>
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

export default injectIntl(CreateProjectForm, {});
