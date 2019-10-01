// import react from 'react';
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import { formShape } from 'rc-form';
import { css } from 'emotion';

const propTypes = {
  form: formShape.isRequired
};

const defaultProps = {};

const styles = {
  loginForm: css`
    max-width: 300px;
  `,
  loginformForgot: css`
    float: right;
  `,
  loginformButton: css`
    width: 100%;
  `
};
const NormalLoginForm = ({ form }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log(form);
        console.log('Received values of form: ', values);
      }
    });
  };

  const { getFieldDecorator } = form;
  return (
      <Form onSubmit={handleSubmit} className={styles.loginForm}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          {/* <a className={styles.loginformForgot} href=""> */}
          Forgot password
          {/* </a> */}
          <Button type="primary" htmlType="submit" className={styles.loginformButton}>
            Log in
          </Button>
          Or <a href="/register">register now!</a>
        </Form.Item>
      </Form>
  );
};

NormalLoginForm.propTypes = propTypes;

NormalLoginForm.defaultProps = defaultProps;

const LoginForm = Form.create()(NormalLoginForm);

export default LoginForm;
