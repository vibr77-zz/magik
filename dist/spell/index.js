"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

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

var zmq = require("zeromq/v5-compat");

var Spell = require('./spell');

var Device = require('../device/device');

var Service = require('../device/service');

var Characteristic = require('../device/characteristic');

var _require = require('../cst'),
    Formats = _require.Formats,
    Perms = _require.Perms,
    Status = _require.Status,
    Units = _require.Units,
    CharacteristicEventTypes = _require.CharacteristicEventTypes,
    DeviceEventTypes = _require.DeviceEventTypes,
    SpellEventTypes = _require.SpellEventTypes,
    Domain = _require.Domain;

var SunCalc = require('suncalc');

var nodeCron = require('node-cron');

var check = require('check-types');

var spellController = /*#__PURE__*/function (_EventEmitter) {
  (0, _inherits2["default"])(spellController, _EventEmitter);

  var _super = _createSuper(spellController);

  function spellController(config, logger, spellHandler, eventHandler) {
    var _this;

    (0, _classCallCheck2["default"])(this, spellController);
    _this = _super.call(this);
    _this.tag = 'spellController';
    _this.log = logger;
    _this._config = config;
    _this.spellHandler = spellHandler;
    _this._eventHandler = eventHandler;
    _this.spells = [];
    _this.spellTriggers = {};
    _this.sunTime = [];
    _this._controllers = require('require-all')({
      dirname: __dirname + '/plugins',
      excludeDirs: /^\.(git|svn)$/,
      filter: /^(?!.*\.(spec|test)\.js$).*\.js$/,
      recursive: true,
      map: function map(name, path) {
        var name_1 = name.replace(/\.[^/.]+$/, "");
        return name_1.replace(/_([a-z])/g, function (m, c) {
          return c.toUpperCase();
        });
      }
    });
    var subSock = zmq.socket("sub");
    subSock.connect("tcp:\/\/127.0.0.1:" + config.deviceThread.pubPort);

    _this.log.info("deviceController ZeroMQ Publisher bound to port:" + config.deviceThread.pubPort);

    _this.subSock = subSock;
    subSock.subscribe(DeviceEventTypes.CHARACTERISTIC_CHANGE); // Check plugin compliance and load
    // this is to avoid unexpected exception

    for (var plugin in _this._controllers) {
      if (_this._controllers[plugin].prototype.hasOwnProperty("execute") == false || typeof _this._controllers[plugin].prototype.execute != 'function' || _this._controllers[plugin].hasOwnProperty("eventTrigger") == false || typeof _this._controllers[plugin].eventTrigger != "boolean" || _this._controllers[plugin].hasOwnProperty("buildEntry") == false || typeof _this._controllers[plugin].buildEntry != "function" || _this._controllers[plugin].hasOwnProperty("checkEntry") == false || typeof _this._controllers[plugin].checkEntry != "function" || _this._controllers[plugin].hasOwnProperty("version") == false || _this._controllers[plugin].hasOwnProperty("tag") == false) {
        _this.log.error('spell bad plugin:' + plugin + ', tag:' + _this._controllers[plugin].tag + ', version:' + _this._controllers[plugin].version);

        delete _this._controllers[plugin];
      } else {
        _this.log.info('spell loaded plugin:' + plugin + ', tag:' + _this._controllers[plugin].tag + ', version:' + _this._controllers[plugin].version);
      }
    } // At init first trigger


    _this._sunCalc();

    _this._cronProcess();

    _this._testRemoveSpellEntry(); // Manage External Event


    _this._subscribeTodeviceControllerEvent();

    return _this;
  }

  (0, _createClass2["default"])(spellController, [{
    key: "_cronProcess",
    value: function _cronProcess() {
      nodeCron.schedule('* * * * *', function () {
        var d = new Date();
        this.log.info('spellController processTime cron task 1 min: ' + d.getHours() + ':' + d.getMinutes());

        this._intervalProcess();
      }.bind(this));
    } // _restAPI(){
    // 	app.get('/', function(req, res) { // création de la route sous le verbe get
    //    	res.send('Hello world  ! ') // envoi de hello world a l'utilisateur
    // 	})
    // }

  }, {
    key: "_intervalProcess",
    value: function _intervalProcess() {
      var d = new Date();
      this.emit(SpellEventTypes.TIME_EVENT, function (err, result) {});

      for (var key in this.sunTime) {
        if (d.getMinutes() == this.sunTime[key].getMinutes() && d.getHours() == this.sunTime[key].getHours()) {
          var eventName = 'sunlight_' + key;
          this.emit(eventName, function (err, result) {});
        }
      }
    }
  }, {
    key: "_sunCalc",
    value: function _sunCalc() {
      this.sunTime = SunCalc.getTimes(new Date(), 44, 6333, -1, 15);
    }
  }, {
    key: "addTrigger",
    value: function addTrigger(event, spellId, entryId, obj) {
      var id = spellId + "-" + entryId;

      if (this.spellTriggers[event]) {
        for (var idx in this.spellTriggers[event]) {
          var item = this.spellTriggers[event][idx];

          if (item.id == id) {
            this.log.error('spellController addTrigger error: can not load trigger twice key:' + id);
            return false;
          }
        }
      } else this.spellTriggers[event] = [];

      this.spellTriggers[event].push({
        id: id,
        obj: obj
      });
      return true;
    }
  }, {
    key: "removeTrigger",
    value: function removeTrigger(event, spellId, entryId) {
      var id = spellId + "-" + entryId;

      if (this.spellTriggers[event]) {
        for (var idx in this.spellTriggers[event]) {
          var item = this.spellTriggers[event][idx];

          if (item.id == id) {
            this.spellTriggers[event].splice(idx, 1);
            item.obj.unregisterTrigger(this, item.obj.eventNameSubscription);
          }
        }
      } //console.log(this.spellTriggers);

    }
  }, {
    key: "_subscribeTodeviceControllerEvent",
    value: function _subscribeTodeviceControllerEvent() {
      this.subSock.on("message", function (topic, message) {
        var msg = JSON.parse(message.toString());
        this.log.info(this.tag + " received message from deviceController:" + msg);
        this.emit(SpellEventTypes.DEVICE_EVENT, msg);
      }.bind(this));
    }
  }, {
    key: "_testRemoveSpellEntry",
    value: function _testRemoveSpellEntry() {
      /*
      const crPromise=this.spellHandler.create({displayName:'test'});
      crPromise.then(function(doc){
      	console.log(doc);
      	},
      function(err){
      	console.log(err);
      })
      */
      //console.log(this._controllers['actionEmail']);
      //console.log(this._controllers['actionEmail'].buildEntry({to:'vincent@besson.be',subject:'this is the subject',data:'some Data'}));
      //let spell=new Spell(this._config,this.log,this._controllers,wrkfl_1);
      //this.spells.push(spell);
      var crPromise_2 = this.spellHandler.get({});
      crPromise_2.then(function (docs) {
        var _this2 = this;

        var _iterator = _createForOfIteratorHelper(docs),
            _step;

        try {
          var _loop = function _loop() {
            var doc = _step.value;
            var spell = new Spell(_this2._config, _this2.log, _this2, doc);
            spell.on(SpellEventTypes.SPELL_EXECUTION, function (logStack) {
              if (spell.props.storeExecLog == true) this._eventHandler.create({
                domain: Domain.SPELL,
                eventType: SpellEventTypes.SPELL_EXECUTION,
                data: logStack
              });
            }.bind(_this2));
            spell.checkSpell();

            if (spell.checkPass == true) {
              _this2.log.info('spell _id:' + spell._id + ', checkPass:true');

              _this2.spells.push(spell);

              spell.executeSpell();
            }
          };

          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            _loop();
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }.bind(this), function (err) {
        console.log(err);
      }); //const crPromise_3=this.spellHandler.update(spell);
      //crPromise_2.then(function(doc){
      //console.log(doc);
      //for (let doc of docs){
      //console.log(doc);
      //let spell=new Spell(this._config,this.log,this._controllers,doc);
      //this.spells.push(spell);
      //}
      //	},
      // function(err){
      //	console.log(err);
      //});

      return; // for (let device of this.deviceController._devices){
      // 	console.log(this.deviceController._devices);
      // 	let cx=device.getService(Service.Lightbulb).getCharacteristic(Characteristic.On);
      // 	//let st=new spellTrigger(this,'561569ee0e795998127b23c6','561569ee0e795998127b23d5');
      // 	//cx.on(CharacteristicEventTypes.CHANGE,st.callbackTrigger.bind(st));
      // 	console.log(cx.listeners(CharacteristicEventTypes.CHANGE));
      // 	//console.log(device.chkService(Service.Lightbulb));
      // 	setTimeout(function(){
      // 		device.getService(Service.Lightbulb)
      // 				?.setCharacteristic(Characteristic.On,true,function(error,res){
      // 					console.log('return result='+res);
      // 				});
      // 	},4000);
      // }
      //const wrkfl=wrkfl_1;
      //let ret;
      //ret=this.removeSpellEntry(wrkfl.spellEntries,'zz1569ee0e795998127b23b2');
      //this.log.info(ret);
      //this.log.info(JSON.stringify(wrkfl, undefined, '\t'));
      // const newitem={
      // 	id:'561569ee0e795998127b23ds',
      // 	type:'actionWait',
      // 	params:{
      // 		duration:88
      // 	}
      // };
      // let ret_2=this.insertSpellEntry(wrkfl.spellEntries,'qq1569ee0e795998127b23a9',newitem);
      // //this.log.info(ret_2);
      // //this.log.info(JSON.stringify(wrkfl, undefined, '\t'));
      // let modparams={
      // 	duration:99
      // }
      // this.modifySpellEntry(wrkfl.spellEntries,'561569ee0e795998127b23ds',modparams);
      // this.log.info(JSON.stringify(wrkfl, undefined, '\t'));
    }
  }]);
  return spellController;
}(EventEmitter);

module.exports = spellController;