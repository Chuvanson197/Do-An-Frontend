import React, { useEffect, useState } from 'react';
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
const CreateCustomField = ({ form, intl, createCustomField, visible, close, getCustomFields, getProjects, global }) => {

    const dispatch = useDispatch();

    const { list, loading } = useSelector(
        (state) => state.projects
    );

    const { valueTypes } = useSelector(
        (state) => state.setting
    );
    useEffect(() => {
        // get value type
        dispatch(
            settingActions.getValueTypes({
                path: 'data/valueType'
            })
        );
    }, [dispatch]);

    const [defaultValue, setDefaultValue] = useState({})

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
            if (!err && defaultValue.status === "success") {
                // call api when valid data
                global ? values.is_global = true : values.is_global = false
                createCustomField && createCustomField(values);
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

    //handle change value type
    const handleChange = (e) => {
        setDefaultValue({ status: "success", help: "", type: e });
        form.setFieldsValue({ ...form.getFieldsValue(), defaultValue: '' })
    }

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
                id: 'setting.createCustomField.message.error'
            });
            ErrorNotification(title, message);
            // clean error
            dispatch(settingActions.createCustomFieldCleanError(false));
        }
    }, [dispatch, intl, createCustomFieldError, createCustomFieldErrors]);

    //regex default value 
    const regex = (value) => {
        let re;
        switch (defaultValue.type) {
            case "Url":
                re = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g
                return (value.match(re) !== null)
            case "Number":
                re = /^[0-9]*$/
                return (value.match(re) !== null)
            default: return true
        }
    }

    const handleChangeInput = (e) => {
        if (!e.target.value) { setDefaultValue({ ...defaultValue, status: "error", help: <FormattedMessage id="setting.label.defaultValue.validate" /> }) }
        else if (!regex(e.target.value)) {
            setDefaultValue({ ...defaultValue, status: "error", help: intl.formatMessage({ id: `setting.label.defaultValue.${defaultValue.type}` }) });
        }
        else {
            setDefaultValue({ ...defaultValue, status: "success", help: "" })
        }
    }

    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    return (
        <Modal
            title={<FormattedMessage id={global ? "setting.createGlobalCustomField.title" : "setting.createCustomField.title"} />}
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
                            <FormattedMessage id="button.add" />
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
                        {<FormattedMessage id="setting.header.customfield" />}
                    </Typography.Text>
                </Row>
                <Form.Item
                    style={{ display: 'flex' }}
                    label={<FormattedMessage id="setting.label.fieldName" />}
                    validateStatus={form.getFieldError('name') ? 'error' : 'validating'}>
                    {form.getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: <FormattedMessage id="setting.label.fieldName.validate" />
                            }
                        ]
                    })(<Input placeholder={intl.formatMessage({ id: "setting.placeholder.fieldName" })}
                    />)}
                </Form.Item>
                <Form.Item label={<FormattedMessage id="setting.label.fieldProjects" />}>
                    {form.getFieldDecorator('assignee', {
                        rules: [
                            {
                                required: true,
                                message: intl.formatMessage({ id: "setting.label.fieldprojects.validate" }),
                                type: 'array'
                            },
                        ],
                        initialValue: global ? list.map(e => e.id) : undefined
                    })(
                        <Select
                            mode="multiple"
                            placeholder={<FormattedMessage id="setting.placeholder.fieldProjects" />}
                            notFoundContent={loading && <Spin size="small" />}
                            //add all projects    
                            onSelect={value => {
                                if (value === 0) {
                                    form.setFieldsValue({ ...form.getFieldsValue(), assignee: list.map(e => e.id) })
                                }
                            }}
                            disabled={global}>
                            <Select.Option title="setting.allProject" value={0}>{<FormattedMessage id="setting.allProject" />}</Select.Option>
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
                <Form.Item
                    style={{ display: 'flex' }}
                    label={<FormattedMessage id="setting.label.valueType" />}
                    validateStatus={form.getFieldError('valueType') ? 'error' : 'validating'}>
                    {form.getFieldDecorator('valueType', {
                        rules: [
                            {
                                required: true,
                                message: <FormattedMessage id="setting.label.valueType.validate" />
                            }
                        ]
                    })(<Select onChange={handleChange} placeholder={<FormattedMessage id="setting.placeholder.valueType" />}>
                        {valueTypes && valueTypes.map(e => <Select.Option style={{ textTransform: 'capitalize' }} key={e.id} value={e.value}>{e.value}</Select.Option>)}
                    </Select>)}
                </Form.Item>
                <Form.Item
                    style={{ display: 'flex' }}
                    label={<FormattedMessage id="setting.label.defaultValue" />}
                    validateStatus={defaultValue.status}
                    help={defaultValue.help}
                >{form.getFieldDecorator('defaultValue', {
                    rules: [
                        {
                            required: true,
                            message: <FormattedMessage id="setting.label.defaultValue.validate" />
                        }
                    ]
                })(defaultValue.type === "Text Area" ?
                    <Input.TextArea placeholder={intl.formatMessage({ id: "setting.placeholder.defaultValue" })} />
                    : <Input onChange={handleChangeInput} placeholder={intl.formatMessage({ id: "setting.placeholder.defaultValue" })} />)}
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    {form.getFieldDecorator('require', {
                        valuePropName: 'checked',
                        initialValue: false,
                    })(<Checkbox>{<FormattedMessage id="setting.label.fieldOptions" />}</Checkbox>)}
                </Form.Item>
            </Form>
        </Modal>
    );
}
const FormCreateCustomfield = Form.create({ name: 'dynamic_form_item' })(CreateCustomField);

FormCreateCustomfield.propTypes = propTypes;

FormCreateCustomfield.defaultProps = defaultProps;

export default FormCreateCustomfield;