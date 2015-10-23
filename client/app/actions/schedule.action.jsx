'use strict';

var Dispatcher = require('../dispatchers/dispatcher.jsx');
var Actions = {
  BOOK_EVENT: 'BOOK_EVENT'
};

module.exports = {
  Actions: Actions,

  bookEvent: function(eventDetails) {
    Dispatcher.dispatch({
      type: Actions.BOOK_EVENT,
      eventDetails: eventDetails
    });
  }
};  