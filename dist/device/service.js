"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var EventEmitter = require('events');

var Characteristic = require('./characteristic');

var _require = require('../cst'),
    CharacteristicEventTypes = _require.CharacteristicEventTypes,
    ServiceEventTypes = _require.ServiceEventTypes;

var clone = require('clone');

var Service = /*#__PURE__*/function (_EventEmitter) {
  (0, _inherits2["default"])(Service, _EventEmitter);

  var _super = _createSuper(Service);

  /**
   * @deprecated Removed in iOS 11. Use ServiceLabel instead.
   */
  function Service(logger, displayName, subtype, _id) {
    var _this;

    (0, _classCallCheck2["default"])(this, Service);
    _this = _super.call(this);
    _this.log = logger;
    _this.displayName = displayName;
    _this.subtype = subtype;
    _this.characteristics = [];
    _this.optionalCharacteristics = [];
    _this.isHiddenService = false;
    _this.isPrimaryService = false;
    _this.linkedServices = [];
    _this._id = _id; // every service has an optional Characteristic.Name property - we'll set it to our displayName
    // if one was given
    // if you don't provide a display name, some HomeKit apps may choose to hide the device.

    if (displayName) {
      // create the characteristic if necessary
      var nameCx = _this.addCharacteristic(Characteristic.Name);

      nameCx.value = displayName; // Dirty but need to force it
    }

    return _this;
  }

  (0, _createClass2["default"])(Service, [{
    key: "addCharacteristic",
    value: function addCharacteristic(characteristic) {
      var _this2 = this;

      if (typeof characteristic === 'function') {
        var cx = new characteristic(arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]);
        cx.on(CharacteristicEventTypes.GET, function (change) {
          // make a new object with the relevant characteristic added, and bubble it up
          var eventMessage = {
            _id: this._id,
            type: this.constructor.name,
            props: '',
            cx: {
              type: cx.constructor.name,
              props: cx.props,
              change: change
            }
          };
          this.emit(ServiceEventTypes.CHARACTERISTIC_CHANGE, eventMessage);
        });
        cx.on(CharacteristicEventTypes.CHANGE, function (change) {
          var eventMessage = {
            _id: _this2._id,
            type: _this2.constructor.name,
            props: '',
            cx: {
              type: cx.constructor.name,
              props: cx.props,
              change: change
            }
          };

          _this2.emit(ServiceEventTypes.CHARACTERISTIC_CHANGE, eventMessage);
        });
        this.characteristics.push(cx);
        return cx;
      }

      return null;
    }
  }, {
    key: "addOptionalCharacteristic",
    value: function addOptionalCharacteristic(characteristic) {
      if (typeof characteristic === 'function') {
        var cx = new characteristic(arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]);
        this.optionalCharacteristics.push(cx);
      }
    }
  }, {
    key: "getCharacteristic",
    value: function getCharacteristic(name) {
      if (name == null) {
        this.log.warn('Service displayName:' + this.displayName + ' getCharacteristic:null');
        return null;
      }

      var index, cx;

      for (index in this.characteristics) {
        cx = this.characteristics[index];

        if (typeof name === 'string' && cx.displayName === name) {
          return cx;
        } else if (typeof name === 'function' && (cx instanceof name || name.UUID === cx.UUID)) {
          return cx;
        }
      }

      for (index in this.optionalCharacteristics) {
        cx = this.optionalCharacteristics[index];

        if (typeof name === 'string' && cx.displayName === name) {
          return cx;
        } else if (typeof name === 'function' && (cx instanceof name || name.UUID === cx.UUID)) {
          return cx;
        }
      }

      if (typeof name === 'string') this.log.warn('Service displayName:' + this.displayName + ' getCharacteristic:' + name + " return:null");
      if (typeof name === 'function') this.log.warn('Service displayName:' + this.displayName + ' getCharacteristic: Characteristic.' + name.name + " return:null");
      return null;
    }
  }, {
    key: "chkCharacteristic",
    value: function chkCharacteristic(name) {
      // checks for the existence of a characteristic object in the service
      if (name == null) {
        this.log.warn('Service displayName:' + this.displayName + ' chkCharacteristic:null return:false');
        return false;
      }

      var index, cx;

      for (index in this.characteristics) {
        cx = this.characteristics[index];

        if (typeof name === 'string' && cx.displayName === name) {
          return true;
        } else if (typeof name === 'function' && (cx instanceof name || name.UUID === cx.UUID)) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "setCharacteristic",
    value: function setCharacteristic(name, value, clbk) {
      this.getCharacteristic(name).setValue(value, clbk);
      return this;
    } // A function to only updating the remote value, but not firing the 'set' event.

  }, {
    key: "updateCharacteristic",
    value: function updateCharacteristic(name, value) {
      this.getCharacteristic(name).updateValue(value);
      return this;
    }
  }]);
  return Service;
}(EventEmitter);

