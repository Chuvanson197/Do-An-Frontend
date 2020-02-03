import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { formShape } from 'rc-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { actions as settingActions } from '../store';

import {
    Drawer,
    Form,
    Icon,
    Row,
    Select,
    Typography,
    Button,
    Popconfirm,
    Input,
    Spin,
    Checkbox
} from 'antd';

import ErrorNotification from '../../../components/Notification/Error';
import SuccessNotification from '../../../components/Notification/Success';

const propTypes = {
    intl: PropTypes.shape({}).isRequired,
    onClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    form: formShape.isRequired,

    updateCustomField: PropTypes.func.isRequired,
    removeAssigneeProject: PropTypes.func.isRequired,
    createAssigneeProject: PropTypes.func.isRequired
};

const defaultProps = {};

const styles = {
    drawerFooter: css`
    position: absolute;
    bottom: 0;
    right: 24px;
    left: 24px;
    padding: 24px 0px;
  `
};


const formItemLayout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    }
};

const UpdateCustomFieldDrawer = ({
    intl,
    onClose,
    visible,
    form,
    customfield,
    getCustomFields,
    updateCustomField,
    removeAssigneeProject,
    createAssigneeProject,
    getProjects
}) => {
    const dispatch = useDispatch();
    const {
        updateCustomFieldResult,
        updateCustomFieldError,
        updateCustomFieldErrors,
        loading, removeAssigneeProjectResult,
        removeAssigneeProjectError,
        removeAssigneeProjectErrors,
        createAssigneeProjectResult,
        createAssigneeProjectError,
        createAssigneeProjectErrors } = useSelector(
            (state) => state.setting
        );
    const { list } = useSelector(
        (state) => state.projects
    );
    const [arrRemove, setArrRemove] = useState([]);
    const [arrCreate, setArrCreate] = useState([]);


    useEffect(() => {
        getProjects && getProjects();
        return () => {
            dispatch(settingActions.updateCustomFieldCleanError());
            dispatch(settingActions.updateCustomFieldCleanData(false));
        };
    }, [dispatch, getProjects]);

    // Handle showing notification after update project
    useEffect(() => {
        // show success notification
        if (updateCustomFieldResult) {
            const title = intl.formatMessage({ id: 'notification.success' });
            const message = intl.formatMessage({ id: 'updateCustomFieldResult.message' });
            SuccessNotification(title, message);
            // close the modal and clean state
            onClose();
            // re-call get project detail api
            getCustomFields && getCustomFields();
        }
    }, [onClose, intl, updateCustomFieldResult, getCustomFields]);

    useEffect(() => {
        // show error notification
        if (updateCustomFieldError) {
            const title = intl.formatMessage({ id: 'notification.error' });
            const message = intl.formatMessage({
                id: updateCustomFieldErrors.message
                    ? updateCustomFieldErrors.message
                    : 'projects.updateMemberInProject.message.error'
            });
            ErrorNotification(title, message);
            // clean state
            dispatch(settingActions.updateCustomFieldCleanError(false));
        }
    }, [dispatch, intl, updateCustomFieldError, updateCustomFieldErrors]);



    // Handle showing notification after update AssigneeProject
    useEffect(() => {
        // show success notification
        if (removeAssigneeProjectResult) {
            const title = intl.formatMessage({ id: 'notification.success' });
            const message = intl.formatMessage({ id: 'updateCustomFieldResult.message' });
            SuccessNotification(title, message);
            // close the modal and clean state
            onClose();
            // re-call get project detail api
            getCustomFields && getCustomFields();
        }
    }, [onClose, intl, removeAssigneeProjectResult, getCustomFields]);

    useEffect(() => {
        // show error notification
        if (removeAssigneeProjectError) {
            const title = intl.formatMessage({ id: 'notification.error' });
            const message = intl.formatMessage({
                id: removeAssigneeProjectErrors.message
                    ? removeAssigneeProjectErrors.message
                    : 'projects.updateMemberInProject.message.error'
            });
            ErrorNotification(title, message);
            // clean state
            dispatch(settingActions.removeAssigneeProjectCleanError(false));
        }
    }, [dispatch, intl, removeAssigneeProjectError, removeAssigneeProjectErrors]);


    // Handle showing notification after createAssigneeProject
    useEffect(() => {
        // show success notification
        if (createAssigneeProjectResult) {
            const title = intl.formatMessage({ id: 'notification.success' });
            const message = intl.formatMessage({ id: 'updateCustomFieldResult.message' });
            SuccessNotification(title, message);
            // close the modal and clean state
            onClose();
            // re-call get project detail api
            getCustomFields && getCustomFields();
        }
    }, [onClose, intl, createAssigneeProjectResult, getCustomFields]);

    useEffect(() => {
        // show error notification
        if (createAssigneeProjectError) {
            const title = intl.formatMessage({ id: 'notification.error' });
            const message = intl.formatMessage({
                id: createAssigneeProjectErrors.message
                    ? createAssigneeProjectErrors.message
                    : 'projects.updateMemberInProject.message.error'
            });
            ErrorNotification(title, message);
            // clean state
            dispatch(settingActions.createAssigneeProjectCleanError(false));
        }
    }, [dispatch, intl, createAssigneeProjectError, createAssigneeProjectErrors]);


    const handleSubmit = () => {
        form.validateFields(async (err, values) => {
            if (!err) {
                const body = {
                    id: customfield.id,
                    name: values.name,
                    assignee: values.assignee,
                    require: values.require
                };
                const oldBody = {
                    id: customfield.id,
                    name: customfield.name,
                    assignee: customfield.infocustomField.map(e => { return (e.project.id) }),
                    require: customfield.require
                };
                // check if value is not change
                if (JSON.stringify(body) === JSON.stringify(oldBody)) {
                    const title = intl.formatMessage({ id: 'notification.error' });
                    const message = intl.formatMessage({ id: 'notification.message.form.noChanging' });
                    return ErrorNotification(title, message);
                } else {
                    const bodyCreateAssignee = {
                        idCustomField: customfield.id,
                        projects: arrCreate
                    }
                    const bodyRemoveAssignee = {
                        idCustomField: customfield.id,
                        projects: arrRemove
                    }
                    removeAssigneeProject && removeAssigneeProject(bodyRemoveAssignee);
                    createAssigneeProject && createAssigneeProject(bodyCreateAssignee);
                    updateCustomField(body);
                    setTimeout(() => {
                        window.location.reload()
                    }, 0)

                }


            } else {
                // showing error form input notification
                const title = intl.formatMessage({ id: 'notification.error' });
                const message = intl.formatMessage({ id: 'notification.message.form.error' });
                ErrorNotification(title, message);
            }
            return null;
        });
    };
    return (
        <Drawer
            title={<FormattedMessage id="setting.project.drawerUpdate.tile" />}
            placement="right"
            onClose={onClose}
            visible={visible}
            maskClosable={false}
            width={500}>
            <Form onSubmit={() => handleSubmit()} {...formItemLayout}>
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
                        initialValue: customfield.name,
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
                        initialValue: customfield.infocustomField.map(e => { return (e.project.id) }),
                        rules: [
                            {
                                required: false,
                                message: intl.formatMessage({ id: "setting.lable.feildprojects.validate" }),
                                type: 'array'
                            },
                        ],
                    })(
                        <Select mode="multiple"
                            onDeselect={value => {
                                if (arrCreate.includes(value)) {
                                    setArrCreate(arrCreate.filter(created => created !== value
                                    ))
                                } else {
                                    setArrRemove([...arrRemove, value])
                                }
                            }
                            }
                            onSelect={value => {
                                if (value === 0) {
                                    let listProject = customfield.infocustomField.map(e => { return (e.project.id) });
                                    form.setFieldsValue({ ...form.getFieldsValue(), assignee: list.map(e => e.id) });
                                    console.log(form.getFieldsValue());
                                    setArrRemove([]);
                                    setArrCreate(
                                        list.reduce((accumulator, currentValue) => {
                                            if (!listProject.includes(currentValue.id)) {
                                                return [...accumulator, currentValue.id]
                                            }
                                            return accumulator
                                        }, [])

                                    )
                                }
                                else {
                                    if (arrRemove.includes(value)) {
                                        setArrRemove(arrRemove.filter(removed => removed !== value))
                                    } else {
                                        setArrCreate([...arrCreate, value])
                                    }
                                }
                            }
                            }
                            placeholder={<FormattedMessage id="setting.placeholder.feildProjects" />} notFoundContent={loading && <Spin size="small" />}>
                            <Select.Option title="setting.allProject" value={0}>{<FormattedMessage id="setting.allProject" />}</Select.Option>
                            {(list || []).map(e => {
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
                        initialValue: customfield.require,
                    })(<Checkbox>{<FormattedMessage id="setting.lable.feildOptions" />}</Checkbox>)}
                </Form.Item>
                <Row className={styles.drawerFooter}>
                    <Popconfirm
                        title={<FormattedMessage id="setting.updateCustomField.confirm" />}
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
            </Form>
        </Drawer>
    );
};

UpdateCustomFieldDrawer.propTypes = propTypes;

UpdateCustomFieldDrawer.defaultProps = defaultProps;

const UpdateCustomFieldForm = Form.create({ name: 'updateCustomField' })(UpdateCustomFieldDrawer);

export default injectIntl(UpdateCustomFieldForm, {});
