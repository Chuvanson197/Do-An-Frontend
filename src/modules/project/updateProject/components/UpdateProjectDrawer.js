import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { formShape } from 'rc-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';

import {
  Drawer,
  Form,
  Input,
  DatePicker,
  Icon,
  Row,
  Col,
  Select,
  Descriptions,
  Typography,
  Spin,
  Button,
  Popconfirm
} from 'antd';

import ErrorNotification from '../../../../components/Notification/Error';
import SuccessNotification from '../../../../components/Notification/Success';
import { actions as customerActions } from '../../../customer/store';
import { actions as projectActions } from '../../store';

const propTypes = {
  intl: PropTypes.shape({}).isRequired,
  onClose: PropTypes.func.isRequired,
  drawerVisible: PropTypes.bool.isRequired,
  form: formShape.isRequired,

  project: PropTypes.shape({}),

  getCustomers: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  getProject: PropTypes.func.isRequired
};

const defaultProps = {
  project: {}
};

const styles = {
  drawerBody: css`
    padding: 0px 0px 56px 0px !important;
  `,
  drawerFooter: css`
    position: absolute;
    bottom: 0;
    right: 24px;
    left: 24px;
    padding: 24px 0px;
    background-color: #ffffff;
    border-top: '1px solid #e8e8e8';
  `,
  deletedCustomerMsg: css`
    color: red !important;
  `
};

const listStatus = [
  { id: 1, name: 'running' },
  { id: 2, name: 'completed' },
  { id: 3, name: 'stopped' }
];

const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

const UpdateProjectDrawer = ({
  getCustomers,
  updateProject,
  getProject,
  intl,
  onClose,
  drawerVisible,
  form,
  project
}) => {
  const dispatch = useDispatch();
  const [customerDetail, setCustomerDetail] = useState(project.customer);
  const { getCustomersError, getCustomersErrors } = useSelector((state) => state.customers);
  const customersList = useSelector((state) => state.customers.list);
  const { updateProjectResult, updateProjectError, updateProjectErrors, loading } = useSelector(
    (state) => state.projects
  );
  const customerLoading = useSelector((state) => state.customers.loading);

  // Get all customers after open modal
  useEffect(() => {
    getCustomers && getCustomers();
    return () => {
      dispatch(projectActions.updateProjectCleanError());
      dispatch(projectActions.updateProjectCleanData());
    };
  }, [getCustomers, dispatch]);

  // show notification if get customers failure
  useEffect(() => {
    if (getCustomersError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({
        id: getCustomersErrors.message
          ? getCustomersErrors.message
          : 'customers.customersList.message.error'
      });
      ErrorNotification(title, message);
      // clean error
      dispatch(customerActions.cleanError(false));
    }
  }, [dispatch, getCustomersError, getCustomersErrors, intl]);

  // Handle showing notification after update project
  useEffect(() => {
    // show success notification
    if (updateProjectResult) {
      const title = intl.formatMessage({ id: 'notification.success' });
      const message = intl.formatMessage({ id: updateProjectResult.message });
      SuccessNotification(title, message);
      // close the modal and clean state
      onClose();
      // re-call get project detail api
      getProject && getProject(project);
    }
    // show error notification
  }, [onClose, intl, updateProjectResult, dispatch, project, getProject]);

  useEffect(() => {
    if (updateProjectError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({ id: 'projects.updateProject.message.error' });
      ErrorNotification(title, message);
      // clean state
      dispatch(projectActions.updateProjectCleanError());
    }
  }, [dispatch, intl, updateProjectError, updateProjectErrors]);

  const handleSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        //anphan 1/10/2020 clone new customField from values to compare  with project.customField
        const customField = [];
        let indexCustomField = 3;
        do {
          customField.push({
            idInfoCustomField: project.customField[indexCustomField - 3].idInfoCustomField,
            value: Object.values(values)[indexCustomField]
          });
          indexCustomField++;
        } while (Object.keys(values)[indexCustomField] !== 'customer_id');
        const body = {
          customer_id: values.customer_id,
          name: values.name,
          status: values.status,
          start_time: parseInt(moment(values.estimated[0]).format('x'), 10),
          end_time: parseInt(moment(values.estimated[1]).format('x'), 10),
          customField: customField
        };
        if (customerDetail.hidden) {
          const title = intl.formatMessage({ id: 'notification.error' });
          const message = intl.formatMessage({ id: 'notification.message.form.deletedCustomer' });
          return ErrorNotification(title, message);
        }
        body.customField = customField;
        updateProject(body);
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
    customersList.map((customer) => {
      if (customer.id === value) {
        setCustomerDetail(customer);
      }
      return customer;
    });
  };

  return (
    <Drawer
      title={<FormattedMessage id="projects.updateProject.title" />}
      placement="right"
      onClose={onClose}
      visible={drawerVisible}
      maskClosable={false}
      width={550}>
      <Form className={styles.drawerBody} onSubmit={() => handleSubmit()} {...formItemLayout}>
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
            ],
            initialValue: project.name
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
            ],
            initialValue: listStatus.find((e) => {
              return e.name === project.status;
            }).name
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
            ],
            initialValue: [
              moment(parseInt(project.start_time, 10)),
              moment(parseInt(project.end_time, 10))
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
        <Row style={{ marginBottom: 10, marginLeft: '24px' }}>
          <Typography.Text style={{ fontWeight: 'bold' }}>
            <FormattedMessage id="projects.createProject.descriptions" />
          </Typography.Text>
        </Row>
        {project
          ? project.customField.map((obj) => (
              <Form.Item
                key={obj.idInfoCustomField}
                style={{ display: 'flex' }}
                label={obj.name}
                validateStatus={form.getFieldError(obj.name) ? 'error' : 'validating'}>
                {form.getFieldDecorator(obj.name, {
                  rules: [
                    {
                      required: obj.require,
                      message:
                        obj.name + intl.formatMessage({ id: 'projects.createProject.required' })
                    }
                  ],
                  initialValue: obj.value
                })(<Input />)}
              </Form.Item>
            ))
          : null}

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
            ],
            initialValue: !customerDetail.hidden ? project.customer.id : project.customer.name
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
          <Col span={8}></Col>
          <Col span={16}>
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
            {customerDetail.hidden && (
              <Typography.Text className={styles.deletedCustomerMsg}>
                <FormattedMessage id="projects.updateProject.deletedCustomer" />
              </Typography.Text>
            )}
          </Col>
        </Row>
      </Form>
      <Row className={styles.drawerFooter}>
        <Popconfirm
          title={<FormattedMessage id="projects.updateProject.confirm.add" />}
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

UpdateProjectDrawer.propTypes = propTypes;

UpdateProjectDrawer.defaultProps = defaultProps;

const UpdateProjectForm = Form.create({ name: 'updateProject' })(UpdateProjectDrawer);

export default injectIntl(UpdateProjectForm, {});
