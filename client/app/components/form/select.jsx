'use strict';

var React = require('react');

var FormSelectComponent = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    options: React.PropTypes.array.isRequired,
    optionValue: React.PropTypes.string.isRequired,
    optionLabel: React.PropTypes.string.isRequired
  },
  render: function() {
    var options = this.props.options.map(function(option, key) {
      return (
        <option value={option[this.props.optionValue]} key={key}>{option[this.props.optionLabel]}</option>
      );
    }.bind(this));
    return (
      <div className="form-group">
        <label htmlFor={this.props.id} className="col-sm-2 control-label">{this.props.label}</label>
        <div className="col-sm-10">
          <select className="form-control" id={this.props.id} onChange={this.props.onChange} value={this.props.defaultValue}>
            {options}
          </select>
        </div>
      </div>
    );
  }
});

module.exports = FormSelectComponent;