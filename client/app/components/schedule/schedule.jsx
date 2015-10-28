'use strict';

var React = require('react');
var _ = require('lodash');
var moment = require('moment');

var ScheduleStore = require('../../stores/schedule.store.jsx');
var Calendar = require('../calendar/calendar.jsx');
var ScheduleDay = require('./schedule.day.jsx');
var ScheduleHeader = require('./schedule.header.jsx');

var MOMENT_FORMAT_DATE_AS_DAY = 'MM-DD-YYYY';
var TODAY = moment();

function getStateFromStore() {
  var schedule = _(ScheduleStore.getSchedule())
    .map(function(entry) {
      return _.extend(entry, { dateAsDay: moment.unix(entry.date).format(MOMENT_FORMAT_DATE_AS_DAY) });
    })
    .groupBy('dateAsDay')
    .value();

  return {
    schedule: schedule,
    startingDay: TODAY
  };
}

var ScheduleComponent = React.createClass({
  getInitialState: function() {
    return getStateFromStore();
  },
  componentDidMount: function() {
    ScheduleStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    ScheduleStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(getStateFromStore());
  },
  render: function() {
    return (
      <Calendar calendarData={this.state.schedule} startingDay={this.state.startingDay}
        dayComponent={ScheduleDay} headerComponent={ScheduleHeader}/>
    );
  }
});

module.exports = ScheduleComponent;