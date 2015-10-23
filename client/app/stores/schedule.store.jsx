'use strict';

// https://github.com/facebook/flux/blob/master/examples/flux-chat/js/stores/MessageStore.js

var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../dispatchers/dispatcher.jsx');
var ScheduleAction = require('../actions/schedule.action.jsx');
var ScheduleActions = ScheduleAction.Actions;

var CHANGE_EVENT = 'change';
var _schedule = [];

var ScheduleStore = _.assign({}, EventEmitter.prototype, {
  emitChange: function() { this.emit(CHANGE_EVENT); },
  addChangeListener: function(callback) { this.on(CHANGE_EVENT, callback); },
  removeChangeListener: function(callback) { this.removeListener(CHANGE_EVENT, callback); },
  getSchedule: function() {
    return _schedule;
  },
  load: function() {
    // Do nothing for now
    _schedule = [
      {
        date: 1445974925,
        phone: '585-234-5678',
        name: 'Test McTesterson',
        type: 'Haircut',
        description: 'Need a tune up'
      }
    ];
    ScheduleStore.emitChange();
    // ScheduleAction.receiveSchedule([
    //   {
    //     date: 1445974925,
    //     email: 'test@test.com',
    //     name: 'Test McTesterson',
    //     type: 'Haircut',
    //     description: 'Need a tune up'
    //   }
    // ]);
  },
  sortEvents: function() {
    _schedule = _.sortBy(_schedule, 'date');
  },
  bookEvent: function(eventDetails) {
    _schedule.push(eventDetails);
    this.sortEvents();
    ScheduleStore.emitChange();
  }
});

ScheduleStore.dispatchToken = Dispatcher.register(function(action) {
  switch (action.type) {
    case ScheduleActions.BOOK_EVENT:
      ScheduleStore.bookEvent(action.eventDetails);
      break;
  }
});

module.exports = ScheduleStore;
