import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { formShape } from 'rc-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';

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
  Spin
} from 'antd';

import ErrorNotification from '../../../../components/Notification/Error';
import SuccessNotification from '../../../../components/Notification/Success';
import { actions as customerActions } from '../../../customer/store';
import { actions as projectActions } from '../../store';

const propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  form: formShape.isRequired,
  intl: PropTypes.shape({}).isRequired,

  selectedCustomer: PropTypes.shape({}),

  createProject: PropTypes.func.isRequired,
  getProjects: PropTypes.func.isRequired,
  getCustomers: PropTypes.func.isRequired
};

const defaultProps = {
  selectedCustomer: {}
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
  { id: 1, name: 'running' },
  { id: 2, name: 'completed' },
  { id: 3, name: 'stopped' }
];

const CreateProject = ({
  visible,
  close,
  form,
  selectedCustomer,
  intl,
  createProject,
  getProjects,
  getCustomers
}) => {
  const dispatch = useDispatch();
  const [customerDetail, setCustomerDetail] = useState(selectedCustomer);
  const { getCustomersError, getCustomersErrors } = useSelector((state) => state.customers);
  const customersList = useSelector((state) => state.customers.list);
  const customerLoading = useSelector((state) => state.customers.loading);
  const { createProjectError, createProjectErrors, createProjectResult, loading } = useSelector(
    (state) => state.projects
  );

  const {
    user: { staff_code }
  } = useSelector((state) => state.auth);
  // Get all customers after open modal
  useEffect(() => {
    getCustomers && getCustomers();
    dispatch(projectActions.createProjectCleanData());
    dispatch(projectActions.createProjectCleanError());
  }, [getCustomers, dispatch]);

  // show notification if get customers failure
  useEffect(() => {
    if (getCustomersError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({
        id: 'customers.getCustomers.message.error'
      });
      ErrorNotification(title, message);
      // clean error
      dispatch(customerActions.getCustomersCleanError());
    }
  }, [dispatch, getCustomersError, getCustomersErrors, intl]);

  // Handle showing notification after add new project
  useEffect(() => {
    // show success notification
    if (createProjectResult) {
      const title = intl.formatMessage({ id: 'notification.success' });
      const message = intl.formatMessage({ id: createProjectResult.message });
      SuccessNotification(title, message);
      // close the modal and clean state
      close();
      // re-call get all projects api
      getProjects && getProjects();
    }
  }, [close, dispatch, intl, createProjectResult, getProjects]);

  useEffect(() => {
    // show error notification
    if (createProjectError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({
        id: createProjectErrors.message
          ? createProjectError.message
          : 'projects.createProject.message.error'
      });
      ErrorNotification(title, message);
      // clean error
      dispatch(projectActions.createProjectCleanError());
    }
  }, [dispatch, intl, createProjectError, createProjectErrors]);

  // Form submit
  const handleSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        const body = {
          customer_id: values.customer_id,
          name: values.name,
          status: values.status,
          start_time: parseInt(moment(values.estimated[0]).format('x'), 10),
          end_time: parseInt(moment(values.estimated[1]).format('x'), 10),
          staff_code
        };
        // call api when valid data
        createProject && createProject(body);
        // form.resetFields();
        setTimeout(() => {
          window.location.reload()
        }, 0)
      } else {
        // showing error form input notification
        const title = intl.formatMessage({ id: 'notification.error' });
        const message = intl.formatMessage({ id: 'notification.message.form.error' });
        ErrorNotification(title, message);
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
      onCancel={() => close()}
      maskClosable={false}
      footer={[
        <Row type="flex" key="cp_footer" justify="end">
          <Popconfirm
            title={<FormattedMessage id="projects.createProject.confirm.add" />}
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
                    <FormattedMessage id={`projects.status.${e.name}`} />
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
              allowClear
              autoClearSearchValue
              onSelect={(value) => handleSelect(value)}
              notFoundContent={customerLoading && <Spin size="small" />}>
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
