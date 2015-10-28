'use strict';

var React = require('react');
var _ = require('lodash');
var moment = require('moment');

var CalendarHeader = require('../calendar/calendar.header.jsx');
var ScheduleAddEvent = require('./schedule.addevent.jsx');

var ScheduleHeaderComponent = React.createClass({
  render: function() {
    return (
      <div className="schedule-header">
        <CalendarHeader {... this.props}/>
        <div className="row topMargin">
          <div className="col-lg-6 col-lg-offset-3">
            <ScheduleAddEvent/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ScheduleHeaderComponent;