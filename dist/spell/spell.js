"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var EventEmitter = require('events');

var check = require('check-types');

var _require = require('../cst'),
    SpellEventTypes = _require.SpellEventTypes;

var Spell = /*#__PURE__*/function (_EventEmitter) {
  (0, _inherits2["default"])(Spell, _EventEmitter);

  var _super = _createSuper(Spell);

  function Spell(config, logger, spellController, spellData) {
    var _this;

    (0, _classCallCheck2["default"])(this, Spell);
    _this = _super.call(this);
    _this.tag = 'spell';
    _this.log = logger;
    _this._config = config;
    _this.spellController = spellController;
    _this._controllers = spellController._controllers;
    _this.props = {
      displayName: '',
      isHidden: false,
      parallelProcess: false,
      description: '',
      storeExecLog: false,
      categoryId: '',
      status: false,
      creationDate: null,
      modificationDate: null
    };
    _this.checkPass = true;
    _this.spellEntries = spellData.spellEntries;
    _this.spellTrigger = [];
    _this.executionLog = [];
    _this._id = spellData._id;

    for (var key in spellData.props || {}) {
      if (_this.props.hasOwnProperty(key)) {
        _this.props[key] = spellData.props[key];
      }
    }

    _this._loadSpellTrigger(); //this._unloadSpellTrigger();


    return _this;
  }

  (0, _createClass2["default"])(Spell, [{
    key: "executeSpell",
    value: function () {
      var _executeSpell = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(lStack) {
        var logStack;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                logStack = lStack || []; // important if spell Exeecution is from another Spell or Event

                if (!(check["boolean"](this.props.status) && this.props.status == true)) {
                  _context.next = 7;
                  break;
                }

                this.log.info(this.tag + ' executeSpell(' + this._id + ') start()');
                _context.next = 5;
                return this._iterateSpell(this.spellEntries, logStack);

              case 5:
                _context.next = 8;
                break;

              case 7:
                this.log.warn(this.tag + ' executeSpell(' + this._id + ') status:false stop()');

              case 8:
                this.emit(SpellEventTypes.SPELL_EXECUTION, logStack);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function executeSpell(_x) {
        return _executeSpell.apply(this, arguments);
      }

      return executeSpell;
    }()
  }, {
    key: "checkSpell",
    value: function checkSpell() {
      this._checkSpell(this.spellEntries);

      if (this.checkPass == false) this.log.warn(this.tag + ' checkSpell(' + this._id + ') checkPass:false');
      return this.checkPass;
    }
  }, {
    key: "_checkSpell",
    value: function _checkSpell(spellEntries) {
      var _iterator = _createForOfIteratorHelper(spellEntries),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var entry = _step.value;

          if (check.nonEmptyString(entry.type) && this._controllers[entry.type]) {
            if (this._controllers[entry.type].checkEntry(entry) == false) {
              this.log.warn(this.tag + ' _checkSpell _id:' + entry._id + '  spellEntry: ' + entry.type + ' -> check:false');
              this.checkPass = false;
              break;
            }

            this._checkSpell(entry.spellEntries);
          } else if (this._controllers[entry.type] == null) {
            this.log.warn(this.tag + ' _checkSpell _id:' + entry._id + ' unknown spellEntry: ' + entry.type + ' -> skeeping()');
            this.checkPass = false;
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "_loadSpellTrigger",
    value: function _loadSpellTrigger() {
      var _iterator2 = _createForOfIteratorHelper(this.spellEntries),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var entry = _step2.value;

          if (this._controllers[entry.type].eventTrigger && this._controllers[entry.type].eventTrigger == true) {
            var cx = new this._controllers[entry.type](this._config, this, entry, this.log);
            cx.registerTrigger(this.spellController, this._id, cx.eventNameSubscription);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "_unloadSpellTrigger",
    value: function _unloadSpellTrigger() {
      var _iterator3 = _createForOfIteratorHelper(this.spellEntries),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var entry = _step3.value;

          if (this._controllers[entry.type].eventTrigger && this._controllers[entry.type].eventTrigger == true) {
            this.spellController.removeTrigger('time_change', this._id, entry._id);
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "_checkSpellEntry",
    value: function _checkSpellEntry(entry) {
      if (check.nonEmptyString(entry.type) && this._controllers[entry.type]) {
        this.log.info(this.tag + ' _checkSpellEntry id: ' + entry._id + ' start()');
        return this._controllers[entry.type].check(entry);
      }
    }
  }, {
    key: "insertSpellEntry",
    value: function insertSpellEntry(spellEntries, _id, newEntry) {
      var entry = this._findSpellEntry(spellEntries, _id);

      if (entry && check.array(entry.spellEntries)) {
        if (this._controllers[newEntry.type].checkEntry(newEntry) == true) {
          entry.spellEntries.push(newEntry);
          this.log.info(this.tag + ' insertSpellEntry at id:' + _id + ' succeed');
          return true;
        } else {
          this.log.info(this.tag + ' insertSpellEntry at id:' + _id + ' failed syntax error');
        }
      } else if (entry) {
        this.log.warn(this.tag + ' insertSpellEntry at id:' + _id + ' failed reason: spellEntries is not an array');
        return false;
      }

      this.log.warn(this.tag + ' insertSpellEntry at id:' + _id + ' failed reason: entry not found');
      return false;
    }
  }, {
    key: "modifySpellEntry",
    value: function modifySpellEntry(spellEntries, _id, newParams) {
      // TODO Rajouter la verif des newParams;
      var entry = this._findSpellEntry(spellEntries, _id);

      if (entry && check.nonEmptyString(entry.type) && this._controllers[entry.type]) {
        if (this._controllers[entry.type].checkEntry({
          id: '',
          params: newParams
        }) == true) {
          entry.params = newParams;
        }
      }
    }
  }, {
    key: "_findSpellEntry",
    value: function _findSpellEntry(spellEntries, _id) {
      var ret = null;

      if (check.nonEmptyArray(spellEntries)) {
        var _iterator4 = _createForOfIteratorHelper(spellEntries),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var entry = _step4.value;

            if (_id == entry._id) {
              return entry;
            }

            if (check.nonEmptyArray(entry.spellEntries)) {
              ret = this._findSpellEntry(entry.spellEntries, _id);
              return ret;
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }

      return ret;
    }
  }, {
    key: "removeSpellEntry",
    value: function removeSpellEntry(spellEntries, _id) {
      var ret = false;

      if (spellEntries) {
        var i = 0;

        var _iterator5 = _createForOfIteratorHelper(spellEntries),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var entry = _step5.value;

            if (_id == entry._id) {
              spellEntries.splice(i, 1);
              return true;
            }

            if (check.nonEmptyArray(entry.spellEntries)) {
              var _ret = this.removeSpellEntry(entry.spellEntries, _id);

              if (_ret == true) return true;
            }

            i++;
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }

      return ret;
    }
  }, {
    key: "executeSpellEntry",
    value: function () {
      var _executeSpellEntry = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(spellEntries, _id) {
        var entry, actionCtrl;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                entry = _findSpellEntry(spellEntries, _id);

                if (!(check.nonEmptyString(entry.type) && this._controllers[entry.type])) {
                  _context2.next = 8;
                  break;
                }

                this.log.info(this.tag + ' executeSpellEntry _id: ' + entry._id + ' start()');
                actionCtrl = new this._controllers[entry.type](this._config, this, entry, this.log);
                _context2.next = 6;
                return actionCtrl.execute(this);

              case 6:
                _context2.next = 9;
                break;

              case 8:
                if (this._controllers[entry.type] == null) {
                  this.log.warn(this.tag + ' executeSpellEntry _id: ' + entry._id + ' unknown spellEntry:' + entry.type + ' -> skeeping()');
                }

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function executeSpellEntry(_x2, _x3) {
        return _executeSpellEntry.apply(this, arguments);
      }

      return executeSpellEntry;
    }()
  }, {
    key: "_iterateSpell",
    value: function () {
      var _iterateSpell2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(spellEntries, logStack) {
        var _iterator6, _step6, entry, actionCtrl;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _iterator6 = _createForOfIteratorHelper(spellEntries);
                _context3.prev = 1;

                _iterator6.s();

              case 3:
                if ((_step6 = _iterator6.n()).done) {
                  _context3.next = 14;
                  break;
                }

                entry = _step6.value;

                if (!(check.nonEmptyString(entry.type) && this._controllers[entry.type] && this._controllers[entry.type].eventTrigger == false)) {
                  _context3.next = 11;
                  break;
                }

                //this.log.info(this.tag+' _iterateSpell _id: '+entry._id+' start()');
                actionCtrl = new this._controllers[entry.type](this._config, this, entry, this.log);
                _context3.next = 9;
                return actionCtrl.execute(this, logStack);

              case 9:
                _context3.next = 12;
                break;

              case 11:
                if (this._controllers[entry.type] == null) {
                  this.log.warn(this.tag + ' _iterateSpell id:' + entry._id + ' unknown spellEntry:' + entry.type + ' -> skeeping()');
                }

              case 12:
                _context3.next = 3;
                break;

              case 14:
                _context3.next = 19;
                break;

              case 16:
                _context3.prev = 16;
                _context3.t0 = _context3["catch"](1);

                _iterator6.e(_context3.t0);

              case 19:
                _context3.prev = 19;

                _iterator6.f();

                return _context3.finish(19);

              case 22:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 16, 19, 22]]);
      }));

      function _iterateSpell(_x4, _x5) {
        return _iterateSpell2.apply(this, arguments);
      }

      return _iterateSpell;
    }()
  }]);
  return Spell;
}(EventEmitter);

module.exports = Spell;