(0, _defineProperty2["default"])(Service, "AccessControl", void 0);
(0, _defineProperty2["default"])(Service, "AccessoryInformation", void 0);
(0, _defineProperty2["default"])(Service, "AirPurifier", void 0);
(0, _defineProperty2["default"])(Service, "AirQualitySensor", void 0);
(0, _defineProperty2["default"])(Service, "AudioStreamManagement", void 0);
(0, _defineProperty2["default"])(Service, "BatteryService", void 0);
(0, _defineProperty2["default"])(Service, "BridgeConfiguration", void 0);
(0, _defineProperty2["default"])(Service, "BridgingState", void 0);
(0, _defineProperty2["default"])(Service, "CameraControl", void 0);
(0, _defineProperty2["default"])(Service, "CameraRTPStreamManagement", void 0);
(0, _defineProperty2["default"])(Service, "CarbonDioxideSensor", void 0);
(0, _defineProperty2["default"])(Service, "CarbonMonoxideSensor", void 0);
(0, _defineProperty2["default"])(Service, "ContactSensor", void 0);
(0, _defineProperty2["default"])(Service, "DataStreamTransportManagement", void 0);
(0, _defineProperty2["default"])(Service, "Door", void 0);
(0, _defineProperty2["default"])(Service, "Doorbell", void 0);
(0, _defineProperty2["default"])(Service, "Fan", void 0);
(0, _defineProperty2["default"])(Service, "Fanv2", void 0);
(0, _defineProperty2["default"])(Service, "Faucet", void 0);
(0, _defineProperty2["default"])(Service, "FilterMaintenance", void 0);
(0, _defineProperty2["default"])(Service, "GarageDoorOpener", void 0);
(0, _defineProperty2["default"])(Service, "HeaterCooler", void 0);
(0, _defineProperty2["default"])(Service, "HumidifierDehumidifier", void 0);
(0, _defineProperty2["default"])(Service, "HumiditySensor", void 0);
(0, _defineProperty2["default"])(Service, "InputSource", void 0);
(0, _defineProperty2["default"])(Service, "IrrigationSystem", void 0);
(0, _defineProperty2["default"])(Service, "Label", void 0);
(0, _defineProperty2["default"])(Service, "LeakSensor", void 0);
(0, _defineProperty2["default"])(Service, "LightSensor", void 0);
(0, _defineProperty2["default"])(Service, "Lightbulb", void 0);
(0, _defineProperty2["default"])(Service, "LockManagement", void 0);
(0, _defineProperty2["default"])(Service, "LockMechanism", void 0);
(0, _defineProperty2["default"])(Service, "Microphone", void 0);
(0, _defineProperty2["default"])(Service, "MotionSensor", void 0);
(0, _defineProperty2["default"])(Service, "OccupancySensor", void 0);
(0, _defineProperty2["default"])(Service, "Outlet", void 0);
(0, _defineProperty2["default"])(Service, "Pairing", void 0);
(0, _defineProperty2["default"])(Service, "ProtocolInformation", void 0);
(0, _defineProperty2["default"])(Service, "Relay", void 0);
(0, _defineProperty2["default"])(Service, "SecuritySystem", void 0);
(0, _defineProperty2["default"])(Service, "ServiceLabel", void 0);
(0, _defineProperty2["default"])(Service, "Siri", void 0);
(0, _defineProperty2["default"])(Service, "Slat", void 0);
(0, _defineProperty2["default"])(Service, "SmokeSensor", void 0);
(0, _defineProperty2["default"])(Service, "SmartSpeaker", void 0);
(0, _defineProperty2["default"])(Service, "Speaker", void 0);
(0, _defineProperty2["default"])(Service, "StatefulProgrammableSwitch", void 0);
(0, _defineProperty2["default"])(Service, "StatelessProgrammableSwitch", void 0);
(0, _defineProperty2["default"])(Service, "Switch", void 0);
(0, _defineProperty2["default"])(Service, "TargetControl", void 0);
(0, _defineProperty2["default"])(Service, "TargetControlManagement", void 0);
(0, _defineProperty2["default"])(Service, "Television", void 0);
(0, _defineProperty2["default"])(Service, "TelevisionSpeaker", void 0);
(0, _defineProperty2["default"])(Service, "TemperatureSensor", void 0);
(0, _defineProperty2["default"])(Service, "Thermostat", void 0);
(0, _defineProperty2["default"])(Service, "TimeInformation", void 0);
(0, _defineProperty2["default"])(Service, "TunneledBTLEAccessoryService", void 0);
(0, _defineProperty2["default"])(Service, "Valve", void 0);
(0, _defineProperty2["default"])(Service, "Window", void 0);
(0, _defineProperty2["default"])(Service, "WindowCovering", void 0);
(0, _defineProperty2["default"])(Service, "CameraOperatingMode", void 0);
(0, _defineProperty2["default"])(Service, "CameraEventRecordingManagement", void 0);
(0, _defineProperty2["default"])(Service, "WiFiRouter", void 0);
(0, _defineProperty2["default"])(Service, "WiFiSatellite", void 0);
(0, _defineProperty2["default"])(Service, "PowerManagement", void 0);
(0, _defineProperty2["default"])(Service, "TransferTransportManagement", void 0);
module.exports = Service;