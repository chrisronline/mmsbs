'use strict';

var React = require('react');
var Link = require('react-router').Link;
require('./nav.css');

var NavComponent = React.createClass({
  render: function() {
    return (
      <nav className="siteNav">
        <Link to="/about">About</Link>-
        <Link to="/schedule">Schedule</Link>
      </nav>
    );
  }
});
/*
a href="#">Services</a>-
        <a href="#">Pictures</a>-
        <a href="#">Location</a>*/

module.exports = NavComponent;