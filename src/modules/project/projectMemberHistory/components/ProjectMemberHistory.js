import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { css } from 'emotion';
import { injectIntl } from 'react-intl';
import { Row, DatePicker } from 'antd';

import { actions as projectActions } from '../../store';
import TableMemberHistory from './TableMemberHistory';
import ErrorNotification from '../../../../components/Notification/Error';

const propTypes = {
  match: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired,

  getMemberHistory: PropTypes.func.isRequired
};

const defaultProps = {};

const styles = {
  datePicker: css`
    margin-bottom: 24px;
  `
};

const ProjectMemberHistory = ({ intl, getMemberHistory}) => {
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState([moment().startOf('year'), moment().endOf('year')]);
  const { getMemberHistoryError, getMemberHistoryErrors } = useSelector((state) => state.projects);

  // First call members list api
  useEffect(() => {
    console.log('call 1 time only');

    const body = {
      time_in: parseInt(
        moment()
          .startOf('year')
          .format('x'),
        10
      ),
      time_out: parseInt(
        moment()
          .endOf('year')
          .format('x'),
        10
      )
    };

    getMemberHistory && getMemberHistory(body);
  }, [getMemberHistory]);

  // Handle if api call failure
  useEffect(() => {
    if (getMemberHistoryError) {
      const title = intl.formatMessage({ id: 'notification.error' });
      const message = intl.formatMessage({
        id: getMemberHistoryErrors.message
          ? getMemberHistoryErrors.message
          : 'projects.memberHistory.message.error'
      });
      ErrorNotification(title, message);
      dispatch(projectActions.getMemberHistoryCleanError());
    }
  }, [dispatch, getMemberHistoryError, getMemberHistoryErrors, intl]);

  const handleChange = (value) => {
    setDateRange(value);
    const body = {
      time_in: parseInt(moment(value[0]).format('x'), 10),
      time_out: parseInt(moment(value[1]).format('x'), 10)
    };
    getMemberHistory && getMemberHistory(body);
  };

  return (
    <React.Fragment>
      <Row style={{ marginBottom: 75 }}>
        <Row className={styles.datePicker}>
          <DatePicker.RangePicker
            value={dateRange}
            format="DD/MM/YYYY"
            onChange={handleChange}
            allowClear={false}
          />
        </Row>
        <Row>
          <TableMemberHistory />
        </Row>
      </Row>
    </React.Fragment>
  );
};

ProjectMemberHistory.propTypes = propTypes;

ProjectMemberHistory.defaultProps = defaultProps;

export default injectIntl(ProjectMemberHistory, {});
