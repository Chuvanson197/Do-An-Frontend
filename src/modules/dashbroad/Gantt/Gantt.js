import React, { useEffect } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_tooltip.js';

const Gantt = ({ tasks, intl }) => {
  let ganttContainer = null
  useEffect(() => {
    gantt.config = {
      ...gantt.config,
      scale_unit: 'month',
      xml_date: "%Y-%m-%d %H:%i"
    };
    gantt.showLightbox = function (id) {
      return null
    }
  }, [])
  //fix language
  useEffect(() => {
    gantt.templates.tooltip_text = function (start, end, task) {
      return `<b>${intl.formatMessage({ id: 'dashboard.projectName' })}:</b> ` + task.text + `<br/><b>${intl.formatMessage({ id: 'dashboard.startTime' })}:</b> `
        + gantt.templates.tooltip_date_format(start)
        + `<br/><b>${intl.formatMessage({ id: 'dashboard.endTime' })}:</b> `
        + gantt.templates.tooltip_date_format(end);
    };
    gantt.config = {
      ...gantt.config,
      columns: [
        { name: "text", label: intl.formatMessage({ id: 'dashboard.projectName' }), align: "center", width: "*" },
        { name: "start_date", label: intl.formatMessage({ id: 'dashboard.startTime' }), align: "center", width: "*" },
        { name: "end_date", label: intl.formatMessage({ id: 'dashboard.endTime' }), align: "center", width: "*" },
      ],
      date_scale: intl.formatMessage({ id: 'dashboard.config.scale' }),
    }
    gantt.init(ganttContainer);
  }, [intl, ganttContainer])
  //config
  useEffect(() => {
    gantt.clearAll();
    gantt.init(ganttContainer);
    gantt.parse(tasks);
    gantt.render();
  }, [ganttContainer, tasks])
  return (
    <div
      ref={(input) => { ganttContainer = input }}
      style={{ width: '100%', height: '100%' }}
    ></div>
  );
}
export default Gantt;
