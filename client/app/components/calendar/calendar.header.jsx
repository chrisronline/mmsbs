'use strict';

var React = require('react');
var _ = require('lodash');
var moment = require('moment');

var CalendarAddEvent = require('./calendar.addevent.jsx');

var CalendarHeaderComponent = React.createClass({
  propTypes: {
    startingDay: React.PropTypes.object.isRequired,
    goToMonth: React.PropTypes.func.isRequired,
  },
  render: function() {
    var startingDay = this.props.startingDay;
    var lastMonth = startingDay.clone().subtract(1, 'month');
    var nextMonth = startingDay.clone().add(1, 'month');

    var lastMonthDisabled = (moment().isAfter(lastMonth, 'month')) ? 'disabled' : '';

    return (
      <header>
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-1 text-right">
                <a onClick={_.partial(this.props.goToMonth, lastMonth)} disabled={lastMonthDisabled} className="calendar-month-previous">
                  <i className="fa fa-2x fa-chevron-left"></i>
                </a>
              </div>
              <div className="col-lg-10 text-center">
                <h2 className="calendar-month">{startingDay.format('MMMM YYYY')}</h2>
              </div>
              <div className="col-lg-1 text-left">
                <a onClick={_.partial(this.props.goToMonth, nextMonth)} className="calendar-month-next">
                  <i className="fa fa-2x fa-chevron-right"></i>
                </a>
              </div>
            </div>
            <div className="row topMargin">
              <div className="col-lg-6 col-lg-offset-3">
                <CalendarAddEvent/>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
});

module.exports = CalendarHeaderComponent;