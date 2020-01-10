import React from 'react';
import { useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
import { css } from 'emotion';
import { FormattedMessage } from 'react-intl';
import {
    Form,
    Select,
    Button,
    Input,
    Spin,
    Row,
    Icon,
    Typography,
    Checkbox
} from 'antd';
import ErrorNotification from '../../../components/Notification/Error';


const propTypes = {
};

const defaultProps = {};


const styles = {
    buttonSubmit: css`
    background: #49a32b !important;
    color: #fff !important;
    margin-bottom: 10px;
  `
};
const CustomField = ({ form, intl, createCustomField }) => {
    const { list, loading } = useSelector(
        (state) => state.projects
    );

    const handleSubmit = e => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                // call api when valid data
                createCustomField && createCustomField(values);
                form.resetFields();
            } else {
                // showing error form input notification
                const title = intl.formatMessage({ id: 'notification.error' });
                const message = intl.formatMessage({ id: 'notification.message.form.error' });
                ErrorNotification(title, message);
            }
        });
    };

    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    return (
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
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Button onClick={handleSubmit} className={styles.buttonSubmit} htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
const FormSettingProject = Form.create({ name: 'dynamic_form_item' })(CustomField);

FormSettingProject.propTypes = propTypes;

FormSettingProject.defaultProps = defaultProps;

export default FormSettingProject;