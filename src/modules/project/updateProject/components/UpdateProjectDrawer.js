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
import { actions as customerActions } from '../../../customer/cutomers/store';
import { actions as updateProjectActions } from '../store';
import { actions as projectDetailActions } from '../../projectDetails/store';

const propTypes = {
  intl: PropTypes.shape({}).isRequired,
  onClose: PropTypes.func.isRequired,
  drawerVisible: PropTypes.bool.isRequired,
  form: formShape.isRequired,

  project: PropTypes.shape({})
};

const defaultProps = {
  project: {}
};

const styles = {
  drawerFooter: css`
    position: absolute;
    bottom: 0;
    right: 24px;
    left: 24px;
    padding: 24px 0px;
  `
};

const listStatus = [
  { id: 1, name: 'running' },
  { id: 2, name: 'completed' },
  { id: 3, name: 'stopped' }
];

const UpdateProjectDrawer = ({ intl, onClose, drawerVisible, form, project }) => {
  const dispatch = useDispatch();
  const [customerDetail, setCustomerDetail] = useState(project.customer);
  const { customersList, getCustomersError } = useSelector((state) => state.customers);
  const { result, updateProjectError } = useSelector((state) => state.updateProject);
  const customerLoading = useSelector((state) => state.customers.loading);

  // Get all customers after open modal
  useEffect(() => {
    dispatch(
      customerActions.getCustomers({
        path: 'customers'
      })
    );
  }, [dispatch]);

  // show notification if get customers failure
  useEffect(() => {
    if (getCustomersError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({ id: 'customers.customersList.message.error' });
      ErrorNotification(title, message);
      // clean error
      dispatch(customerActions.cleanError(false));
    }
  }, [dispatch, getCustomersError, intl]);

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
        projectDetailActions.getProjectDetail({
          path: 'projects',
          param: project.id
        })
      );
    }
    // show error notification
    if (updateProjectError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({ id: 'projects.updateProject.message.error' });
      ErrorNotification(title, message);
      // clean state
      dispatch(updateProjectActions.cleanError(false));
    }
  }, [onClose, dispatch, intl, updateProjectError, result, project.id]);

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

        const oldBody = {
          customer_id: project.customer.id,
          name: project.name,
          status: project.status,
          start_time: parseInt(project.start_time, 10),
          end_time: parseInt(project.end_time, 10)
        };
        // check if value is not change
        if (JSON.stringify(body) === JSON.stringify(oldBody)) {
          const title = intl.formatMessage({ id: 'notification.error' });
          const message = intl.formatMessage({ id: 'notification.message.form.noChanging' });
          return ErrorNotification(title, message);
        }
        dispatch(
          updateProjectActions.updateProject({ body, path: 'projects', param: project.id })
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
      <Form onSubmit={() => handleSubmit()}>
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
            initialValue: project.customer.id
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
      <Row className={styles.drawerFooter}>
        <Popconfirm
          title={<FormattedMessage id="projects.createProject.confirm.add" />}
          onConfirm={() => handleSubmit()}
          okText={<FormattedMessage id="button.confirm.yes" />}
          cancelText={<FormattedMessage id="button.confirm.no" />}>
          <Button icon="edit" type="primary">
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
