'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;

// Load the schedule data
var ScheduleStore = require('./stores/schedule.store.jsx');
ScheduleStore.load();


var Header = require('./components/header/header.jsx');

// Pages
var HomePage = require('./components/pages/home/home.jsx');
var AboutPage = require('./components/pages/about/about.jsx');
var SchedulePage = require('./components/pages/schedule/schedule.jsx');

var Styles = require('./app.css');

var AppComponent = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Header/>
          </div>
          <div className="col-lg-12">
            <div className="content">
              <RouteHandler/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var routes = (
  <Route handler={AppComponent}>
    <Route name="/" handler={HomePage} />
    <Route name="about" handler={AboutPage} />
    <Route name="schedule" handler={SchedulePage} />
  </Route>
);

ReactRouter.run(routes, ReactRouter.HashLocation, function(Root) {
  React.render(<Root/>, document.getElementById('app'));
});