"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var SpellSchema = new Schema({
  props: {
    displayName: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false,
      defalut: ''
    },
    status: {
      type: Boolean,
      required: true,
      "default": false
    },
    isHidden: {
      type: Boolean,
      required: false,
      "default": true
    },
    parallelProcess: {
      type: Boolean,
      required: false,
      "default": false
    },
    categoryId: {
      type: String,
      required: false,
      "default": null
    },
    storeExecLog: {
      type: Boolean,
      required: true,
      "default": false
    },
    creationDate: {
      type: Date,
      "default": Date.now()
    },
    modificationDate: {
      type: Date,
      "default": Date.now()
    }
  },
  spellEntries: {
    type: Array,
    required: true,
    "default": []
  },
  executionLog: {
    type: Array,
    "default": []
  }
});

module.exports = function (connection) {
  return connection.model('Spell', SpellSchema);
};