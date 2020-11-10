"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _events = _interopRequireDefault(require("events"));

var _device = _interopRequireDefault(require("../device"));

var _service = _interopRequireDefault(require("../service"));

var _characteristic = _interopRequireDefault(require("../characteristic"));

var _cst = require("../../cst");

var _checkTypes = _interopRequireDefault(require("check-types"));

var _ajv = _interopRequireDefault(require("ajv"));

var _zData = _interopRequireDefault(require("../zData.json"));

var _defaultmap = _interopRequireDefault(require("./defaultmap.json"));

var _mapschema = _interopRequireDefault(require("./mapschema.json"));

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var TAG = 'deviceZwave';
var VERSION = '0.12';

//import {addItemToArray} from '../../lib/tools'
var device_zwave = /*#__PURE__*/function (_EventEmitter) {
  (0, _inherits2["default"])(device_zwave, _EventEmitter);

  var _super = _createSuper(device_zwave);

  function device_zwave(config, logger, callback) {
    var _this;

    (0, _classCallCheck2["default"])(this, device_zwave);
    _this = _super.call(this);
    _this.tag = TAG;
    _this.log = logger;
    _this.status = _cst.Status.NONE;
    _this.devices = [];
    _this.cxZvalueMap = {}; // Hashmap between Characteristic and Zwave Node Value entry;

    _this.zvalueCxMap = {}; //let device=new ZwaveDevice(logger,'Device 1','561569ee0e695998127b23d7');
    //this.addDevice(config,logger,device);
    //console.log(this.devices)
    //callback(null,this,this.devices);
    //this.removeDevice(config,logger,'561569ee0e695998127b23d7');
    // When the init phase is over callback function with new devices

    _this.status = _cst.Status.READY; //Check the Mapping

    var ajv = new _ajv["default"]({
      allErrors: true
    });

    if (ajv.validate(_mapschema["default"], _defaultmap["default"]) == false) {
      _this.log.error(TAG + "Map Json is not validated by the schema");
    } // Last Method to Call when everything is ready


    callback(null, (0, _assertThisInitialized2["default"])(_this), _this.devices);
    return _this;
  }

  (0, _createClass2["default"])(device_zwave, [{
    key: "registerDevices",
    value: function registerDevices() {
      this.processZdata();
    }
  }, {
    key: "addDevice",
    value: function addDevice(device) {
      //let device=new ZwaveDevice(config,this.log,displayName,_id);
      this.devices.push(device);
      console.log("HERE ADD 0");
      this.emit(_cst.DeviceEventTypes.ADD_DEVICE, this.tag, device._id); // send event
    }
  }, {
    key: "removeDevice",
    value: function removeDevice(config, logger, _id) {
      for (var idx in this.devices) {
        var device = this.devices[idx];

        if (device._id == _id) {
          console.log("found & splice");
          this.devices.splice(idx, 1);
          device = null;
        }
      } // send event

    }
  }, {
    key: "checkprops",
    value: function checkprops(mapobj, zobj) {
      if (mapobj.props && _checkTypes["default"].nonEmptyObject(mapobj.props)) {
        for (var key in mapobj.props) {
          if (zobj.hasOwnProperty(key) == false || zobj[key] != mapobj.props[key]) {
            return false;
            break;
          }
        }
      }

      return true;
    }
  }, {
    key: "addServiceAndCxFromString",
    value: function addServiceAndCxFromString(device, serviceObj, zValue) {
      //console.log(device);
      var srvId = device._id + "-" + zValue.value_id;

      for (var srvName in _service["default"]) {
        if (srvName == serviceObj.name) {
          //console.log(serviceObj.name);
          //console.log(zValue);
          var srv = device.addService(_service["default"][srvName], zValue.label, srvId);

          if (srv == null) {
            console.log("srv==null srvName=" + srvName);
          }

          if (srv != null) {
            srv.zvalue = zValue;

            var _iterator = _createForOfIteratorHelper(serviceObj.optCx),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var optCx = _step.value;

                var _iterator2 = _createForOfIteratorHelper(srv.optionalCharacteristics),
                    _step2;

                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    var cxName = _step2.value;
                    if (optCx.name == cxName.constructor.name) srv.addCharacteristic(_characteristic["default"][optCx.name]);
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            device.configureService(srv);
          }
        }
      }
    }
  }, {
    key: "processZdata",
    value: function processZdata() {
      // First Add Accessory Information Service
      var zwaveNetworkId = '0xfd730e5e';
      var id = 14;

      if (_zData["default"][id] != null) {
        var deviceId = zwaveNetworkId + '-' + id;
        var device = new ZwaveDevice(this.log, this, _zData["default"][id].name, deviceId); //console.log(zData);
        // Start by filtering Device Props

        var goodMapping = []; // List of rule match de props conditions

        var goodService = null; // Service according to the matching rule;

        var _iterator3 = _createForOfIteratorHelper(_defaultmap["default"]),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _item2 = _step3.value;
            // Check props at device level to filter
            if (this.checkprops(_item2.device, _zData["default"][id]) == true) goodMapping.push(_item2);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        for (var classKey in _zData["default"][id].classes) {
          goodService = null;
          var instances = _zData["default"][id].classes[classKey];

          for (var instKey in instances) {
            for (var i in instances[instKey]) {
              var znode_value = instances[instKey][i];
              goodService = null; // important

              var _iterator4 = _createForOfIteratorHelper(goodMapping),
                  _step4;

              try {
                for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                  var item = _step4.value;

                  // Iterate across the rules
                  var _iterator5 = _createForOfIteratorHelper(item.device.commandclass),
                      _step5;

                  try {
                    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                      var cmd = _step5.value;

                      if (cmd.id == classKey && cmd.values) {
                        // Check for valid commandclass
                        var _iterator6 = _createForOfIteratorHelper(cmd.values),
                            _step6;

                        try {
                          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                            var zvalue = _step6.value;
                            // iterate all values
                            if (!zvalue.props || _checkTypes["default"].emptyArray(zvalue.props)) //only value with non props
                              continue;

                            if (this.checkprops(zvalue, znode_value) == true) {
                              if (goodService == null) {
                                // First Service
                                goodService = zvalue.service;
                                if (goodService.priority == null) goodService.priority = 0;
                                goodService.rule = item.rule;
                              } else {
                                if (zvalue.service.priority && zvalue.service.priority > goodService.priority) {
                                  // Replace the Service with the Highest priority
                                  goodService = zvalue.service;
                                  goodService.znode_value = znode_value;
                                  goodService.rule = item.rule;
                                }
                              }
                            }
                          }
                        } catch (err) {
                          _iterator6.e(err);
                        } finally {
                          _iterator6.f();
                        }
                      }
                    }
                  } catch (err) {
                    _iterator5.e(err);
                  } finally {
                    _iterator5.f();
                  }
                }
              } catch (err) {
                _iterator4.e(err);
              } finally {
                _iterator4.f();
              }

              if (goodService != null) {
                this.log.info(TAG + " processZdata() -> a good Service at value level rule:" + goodService.rule + " serviceName:" + goodService.name);
                this.addServiceAndCxFromString(device, goodService, goodService.znode_value);
              }
            }
          }

          if (goodService == null) {
            // If no service at value level let's try at commandclass
            var _iterator7 = _createForOfIteratorHelper(goodMapping),
                _step7;

            try {
              for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                var _item = _step7.value;

                var _iterator8 = _createForOfIteratorHelper(_item.device.commandclass),
                    _step8;

                try {
                  for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                    var _cmd = _step8.value;

                    if (_cmd.id == classKey && _cmd.service) {
                      if (goodService == null) {
                        goodService = _cmd.service;
                        goodService.rule = _item.rule;
                        if (goodService.priority == null) goodService.priority = 0;

                        for (var _instKey in instances) {
                          for (var _i in instances[_instKey]) {
                            goodService.znode_value = instances[_instKey][_i];
                            break;
                          }

                          break;
                        }
                      } else {
                        if (_cmd.service.priority && _cmd.service.priority > goodService.priority) {
                          // Replace the Service with the Highest priority
                          //console.log('Priority Check cmd.service.priority:'+cmd.service.priority+"?> goodService.priority:"+goodService.priority)
                          goodService = _cmd.service;
                          goodService.rule = _item.rule;

                          for (var _instKey2 in instances) {
                            for (var _i2 in instances[_instKey2]) {
                              goodService.znode_value = instances[_instKey2][_i2];
                              break;
                            }

                            break;
                          }
                        }
                      }
                    }
                  }
                } catch (err) {
                  _iterator8.e(err);
                } finally {
                  _iterator8.f();
                }
              }
            } catch (err) {
              _iterator7.e(err);
            } finally {
              _iterator7.f();
            }

            if (goodService != null) {
              this.log.info(TAG + " processZdata() ->a good Service at cmdclass level rule:" + goodService.rule + " serviceName:" + goodService.name);
              this.addServiceAndCxFromString(device, goodService, goodService.znode_value);
            }
          }
        }

        this.addDevice(device);
      }
    }
  }]);
  return device_zwave;
}(_events["default"]);

