'use strict';

var React = require('react');
var Schedule = require('../../schedule/schedule.jsx');

var SchedulePageComponent = React.createClass({
  render: function() {
    return (
      <div className="page-schedule">
        <h1>Appointment Scheduler</h1>
        <hr/>
        <Schedule/>
      </div>
    );
  }
});

module.exports = SchedulePageComponent;