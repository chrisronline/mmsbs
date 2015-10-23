'use strict';

var React = require('react');
var Link = require('react-router').Link;
require('./header.css');

var Nav = require('../nav/nav.jsx');

var HeaderComponent = React.createClass({
  render: function() {
    return (
      <header className="header">
        <Nav/>
        <Link to="/"><img src="./assets/images/logo.png"/></Link>
        <div className="details">
          <p className="details-address">
            <i className="fa fa-map"></i>
            <a href="https://goo.gl/maps/K9Qo5P5zVPS2">9 Main St. Scottsville, NY</a>
          </p>
          <p className="details-phone">
            <i className="fa fa-phone"></i>
            <a href="tel:585-278-4146">(585) 278 - 4146</a>
          </p>
        </div>
      </header>
    );
  }
});
/*
<nav className="nav">
  <a href="#">About</a>-
  <a href="#">Schedule</a>-
  <a href="#">Services</a>-
  <a href="#">Pictures</a>-
  <a href="#">Location</a>
</nav> */
module.exports = HeaderComponent;