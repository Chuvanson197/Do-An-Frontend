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
  const onChange = (dates, dateStrings) => {};

  const onOk = (selectedTime) => {
    console.log(selectedTime);
  };

  const { RangePicker } = DatePicker;

  return (
    <React.Fragment>
      <Row style={{ marginBottom: 75 }}>
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
                format="DD-MM-YYYY"
                mode={['month', 'month']}
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
      </Row>
    </React.Fragment>
  );
};

export default ProjectMemberHistory;
