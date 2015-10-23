'use strict';

var React = require('react');
var Calendar = require('../../calendar/calendar.jsx');

var SchedulePageComponent = React.createClass({
  render: function() {
    return (
      <div className="page-schedule">
        <h1>Appointment Scheduler</h1>
        <hr/>
        <Calendar/>
      </div>
    );
  }
});

module.exports = SchedulePageComponent;