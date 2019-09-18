import React from 'react';
import { Row, Col, DatePicker, Button, Icon } from 'antd';
import { css } from 'emotion';
import TableMemberHistory from './TableMemberHistory';
import moment from 'moment';

const styles = {
  datePicker: css`
    margin-bottom: 24px;
  `
};

const ProjectMemberHistory = () => {
  const onChange = (dates, dateStrings) => {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  };

  const onOk = (selectedTime) => {
    console.log(selectedTime);
  };

  const { RangePicker } = DatePicker;

  return (
    <React.Fragment>
      <Row className={styles.datePicker}>
        <Col span={12}>
          <Button type="primary">
            <Icon type="line-chart" />
            Show diagram
          </Button>
        </Col>
        <Col span={12}>
          <Row type="flex" justify="end">
            <RangePicker
              defaultValue={[moment().startOf('month'), moment().endOf('month')]}
              placeholder={['Start Time', 'End Time']}
              onChange={onChange}
              onOk={onOk}
            />
          </Row>
        </Col>
      </Row>
      <Row>
        <TableMemberHistory />
      </Row>
    </React.Fragment>
  );
};

export default ProjectMemberHistory;