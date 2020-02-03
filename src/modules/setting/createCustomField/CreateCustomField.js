import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { FormattedMessage } from 'react-intl';
import { formShape } from 'rc-form';
import {
    Form,
    Select,
    Button,
    Input,
    Spin,
    Row,
    Icon,
    Typography,
    Checkbox,
    Modal,
    Popconfirm
} from 'antd';
import { actions as settingActions } from '../store';

import ErrorNotification from '../../../components/Notification/Error';
import SuccessNotification from '..//../../components/Notification/Success';

import modalConfig from '../../../utils/modal.config';



const propTypes = {
    form: formShape.isRequired,
    intl: PropTypes.shape({}).isRequired,
    createCustomField: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
};

const defaultProps = {};


const styles = {
    buttonSubmit: css`
    background: #49a32b !important;
    color: #fff !important;
    margin-bottom: 10px;
  `
};
const CreateCustomField = ({ form, intl, createCustomField, visible, close, getCustomFields, getProjects }) => {

    const dispatch = useDispatch();
    
    const { list, loading } = useSelector(
        (state) => state.projects
    );


    const { createCustomFieldResult, createCustomFieldError, createCustomFieldErrors } = useSelector(
        (state) => state.setting
    )

  // Get all projects after open modal
  useEffect(() => {
    getProjects && getProjects();
    dispatch(settingActions.createCustomFieldCleanData());
    dispatch(settingActions.createCustomFieldCleanError());
  }, [getProjects, dispatch]);

    const handleSubmit = () => {
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                // call api when valid data
                createCustomField && createCustomField(values);
                // form.resetFields();
                setTimeout(()=>{
                    window.location.reload()
                },0)
            } else {
                // showing error form input notification
                const title = intl.formatMessage({ id: 'notification.error' });
                const message = intl.formatMessage({ id: 'notification.message.form.error' });
                ErrorNotification(title, message);
            }
        });
    };

    // Handle showing notification after add new customfield
    useEffect(() => {
        // show success notification
        if (createCustomFieldResult) {
            const title = intl.formatMessage({ id: 'notification.success' });
            const message = intl.formatMessage({ id: 'createCustomFieldResult.message' });
            SuccessNotification(title, message);
            // close the modal and clean data
            close();
            // re-call get all customfields api
            getCustomFields && getCustomFields();
        }
    }, [close, intl, createCustomFieldResult, getCustomFields]);

    useEffect(() => {
        // show error notification
        if (createCustomFieldError) {
          const title = intl.formatMessage({ id: 'notification.error' });
          const message = intl.formatMessage({
            id: createCustomFieldErrors.message
              ? createCustomFieldError.message
              : 'setting.createCustomField.message.error'
          });
          ErrorNotification(title, message);
          // clean error
          dispatch(settingActions.createCustomFieldCleanError(false));
        }
      }, [dispatch, intl, createCustomFieldError, createCustomFieldErrors]);

    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    return (
        <Modal
            title={<FormattedMessage id="setting.createCustomField.title" />}
            cancelText="Close"
            visible={visible}
            width={550}
            className={styles.modal}
            onCancel={() => close()}
            footer={[
                <Row type="flex" key="abc" justify="end">
                    <Popconfirm
                        title={<FormattedMessage id="setting.createCustomField.confirm" />}
                        onConfirm={() => handleSubmit()}
                        okText={<FormattedMessage id="button.confirm.yes" />}
                        cancelText={<FormattedMessage id="button.confirm.no" />}>
                        <Button className={styles.buttonSubmit} loading={loading}>
                            <FormattedMessage id="button.add"/>
                        </Button>
                    </Popconfirm>
                    <Button
                        icon="close-circle"
                        type="default"
                        key="close"
                        onClick={() => close()}
                        disabled={loading}>
                        <FormattedMessage id="button.close" />
                    </Button>
                </Row>
            ]}
            {...modalConfig}>
            <Form {...formItemLayout} onSubmit={handleSubmit}>
                <Row style={{ marginBottom: 10 }}>
                    <Icon type="project" style={{ marginRight: 10 }} />
                    <Typography.Text style={{ fontWeight: 'bold' }}>
                        {<FormattedMessage id="setting.header.customfeild" />}
                    </Typography.Text>
                </Row>
                <Form.Item
                    style={{ display: 'flex' }}
                    label={<FormattedMessage id="setting.lable.feildName" />}
                    validateStatus={form.getFieldError('name') ? 'error' : 'validating'}>
                    {form.getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: <FormattedMessage id="setting.lable.feildName.validate" />
                            }
                        ]
                    })(<Input placeholder={intl.formatMessage({ id: "setting.placeholder.feildName" })}
                    />)}
                </Form.Item>
                <Form.Item label={<FormattedMessage id="setting.lable.feildProjects" />}>
                    {form.getFieldDecorator('assignee', {
                        rules: [
                            {
                                required: true,
                                message: intl.formatMessage({ id: "setting.lable.feildprojects.validate" }),
                                type: 'array'
                            },
                        ],
                    })(
                        <Select mode="multiple" placeholder={<FormattedMessage id="setting.placeholder.feildProjects" />} notFoundContent={loading && <Spin size="small" />}>
                            {(list || []).map((e) => {
                                return (
                                    <Select.Option key={e.id} value={e.id}>
                                        {e.name}
                                    </Select.Option>
                                );
                            })}
                        </Select>,
                    )}
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    {form.getFieldDecorator('require', {
                        valuePropName: 'checked',
                        initialValue: false,
                    })(<Checkbox>{<FormattedMessage id="setting.lable.feildOptions" />}</Checkbox>)}
                </Form.Item>
            </Form>
        </Modal>
    );
}
const FormCreateCustomfield = Form.create({ name: 'dynamic_form_item' })(CreateCustomField);

FormCreateCustomfield.propTypes = propTypes;

FormCreateCustomfield.defaultProps = defaultProps;

export default FormCreateCustomfield;