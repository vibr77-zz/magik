"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _checkTypes = _interopRequireDefault(require("check-types"));

var _clone = _interopRequireDefault(require("clone"));

var _ajv = _interopRequireDefault(require("ajv"));

var _cst = require("../cst");

var _tools = require("../lib/tools");

function checkEntry(schema, entry) {
  var ajv = new _ajv["default"]({
    allErrors: true
  });

  if (ajv.validate(schema, entry) == true) {
    return true;
  } else {
    console.log('Entry data is INVALID!');
    console.log(ajv.errors);
    return false;
  }
}

function buildEntry(tpl, schema, props) {
  var retEntry = (0, _clone["default"])(tpl);

  for (var key in props || {}) {
    if (Object.prototype.hasOwnProperty.call(retEntry.props, key)) {
      retEntry.props[key] = props[key];
    }
  }

  retEntry._id = (0, _tools.mongoObjectId)();
  if (checkEntry(schema, retEntry) == true) return retEntry;else return null;
}

var spellPlugin = /*#__PURE__*/function () {
  function spellPlugin(config, spell, entry, logger) {
    (0, _classCallCheck2["default"])(this, spellPlugin);
    this.log = logger;
    this.spell = spell;
    this.tag = entry.type;
    this._id = entry._id;
    this.spellEntries = entry.spellEntries;
    this.entry = entry;
    this.props = entry.props;
    this.type = entry.type;
    this._status = false;
    this.error = null;
  }

  (0, _createClass2["default"])(spellPlugin, [{
    key: "registerTrigger",
    value: function registerTrigger(spellController, spellId, eventName) {
      this.trig = this.execute.bind(this);

      if (spellController.addTrigger(eventName, spellId, this._id, this) == true) {
        spellController.addListener(eventName, this.trig);
        this.log.info(this.tag + " registerTrigger eventName:" + eventName + " spellId:" + spellId + " entryId:" + this._id); //console.log(spellController.listeners(eventName));
      }
    }
  }, {
    key: "unregisterTrigger",
    value: function unregisterTrigger(spellController, eventName) {
      spellController.removeListener(eventName, this.trig);
      this.log.info(this.tag + " unregisterTrigger eventName:" + eventName + " entryId:" + this._id); //console.log(spellController.listeners(eventName));
    }
  }]);
  return spellPlugin;
}();

(0, _defineProperty2["default"])(spellPlugin, "gbuildEntry", buildEntry);
(0, _defineProperty2["default"])(spellPlugin, "gcheckEntry", checkEntry);
module.exports = spellPlugin;