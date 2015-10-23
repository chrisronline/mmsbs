'use strict';

var React = require('react');
var moment = require('moment');
var _ = require('lodash');

var ScheduleStore = require('../../stores/schedule.store.jsx');
var CalendarDay = require('./calendar.day.jsx');
var CalendarHeader = require('./calendar.header.jsx');

var Styles = require('./calendar.css');

var MOMENT_FORMAT_DATE_AS_DAY = 'MM-DD-YYYY';
var ROWS_TO_SHOW = 5;
var DAYS_IN_WEEK = 7;
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

var CalendarComponent = React.createClass({
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
  _goToMonth: function(newStartingDate) {
    this.setState({ startingDay: newStartingDate });
  },
  render: function() {
    var startingDay = this.state.startingDay;
    var schedule = this.state.schedule;

    var daysFromLastMonthToShow = startingDay.clone().date(1).day();
    var startDate = startingDay.clone().date(1).subtract(daysFromLastMonthToShow, 'day');
    var datesToShow = _.times(ROWS_TO_SHOW, function(rowIndex) {
      return _.times(DAYS_IN_WEEK, function() {
        var date = startDate.clone();
        startDate = startDate.add(1, 'day');
        return date;
      });
    });

    var rows = datesToShow.map(function(setOfDates, index) {
      var days = setOfDates.map(function(date, index) {
        var scheduleData = schedule[date.format(MOMENT_FORMAT_DATE_AS_DAY)] || [];
        var classes = 'calendar-day-cell';
        
        if (TODAY.isSame(date)) {
          classes += ' calendar-day-today';
        }
        else if (TODAY.isAfter(date)) {
          classes += ' bg-disabled';
        }
        return (
          <td className={classes} key={index}>
            <CalendarDay date={date} data={scheduleData}/>
          </td>
        );
      });

      return (
        <tr key={index}>
          {days}
        </tr>
      );
    });

    return (
      <div className="row">
        <article className="calendar col-lg-12">
          <CalendarHeader goToMonth={this._goToMonth} startingDay={startingDay}/>
          <table className="calendar-table table-bordered table-responsive">
            <tr>
              <th>Sunday</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
            </tr>
            {rows}
          </table>
        </article>
      </div>
    );
  }
});

module.exports = CalendarComponent;