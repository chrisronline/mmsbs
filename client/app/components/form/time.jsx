'use strict';

var React = require('react');
var _ = require('lodash');
var moment = require('moment');
require('moment-range');

var FormTimeComponent = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    timeBlockIncrement: React.PropTypes.number.isRequired,
    timeBlockStart: React.PropTypes.object.isRequired,
    timeBlockEnd: React.PropTypes.object.isRequired,
  },
  _onTimeSelect: function(date) {
    // Need to format as a button event
    this.props.onChange({ target: { value: date }});
  },
  render: function() {
    var timeBlockIncrement = this.props.timeBlockIncrement;
    var dates = [];
    var range = moment.range(this.props.timeBlockStart, this.props.timeBlockEnd);
    var index = 0;

    // TODO: make this assumptions configurable (minutes)
    range.by('minutes', function(date) {
      if (index++ % timeBlockIncrement === 0) {
        dates.push(date);
      }
    }.bind(this));

    var btns = dates.map(function(date, index) {
      return (
        <button type="button" className="btn btn-default" key={index} onClick={_.partial(this._onTimeSelect, date)}>{date.format('h:mma')}</button>
      );
    }.bind(this));

    return (
      <div className="form-group">
        <label htmlFor={this.props.id} className="col-sm-2 control-label">{this.props.label}</label>
        <div className="col-sm-10">
          <div className="btn-group" role="group">
            {btns}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = FormTimeComponent;