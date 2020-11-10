"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var EventSchema = new Schema({
  domain: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    required: false
  },
  data: {
    type: Object,
    required: true
  },
  creationDate: {
    type: Date,
    "default": Date.now()
  }
});

module.exports = function (connection) {
  return connection.model('Event', EventSchema);
};