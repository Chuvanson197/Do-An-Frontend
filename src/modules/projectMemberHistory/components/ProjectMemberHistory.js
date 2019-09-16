import React, { Fragment } from 'react';
import { Row, DatePicker } from 'antd';
import { css } from 'emotion';
import TableMemberHistory from './TableMemberHistory';
import moment from 'moment';

const styles = {
  container: css`
    margin-top: 50px;
    padding: 0px 100px;
  `,
  table: css`
    margin-top: 50px;
  `
};

const { RangePicker } = DatePicker;

const ProjectMemberHistory = () => {
  const onChange = (dates, dateStrings) => {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  };

  const onOk = (selectedTime) => {
    console.log(selectedTime);
  };

  return (
    <Fragment>
      <div className={styles.container}>
        <Row type="flex" justify="end">
          <RangePicker
            //   showTime={{ format: 'HH:mm' }}
            //   format="YYYY-MM-DD HH:mm"
            defaultValue={[moment().startOf('month'), moment().endOf('month')]}
            placeholder={['Start Time', 'End Time']}
            onChange={onChange}
            onOk={onOk}
          />
        </Row>
        <div className={styles.table}>
          <TableMemberHistory />
        </div>
      </div>
    </Fragment>
  );
};

export default ProjectMemberHistory;
