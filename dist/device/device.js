"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var EventEmitter = require('events');

var Characteristic = require('./characteristic');

var _require = require('../cst'),
    Formats = _require.Formats,
    Perms = _require.Perms,
    Status = _require.Status,
    Units = _require.Units,
    CharacteristicEventTypes = _require.CharacteristicEventTypes,
    ServiceEventTypes = _require.ServiceEventTypes,
    DeviceEventTypes = _require.DeviceEventTypes;

var Device = /*#__PURE__*/function (_EventEmitter) {
  (0, _inherits2["default"])(Device, _EventEmitter);

  var _super = _createSuper(Device);

  function Device(logger, _id) {
    var _this;

    (0, _classCallCheck2["default"])(this, Device);
    _this = _super.call(this);
    _this.log = logger;
    _this.services = [];
    _this.status = Status.NONE;
    _this.uuid = null;
    _this._id = _id;
    return _this;
  }

  (0, _createClass2["default"])(Device, [{
    key: "addService",
    value: function addService(service) {
      var _this2 = this;

      if (typeof service === 'function') {
        var srv = new service(this.log, arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2], arguments.length <= 3 ? undefined : arguments[3]);
        /*cx.on(CharacteristicEventTypes.GET, function(change){
          // make a new object with the relevant characteristic added, and bubble it up
          //this.emit(ServiceEventTypes.CHARACTERISTIC_CHANGE, clone(change, { characteristic: characteristic }));
        });*/

        srv.on(ServiceEventTypes.CHARACTERISTIC_CHANGE, function (change) {
          // make a new object with the relevant characteristic added, and bubble it up
          var eventMessage = {
            _id: _this2._id,
            service: change
          };

          _this2.emit(DeviceEventTypes.CHARACTERISTIC_CHANGE, eventMessage
          /*clone(change, { characteristic })*/
          );
        });
        this.services.push(srv);
        return srv;
      }

      return null;
    }
  }, {
    key: "getService",
    value: function getService(name) {
      if (name == null) {
        this.log.warn('Device displayName:' + this.displayName + ' getService:null');
        return null;
      }

      var index, srv;

      for (index in this.services) {
        srv = this.services[index];

        if (typeof name === 'string' && srv.displayName === name) {
          return srv;
        } else if (typeof name === 'function' && (srv instanceof name || name.UUID === srv.UUID)) {
          return srv;
        }
      }

      if (typeof name === 'string') this.log.warn('Device displayName:' + this.displayName + ' getService:' + name + " return:null");
      if (typeof name === 'function') this.log.warn('Device displayName:' + this.displayName + ' getService: Service.' + name.name + " return:null");
      return null;
    }
  }, {
    key: "chkService",
    value: function chkService(name) {
      if (name == null) {
        this.log.warn('Device displayName:' + this.displayName + ' chkService:null return:false');
        return false;
      }

      var index, srv;

      for (index in this.services) {
        srv = this.services[index];

        if (typeof name === 'string' && srv.displayName === name) {
          return true;
        } else if (typeof name === 'function' && (srv instanceof name || name.UUID === srv.UUID)) {
          return true;
        }
      }

      return false;
    }
  }]);
  return Device;
}(EventEmitter);

module.exports = Device;