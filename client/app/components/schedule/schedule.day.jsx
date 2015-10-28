'use strict';

var React = require('react');
var moment = require('moment');
var _ = require('lodash');
var Modal = require('react-bootstrap').Modal;
var ScheduleAddEvent = require('./schedule.addevent.jsx');

var ScheduleDayComponent = React.createClass({
  propTypes: {
    date: React.PropTypes.object.isRequired,
    data: React.PropTypes.array.isRequired
  },
  getInitialState: function() {
    return {
      showDayDetails: false
    }
  },
  _onClick: function() {
    this.setState({showDayDetails: true});
  },
  _onCloseModal: function() {
    this.setState({showDayDetails: false})
  },
  render: function() {
    var shortEvents = this.props.data.map(function(event, index) {
      return (
        <li key={index}>
          {moment.unix(event.date).format('h:mma')}: {event.type.label}
        </li>
      );
    });

    var longEvents = this.props.data.map(function(event, index) {
      return (
        <li key={index}>
          {moment.unix(event.date).format('h:mma')} - {event.type.label} for {event.name} ({event.phone})
        </li>
      );
    });

    return (
      <div className='calendar-day' onClick={this._onClick}>
        <h4>
          {this.props.date.format('D')}
        </h4>
        <ul className="calendar-day-events">
          {shortEvents}
        </ul>
        <Modal show={this.state.showDayDetails} onHide={this._onCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.props.date.format('MMMM Do')}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul className="calendar-day-events">
              {longEvents}
            </ul>
            <div className="topMargin">
              <ScheduleAddEvent date={this.props.date}/>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
});

module.exports = ScheduleDayComponent;