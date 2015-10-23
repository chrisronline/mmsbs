'use strict';

var React = require('react');

var HomePageComponent = React.createClass({
  render: function() {
    return (
      <div className="page-home">
        <h1>Need a Haircut?</h1>
        <p>
          Come visit Mikes Main Street Barbershop in Scottsville NY for an amazing haircut for a great price
        </p>
        <img src="./assets/images/front.jpg" className="frontImg"/>
      </div>
    );
  }
});

module.exports = HomePageComponent;