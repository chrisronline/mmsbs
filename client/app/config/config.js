'use strict';

var _ = require('lodash');

var types = [
  {
    name: 'haircut',
    timeBlockInMinutes: 45
  },
  {
    name: 'shave',
    timeBlockInMinutes: 30
  },
  {
    name: 'fade',
    timeBlockInMinutes: 30
  },
  {
    name: 'taper',
    timeBlockInMinutes: 30
  },
  {
    name: 'design',
    timeBlockInMinutes: 60
  }
];

module.exports = {
  schedule: {
    minTimeChunksInMinutes: 30
  },
  TYPES: _(types)
    .map(function(type) { return _.extend({}, type, { key: type.name.toUpperCase(), label: _.capitalize(type.name) }); })
    .groupBy('key')
    .mapValues(function(list) { return _.omit(_.first(list), 'key'); })
    // .tap(function(types) { console.log('config.js() types=%o', types); })
    .value()
};