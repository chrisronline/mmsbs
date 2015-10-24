'use strict';

var React = require('react');

var FormDateComponent = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string,
    defaultValue: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.id} className="col-sm-2 control-label">{this.props.label}</label>
        <div className="col-sm-10">
          <input type={this.props.type} className="form-control" id={this.props.id} placeholder={this.props.placeholder}
            value={this.props.defaultValue} onChange={this.props.onChange}/>
        </div>
      </div>
    );
  }
});

module.exports = FormDateComponent;