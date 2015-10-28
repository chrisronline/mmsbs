'use strict';

var React = require('react');
var moment = require('moment');
var _ = require('lodash');

var CalendarDay = require('./calendar.day.jsx');
var CalendarHeader = require('./calendar.header.jsx');

var Styles = require('./calendar.css');

var MOMENT_FORMAT_DATE_AS_DAY = 'MM-DD-YYYY';
var ROWS_TO_SHOW = 5;
var DAYS_IN_WEEK = 7;
var TODAY = moment();

var CalendarComponent = React.createClass({
  propTypes: {
    calendarData: React.PropTypes.object,
    startingDay: React.PropTypes.object,
    dayComponent: React.PropTypes.func,
    headerComponent: React.PropTypes.func
  },
  _goToMonth: function(newStartingDate) {
    this.setState({ startingDay: newStartingDate });
  },
  render: function() {
    var startingDay = this.props.startingDay;
    var data = this.props.calendarData;

    var daysFromLastMonthToShow = startingDay.clone().date(1).day();
    var startDate = startingDay.clone().date(1).subtract(daysFromLastMonthToShow, 'day');
    var datesToShow = _.times(ROWS_TO_SHOW, function(rowIndex) {
      return _.times(DAYS_IN_WEEK, function() {
        var date = startDate.clone();
        startDate = startDate.add(1, 'day');
        return date;
      });
    });

    var dayComponent = this.props.dayComponent || CalendarDay;
    var rows = datesToShow.map(function(setOfDates, index) {
      var days = setOfDates.map(function(date, index) {
        var scheduleData = data ? data[date.format(MOMENT_FORMAT_DATE_AS_DAY)] || [] : null;
        var classes = 'calendar-day-cell';
        
        if (TODAY.isSame(date)) {
          classes += ' calendar-day-today';
        }
        else if (TODAY.isAfter(date)) {
          classes += ' bg-disabled';
        }

        return (
          React.createElement("td", {className: classes, key: index}, 
            React.createElement(dayComponent, {date: date, data: scheduleData})
          )
        );
      });

      return (
        <tr key={index}>
          {days}
        </tr>
      );
    });

    var headerComponent = this.props.headerComponent || CalendarHeader;
    var calendarHeader = (
      React.createElement(headerComponent, {goToMonth: this._goToMonth, startingDay: startingDay})
    );

    return (
      <div className="row">
        <article className="calendar col-lg-12">
          {calendarHeader}
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