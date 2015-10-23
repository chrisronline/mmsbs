'use strict';

var React = require('react');
var _ = require('lodash');
var moment = require('moment');
var ScheduleAction = require('../../actions/schedule.action.jsx');

var CalendarAddEventComponent = React.createClass({
  propTypes: {
    date: React.PropTypes.object
  },

  getInitialState: function() {
    return { addToggled: false };
  },

  _toggleAdd: function() {
    this.setState({ addToggled: !this.state.addToggled });
  },
  _onCancel: function() {
    this.setState({ addToggled: false });
  },
  _onBook: function(eventDetails) {
    ScheduleAction.bookEvent(eventDetails);
    this._onCancel();
  },

  render: function() {
    var addEventForm = this.state.addToggled
      ? ( <CalendarAddEventFormComponent date={this.props.date} onBook={this._onBook} onCancel={this._onCancel}/> )
      : null;

    return (
      <div className="calendar-add-event">
        <button className="btn btn-default" onClick={this._toggleAdd}>Schedule Appointment</button>
        {addEventForm}
      </div>
    );
  }
});

var DATE_INPUT_FORMAT = 'YYYY-MM-DD';
var TIME_INPUT_FORMAT = 'HH:mm';
var CalendarAddEventFormComponent = React.createClass({
  propTypes: {
    onBook: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    date: React.PropTypes.object
  },
  getInitialState: function() {
    var date = this.props.date || moment();
    return {
      event: {
        date: date.format(DATE_INPUT_FORMAT),
        time: date.format(TIME_INPUT_FORMAT),
        name: 'Chris',
        phone: '585-236-3326',
        type: 'Shave',
        description: 'Real close!'
      }
    };
  },
  _handleChange: function(e, key) {
    var obj = {};
    obj[key] = e.target.value;
    this.setState({ event: _.extend(this.state.event, obj) });
  },
  _onBook: function() {
    // For now, use a unix timestamp
    var date = moment(this.state.event.date + ' ' + this.state.event.time, DATE_INPUT_FORMAT + ' ' + TIME_INPUT_FORMAT);
    this.props.onBook(_.extend({}, this.state.event, { date: date.unix() }));
  },
  render: function() {
    return (
      <div className="row topMargin">
        <div className="col-lg-12">
          <div className="panel panel-default">
            <form className="calendar-add-event-form panel-body form-horizontal">
              <div className="form-group">
                <label htmlFor="inputDate" className="col-sm-2 control-label">Date</label>
                <div className="col-sm-10">
                  <input type="date" className="form-control" id="inputDate" placeholder="Date"
                    value={this.state.event.date} onChange={_.partialRight(this._handleChange, 'date')}/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputTime" className="col-sm-2 control-label">Time</label>
                <div className="col-sm-10">
                  <input type="time" className="form-control" id="inputTime" placeholder="Time"
                    value={this.state.event.time} onChange={_.partialRight(this._handleChange, 'time')}/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputName" className="col-sm-2 control-label">Name</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="inputName" placeholder="Name"
                    value={this.state.event.name} onChange={_.partialRight(this._handleChange, 'name')}/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputTel" className="col-sm-2 control-label">Phone</label>
                <div className="col-sm-10">
                  <input type="tel" className="form-control" id="inputTel" placeholder="Telephone Number"
                    value={this.state.event.phone} onChange={_.partialRight(this._handleChange, 'phone')}/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputType" className="col-sm-2 control-label">Type</label>
                <div className="col-sm-10">
                  <select className="form-control" id="inputType" onChange={_.partialRight(this._handleChange, 'type')}
                    value={this.state.event.type}>
                    <option value="Haircut">Haircut</option>
                    <option value="Shave">Shave</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputDesc" className="col-sm-2 control-label">Comments</label>
                <div className="col-sm-10">
                  <textarea className="form-control" rows="3" id="inputDesc" placeholder="Comments"
                    value={this.state.event.description} onChange={_.partialRight(this._handleChange, 'description')}></textarea>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-2">
                  <button type="button" className="btn btn-primary"
                    onClick={this._onBook}>Book</button>
                </div>
                <div className="col-sm-2">
                  <button type="button" className="btn btn-warning"
                    onClick={_.partial(this.props.onCancel, this.state.event)}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CalendarAddEventComponent;