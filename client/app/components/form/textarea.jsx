'use strict';

var React = require('react');

var FormTextAreaComponent = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    rows: React.PropTypes.number,
    cols: React.PropTypes.number,
    placeholder: React.PropTypes.string,
    defaultValue: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  },
  getDefaultProps: function() {
    return {
      rows: 3,
      cols: 10
    }
  }, 
  render: function() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.id} className="col-sm-2 control-label">{this.props.label}</label>
        <div className="col-sm-10">
          <textarea className="form-control" rows={this.props.rows} cols={this.props.cols} id={this.props.id}
            placeholder={this.props.placeholder} value={this.props.defaultValue}
              onChange={this.props.onChange}></textarea>
        </div>
      </div>
    );
  }
});

module.exports = FormTextAreaComponent;