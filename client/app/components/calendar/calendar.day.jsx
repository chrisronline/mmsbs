'use strict';

var React = require('react');

var CalendarDayComponent = React.createClass({
  propTypes: {
    date: React.PropTypes.object.isRequired,
  },
  render: function() {
    return (
      <div className='calendar-day'>
        <h4>
          {this.props.date.format('D')}
        </h4>
      </div>
    );
  }
});

module.exports = CalendarDayComponent;