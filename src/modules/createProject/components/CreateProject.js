import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal, Button, Input, DatePicker, Select } from 'antd';
import moment from 'moment';

const propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};
const defaultProps = {};
const CreateProject = ({ visible, close }) => {
  const [form, setForm] = useState({
    project_name: null,
    customer_name: null,
    mentor: null,
    start_date: null,
    end_date: null,
    members: []
  });
  const OPTIONS = ['Chu Van Son', 'Nguyen Van A', 'Nguyen Van B', 'Nguyen Van C'];

  const updateFeild = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };
  const updateData = (key, value) => {
    const data = form;
    data[key] = value;
    setForm({
      ...data
    });
  };

  const filteredOptions = OPTIONS.filter((o) => !form.members.includes(o));

  return (
    <Modal
      title="Create Project"
      cancelText="Close"
      visible={visible}
      width="80vw"
      onCancel={() => close()}
      footer={[
        <Row type="flex" key="abc" justify="space-between">
            <Button type="primary" onClick={handleSubmit}
            >
              Create Project
            </Button>
            <Button type="primary" key="close" onClick={() => close()}>
              Close
            </Button>
        </Row>
      ]}>
      <div style={{ height: '50vh' }}>
        <Row style={{ marginBottom: 35, marginTop: 50 }}>
          <Col span={2}>Project Name</Col>
          <Col span={18}>
            <Input
              id="project_name"
              placeholder="Project name"
              value={form.project_name}
              onChange={(e) => updateFeild(e)}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 35 }}>
          <Col span={2}>Customer</Col>
          <Col span={18}>
            <Input
              id="customer_name"
              placeholder="Customer name"
              value={form.customer_name}
              onChange={(e) => updateFeild(e)}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 35 }}>
          <Col span={2}>Mentor</Col>
          <Col span={18}>
            <Input
              id="mentor"
              placeholder="Mentor"
              value={form.mentor}
              onChange={(e) => updateFeild(e)}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 35 }}>
          <Col span={2}>Members</Col>
          <Col span={18}>
            <Select
              id="members"
              mode="multiple"
              value={form.members}
              style={{ width: '100%' }}
              placeholder="Please select"
              onChange={(e) => updateData('members', e)}>
              {filteredOptions.map((item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row type="flex" justify="start" style={{ marginBottom: 35 }}>
          <Col span={2}>Time</Col>
          <Col span={5}>
            <DatePicker
              format="DD-MM-YYYY"
              defaultPickerValue={form.start_date ? moment(form.start_date, 'DD-MM-YYYY') : null}
              placeholder="Start"
              onChange={(value) => {
                const data = moment(value).format('DD-MM-YYYY');
                updateData('start_date', data);
              }}
            />
          </Col>
          <Col span={5}>
            <DatePicker
              format="DD-MM-YYYY"
              defaultPickerValue={form.end_date ? moment(form.start_date, 'DD-MM-YYYY') : null}
              placeholder="End"
              onChange={(value) => {
                const data = moment(value).format('DD-MM-YYYY');
                updateData('end_date', data);
              }}
            />
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

CreateProject.propTypes = propTypes;

CreateProject.defaultProps = defaultProps;

export default CreateProject;