(0, _defineProperty2["default"])(device_zwave, "tag", TAG);
(0, _defineProperty2["default"])(device_zwave, "version", VERSION);

var ZwaveDevice = /*#__PURE__*/function (_Device) {
  (0, _inherits2["default"])(ZwaveDevice, _Device);

  var _super2 = _createSuper(ZwaveDevice);

  function ZwaveDevice(logger, ctrl, displayName, _id) {
    var _this2;

    (0, _classCallCheck2["default"])(this, ZwaveDevice);
    _this2 = _super2.call(this, logger, _id);
    _this2.ctrl = ctrl;
    _this2.displayName = displayName;

    var srv = _this2.addService(_service["default"].AccessoryInformation, "AccessoryInformation", _id + "-01");

    _this2.configureService(srv);

    return _this2;
  }

  (0, _createClass2["default"])(ZwaveDevice, [{
    key: "configureService",
    value: function configureService(service) {
      console.log("Start configuring Service");

      var _iterator9 = _createForOfIteratorHelper(service.characteristics),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var cx = _step9.value;
          cx = this.configureCharacteristic(cx, service); // console.log("cx:")
          //console.log(cx);
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
    }
  }, {
    key: "configureCharacteristic",
    value: function configureCharacteristic(cx, service) {
      var zv = service.zvalue;

      if (cx instanceof _characteristic["default"].Name) {
        cx.getDefaultValueFromPlugin = function (service) {
          // By Default return the name of the service
          return service.displayName;
        };

        cx.value = cx.getDefaultValueFromPlugin(service);
        cx.on(_cst.CharacteristicEventTypes.GET, function (callback, context) {
          this.value = cx.getDefaultValueFromPlugin(service);
          callback(null, this.value);
        });
        return cx;
      }

      if (cx instanceof _characteristic["default"].On) {
        if (this.ctrl.zvalueCxMap[zv.value_id] == null) this.ctrl.zvalueCxMap[zv.value_id] = [];
        this.ctrl.zvalueCxMap[zv.value_id].push(cx);
        cx.props.storeAllValues = true;

        cx.getValueFromZwave = function (data) {
          var rValue = false; // Should be true oor false

          if (data && data.type == 'bool') {
            if (data.value && typeof data.value == 'string') {
              if (data.value.toLowerCase() == "true") rValue = true;
            }
          } else if (data && data.type == 'byte') {
            if (data.value && typeof data.value == 'string' && /^\d+$/.test(data.value)) {
              rValue = parseInt(data.value);
              if (rValue > 0) rValue = true;
            }
          } else {
            log.warn(TAG + " unhandled Characteristic.On getValueFromZwave data.type:" + data.type);
          }

          return rValue;
        };

        cx.value = cx.getValueFromZwave(zv);

        cx.setValuetoZwave = function (data, newValue) {
          var sValue = false;
          if (typeof newValue != "boolean") return false;

          if (data && data.type == 'bool') {
            sValue = newValue;
          } else if (data && data.type == 'byte') {
            if (newValue == true) sValue = data.max;else sValue = data.min;
          } // Set the sValue to the Zwave driver


          return true;
        };

        cx.on(_cst.CharacteristicEventTypes.GET, function (callback, context) {
          callback(null, cx.getValueFromZwave(zv));
        }.bind(this));
        cx.on(_cst.CharacteristicEventTypes.SET, function (newValue, callback) {
          if (cx.setValuetoZwave(zv, newValue) == true) callback(null, newValue);else callback(null, this.value);
        }.bind(this));
        cx.on(_cst.CharacteristicEventTypes.CHANGE, function (newValue, callback) {
          this.value = newValue;
        });
        setTimeout(function () {
          console.log('Event');
          cx.emit(_cst.CharacteristicEventTypes.CHANGE, {
            oldValue: false,
            newValue: true
          });
        }, 3 * 1000);
        this.isConfigured = true;
        return cx;
      }

      return cx;
    }
  }]);
  return ZwaveDevice;
}(_device["default"]);

module.exports = device_zwave;