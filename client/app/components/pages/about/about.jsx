'use strict';

var React = require('react');

var AboutPageComponent = React.createClass({
  render: function() {
    return (
      <div className="page-about">
        <h1>History</h1>
        <p>
          Mike opened Mikes Main Street Barber Shop in 2015
        </p>
      </div>
    );
  }
});

module.exports = AboutPageComponent;