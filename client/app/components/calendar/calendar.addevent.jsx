'use strict';

var React = require('react');
var _ = require('lodash');
var moment = require('moment');

var config = require('../../config/config.js');
var ScheduleAction = require('../../actions/schedule.action.jsx');
var FormInputComponents = require('../form/inputs.js');

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
        type: config.TYPES.SHAVE,
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

              <FormInputComponents.Date id="inputDate" label="Date" type="date" placeholder="Date"
                defaultValue={this.state.event.date} onChange={_.partialRight(this._handleChange, 'date')}/>

              <FormInputComponents.Time id="inputTime" label="Time" type="time" placeholder="Time"
                defaultValue={this.state.event.time} onChange={_.partialRight(this._handleChange, 'time')}/>

              <FormInputComponents.Input id="inputName" label="Name" type="text" placeholder="Name"
                defaultValue={this.state.event.name} onChange={_.partialRight(this._handleChange, 'name')}/>

              <FormInputComponents.Input id="inputTel" label="Phone" type="tel" placeholder="Telephone Number"
                defaultValue={this.state.event.phone} onChange={_.partialRight(this._handleChange, 'phone')}/>

              <FormInputComponents.Select id="inputType" label="Type"
                defaultValue={this.state.event.type.name} onChange={_.partialRight(this._handleChange, 'time')}
                options={_.values(config.TYPES)} optionValue="name" optionLabel="label"/>

              <FormInputComponents.Textarea id="inputDesc" label="Comments" placeholder="Comments"
                defaultValue={this.state.event.description} onChange={_.partialRight(this._handleChange, 'description')}/>


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