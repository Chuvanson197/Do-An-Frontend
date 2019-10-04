import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, DatePicker, Button, Icon } from 'antd';
import { css } from 'emotion';
import TableMemberHistory from './TableMemberHistory';
import moment from 'moment';

import MemberDiagram from '../../../member/memberDiagram/MemberDiagram';

const propTypes = {
  projectMemberHistory: PropTypes.arrayOf(PropTypes.shape({}))
};

const defaultProps = {
  projectMemberHistory: []
};

const styles = {
  datePicker: css`
    margin-bottom: 24px;
  `
};

const ProjectMemberHistory = ({ projectMemberHistory }) => {
  const [visible, setVisible] = useState(false);
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
            <Button type="primary" onClick={() => setVisible(!visible)}>
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
          <TableMemberHistory projectMemberHistory={projectMemberHistory} />
        </Row>
      </Row>
      <MemberDiagram visible={visible} close={() => setVisible(!visible)} />
    </React.Fragment>
  );
};

ProjectMemberHistory.propTypes = propTypes;
ProjectMemberHistory.defaultProps = defaultProps;

export default ProjectMemberHistory;
