'use strict';

var _ = require('lodash');

var types = [
  {
    id: 1,
    name: 'haircut',
    label: 'Haircut',
    timeBlockInMinutes: 45
  },
  {
    id: 2,
    name: 'shave',
    label: 'Shave',
    timeBlockInMinutes: 30
  },
  {
    id: 3,
    name: 'fade',
    label: 'Fade',
    timeBlockInMinutes: 30
  },
  {
    id: 4,
    name: 'taper',
    label: 'Taper',
    timeBlockInMinutes: 30
  },
  {
    id: 5,
    name: 'design',
    label: 'Design',
    timeBlockInMinutes: 60
  }
];

module.exports = {
  schedule: {
    minTimeChunksInMinutes: 30,
    hoursFormat: 'H',
    hours: [
      // 0 = Sunday, 1 = Monday, etc
      { open: 10, close: 15 },
      { open: 8, close: 17 },
      { open: 8, close: 17 },
      { open: 8, close: 17 },
      { open: 8, close: 17 },
      { open: 8, close: 17 },
      { open: 9, close: 16 }
    ]
  },
  types: types
  // TYPES: _(types)
  //   .map(function(type) { return _.extend({}, type, { key: type.name.toUpperCase(), label: _.capitalize(type.name) }); })
  //   .groupBy('key')
  //   .mapValues(function(list) { return _.omit(_.first(list), 'key'); })
  //   // .tap(function(types) { console.log('config.js() types=%o', types); })
  //   .value()
};