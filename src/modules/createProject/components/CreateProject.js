import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal, Button, Input, DatePicker} from 'antd';
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
    start_day: null,
    end_day: null
  });
  const updateFeild = e => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };
  const updateDate = (key, value) => {
    const data = form;
    data[key] = value;
    setForm({
      ...data
    });
  };

  return (
    <Modal
      centered
      style={{top: 50}}
      title="Create Project"
      cancelText="Close"
      visible={visible}
      width="85vw"
      onCancel={() => close()}
      footer={[
        <Button type="primary" key="close" onClick={() => close()}>
          Close
        </Button>
      ]}>
      <div style={{ height: '75vh' }}>
        <Row style={{ marginBottom: 10 }}>
          <Col span={2}>
            Project Name
          </Col>
          <Col span={18}>
          <Input
            id="project_name"
            placeholder="Project name"
            value={form.project_name}
            onChange={e => updateFeild(e)}
          />
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col span={2}>
            Customer
          </Col>
          <Col span={18}>
          <Input
            id="customer_name"
            placeholder="Customer name"
            value={form.customer_name}
            onChange={e => updateFeild(e)}
          />
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col span={2}>
            Mentor
          </Col>
          <Col span={18}>
            <Input
              id="mentor"
              placeholder="Mentor"
              value={form.mentor}
              onChange={e => updateFeild(e)}
            />
          </Col>
        </Row>
        <Row type="flex" justify="start" style={{ marginBottom: 10 }}>
          <Col span={2}>
            Start Day
          </Col>
          <Col span={18}>
            <DatePicker
            format="DD-MM-YYYY"
            value={form.start_day && moment(form.start_day, 'DD-MM-YYYY')}
            placeholder="Start"
            onChange={(value) => {
              const data = (moment(value).format('DD-MM-YYYY'));
              updateDate('start_day', data);
            }}
            />
          </Col>
        </Row>
        <Row type="flex" justify="start" style={{ marginBottom: 10 }}>
          <Col span={2}>
            End Day
          </Col>
          <Col span={18}>
            <DatePicker
            format="DD-MM-YYYY"
            value={form.end_day && moment(form.end_day, 'DD-MM-YYYY')}
            placeholder="End"
            onChange={(value) => {
              const data = (moment(value).format('DD-MM-YYYY'));
              updateDate('end_day', data);
            }}
            />
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Button
            type="primary"
            onClick={handleSubmit}
          >
            Create Project
          </Button>
        </Row>
      </div>
    </Modal>
  );
};

CreateProject.propTypes = propTypes;

CreateProject.defaultProps = defaultProps;

export default CreateProject;
