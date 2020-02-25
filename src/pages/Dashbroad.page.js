import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Gantt from "../modules/dashbroad/Gantt/Gantt";
import { actions as layoutActions } from '../modules/layout/store';
import { actions as projectActions } from '../modules/project/store';
import moment from 'moment';
import { DatePicker, Radio } from 'antd';
import '../assets/styles/gantt/main.scss';
import { FormattedMessage, injectIntl } from 'react-intl';


const propTypes = {
  history: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired

};

const defaultProps = {};
const DashbroadPage = ({ history, intl }) => {
  const dispatch = useDispatch();
  const { RangePicker } = DatePicker;
  const [data, setData] = useState({ data: null })
  const [value, setValue] = useState([moment(new Date()).subtract(3, 'months'), moment(new Date())])
  const [mode, setMode] = useState(['month', 'month'])
  const { list } = useSelector(
    (state) => state.projects
  );
  const colors = ["#99cc00", "#BDC667", "#3C6174", "#0672AA", "#77966D", "#56282D", "#cc0000", "#0000ff", "#00ffcc"]
  //hanlde when change time on monthpicker
  const handlePanelChange = (value, mode) => {
    setValue(value);
    setMode([mode[0] === 'date' ? 'month' : mode[0], mode[1] === 'date' ? 'month' : mode[1]]);
  }
  //handle when change time on fast selector 3 months, 6 months, 1 year
  const handleChange = (e) => {
    setValue([moment(new Date()).subtract(e.target.value, 'months'), moment(new Date())])
  }
  //reload time space when change on buttons
  useEffect(() => {
    if (value.length > 0) {
      let startTime = moment(value[0]._d).format('YYYYMM');
      let endTime = moment(value[1]._d).format('YYYYMM');
      const result = list.filter(project =>
        !(parseInt(moment(new Date(parseInt(project.start_time))).format('YYYYMM')) > parseInt(endTime) ||
          parseInt(moment(new Date(parseInt(project.end_time))).format('YYYYMM')) < parseInt(startTime))
      )
      setData({ data: null })
      setData({
        data: result.map(project => {
          return {
            id: project.id, text: project.name,
            end_date: moment(parseInt(project.end_time, 10)).format('YYYY-MM-DD'),
            start_date: moment(parseInt(project.start_time, 10)).format('YYYY-MM-DD'),
            readonly: true,
            color: colors[project.id % colors.length],
          }
        })
      })
    }
  }, [value, list])
  useEffect(() => {
    dispatch(layoutActions.selectItem(['dashboard']));
    dispatch(
      projectActions.getProjects({
        path: 'projects'
      })
    );
  }, [dispatch]);
  return (
    <div>
      <div className="zoom-bar">
        <div className="tool-bar">
          <div>
            <Radio.Group defaultValue="3" onChange={handleChange}>
              <Radio.Button value="3"><FormattedMessage id="dashboard.threeMonths" /></Radio.Button>
              <Radio.Button value="6"><FormattedMessage id="dashboard.sixMonths" /></Radio.Button>
              <Radio.Button value="12"><FormattedMessage id="dashboard.oneYear" /></Radio.Button>
            </Radio.Group>
          </div>
          <div>
            <RangePicker
              placeholder={['Start month', 'End month']}
              format="YYYY-MM"
              mode={mode}
              value={value}
              onPanelChange={handlePanelChange}
            />
          </div>
        </div>
      </div>
      {data.data &&
        <div className="gantt-container">
          {data.data && <Gantt
            tasks={data}
            intl={intl}
          />}
        </div>}

    </div>
  );
};

DashbroadPage.propTypes = propTypes;

DashbroadPage.defaultProps = defaultProps;

export default injectIntl(DashbroadPage, {});
