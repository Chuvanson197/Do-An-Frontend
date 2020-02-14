import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

export default class Gantt extends Component {

  // instance of gantt.dataProcessor
  dataProcessor = null;

  shouldComponentUpdate(nextProps) {
    return this.props.zoom !== nextProps.zoom;
  }

  componentDidUpdate() {
    gantt.render();
  }

  componentDidMount() {
    gantt.config.xml_date = "%Y-%m-%d %H:%i";
    const { tasks } = this.props;
    gantt.config.columns = [
      { name: "text", label: "Project name", width: "*" },
      { name: "start_date", label: "Start time", align: "center", width: "*" },
      { name: "end_date", label: "End time", align: "center", width: "*" },
    ];
    gantt.init(this.ganttContainer);
    gantt.parse(tasks);
  }

  componentWillUnmount() {
    if (this.dataProcessor) {
      this.dataProcessor.destructor();
      this.dataProcessor = null;
    }
  }

  render() {
    const { zoom } = this.props;
    return (
      <div
        ref={(input) => { this.ganttContainer = input }}
        style={{ width: '100%', height: '100%' }}
      ></div>
    );

  }
}
