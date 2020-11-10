"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var EventEmitter = require('events');

var zmq = require("zeromq/v5-compat");

var check = require('check-types');

var Service = require('./service');

var Characteristic = require('./characteristic');

var Types = require('./types');

var _require = require('../cst'),
    Formats = _require.Formats,
    Perms = _require.Perms,
    Status = _require.Status,
    Units = _require.Units,
    CharacteristicEventTypes = _require.CharacteristicEventTypes,
    DeviceEventTypes = _require.DeviceEventTypes,
    Domain = _require.Domain;

var deviceController = /*#__PURE__*/function (_EventEmitter) {
  (0, _inherits2["default"])(deviceController, _EventEmitter);

  var _super = _createSuper(deviceController);

  function deviceController(config, logger, eventHandler) {
    var _require2;

    var _this;

    (0, _classCallCheck2["default"])(this, deviceController);
    _this = _super.call(this);
    _this.tag = 'deviceController';
    _this.log = logger;
    _this._config = config;
    _this._eventHandler = eventHandler;
    _this._deviceControllers = [];
    _this._devices = {};
    _this.status = Status.NONE;
    _this._pluginLeftToLoad = 0;
    _this._pluginController = require('require-all')((_require2 = {
      dirname: __dirname + '/plugins',
      excludeDirs: /^\.(git|svn)$/,
      recursive: true,
      filter: /^(?!.*\.(spec|test)\.js$).*\.js$/
    }, (0, _defineProperty2["default"])(_require2, "recursive", true), (0, _defineProperty2["default"])(_require2, "map", function map(name, path) {
      var name_1 = name.replace(/\.[^/.]+$/, "");
      return name_1.replace(/_([a-z])/g, function (m, c) {
        return c.toUpperCase();
      });
    }), _require2));
    var pubSock = zmq.socket("pub");
    pubSock.bind("tcp:\/\/127.0.0.1:" + config.deviceThread.pubPort);

    _this.log.info("deviceController ZeroMQ Publisher bound to port:" + config.deviceThread.pubPort);

    _this.pubSock = pubSock; // setInterval(function() {
    // 		//console.log("sending a multipart message envelope");
    // 		pubSock.send(["kitty cats", "meow!"]);
    // }, 500);

    _this.status = Status.INIT;

    for (var plugin in _this._pluginController) {
      _this.log.info('device loaded plugin:' + plugin + ' tag:' + _this._pluginController[plugin].tag + ' version:' + _this._pluginController[plugin].version);

      _this._pluginLeftToLoad++;
    }

    for (var _plugin in _this._pluginController) {
      _this.log.info('instantiating deviceController:' + _this._pluginController[_plugin].tag);

      _this._deviceControllers[_plugin] = new _this._pluginController[_plugin](_this._config, _this.log, _this._pluginLoadingResult.bind((0, _assertThisInitialized2["default"])(_this))); //console.log(this._devices);
    }

    return _this;
  }

  (0, _createClass2["default"])(deviceController, [{
    key: "_pluginLoadingResult",
    value: function _pluginLoadingResult(err, deviceCtrl) {
      this._pluginLeftToLoad--;

      if (err) {
        this.log.info(this.tag + ' _pluginLoadingResult:' + deviceCtrl.tag + " status:" + deviceCtrl.status);
        return;
      }

      this.log.info(this.tag + ' _pluginLoadingResult:' + deviceCtrl.tag + " status:" + deviceCtrl.status);

      if (this._pluginLeftToLoad == 0) {
        this.status = Status.READY;
        this.log.info(this.tag + ' _pluginLoadingResult:Completed');
      }

      this._devices[deviceCtrl.tag] = deviceCtrl.devices;
      deviceCtrl.addListener(DeviceEventTypes.ADD_DEVICE, function (pluginName, deviceId) {
        var _iterator = _createForOfIteratorHelper(this._devices[pluginName]),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var device = _step.value;

            if (device._id == deviceId) {
              this._subscribeToEvent(device);

              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }.bind(this));
      deviceCtrl.registerDevices(); //console.log("before listeners");
      //console.log(deviceCtrl.listeners());
      //this._devices[deviceCtrl.tag]=[];
      //this._devices[deviceCtrl.tag]=devices;
      //for (let device of devices){
      //	this._subscribeToEvent(device);
      //}

      var pluginName = deviceCtrl.tag;

      this._testCallback(deviceCtrl, this._devices[pluginName]); // setTimeout(function(){
      // 	console.log(this._devices);
      // }.bind(this), 5*1000)


      return;
    }
  }, {
    key: "_subscribeToEvent",
    value: function _subscribeToEvent(device) {
      var _this2 = this;

      if (device) {
        device.on(DeviceEventTypes.CHARACTERISTIC_CHANGE, function (change) {
          // Event has bubbled up = require( the CX -> Service -> Device -> Controller (this);
          // Emit a new event to whom is listening
          _this2.pubSock.send([DeviceEventTypes.CHARACTERISTIC_CHANGE, JSON.stringify(change)]);

          _this2.emit(DeviceEventTypes.CHARACTERISTIC_CHANGE, change);

          try {
            if (change.service.cx.props.storeAllValues == true) {
              _this2._eventHandler.create({
                domain: Domain.DEVICE,
                eventType: DeviceEventTypes.CHARACTERISTIC_CHANGE,
                data: change
              });
            }
          } catch (e) {}
        });
      }
    }
  }, {
    key: "_unsubscribeToEvent",
    value: function _unsubscribeToEvent(device) {}
  }, {
    key: "_testCallback",
    value: function _testCallback(deviceCtrl, devices) {// for (let device of devices){
      // 	//console.log(device.chkService(Service.Lightbulb));
      // 	device.getService(Service.Lightbulb)
      // 				?.setCharacteristic(Characteristic.On,true,function(res){
      // 					console.log('return result='+res);
      // 				});
      //console.log(device.getService(Service.Lightbulb).getCharacteristic(Characteristic.On));
      // for (let srv of device.services){
      // 	if (srv instanceof Service.Lightbulb){
      // 		//console.log("chk:"+srv.chkCharacteristic(Characteristic.Brightness));
      // 		console.log("chk:"+srv.chkCharacteristic(null));
      // 		for (let cx of srv.characteristics){
      // 			if (cx instanceof Characteristic.On){
      // 				console.log("initial value cx.value="+cx.value);
      // 				cx.setValue(true,function(){
      // 					console.log("target value:"+cx.value);
      // 				})
      // 			}
      // 		}
      // 	}
      // }
      //}
    }
  }]);
  return deviceController;
}(EventEmitter);

module.exports = deviceController;