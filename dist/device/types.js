"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatusJammed = exports.StatusFault = exports.StatusActive = exports.SmokeDetected = exports.SlatType = exports.SetupEndpoints = exports.SetDuration = exports.ServiceLabelNamespace = exports.ServiceLabelIndex = exports.SerialNumber = exports.SelectedRTPStreamConfiguration = exports.SecuritySystemTargetState = exports.SecuritySystemCurrentState = exports.SecuritySystemAlarmType = exports.Saturation = exports.RotationSpeed = exports.RotationDirection = exports.ResetFilterIndication = exports.RemainingDuration = exports.RelativeHumidityHumidifierThreshold = exports.RelativeHumidityDehumidifierThreshold = exports.ProgrammableSwitchEvent = exports.ProgramMode = exports.PositionState = exports.PM2_5Density = exports.PM10Density = exports.PasswordSetting = exports.PairingPairings = exports.PairingFeatures = exports.PairVerify = exports.PairSetup = exports.OzoneDensity = exports.OutletInUse = exports.OpticalZoom = exports.On = exports.OccupancyDetected = exports.ObstructionDetected = exports.NitrogenDioxideDensity = exports.NightVision = exports.Name = exports.Mute = exports.MotionDetected = exports.Model = exports.Manufacturer = exports.Logs = exports.LockTargetState = exports.LockPhysicalControls = exports.LockManagementAutoSecurityTimeout = exports.LockLastKnownAction = exports.LockCurrentState = exports.LockControlPoint = exports.LeakDetected = exports.IsConfigured = exports.InUse = exports.ImageRotation = exports.ImageMirroring = exports.Identify = exports.Hue = exports.HoldPosition = exports.HeatingThresholdTemperature = exports.HardwareRevision = exports.FirmwareRevision = exports.FilterLifeLevel = exports.FilterChangeIndication = exports.DigitalZoom = exports.CurrentVerticalTiltAngle = exports.CurrentTiltAngle = exports.CurrentTemperature = exports.CurrentSlatState = exports.CurrentRelativeHumidity = exports.CurrentPosition = exports.CurrentHumidifierDehumidifierState = exports.CurrentHorizontalTiltAngle = exports.CurrentHeatingCoolingState = exports.CurrentHeaterCoolerState = exports.CurrentFanState = exports.CurrentDoorState = exports.CurrentAmbientLightLevel = exports.CurrentAirPurifierState = exports.CoolingThresholdTemperature = exports.ContactSensorState = exports.ColorTemperature = exports.ChargingState = exports.CarbonMonoxidePeakLevel = exports.CarbonMonoxideLevel = exports.CarbonMonoxideDetected = exports.CarbonDioxidePeakLevel = exports.CarbonDioxideLevel = exports.CarbonDioxideDetected = exports.Brightness = exports.BatteryLevel = exports.AudioFeedback = exports.AirQuality = exports.AirParticulateSize = exports.AirParticulateDensity = exports.AdministratorOnlyAccess = exports.Active = exports.ProductData = exports.AccessoryFlags = exports.AccessControlLevel = void 0;
exports.TransferTransportManagement = exports.PowerManagement = exports.WiFiSatellite = exports.WiFiRouter = exports.CameraEventRecordingManagement = exports.CameraOperatingMode = exports.WindowCovering = exports.Window = exports.Valve = exports.Thermostat = exports.TemperatureSensor = exports.Switch = exports.StatelessProgrammableSwitch = exports.Speaker = exports.SmartSpeaker = exports.SmokeSensor = exports.Slat = exports.ServiceLabel = exports.SecuritySystem = exports.Outlet = exports.OccupancySensor = exports.MotionSensor = exports.Microphone = exports.LockMechanism = exports.LockManagement = exports.Lightbulb = exports.LightSensor = exports.LeakSensor = exports.IrrigationSystem = exports.HumiditySensor = exports.HumidifierDehumidifier = exports.HeaterCooler = exports.GarageDoorOpener = exports.Faucet = exports.FilterMaintenance = exports.Fanv2 = exports.Fan = exports.Doorbell = exports.Door = exports.ContactSensor = exports.CarbonMonoxideSensor = exports.CarbonDioxideSensor = exports.CameraRTPStreamManagement = exports.BatteryService = exports.AirQualitySensor = exports.AirPurifier = exports.AccessoryInformation = exports.AccessControl = exports.SetupTransferTransport = exports.SupportedTransferTransportConfiguration = exports.WakeConfiguration = exports.WiFiSatelliteStatus = exports.NetworkAccessViolationControl = exports.ManagedNetworkEnable = exports.WANStatusList = exports.WANConfigurationList = exports.SupportedRouterConfiguration = exports.RouterStatus = exports.NetworkClientStatusControl = exports.NetworkClientProfileControl = exports.PeriodicSnapshotsActive = exports.ThirdPartyCameraActive = exports.ManuallyDisabled = exports.HomeKitCameraActive = exports.DiagonalFieldOfView = exports.EventSnapshotsActive = exports.CameraOperatingModeIndicator = exports.SelectedCameraRecordingConfiguration = exports.SupportedAudioRecordingConfiguration = exports.SupportedVideoRecordingConfiguration = exports.SupportedCameraRecordingConfiguration = exports.RecordingAudioActive = exports.WaterLevel = exports.Volume = exports.VOCDensity = exports.Version = exports.ValveType = exports.TemperatureDisplayUnits = exports.TargetVerticalTiltAngle = exports.TargetTiltAngle = exports.TargetTemperature = exports.TargetSlatState = exports.TargetRelativeHumidity = exports.TargetPosition = exports.TargetHumidifierDehumidifierState = exports.TargetHorizontalTiltAngle = exports.TargetHeatingCoolingState = exports.TargetHeaterCoolerState = exports.TargetFanState = exports.TargetDoorState = exports.TargetAirQuality = exports.TargetAirPurifierState = exports.SwingMode = exports.SupportedVideoStreamConfiguration = exports.SupportedRTPConfiguration = exports.SupportedAudioStreamConfiguration = exports.SulphurDioxideDensity = exports.StreamingStatus = exports.StatusTampered = exports.StatusLowBattery = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Service = require('./service');

var Characteristic = require('./characteristic');

var _require = require('../cst'),
    Formats = _require.Formats,
    Perms = _require.Perms,
    Status = _require.Status,
    Units = _require.Units,
    CharacteristicEventTypes = _require.CharacteristicEventTypes;
/**
 * Characteristic "Access Control Level"
 */


var AccessControlLevel = /*#__PURE__*/function (_Characteristic) {
  (0, _inherits2["default"])(AccessControlLevel, _Characteristic);

  var _super = _createSuper(AccessControlLevel);

  function AccessControlLevel() {
    var _this;

    (0, _classCallCheck2["default"])(this, AccessControlLevel);
    _this = _super.call(this, 'Access Control Level', AccessControlLevel.UUID);

    _this.setProps({
      format: Formats.UINT16,
      perms: [Perms.NOTIFY, Perms.PAIRED_READ, Perms.PAIRED_WRITE],
      maxValue: 2,
      minValue: 0,
      minStep: 1
    });

    _this.value = _this.getDefaultValue();
    return _this;
  }

  return AccessControlLevel;
}(Characteristic);

exports.AccessControlLevel = AccessControlLevel;
(0, _defineProperty2["default"])(AccessControlLevel, "UUID", '000000E5-0000-1000-8000-0026BB765291');
Characteristic.AccessControlLevel = AccessControlLevel;
/**
 * Characteristic "Accessory Flags"
 */

var AccessoryFlags = /*#__PURE__*/function (_Characteristic2) {
  (0, _inherits2["default"])(AccessoryFlags, _Characteristic2);

  var _super2 = _createSuper(AccessoryFlags);

  function AccessoryFlags() {
    var _this2;

    (0, _classCallCheck2["default"])(this, AccessoryFlags);
    _this2 = _super2.call(this, 'Accessory Flags', AccessoryFlags.UUID);

    _this2.setProps({
      format: Formats.UINT32,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this2.value = _this2.getDefaultValue();
    return _this2;
  }

  return AccessoryFlags;
}(Characteristic);

exports.AccessoryFlags = AccessoryFlags;
(0, _defineProperty2["default"])(AccessoryFlags, "UUID", '000000A6-0000-1000-8000-0026BB765291');
Characteristic.AccessoryFlags = AccessoryFlags;
/**
 * Characteristic "Product Data"
 */

var ProductData = /*#__PURE__*/function (_Characteristic3) {
  (0, _inherits2["default"])(ProductData, _Characteristic3);

  var _super3 = _createSuper(ProductData);

  function ProductData() {
    var _this3;

    (0, _classCallCheck2["default"])(this, ProductData);
    _this3 = _super3.call(this, 'Product Data', ProductData.UUID);

    _this3.setProps({
      format: Formats.DATA,
      perms: [Perms.READ]
    });

    _this3.value = _this3.getDefaultValue();
    return _this3;
  }

  return ProductData;
}(Characteristic);

exports.ProductData = ProductData;
(0, _defineProperty2["default"])(ProductData, "UUID", '00000220-0000-1000-8000-0026BB765291');
Characteristic.ProductData = ProductData;
/**
 * Characteristic "Active"
 */

var Active = /*#__PURE__*/function (_Characteristic4) {
  (0, _inherits2["default"])(Active, _Characteristic4);

  var _super4 = _createSuper(Active);

  // The value property of Active must be one of the following:
  function Active() {
    var _this4;

    (0, _classCallCheck2["default"])(this, Active);
    _this4 = _super4.call(this, 'Active', Active.UUID);

    _this4.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this4.value = _this4.getDefaultValue();
    return _this4;
  }

  return Active;
}(Characteristic);

exports.Active = Active;
(0, _defineProperty2["default"])(Active, "INACTIVE", 0);
(0, _defineProperty2["default"])(Active, "ACTIVE", 1);
(0, _defineProperty2["default"])(Active, "UUID", '000000B0-0000-1000-8000-0026BB765291');
Characteristic.Active = Active;
/**
 * Characteristic "Administrator Only Access"
 */

var AdministratorOnlyAccess = /*#__PURE__*/function (_Characteristic5) {
  (0, _inherits2["default"])(AdministratorOnlyAccess, _Characteristic5);

  var _super5 = _createSuper(AdministratorOnlyAccess);

  function AdministratorOnlyAccess() {
    var _this5;

    (0, _classCallCheck2["default"])(this, AdministratorOnlyAccess);
    _this5 = _super5.call(this, 'Administrator Only Access', AdministratorOnlyAccess.UUID);

    _this5.setProps({
      format: Formats.BOOL,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this5.value = _this5.getDefaultValue();
    return _this5;
  }

  return AdministratorOnlyAccess;
}(Characteristic);

exports.AdministratorOnlyAccess = AdministratorOnlyAccess;
(0, _defineProperty2["default"])(AdministratorOnlyAccess, "UUID", '00000001-0000-1000-8000-0026BB765291');
Characteristic.AdministratorOnlyAccess = AdministratorOnlyAccess;
/**
 * Characteristic "Air Particulate Density"
 */

var AirParticulateDensity = /*#__PURE__*/function (_Characteristic6) {
  (0, _inherits2["default"])(AirParticulateDensity, _Characteristic6);

  var _super6 = _createSuper(AirParticulateDensity);

  function AirParticulateDensity() {
    var _this6;

    (0, _classCallCheck2["default"])(this, AirParticulateDensity);
    _this6 = _super6.call(this, 'Air Particulate Density', AirParticulateDensity.UUID);

    _this6.setProps({
      format: Formats.FLOAT,
      maxValue: 1000,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this6.value = _this6.getDefaultValue();
    return _this6;
  }

  return AirParticulateDensity;
}(Characteristic);

exports.AirParticulateDensity = AirParticulateDensity;
(0, _defineProperty2["default"])(AirParticulateDensity, "UUID", '00000064-0000-1000-8000-0026BB765291');
Characteristic.AirParticulateDensity = AirParticulateDensity;
/**
 * Characteristic "Air Particulate Size"
 */

var AirParticulateSize = /*#__PURE__*/function (_Characteristic7) {
  (0, _inherits2["default"])(AirParticulateSize, _Characteristic7);

  var _super7 = _createSuper(AirParticulateSize);

  // The value property of AirParticulateSize must be one of the following:
  function AirParticulateSize() {
    var _this7;

    (0, _classCallCheck2["default"])(this, AirParticulateSize);
    _this7 = _super7.call(this, 'Air Particulate Size', AirParticulateSize.UUID);

    _this7.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this7.value = _this7.getDefaultValue();
    return _this7;
  }

  return AirParticulateSize;
}(Characteristic);

exports.AirParticulateSize = AirParticulateSize;
(0, _defineProperty2["default"])(AirParticulateSize, "_2_5_M", 0);
(0, _defineProperty2["default"])(AirParticulateSize, "_10_M", 1);
(0, _defineProperty2["default"])(AirParticulateSize, "UUID", '00000065-0000-1000-8000-0026BB765291');
Characteristic.AirParticulateSize = AirParticulateSize;
/**
 * Characteristic "Air Quality"
 */

var AirQuality = /*#__PURE__*/function (_Characteristic8) {
  (0, _inherits2["default"])(AirQuality, _Characteristic8);

  var _super8 = _createSuper(AirQuality);

  // The value property of AirQuality must be one of the following:
  function AirQuality() {
    var _this8;

    (0, _classCallCheck2["default"])(this, AirQuality);
    _this8 = _super8.call(this, 'Air Quality', AirQuality.UUID);

    _this8.setProps({
      format: Formats.UINT8,
      maxValue: 5,
      minValue: 0,
      validValues: [0, 1, 2, 3, 4, 5],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this8.value = _this8.getDefaultValue();
    return _this8;
  }

  return AirQuality;
}(Characteristic);

exports.AirQuality = AirQuality;
(0, _defineProperty2["default"])(AirQuality, "UNKNOWN", 0);
(0, _defineProperty2["default"])(AirQuality, "EXCELLENT", 1);
(0, _defineProperty2["default"])(AirQuality, "GOOD", 2);
(0, _defineProperty2["default"])(AirQuality, "FAIR", 3);
(0, _defineProperty2["default"])(AirQuality, "INFERIOR", 4);
(0, _defineProperty2["default"])(AirQuality, "POOR", 5);
(0, _defineProperty2["default"])(AirQuality, "UUID", '00000095-0000-1000-8000-0026BB765291');
Characteristic.AirQuality = AirQuality;
/**
 * Characteristic "Audio Feedback"
 */

var AudioFeedback = /*#__PURE__*/function (_Characteristic9) {
  (0, _inherits2["default"])(AudioFeedback, _Characteristic9);

  var _super9 = _createSuper(AudioFeedback);

  function AudioFeedback() {
    var _this9;

    (0, _classCallCheck2["default"])(this, AudioFeedback);
    _this9 = _super9.call(this, 'Audio Feedback', AudioFeedback.UUID);

    _this9.setProps({
      format: Formats.BOOL,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this9.value = _this9.getDefaultValue();
    return _this9;
  }

  return AudioFeedback;
}(Characteristic);

exports.AudioFeedback = AudioFeedback;
(0, _defineProperty2["default"])(AudioFeedback, "UUID", '00000005-0000-1000-8000-0026BB765291');
Characteristic.AudioFeedback = AudioFeedback;
/**
 * Characteristic "Battery Level"
 */

var BatteryLevel = /*#__PURE__*/function (_Characteristic10) {
  (0, _inherits2["default"])(BatteryLevel, _Characteristic10);

  var _super10 = _createSuper(BatteryLevel);

  function BatteryLevel() {
    var _this10;

    (0, _classCallCheck2["default"])(this, BatteryLevel);
    _this10 = _super10.call(this, 'Battery Level', BatteryLevel.UUID);

    _this10.setProps({
      format: Formats.UINT8,
      unit: Units.PERCENTAGE,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this10.value = _this10.getDefaultValue();
    return _this10;
  }

  return BatteryLevel;
}(Characteristic);

exports.BatteryLevel = BatteryLevel;
(0, _defineProperty2["default"])(BatteryLevel, "UUID", '00000068-0000-1000-8000-0026BB765291');
Characteristic.BatteryLevel = BatteryLevel;
/**
 * Characteristic "Brightness"
 */

var Brightness = /*#__PURE__*/function (_Characteristic11) {
  (0, _inherits2["default"])(Brightness, _Characteristic11);

  var _super11 = _createSuper(Brightness);

  function Brightness() {
    var _this11;

    (0, _classCallCheck2["default"])(this, Brightness);
    _this11 = _super11.call(this, 'Brightness', Brightness.UUID);

    _this11.setProps({
      format: Formats.INT,
      unit: Units.PERCENTAGE,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this11.value = _this11.getDefaultValue();
    return _this11;
  }

  return Brightness;
}(Characteristic);

exports.Brightness = Brightness;
(0, _defineProperty2["default"])(Brightness, "UUID", '00000008-0000-1000-8000-0026BB765291');
Characteristic.Brightness = Brightness;
/**
 * Characteristic "Carbon Dioxide Detected"
 */

var CarbonDioxideDetected = /*#__PURE__*/function (_Characteristic12) {
  (0, _inherits2["default"])(CarbonDioxideDetected, _Characteristic12);

  var _super12 = _createSuper(CarbonDioxideDetected);

  // The value property of CarbonDioxideDetected must be one of the following:
  function CarbonDioxideDetected() {
    var _this12;

    (0, _classCallCheck2["default"])(this, CarbonDioxideDetected);
    _this12 = _super12.call(this, 'Carbon Dioxide Detected', CarbonDioxideDetected.UUID);

    _this12.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this12.value = _this12.getDefaultValue();
    return _this12;
  }

  return CarbonDioxideDetected;
}(Characteristic);

exports.CarbonDioxideDetected = CarbonDioxideDetected;
(0, _defineProperty2["default"])(CarbonDioxideDetected, "CO2_LEVELS_NORMAL", 0);
(0, _defineProperty2["default"])(CarbonDioxideDetected, "CO2_LEVELS_ABNORMAL", 1);
(0, _defineProperty2["default"])(CarbonDioxideDetected, "UUID", '00000092-0000-1000-8000-0026BB765291');
Characteristic.CarbonDioxideDetected = CarbonDioxideDetected;
/**
 * Characteristic "Carbon Dioxide Level"
 */

var CarbonDioxideLevel = /*#__PURE__*/function (_Characteristic13) {
  (0, _inherits2["default"])(CarbonDioxideLevel, _Characteristic13);

  var _super13 = _createSuper(CarbonDioxideLevel);

  function CarbonDioxideLevel() {
    var _this13;

    (0, _classCallCheck2["default"])(this, CarbonDioxideLevel);
    _this13 = _super13.call(this, 'Carbon Dioxide Level', CarbonDioxideLevel.UUID);

    _this13.setProps({
      format: Formats.FLOAT,
      maxValue: 100000,
      minValue: 0,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this13.value = _this13.getDefaultValue();
    return _this13;
  }

  return CarbonDioxideLevel;
}(Characteristic);

exports.CarbonDioxideLevel = CarbonDioxideLevel;
(0, _defineProperty2["default"])(CarbonDioxideLevel, "UUID", '00000093-0000-1000-8000-0026BB765291');
Characteristic.CarbonDioxideLevel = CarbonDioxideLevel;
/**
 * Characteristic "Carbon Dioxide Peak Level"
 */

var CarbonDioxidePeakLevel = /*#__PURE__*/function (_Characteristic14) {
  (0, _inherits2["default"])(CarbonDioxidePeakLevel, _Characteristic14);

  var _super14 = _createSuper(CarbonDioxidePeakLevel);

  function CarbonDioxidePeakLevel() {
    var _this14;

    (0, _classCallCheck2["default"])(this, CarbonDioxidePeakLevel);
    _this14 = _super14.call(this, 'Carbon Dioxide Peak Level', CarbonDioxidePeakLevel.UUID);

    _this14.setProps({
      format: Formats.FLOAT,
      maxValue: 100000,
      minValue: 0,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this14.value = _this14.getDefaultValue();
    return _this14;
  }

  return CarbonDioxidePeakLevel;
}(Characteristic);

exports.CarbonDioxidePeakLevel = CarbonDioxidePeakLevel;
(0, _defineProperty2["default"])(CarbonDioxidePeakLevel, "UUID", '00000094-0000-1000-8000-0026BB765291');
Characteristic.CarbonDioxidePeakLevel = CarbonDioxidePeakLevel;
/**
 * Characteristic "Carbon Monoxide Detected"
 */

var CarbonMonoxideDetected = /*#__PURE__*/function (_Characteristic15) {
  (0, _inherits2["default"])(CarbonMonoxideDetected, _Characteristic15);

  var _super15 = _createSuper(CarbonMonoxideDetected);

  // The value property of CarbonMonoxideDetected must be one of the following:
  function CarbonMonoxideDetected() {
    var _this15;

    (0, _classCallCheck2["default"])(this, CarbonMonoxideDetected);
    _this15 = _super15.call(this, 'Carbon Monoxide Detected', CarbonMonoxideDetected.UUID);

    _this15.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this15.value = _this15.getDefaultValue();
    return _this15;
  }

  return CarbonMonoxideDetected;
}(Characteristic);

exports.CarbonMonoxideDetected = CarbonMonoxideDetected;
(0, _defineProperty2["default"])(CarbonMonoxideDetected, "CO_LEVELS_NORMAL", 0);
(0, _defineProperty2["default"])(CarbonMonoxideDetected, "CO_LEVELS_ABNORMAL", 1);
(0, _defineProperty2["default"])(CarbonMonoxideDetected, "UUID", '00000069-0000-1000-8000-0026BB765291');
Characteristic.CarbonMonoxideDetected = CarbonMonoxideDetected;
/**
 * Characteristic "Carbon Monoxide Level"
 */

var CarbonMonoxideLevel = /*#__PURE__*/function (_Characteristic16) {
  (0, _inherits2["default"])(CarbonMonoxideLevel, _Characteristic16);

  var _super16 = _createSuper(CarbonMonoxideLevel);

  function CarbonMonoxideLevel() {
    var _this16;

    (0, _classCallCheck2["default"])(this, CarbonMonoxideLevel);
    _this16 = _super16.call(this, 'Carbon Monoxide Level', CarbonMonoxideLevel.UUID);

    _this16.setProps({
      format: Formats.FLOAT,
      maxValue: 100,
      minValue: 0,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this16.value = _this16.getDefaultValue();
    return _this16;
  }

  return CarbonMonoxideLevel;
}(Characteristic);

exports.CarbonMonoxideLevel = CarbonMonoxideLevel;
(0, _defineProperty2["default"])(CarbonMonoxideLevel, "UUID", '00000090-0000-1000-8000-0026BB765291');
Characteristic.CarbonMonoxideLevel = CarbonMonoxideLevel;
/**
 * Characteristic "Carbon Monoxide Peak Level"
 */

var CarbonMonoxidePeakLevel = /*#__PURE__*/function (_Characteristic17) {
  (0, _inherits2["default"])(CarbonMonoxidePeakLevel, _Characteristic17);

  var _super17 = _createSuper(CarbonMonoxidePeakLevel);

  function CarbonMonoxidePeakLevel() {
    var _this17;

    (0, _classCallCheck2["default"])(this, CarbonMonoxidePeakLevel);
    _this17 = _super17.call(this, 'Carbon Monoxide Peak Level', CarbonMonoxidePeakLevel.UUID);

    _this17.setProps({
      format: Formats.FLOAT,
      maxValue: 100,
      minValue: 0,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this17.value = _this17.getDefaultValue();
    return _this17;
  }

  return CarbonMonoxidePeakLevel;
}(Characteristic);

exports.CarbonMonoxidePeakLevel = CarbonMonoxidePeakLevel;
(0, _defineProperty2["default"])(CarbonMonoxidePeakLevel, "UUID", '00000091-0000-1000-8000-0026BB765291');
Characteristic.CarbonMonoxidePeakLevel = CarbonMonoxidePeakLevel;
/**
 * Characteristic "Charging State"
 */

var ChargingState = /*#__PURE__*/function (_Characteristic18) {
  (0, _inherits2["default"])(ChargingState, _Characteristic18);

  var _super18 = _createSuper(ChargingState);

  // The value property of ChargingState must be one of the following:
  function ChargingState() {
    var _this18;

    (0, _classCallCheck2["default"])(this, ChargingState);
    _this18 = _super18.call(this, 'Charging State', ChargingState.UUID);

    _this18.setProps({
      format: Formats.UINT8,
      maxValue: 2,
      minValue: 0,
      validValues: [0, 1, 2],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this18.value = _this18.getDefaultValue();
    return _this18;
  }

  return ChargingState;
}(Characteristic);

exports.ChargingState = ChargingState;
(0, _defineProperty2["default"])(ChargingState, "NOT_CHARGING", 0);
(0, _defineProperty2["default"])(ChargingState, "CHARGING", 1);
(0, _defineProperty2["default"])(ChargingState, "NOT_CHARGEABLE", 2);
(0, _defineProperty2["default"])(ChargingState, "UUID", '0000008F-0000-1000-8000-0026BB765291');
Characteristic.ChargingState = ChargingState;
/**
 * Characteristic "Color Temperature"
 */

var ColorTemperature = /*#__PURE__*/function (_Characteristic19) {
  (0, _inherits2["default"])(ColorTemperature, _Characteristic19);

  var _super19 = _createSuper(ColorTemperature);

  function ColorTemperature() {
    var _this19;

    (0, _classCallCheck2["default"])(this, ColorTemperature);
    _this19 = _super19.call(this, 'Color Temperature', ColorTemperature.UUID);

    _this19.setProps({
      format: Formats.UINT32,
      maxValue: 500,
      minValue: 140,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this19.value = _this19.getDefaultValue();
    return _this19;
  }

  return ColorTemperature;
}(Characteristic);

exports.ColorTemperature = ColorTemperature;
(0, _defineProperty2["default"])(ColorTemperature, "UUID", '000000CE-0000-1000-8000-0026BB765291');
Characteristic.ColorTemperature = ColorTemperature;
/**
 * Characteristic "Contact Sensor State"
 */

var ContactSensorState = /*#__PURE__*/function (_Characteristic20) {
  (0, _inherits2["default"])(ContactSensorState, _Characteristic20);

  var _super20 = _createSuper(ContactSensorState);

  // The value property of ContactSensorState must be one of the following:
  function ContactSensorState() {
    var _this20;

    (0, _classCallCheck2["default"])(this, ContactSensorState);
    _this20 = _super20.call(this, 'Contact Sensor State', ContactSensorState.UUID);

    _this20.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this20.value = _this20.getDefaultValue();
    return _this20;
  }

  return ContactSensorState;
}(Characteristic);

exports.ContactSensorState = ContactSensorState;
(0, _defineProperty2["default"])(ContactSensorState, "CONTACT_DETECTED", 0);
(0, _defineProperty2["default"])(ContactSensorState, "CONTACT_NOT_DETECTED", 1);
(0, _defineProperty2["default"])(ContactSensorState, "UUID", '0000006A-0000-1000-8000-0026BB765291');
Characteristic.ContactSensorState = ContactSensorState;
/**
 * Characteristic "Cooling Threshold Temperature"
 */

var CoolingThresholdTemperature = /*#__PURE__*/function (_Characteristic21) {
  (0, _inherits2["default"])(CoolingThresholdTemperature, _Characteristic21);

  var _super21 = _createSuper(CoolingThresholdTemperature);

  function CoolingThresholdTemperature() {
    var _this21;

    (0, _classCallCheck2["default"])(this, CoolingThresholdTemperature);
    _this21 = _super21.call(this, 'Cooling Threshold Temperature', CoolingThresholdTemperature.UUID);

    _this21.setProps({
      format: Formats.FLOAT,
      unit: Units.CELSIUS,
      maxValue: 35,
      minValue: 10,
      minStep: 0.1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this21.value = _this21.getDefaultValue();
    return _this21;
  }

  return CoolingThresholdTemperature;
}(Characteristic);

exports.CoolingThresholdTemperature = CoolingThresholdTemperature;
(0, _defineProperty2["default"])(CoolingThresholdTemperature, "UUID", '0000000D-0000-1000-8000-0026BB765291');
Characteristic.CoolingThresholdTemperature = CoolingThresholdTemperature;
/**
 * Characteristic "Current Air Purifier State"
 */

var CurrentAirPurifierState = /*#__PURE__*/function (_Characteristic22) {
  (0, _inherits2["default"])(CurrentAirPurifierState, _Characteristic22);

  var _super22 = _createSuper(CurrentAirPurifierState);

  // The value property of CurrentAirPurifierState must be one of the following:
  function CurrentAirPurifierState() {
    var _this22;

    (0, _classCallCheck2["default"])(this, CurrentAirPurifierState);
    _this22 = _super22.call(this, 'Current Air Purifier State', CurrentAirPurifierState.UUID);

    _this22.setProps({
      format: Formats.UINT8,
      maxValue: 2,
      minValue: 0,
      validValues: [0, 1, 2],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this22.value = _this22.getDefaultValue();
    return _this22;
  }

  return CurrentAirPurifierState;
}(Characteristic);

exports.CurrentAirPurifierState = CurrentAirPurifierState;
(0, _defineProperty2["default"])(CurrentAirPurifierState, "INACTIVE", 0);
(0, _defineProperty2["default"])(CurrentAirPurifierState, "IDLE", 1);
(0, _defineProperty2["default"])(CurrentAirPurifierState, "PURIFYING_AIR", 2);
(0, _defineProperty2["default"])(CurrentAirPurifierState, "UUID", '000000A9-0000-1000-8000-0026BB765291');
Characteristic.CurrentAirPurifierState = CurrentAirPurifierState;
/**
 * Characteristic "Current Ambient Light Level"
 */

var CurrentAmbientLightLevel = /*#__PURE__*/function (_Characteristic23) {
  (0, _inherits2["default"])(CurrentAmbientLightLevel, _Characteristic23);

  var _super23 = _createSuper(CurrentAmbientLightLevel);

  function CurrentAmbientLightLevel() {
    var _this23;

    (0, _classCallCheck2["default"])(this, CurrentAmbientLightLevel);
    _this23 = _super23.call(this, 'Current Ambient Light Level', CurrentAmbientLightLevel.UUID);

    _this23.setProps({
      format: Formats.FLOAT,
      unit: Units.LUX,
      maxValue: 100000,
      minValue: 0.0001,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this23.value = _this23.getDefaultValue();
    return _this23;
  }

  return CurrentAmbientLightLevel;
}(Characteristic);

exports.CurrentAmbientLightLevel = CurrentAmbientLightLevel;
(0, _defineProperty2["default"])(CurrentAmbientLightLevel, "UUID", '0000006B-0000-1000-8000-0026BB765291');
Characteristic.CurrentAmbientLightLevel = CurrentAmbientLightLevel;
/**
 * Characteristic "Current Door State"
 */

var CurrentDoorState = /*#__PURE__*/function (_Characteristic24) {
  (0, _inherits2["default"])(CurrentDoorState, _Characteristic24);

  var _super24 = _createSuper(CurrentDoorState);

  // The value property of CurrentDoorState must be one of the following:
  function CurrentDoorState() {
    var _this24;

    (0, _classCallCheck2["default"])(this, CurrentDoorState);
    _this24 = _super24.call(this, 'Current Door State', CurrentDoorState.UUID);

    _this24.setProps({
      format: Formats.UINT8,
      maxValue: 4,
      minValue: 0,
      validValues: [0, 1, 2, 3, 4],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this24.value = _this24.getDefaultValue();
    return _this24;
  }

  return CurrentDoorState;
}(Characteristic);

exports.CurrentDoorState = CurrentDoorState;
(0, _defineProperty2["default"])(CurrentDoorState, "OPEN", 0);
(0, _defineProperty2["default"])(CurrentDoorState, "CLOSED", 1);
(0, _defineProperty2["default"])(CurrentDoorState, "OPENING", 2);
(0, _defineProperty2["default"])(CurrentDoorState, "CLOSING", 3);
(0, _defineProperty2["default"])(CurrentDoorState, "STOPPED", 4);
(0, _defineProperty2["default"])(CurrentDoorState, "UUID", '0000000E-0000-1000-8000-0026BB765291');
Characteristic.CurrentDoorState = CurrentDoorState;
/**
 * Characteristic "Current Fan State"
 */

var CurrentFanState = /*#__PURE__*/function (_Characteristic25) {
  (0, _inherits2["default"])(CurrentFanState, _Characteristic25);

  var _super25 = _createSuper(CurrentFanState);

  // The value property of CurrentFanState must be one of the following:
  function CurrentFanState() {
    var _this25;

    (0, _classCallCheck2["default"])(this, CurrentFanState);
    _this25 = _super25.call(this, 'Current Fan State', CurrentFanState.UUID);

    _this25.setProps({
      format: Formats.UINT8,
      maxValue: 2,
      minValue: 0,
      validValues: [0, 1, 2],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this25.value = _this25.getDefaultValue();
    return _this25;
  }

  return CurrentFanState;
}(Characteristic);

exports.CurrentFanState = CurrentFanState;
(0, _defineProperty2["default"])(CurrentFanState, "INACTIVE", 0);
(0, _defineProperty2["default"])(CurrentFanState, "IDLE", 1);
(0, _defineProperty2["default"])(CurrentFanState, "BLOWING_AIR", 2);
(0, _defineProperty2["default"])(CurrentFanState, "UUID", '000000AF-0000-1000-8000-0026BB765291');
Characteristic.CurrentFanState = CurrentFanState;
/**
 * Characteristic "Current Heater Cooler State"
 */

var CurrentHeaterCoolerState = /*#__PURE__*/function (_Characteristic26) {
  (0, _inherits2["default"])(CurrentHeaterCoolerState, _Characteristic26);

  var _super26 = _createSuper(CurrentHeaterCoolerState);

  // The value property of CurrentHeaterCoolerState must be one of the following:
  function CurrentHeaterCoolerState() {
    var _this26;

    (0, _classCallCheck2["default"])(this, CurrentHeaterCoolerState);
    _this26 = _super26.call(this, 'Current Heater Cooler State', CurrentHeaterCoolerState.UUID);

    _this26.setProps({
      format: Formats.UINT8,
      maxValue: 3,
      minValue: 0,
      validValues: [0, 1, 2, 3],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this26.value = _this26.getDefaultValue();
    return _this26;
  }

  return CurrentHeaterCoolerState;
}(Characteristic);

exports.CurrentHeaterCoolerState = CurrentHeaterCoolerState;
(0, _defineProperty2["default"])(CurrentHeaterCoolerState, "INACTIVE", 0);
(0, _defineProperty2["default"])(CurrentHeaterCoolerState, "IDLE", 1);
(0, _defineProperty2["default"])(CurrentHeaterCoolerState, "HEATING", 2);
(0, _defineProperty2["default"])(CurrentHeaterCoolerState, "COOLING", 3);
(0, _defineProperty2["default"])(CurrentHeaterCoolerState, "UUID", '000000B1-0000-1000-8000-0026BB765291');
Characteristic.CurrentHeaterCoolerState = CurrentHeaterCoolerState;
/**
 * Characteristic "Current Heating Cooling State"
 */

var CurrentHeatingCoolingState = /*#__PURE__*/function (_Characteristic27) {
  (0, _inherits2["default"])(CurrentHeatingCoolingState, _Characteristic27);

  var _super27 = _createSuper(CurrentHeatingCoolingState);

  // The value property of CurrentHeatingCoolingState must be one of the following:
  function CurrentHeatingCoolingState() {
    var _this27;

    (0, _classCallCheck2["default"])(this, CurrentHeatingCoolingState);
    _this27 = _super27.call(this, 'Current Heating Cooling State', CurrentHeatingCoolingState.UUID);

    _this27.setProps({
      format: Formats.UINT8,
      maxValue: 2,
      minValue: 0,
      validValues: [0, 1, 2],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this27.value = _this27.getDefaultValue();
    return _this27;
  }

  return CurrentHeatingCoolingState;
}(Characteristic);

exports.CurrentHeatingCoolingState = CurrentHeatingCoolingState;
(0, _defineProperty2["default"])(CurrentHeatingCoolingState, "OFF", 0);
(0, _defineProperty2["default"])(CurrentHeatingCoolingState, "HEAT", 1);
(0, _defineProperty2["default"])(CurrentHeatingCoolingState, "COOL", 2);
(0, _defineProperty2["default"])(CurrentHeatingCoolingState, "UUID", '0000000F-0000-1000-8000-0026BB765291');
Characteristic.CurrentHeatingCoolingState = CurrentHeatingCoolingState;
/**
 * Characteristic "Current Horizontal Tilt Angle"
 */

var CurrentHorizontalTiltAngle = /*#__PURE__*/function (_Characteristic28) {
  (0, _inherits2["default"])(CurrentHorizontalTiltAngle, _Characteristic28);

  var _super28 = _createSuper(CurrentHorizontalTiltAngle);

  function CurrentHorizontalTiltAngle() {
    var _this28;

    (0, _classCallCheck2["default"])(this, CurrentHorizontalTiltAngle);
    _this28 = _super28.call(this, 'Current Horizontal Tilt Angle', CurrentHorizontalTiltAngle.UUID);

    _this28.setProps({
      format: Formats.INT,
      unit: Units.ARC_DEGREE,
      maxValue: 90,
      minValue: -90,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this28.value = _this28.getDefaultValue();
    return _this28;
  }

  return CurrentHorizontalTiltAngle;
}(Characteristic);

exports.CurrentHorizontalTiltAngle = CurrentHorizontalTiltAngle;
(0, _defineProperty2["default"])(CurrentHorizontalTiltAngle, "UUID", '0000006C-0000-1000-8000-0026BB765291');
Characteristic.CurrentHorizontalTiltAngle = CurrentHorizontalTiltAngle;
/**
 * Characteristic "Current Humidifier Dehumidifier State"
 */

var CurrentHumidifierDehumidifierState = /*#__PURE__*/function (_Characteristic29) {
  (0, _inherits2["default"])(CurrentHumidifierDehumidifierState, _Characteristic29);

  var _super29 = _createSuper(CurrentHumidifierDehumidifierState);

  // The value property of CurrentHumidifierDehumidifierState must be one of the following:
  function CurrentHumidifierDehumidifierState() {
    var _this29;

    (0, _classCallCheck2["default"])(this, CurrentHumidifierDehumidifierState);
    _this29 = _super29.call(this, 'Current Humidifier Dehumidifier State', CurrentHumidifierDehumidifierState.UUID);

    _this29.setProps({
      format: Formats.UINT8,
      maxValue: 3,
      minValue: 0,
      validValues: [0, 1, 2, 3],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this29.value = _this29.getDefaultValue();
    return _this29;
  }

  return CurrentHumidifierDehumidifierState;
}(Characteristic);

exports.CurrentHumidifierDehumidifierState = CurrentHumidifierDehumidifierState;
(0, _defineProperty2["default"])(CurrentHumidifierDehumidifierState, "INACTIVE", 0);
(0, _defineProperty2["default"])(CurrentHumidifierDehumidifierState, "IDLE", 1);
(0, _defineProperty2["default"])(CurrentHumidifierDehumidifierState, "HUMIDIFYING", 2);
(0, _defineProperty2["default"])(CurrentHumidifierDehumidifierState, "DEHUMIDIFYING", 3);
(0, _defineProperty2["default"])(CurrentHumidifierDehumidifierState, "UUID", '000000B3-0000-1000-8000-0026BB765291');
Characteristic.CurrentHumidifierDehumidifierState = CurrentHumidifierDehumidifierState;
/**
 * Characteristic "Current Position"
 */

var CurrentPosition = /*#__PURE__*/function (_Characteristic30) {
  (0, _inherits2["default"])(CurrentPosition, _Characteristic30);

  var _super30 = _createSuper(CurrentPosition);

  function CurrentPosition() {
    var _this30;

    (0, _classCallCheck2["default"])(this, CurrentPosition);
    _this30 = _super30.call(this, 'Current Position', CurrentPosition.UUID);

    _this30.setProps({
      format: Formats.UINT8,
      unit: Units.PERCENTAGE,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this30.value = _this30.getDefaultValue();
    return _this30;
  }

  return CurrentPosition;
}(Characteristic);

exports.CurrentPosition = CurrentPosition;
(0, _defineProperty2["default"])(CurrentPosition, "UUID", '0000006D-0000-1000-8000-0026BB765291');
Characteristic.CurrentPosition = CurrentPosition;
/**
 * Characteristic "Current Relative Humidity"
 */

var CurrentRelativeHumidity = /*#__PURE__*/function (_Characteristic31) {
  (0, _inherits2["default"])(CurrentRelativeHumidity, _Characteristic31);

  var _super31 = _createSuper(CurrentRelativeHumidity);

  function CurrentRelativeHumidity() {
    var _this31;

    (0, _classCallCheck2["default"])(this, CurrentRelativeHumidity);
    _this31 = _super31.call(this, 'Current Relative Humidity', CurrentRelativeHumidity.UUID);

    _this31.setProps({
      format: Formats.FLOAT,
      unit: Units.PERCENTAGE,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this31.value = _this31.getDefaultValue();
    return _this31;
  }

  return CurrentRelativeHumidity;
}(Characteristic);

exports.CurrentRelativeHumidity = CurrentRelativeHumidity;
(0, _defineProperty2["default"])(CurrentRelativeHumidity, "UUID", '00000010-0000-1000-8000-0026BB765291');
Characteristic.CurrentRelativeHumidity = CurrentRelativeHumidity;
/**
 * Characteristic "Current Slat State"
 */

var CurrentSlatState = /*#__PURE__*/function (_Characteristic32) {
  (0, _inherits2["default"])(CurrentSlatState, _Characteristic32);

  var _super32 = _createSuper(CurrentSlatState);

  // The value property of CurrentSlatState must be one of the following:
  function CurrentSlatState() {
    var _this32;

    (0, _classCallCheck2["default"])(this, CurrentSlatState);
    _this32 = _super32.call(this, 'Current Slat State', CurrentSlatState.UUID);

    _this32.setProps({
      format: Formats.UINT8,
      maxValue: 2,
      minValue: 0,
      validValues: [0, 1, 2],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this32.value = _this32.getDefaultValue();
    return _this32;
  }

  return CurrentSlatState;
}(Characteristic);

exports.CurrentSlatState = CurrentSlatState;
(0, _defineProperty2["default"])(CurrentSlatState, "FIXED", 0);
(0, _defineProperty2["default"])(CurrentSlatState, "JAMMED", 1);
(0, _defineProperty2["default"])(CurrentSlatState, "SWINGING", 2);
(0, _defineProperty2["default"])(CurrentSlatState, "UUID", '000000AA-0000-1000-8000-0026BB765291');
Characteristic.CurrentSlatState = CurrentSlatState;
/**
 * Characteristic "Current Temperature"
 */

var CurrentTemperature = /*#__PURE__*/function (_Characteristic33) {
  (0, _inherits2["default"])(CurrentTemperature, _Characteristic33);

  var _super33 = _createSuper(CurrentTemperature);

  function CurrentTemperature() {
    var _this33;

    (0, _classCallCheck2["default"])(this, CurrentTemperature);
    _this33 = _super33.call(this, 'Current Temperature', CurrentTemperature.UUID);

    _this33.setProps({
      format: Formats.FLOAT,
      unit: Units.CELSIUS,
      maxValue: 100,
      minValue: 0,
      minStep: 0.1,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this33.value = _this33.getDefaultValue();
    return _this33;
  }

  return CurrentTemperature;
}(Characteristic);

exports.CurrentTemperature = CurrentTemperature;
(0, _defineProperty2["default"])(CurrentTemperature, "UUID", '00000011-0000-1000-8000-0026BB765291');
Characteristic.CurrentTemperature = CurrentTemperature;
/**
 * Characteristic "Current Tilt Angle"
 */

var CurrentTiltAngle = /*#__PURE__*/function (_Characteristic34) {
  (0, _inherits2["default"])(CurrentTiltAngle, _Characteristic34);

  var _super34 = _createSuper(CurrentTiltAngle);

  function CurrentTiltAngle() {
    var _this34;

    (0, _classCallCheck2["default"])(this, CurrentTiltAngle);
    _this34 = _super34.call(this, 'Current Tilt Angle', CurrentTiltAngle.UUID);

    _this34.setProps({
      format: Formats.INT,
      unit: Units.ARC_DEGREE,
      maxValue: 90,
      minValue: -90,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this34.value = _this34.getDefaultValue();
    return _this34;
  }

  return CurrentTiltAngle;
}(Characteristic);

exports.CurrentTiltAngle = CurrentTiltAngle;
(0, _defineProperty2["default"])(CurrentTiltAngle, "UUID", '000000C1-0000-1000-8000-0026BB765291');
Characteristic.CurrentTiltAngle = CurrentTiltAngle;
/**
 * Characteristic "Current Vertical Tilt Angle"
 */

var CurrentVerticalTiltAngle = /*#__PURE__*/function (_Characteristic35) {
  (0, _inherits2["default"])(CurrentVerticalTiltAngle, _Characteristic35);

  var _super35 = _createSuper(CurrentVerticalTiltAngle);

  function CurrentVerticalTiltAngle() {
    var _this35;

    (0, _classCallCheck2["default"])(this, CurrentVerticalTiltAngle);
    _this35 = _super35.call(this, 'Current Vertical Tilt Angle', CurrentVerticalTiltAngle.UUID);

    _this35.setProps({
      format: Formats.INT,
      unit: Units.ARC_DEGREE,
      maxValue: 90,
      minValue: -90,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this35.value = _this35.getDefaultValue();
    return _this35;
  }

  return CurrentVerticalTiltAngle;
}(Characteristic);

exports.CurrentVerticalTiltAngle = CurrentVerticalTiltAngle;
(0, _defineProperty2["default"])(CurrentVerticalTiltAngle, "UUID", '0000006E-0000-1000-8000-0026BB765291');
Characteristic.CurrentVerticalTiltAngle = CurrentVerticalTiltAngle;
/**
 * Characteristic "Digital Zoom"
 */

var DigitalZoom = /*#__PURE__*/function (_Characteristic36) {
  (0, _inherits2["default"])(DigitalZoom, _Characteristic36);

  var _super36 = _createSuper(DigitalZoom);

  function DigitalZoom() {
    var _this36;

    (0, _classCallCheck2["default"])(this, DigitalZoom);
    _this36 = _super36.call(this, 'Digital Zoom', DigitalZoom.UUID);

    _this36.setProps({
      format: Formats.FLOAT,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this36.value = _this36.getDefaultValue();
    return _this36;
  }

  return DigitalZoom;
}(Characteristic);

exports.DigitalZoom = DigitalZoom;
(0, _defineProperty2["default"])(DigitalZoom, "UUID", '0000011D-0000-1000-8000-0026BB765291');
Characteristic.DigitalZoom = DigitalZoom;
/**
 * Characteristic "Filter Change Indication"
 */

var FilterChangeIndication = /*#__PURE__*/function (_Characteristic37) {
  (0, _inherits2["default"])(FilterChangeIndication, _Characteristic37);

  var _super37 = _createSuper(FilterChangeIndication);

  // The value property of FilterChangeIndication must be one of the following:
  function FilterChangeIndication() {
    var _this37;

    (0, _classCallCheck2["default"])(this, FilterChangeIndication);
    _this37 = _super37.call(this, 'Filter Change Indication', FilterChangeIndication.UUID);

    _this37.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this37.value = _this37.getDefaultValue();
    return _this37;
  }

  return FilterChangeIndication;
}(Characteristic);

exports.FilterChangeIndication = FilterChangeIndication;
(0, _defineProperty2["default"])(FilterChangeIndication, "FILTER_OK", 0);
(0, _defineProperty2["default"])(FilterChangeIndication, "CHANGE_FILTER", 1);
(0, _defineProperty2["default"])(FilterChangeIndication, "UUID", '000000AC-0000-1000-8000-0026BB765291');
Characteristic.FilterChangeIndication = FilterChangeIndication;
/**
 * Characteristic "Filter Life Level"
 */

var FilterLifeLevel = /*#__PURE__*/function (_Characteristic38) {
  (0, _inherits2["default"])(FilterLifeLevel, _Characteristic38);

  var _super38 = _createSuper(FilterLifeLevel);

  function FilterLifeLevel() {
    var _this38;

    (0, _classCallCheck2["default"])(this, FilterLifeLevel);
    _this38 = _super38.call(this, 'Filter Life Level', FilterLifeLevel.UUID);

    _this38.setProps({
      format: Formats.FLOAT,
      maxValue: 100,
      minValue: 0,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this38.value = _this38.getDefaultValue();
    return _this38;
  }

  return FilterLifeLevel;
}(Characteristic);

exports.FilterLifeLevel = FilterLifeLevel;
(0, _defineProperty2["default"])(FilterLifeLevel, "UUID", '000000AB-0000-1000-8000-0026BB765291');
Characteristic.FilterLifeLevel = FilterLifeLevel;
/**
 * Characteristic "Firmware Revision"
 */

var FirmwareRevision = /*#__PURE__*/function (_Characteristic39) {
  (0, _inherits2["default"])(FirmwareRevision, _Characteristic39);

  var _super39 = _createSuper(FirmwareRevision);

  function FirmwareRevision() {
    var _this39;

    (0, _classCallCheck2["default"])(this, FirmwareRevision);
    _this39 = _super39.call(this, 'Firmware Revision', FirmwareRevision.UUID);

    _this39.setProps({
      format: Formats.STRING,
      perms: [Perms.READ]
    });

    _this39.value = _this39.getDefaultValue();
    return _this39;
  }

  return FirmwareRevision;
}(Characteristic);

exports.FirmwareRevision = FirmwareRevision;
(0, _defineProperty2["default"])(FirmwareRevision, "UUID", '00000052-0000-1000-8000-0026BB765291');
Characteristic.FirmwareRevision = FirmwareRevision;
/**
 * Characteristic "Hardware Revision"
 */

var HardwareRevision = /*#__PURE__*/function (_Characteristic40) {
  (0, _inherits2["default"])(HardwareRevision, _Characteristic40);

  var _super40 = _createSuper(HardwareRevision);

  function HardwareRevision() {
    var _this40;

    (0, _classCallCheck2["default"])(this, HardwareRevision);
    _this40 = _super40.call(this, 'Hardware Revision', HardwareRevision.UUID);

    _this40.setProps({
      format: Formats.STRING,
      perms: [Perms.READ]
    });

    _this40.value = _this40.getDefaultValue();
    return _this40;
  }

  return HardwareRevision;
}(Characteristic);

exports.HardwareRevision = HardwareRevision;
(0, _defineProperty2["default"])(HardwareRevision, "UUID", '00000053-0000-1000-8000-0026BB765291');
Characteristic.HardwareRevision = HardwareRevision;
/**
 * Characteristic "Heating Threshold Temperature"
 */

var HeatingThresholdTemperature = /*#__PURE__*/function (_Characteristic41) {
  (0, _inherits2["default"])(HeatingThresholdTemperature, _Characteristic41);

  var _super41 = _createSuper(HeatingThresholdTemperature);

  function HeatingThresholdTemperature() {
    var _this41;

    (0, _classCallCheck2["default"])(this, HeatingThresholdTemperature);
    _this41 = _super41.call(this, 'Heating Threshold Temperature', HeatingThresholdTemperature.UUID);

    _this41.setProps({
      format: Formats.FLOAT,
      unit: Units.CELSIUS,
      maxValue: 25,
      minValue: 0,
      minStep: 0.1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this41.value = _this41.getDefaultValue();
    return _this41;
  }

  return HeatingThresholdTemperature;
}(Characteristic);

exports.HeatingThresholdTemperature = HeatingThresholdTemperature;
(0, _defineProperty2["default"])(HeatingThresholdTemperature, "UUID", '00000012-0000-1000-8000-0026BB765291');
Characteristic.HeatingThresholdTemperature = HeatingThresholdTemperature;
/**
 * Characteristic "Hold Position"
 */

var HoldPosition = /*#__PURE__*/function (_Characteristic42) {
  (0, _inherits2["default"])(HoldPosition, _Characteristic42);

  var _super42 = _createSuper(HoldPosition);

  function HoldPosition() {
    var _this42;

    (0, _classCallCheck2["default"])(this, HoldPosition);
    _this42 = _super42.call(this, 'Hold Position', HoldPosition.UUID);

    _this42.setProps({
      format: Formats.BOOL,
      perms: [Perms.WRITE]
    });

    _this42.value = _this42.getDefaultValue();
    return _this42;
  }

  return HoldPosition;
}(Characteristic);

exports.HoldPosition = HoldPosition;
(0, _defineProperty2["default"])(HoldPosition, "UUID", '0000006F-0000-1000-8000-0026BB765291');
Characteristic.HoldPosition = HoldPosition;
/**
 * Characteristic "Hue"
 */

var Hue = /*#__PURE__*/function (_Characteristic43) {
  (0, _inherits2["default"])(Hue, _Characteristic43);

  var _super43 = _createSuper(Hue);

  function Hue() {
    var _this43;

    (0, _classCallCheck2["default"])(this, Hue);
    _this43 = _super43.call(this, 'Hue', Hue.UUID);

    _this43.setProps({
      format: Formats.FLOAT,
      unit: Units.ARC_DEGREE,
      maxValue: 360,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this43.value = _this43.getDefaultValue();
    return _this43;
  }

  return Hue;
}(Characteristic);

exports.Hue = Hue;
(0, _defineProperty2["default"])(Hue, "UUID", '00000013-0000-1000-8000-0026BB765291');
Characteristic.Hue = Hue;
/**
 * Characteristic "Identify"
 */

var Identify = /*#__PURE__*/function (_Characteristic44) {
  (0, _inherits2["default"])(Identify, _Characteristic44);

  var _super44 = _createSuper(Identify);

  function Identify() {
    var _this44;

    (0, _classCallCheck2["default"])(this, Identify);
    _this44 = _super44.call(this, 'Identify', Identify.UUID);

    _this44.setProps({
      format: Formats.BOOL,
      perms: [Perms.WRITE]
    });

    _this44.value = _this44.getDefaultValue();
    return _this44;
  }

  return Identify;
}(Characteristic);

exports.Identify = Identify;
(0, _defineProperty2["default"])(Identify, "UUID", '00000014-0000-1000-8000-0026BB765291');
Characteristic.Identify = Identify;
/**
 * Characteristic "Image Mirroring"
 */

var ImageMirroring = /*#__PURE__*/function (_Characteristic45) {
  (0, _inherits2["default"])(ImageMirroring, _Characteristic45);

  var _super45 = _createSuper(ImageMirroring);

  function ImageMirroring() {
    var _this45;

    (0, _classCallCheck2["default"])(this, ImageMirroring);
    _this45 = _super45.call(this, 'Image Mirroring', ImageMirroring.UUID);

    _this45.setProps({
      format: Formats.BOOL,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this45.value = _this45.getDefaultValue();
    return _this45;
  }

  return ImageMirroring;
}(Characteristic);

exports.ImageMirroring = ImageMirroring;
(0, _defineProperty2["default"])(ImageMirroring, "UUID", '0000011F-0000-1000-8000-0026BB765291');
Characteristic.ImageMirroring = ImageMirroring;
/**
 * Characteristic "Image Rotation"
 */

var ImageRotation = /*#__PURE__*/function (_Characteristic46) {
  (0, _inherits2["default"])(ImageRotation, _Characteristic46);

  var _super46 = _createSuper(ImageRotation);

  function ImageRotation() {
    var _this46;

    (0, _classCallCheck2["default"])(this, ImageRotation);
    _this46 = _super46.call(this, 'Image Rotation', ImageRotation.UUID);

    _this46.setProps({
      format: Formats.FLOAT,
      unit: Units.ARC_DEGREE,
      maxValue: 270,
      minValue: 0,
      minStep: 90,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this46.value = _this46.getDefaultValue();
    return _this46;
  }

  return ImageRotation;
}(Characteristic);

exports.ImageRotation = ImageRotation;
(0, _defineProperty2["default"])(ImageRotation, "UUID", '0000011E-0000-1000-8000-0026BB765291');
Characteristic.ImageRotation = ImageRotation;
/**
 * Characteristic "In Use"
 */

var InUse = /*#__PURE__*/function (_Characteristic47) {
  (0, _inherits2["default"])(InUse, _Characteristic47);

  var _super47 = _createSuper(InUse);

  // The value property of InUse must be one of the following:
  function InUse() {
    var _this47;

    (0, _classCallCheck2["default"])(this, InUse);
    _this47 = _super47.call(this, 'In Use', InUse.UUID);

    _this47.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this47.value = _this47.getDefaultValue();
    return _this47;
  }

  return InUse;
}(Characteristic);

exports.InUse = InUse;
(0, _defineProperty2["default"])(InUse, "NOT_IN_USE", 0);
(0, _defineProperty2["default"])(InUse, "IN_USE", 1);
(0, _defineProperty2["default"])(InUse, "UUID", '000000D2-0000-1000-8000-0026BB765291');
Characteristic.InUse = InUse;
/**
 * Characteristic "Is Configured"
 */

var IsConfigured = /*#__PURE__*/function (_Characteristic48) {
  (0, _inherits2["default"])(IsConfigured, _Characteristic48);

  var _super48 = _createSuper(IsConfigured);

  // The value property of IsConfigured must be one of the following:
  function IsConfigured() {
    var _this48;

    (0, _classCallCheck2["default"])(this, IsConfigured);
    _this48 = _super48.call(this, 'Is Configured', IsConfigured.UUID);

    _this48.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this48.value = _this48.getDefaultValue();
    return _this48;
  }

  return IsConfigured;
}(Characteristic);

exports.IsConfigured = IsConfigured;
(0, _defineProperty2["default"])(IsConfigured, "NOT_CONFIGURED", 0);
(0, _defineProperty2["default"])(IsConfigured, "CONFIGURED", 1);
(0, _defineProperty2["default"])(IsConfigured, "UUID", '000000D6-0000-1000-8000-0026BB765291');
Characteristic.IsConfigured = IsConfigured;
/**
 * Characteristic "Leak Detected"
 */

var LeakDetected = /*#__PURE__*/function (_Characteristic49) {
  (0, _inherits2["default"])(LeakDetected, _Characteristic49);

  var _super49 = _createSuper(LeakDetected);

  // The value property of LeakDetected must be one of the following:
  function LeakDetected() {
    var _this49;

    (0, _classCallCheck2["default"])(this, LeakDetected);
    _this49 = _super49.call(this, 'Leak Detected', LeakDetected.UUID);

    _this49.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this49.value = _this49.getDefaultValue();
    return _this49;
  }

  return LeakDetected;
}(Characteristic);

exports.LeakDetected = LeakDetected;
(0, _defineProperty2["default"])(LeakDetected, "LEAK_NOT_DETECTED", 0);
(0, _defineProperty2["default"])(LeakDetected, "LEAK_DETECTED", 1);
(0, _defineProperty2["default"])(LeakDetected, "UUID", '00000070-0000-1000-8000-0026BB765291');
Characteristic.LeakDetected = LeakDetected;
/**
 * Characteristic "Lock Control Point"
 */

var LockControlPoint = /*#__PURE__*/function (_Characteristic50) {
  (0, _inherits2["default"])(LockControlPoint, _Characteristic50);

  var _super50 = _createSuper(LockControlPoint);

  function LockControlPoint() {
    var _this50;

    (0, _classCallCheck2["default"])(this, LockControlPoint);
    _this50 = _super50.call(this, 'Lock Control Point', LockControlPoint.UUID);

    _this50.setProps({
      format: Formats.TLV8,
      perms: [Perms.WRITE]
    });

    _this50.value = _this50.getDefaultValue();
    return _this50;
  }

  return LockControlPoint;
}(Characteristic);

exports.LockControlPoint = LockControlPoint;
(0, _defineProperty2["default"])(LockControlPoint, "UUID", '00000019-0000-1000-8000-0026BB765291');
Characteristic.LockControlPoint = LockControlPoint;
/**
 * Characteristic "Lock Current State"
 */

var LockCurrentState = /*#__PURE__*/function (_Characteristic51) {
  (0, _inherits2["default"])(LockCurrentState, _Characteristic51);

  var _super51 = _createSuper(LockCurrentState);

  // The value property of LockCurrentState must be one of the following:
  function LockCurrentState() {
    var _this51;

    (0, _classCallCheck2["default"])(this, LockCurrentState);
    _this51 = _super51.call(this, 'Lock Current State', LockCurrentState.UUID);

    _this51.setProps({
      format: Formats.UINT8,
      maxValue: 3,
      minValue: 0,
      validValues: [0, 1, 2, 3],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this51.value = _this51.getDefaultValue();
    return _this51;
  }

  return LockCurrentState;
}(Characteristic);

exports.LockCurrentState = LockCurrentState;
(0, _defineProperty2["default"])(LockCurrentState, "UNSECURED", 0);
(0, _defineProperty2["default"])(LockCurrentState, "SECURED", 1);
(0, _defineProperty2["default"])(LockCurrentState, "JAMMED", 2);
(0, _defineProperty2["default"])(LockCurrentState, "UNKNOWN", 3);
(0, _defineProperty2["default"])(LockCurrentState, "UUID", '0000001D-0000-1000-8000-0026BB765291');
Characteristic.LockCurrentState = LockCurrentState;
/**
 * Characteristic "Lock Last Known Action"
 */

var LockLastKnownAction = /*#__PURE__*/function (_Characteristic52) {
  (0, _inherits2["default"])(LockLastKnownAction, _Characteristic52);

  var _super52 = _createSuper(LockLastKnownAction);

  // The value property of LockLastKnownAction must be one of the following:
  function LockLastKnownAction() {
    var _this52;

    (0, _classCallCheck2["default"])(this, LockLastKnownAction);
    _this52 = _super52.call(this, 'Lock Last Known Action', LockLastKnownAction.UUID);

    _this52.setProps({
      format: Formats.UINT8,
      maxValue: 8,
      minValue: 0,
      validValues: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this52.value = _this52.getDefaultValue();
    return _this52;
  }

  return LockLastKnownAction;
}(Characteristic);

exports.LockLastKnownAction = LockLastKnownAction;
(0, _defineProperty2["default"])(LockLastKnownAction, "SECURED_PHYSICALLY_INTERIOR", 0);
(0, _defineProperty2["default"])(LockLastKnownAction, "UNSECURED_PHYSICALLY_INTERIOR", 1);
(0, _defineProperty2["default"])(LockLastKnownAction, "SECURED_PHYSICALLY_EXTERIOR", 2);
(0, _defineProperty2["default"])(LockLastKnownAction, "UNSECURED_PHYSICALLY_EXTERIOR", 3);
(0, _defineProperty2["default"])(LockLastKnownAction, "SECURED_BY_KEYPAD", 4);
(0, _defineProperty2["default"])(LockLastKnownAction, "UNSECURED_BY_KEYPAD", 5);
(0, _defineProperty2["default"])(LockLastKnownAction, "SECURED_REMOTELY", 6);
(0, _defineProperty2["default"])(LockLastKnownAction, "UNSECURED_REMOTELY", 7);
(0, _defineProperty2["default"])(LockLastKnownAction, "SECURED_BY_AUTO_SECURE_TIMEOUT", 8);
(0, _defineProperty2["default"])(LockLastKnownAction, "UUID", '0000001C-0000-1000-8000-0026BB765291');
Characteristic.LockLastKnownAction = LockLastKnownAction;
/**
 * Characteristic "Lock Management Auto Security Timeout"
 */

var LockManagementAutoSecurityTimeout = /*#__PURE__*/function (_Characteristic53) {
  (0, _inherits2["default"])(LockManagementAutoSecurityTimeout, _Characteristic53);

  var _super53 = _createSuper(LockManagementAutoSecurityTimeout);

  function LockManagementAutoSecurityTimeout() {
    var _this53;

    (0, _classCallCheck2["default"])(this, LockManagementAutoSecurityTimeout);
    _this53 = _super53.call(this, 'Lock Management Auto Security Timeout', LockManagementAutoSecurityTimeout.UUID);

    _this53.setProps({
      format: Formats.UINT32,
      unit: Units.SECONDS,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this53.value = _this53.getDefaultValue();
    return _this53;
  }

  return LockManagementAutoSecurityTimeout;
}(Characteristic);

exports.LockManagementAutoSecurityTimeout = LockManagementAutoSecurityTimeout;
(0, _defineProperty2["default"])(LockManagementAutoSecurityTimeout, "UUID", '0000001A-0000-1000-8000-0026BB765291');
Characteristic.LockManagementAutoSecurityTimeout = LockManagementAutoSecurityTimeout;
/**
 * Characteristic "Lock Physical Controls"
 */

var LockPhysicalControls = /*#__PURE__*/function (_Characteristic54) {
  (0, _inherits2["default"])(LockPhysicalControls, _Characteristic54);

  var _super54 = _createSuper(LockPhysicalControls);

  // The value property of LockPhysicalControls must be one of the following:
  function LockPhysicalControls() {
    var _this54;

    (0, _classCallCheck2["default"])(this, LockPhysicalControls);
    _this54 = _super54.call(this, 'Lock Physical Controls', LockPhysicalControls.UUID);

    _this54.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this54.value = _this54.getDefaultValue();
    return _this54;
  }

  return LockPhysicalControls;
}(Characteristic);

exports.LockPhysicalControls = LockPhysicalControls;
(0, _defineProperty2["default"])(LockPhysicalControls, "CONTROL_LOCK_DISABLED", 0);
(0, _defineProperty2["default"])(LockPhysicalControls, "CONTROL_LOCK_ENABLED", 1);
(0, _defineProperty2["default"])(LockPhysicalControls, "UUID", '000000A7-0000-1000-8000-0026BB765291');
Characteristic.LockPhysicalControls = LockPhysicalControls;
/**
 * Characteristic "Lock Target State"
 */

var LockTargetState = /*#__PURE__*/function (_Characteristic55) {
  (0, _inherits2["default"])(LockTargetState, _Characteristic55);

  var _super55 = _createSuper(LockTargetState);

  // The value property of LockTargetState must be one of the following:
  function LockTargetState() {
    var _this55;

    (0, _classCallCheck2["default"])(this, LockTargetState);
    _this55 = _super55.call(this, 'Lock Target State', LockTargetState.UUID);

    _this55.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this55.value = _this55.getDefaultValue();
    return _this55;
  }

  return LockTargetState;
}(Characteristic);

exports.LockTargetState = LockTargetState;
(0, _defineProperty2["default"])(LockTargetState, "UNSECURED", 0);
(0, _defineProperty2["default"])(LockTargetState, "SECURED", 1);
(0, _defineProperty2["default"])(LockTargetState, "UUID", '0000001E-0000-1000-8000-0026BB765291');
Characteristic.LockTargetState = LockTargetState;
/**
 * Characteristic "Logs"
 */

var Logs = /*#__PURE__*/function (_Characteristic56) {
  (0, _inherits2["default"])(Logs, _Characteristic56);

  var _super56 = _createSuper(Logs);

  function Logs() {
    var _this56;

    (0, _classCallCheck2["default"])(this, Logs);
    _this56 = _super56.call(this, 'Logs', Logs.UUID);

    _this56.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this56.value = _this56.getDefaultValue();
    return _this56;
  }

  return Logs;
}(Characteristic);

exports.Logs = Logs;
(0, _defineProperty2["default"])(Logs, "UUID", '0000001F-0000-1000-8000-0026BB765291');
Characteristic.Logs = Logs;
/**
 * Characteristic "Manufacturer"
 */

var Manufacturer = /*#__PURE__*/function (_Characteristic57) {
  (0, _inherits2["default"])(Manufacturer, _Characteristic57);

  var _super57 = _createSuper(Manufacturer);

  function Manufacturer() {
    var _this57;

    (0, _classCallCheck2["default"])(this, Manufacturer);
    _this57 = _super57.call(this, 'Manufacturer', Manufacturer.UUID);

    _this57.setProps({
      format: Formats.STRING,
      perms: [Perms.READ]
    });

    _this57.value = _this57.getDefaultValue();
    return _this57;
  }

  return Manufacturer;
}(Characteristic);

exports.Manufacturer = Manufacturer;
(0, _defineProperty2["default"])(Manufacturer, "UUID", '00000020-0000-1000-8000-0026BB765291');
Characteristic.Manufacturer = Manufacturer;
/**
 * Characteristic "Model"
 */

var Model = /*#__PURE__*/function (_Characteristic58) {
  (0, _inherits2["default"])(Model, _Characteristic58);

  var _super58 = _createSuper(Model);

  function Model() {
    var _this58;

    (0, _classCallCheck2["default"])(this, Model);
    _this58 = _super58.call(this, 'Model', Model.UUID);

    _this58.setProps({
      format: Formats.STRING,
      perms: [Perms.READ]
    });

    _this58.value = _this58.getDefaultValue();
    return _this58;
  }

  return Model;
}(Characteristic);

exports.Model = Model;
(0, _defineProperty2["default"])(Model, "UUID", '00000021-0000-1000-8000-0026BB765291');
Characteristic.Model = Model;
/**
 * Characteristic "Motion Detected"
 */

var MotionDetected = /*#__PURE__*/function (_Characteristic59) {
  (0, _inherits2["default"])(MotionDetected, _Characteristic59);

  var _super59 = _createSuper(MotionDetected);

  function MotionDetected() {
    var _this59;

    (0, _classCallCheck2["default"])(this, MotionDetected);
    _this59 = _super59.call(this, 'Motion Detected', MotionDetected.UUID);

    _this59.setProps({
      format: Formats.BOOL,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this59.value = _this59.getDefaultValue();
    return _this59;
  }

  return MotionDetected;
}(Characteristic);

exports.MotionDetected = MotionDetected;
(0, _defineProperty2["default"])(MotionDetected, "UUID", '00000022-0000-1000-8000-0026BB765291');
Characteristic.MotionDetected = MotionDetected;
/**
 * Characteristic "Mute"
 */

var Mute = /*#__PURE__*/function (_Characteristic60) {
  (0, _inherits2["default"])(Mute, _Characteristic60);

  var _super60 = _createSuper(Mute);

  function Mute() {
    var _this60;

    (0, _classCallCheck2["default"])(this, Mute);
    _this60 = _super60.call(this, 'Mute', Mute.UUID);

    _this60.setProps({
      format: Formats.BOOL,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this60.value = _this60.getDefaultValue();
    return _this60;
  }

  return Mute;
}(Characteristic);

exports.Mute = Mute;
(0, _defineProperty2["default"])(Mute, "UUID", '0000011A-0000-1000-8000-0026BB765291');
Characteristic.Mute = Mute;
/**
 * Characteristic "Name"
 */

var Name = /*#__PURE__*/function (_Characteristic61) {
  (0, _inherits2["default"])(Name, _Characteristic61);

  var _super61 = _createSuper(Name);

  function Name() {
    var _this61;

    (0, _classCallCheck2["default"])(this, Name);
    _this61 = _super61.call(this, 'Name', Name.UUID);

    _this61.setProps({
      format: Formats.STRING,
      perms: [Perms.READ]
    });

    _this61.value = _this61.getDefaultValue();
    return _this61;
  }

  return Name;
}(Characteristic);

exports.Name = Name;
(0, _defineProperty2["default"])(Name, "UUID", '00000023-0000-1000-8000-0026BB765291');
Characteristic.Name = Name;
/**
 * Characteristic "Night Vision"
 */

var NightVision = /*#__PURE__*/function (_Characteristic62) {
  (0, _inherits2["default"])(NightVision, _Characteristic62);

  var _super62 = _createSuper(NightVision);

  function NightVision() {
    var _this62;

    (0, _classCallCheck2["default"])(this, NightVision);
    _this62 = _super62.call(this, 'Night Vision', NightVision.UUID);

    _this62.setProps({
      format: Formats.BOOL,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY, Perms.TIMED_WRITE]
    });

    _this62.value = _this62.getDefaultValue();
    return _this62;
  }

  return NightVision;
}(Characteristic);

exports.NightVision = NightVision;
(0, _defineProperty2["default"])(NightVision, "UUID", '0000011B-0000-1000-8000-0026BB765291');
Characteristic.NightVision = NightVision;
/**
 * Characteristic "Nitrogen Dioxide Density"
 */

var NitrogenDioxideDensity = /*#__PURE__*/function (_Characteristic63) {
  (0, _inherits2["default"])(NitrogenDioxideDensity, _Characteristic63);

  var _super63 = _createSuper(NitrogenDioxideDensity);

  function NitrogenDioxideDensity() {
    var _this63;

    (0, _classCallCheck2["default"])(this, NitrogenDioxideDensity);
    _this63 = _super63.call(this, 'Nitrogen Dioxide Density', NitrogenDioxideDensity.UUID);

    _this63.setProps({
      format: Formats.FLOAT,
      maxValue: 1000,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this63.value = _this63.getDefaultValue();
    return _this63;
  }

  return NitrogenDioxideDensity;
}(Characteristic);

exports.NitrogenDioxideDensity = NitrogenDioxideDensity;
(0, _defineProperty2["default"])(NitrogenDioxideDensity, "UUID", '000000C4-0000-1000-8000-0026BB765291');
Characteristic.NitrogenDioxideDensity = NitrogenDioxideDensity;
/**
 * Characteristic "Obstruction Detected"
 */

var ObstructionDetected = /*#__PURE__*/function (_Characteristic64) {
  (0, _inherits2["default"])(ObstructionDetected, _Characteristic64);

  var _super64 = _createSuper(ObstructionDetected);

  function ObstructionDetected() {
    var _this64;

    (0, _classCallCheck2["default"])(this, ObstructionDetected);
    _this64 = _super64.call(this, 'Obstruction Detected', ObstructionDetected.UUID);

    _this64.setProps({
      format: Formats.BOOL,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this64.value = _this64.getDefaultValue();
    return _this64;
  }

  return ObstructionDetected;
}(Characteristic);

exports.ObstructionDetected = ObstructionDetected;
(0, _defineProperty2["default"])(ObstructionDetected, "UUID", '00000024-0000-1000-8000-0026BB765291');
Characteristic.ObstructionDetected = ObstructionDetected;
/**
 * Characteristic "Occupancy Detected"
 */

var OccupancyDetected = /*#__PURE__*/function (_Characteristic65) {
  (0, _inherits2["default"])(OccupancyDetected, _Characteristic65);

  var _super65 = _createSuper(OccupancyDetected);

  // The value property of OccupancyDetected must be one of the following:
  function OccupancyDetected() {
    var _this65;

    (0, _classCallCheck2["default"])(this, OccupancyDetected);
    _this65 = _super65.call(this, 'Occupancy Detected', OccupancyDetected.UUID);

    _this65.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this65.value = _this65.getDefaultValue();
    return _this65;
  }

  return OccupancyDetected;
}(Characteristic);

exports.OccupancyDetected = OccupancyDetected;
(0, _defineProperty2["default"])(OccupancyDetected, "OCCUPANCY_NOT_DETECTED", 0);
(0, _defineProperty2["default"])(OccupancyDetected, "OCCUPANCY_DETECTED", 1);
(0, _defineProperty2["default"])(OccupancyDetected, "UUID", '00000071-0000-1000-8000-0026BB765291');
Characteristic.OccupancyDetected = OccupancyDetected;
/**
 * Characteristic "On"
 */

var On = /*#__PURE__*/function (_Characteristic66) {
  (0, _inherits2["default"])(On, _Characteristic66);

  var _super66 = _createSuper(On);

  function On() {
    var _this66;

    (0, _classCallCheck2["default"])(this, On);
    _this66 = _super66.call(this, 'On', On.UUID);

    _this66.setProps({
      format: Formats.BOOL,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this66.value = _this66.getDefaultValue();
    return _this66;
  }

  return On;
}(Characteristic);

exports.On = On;
(0, _defineProperty2["default"])(On, "UUID", '00000025-0000-1000-8000-0026BB765291');
Characteristic.On = On;
/**
 * Characteristic "Optical Zoom"
 */

var OpticalZoom = /*#__PURE__*/function (_Characteristic67) {
  (0, _inherits2["default"])(OpticalZoom, _Characteristic67);

  var _super67 = _createSuper(OpticalZoom);

  function OpticalZoom() {
    var _this67;

    (0, _classCallCheck2["default"])(this, OpticalZoom);
    _this67 = _super67.call(this, 'Optical Zoom', OpticalZoom.UUID);

    _this67.setProps({
      format: Formats.FLOAT,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this67.value = _this67.getDefaultValue();
    return _this67;
  }

  return OpticalZoom;
}(Characteristic);

exports.OpticalZoom = OpticalZoom;
(0, _defineProperty2["default"])(OpticalZoom, "UUID", '0000011C-0000-1000-8000-0026BB765291');
Characteristic.OpticalZoom = OpticalZoom;
/**
 * Characteristic "Outlet In Use"
 */

var OutletInUse = /*#__PURE__*/function (_Characteristic68) {
  (0, _inherits2["default"])(OutletInUse, _Characteristic68);

  var _super68 = _createSuper(OutletInUse);

  function OutletInUse() {
    var _this68;

    (0, _classCallCheck2["default"])(this, OutletInUse);
    _this68 = _super68.call(this, 'Outlet In Use', OutletInUse.UUID);

    _this68.setProps({
      format: Formats.BOOL,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this68.value = _this68.getDefaultValue();
    return _this68;
  }

  return OutletInUse;
}(Characteristic);

exports.OutletInUse = OutletInUse;
(0, _defineProperty2["default"])(OutletInUse, "UUID", '00000026-0000-1000-8000-0026BB765291');
Characteristic.OutletInUse = OutletInUse;
/**
 * Characteristic "Ozone Density"
 */

var OzoneDensity = /*#__PURE__*/function (_Characteristic69) {
  (0, _inherits2["default"])(OzoneDensity, _Characteristic69);

  var _super69 = _createSuper(OzoneDensity);

  function OzoneDensity() {
    var _this69;

    (0, _classCallCheck2["default"])(this, OzoneDensity);
    _this69 = _super69.call(this, 'Ozone Density', OzoneDensity.UUID);

    _this69.setProps({
      format: Formats.FLOAT,
      maxValue: 1000,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this69.value = _this69.getDefaultValue();
    return _this69;
  }

  return OzoneDensity;
}(Characteristic);

exports.OzoneDensity = OzoneDensity;
(0, _defineProperty2["default"])(OzoneDensity, "UUID", '000000C3-0000-1000-8000-0026BB765291');
Characteristic.OzoneDensity = OzoneDensity;
/**
 * Characteristic "Pair Setup"
 */

var PairSetup = /*#__PURE__*/function (_Characteristic70) {
  (0, _inherits2["default"])(PairSetup, _Characteristic70);

  var _super70 = _createSuper(PairSetup);

  function PairSetup() {
    var _this70;

    (0, _classCallCheck2["default"])(this, PairSetup);
    _this70 = _super70.call(this, 'Pair Setup', PairSetup.UUID);

    _this70.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.WRITE]
    });

    _this70.value = _this70.getDefaultValue();
    return _this70;
  }

  return PairSetup;
}(Characteristic);

exports.PairSetup = PairSetup;
(0, _defineProperty2["default"])(PairSetup, "UUID", '0000004C-0000-1000-8000-0026BB765291');
Characteristic.PairSetup = PairSetup;
/**
 * Characteristic "Pair Verify"
 */

var PairVerify = /*#__PURE__*/function (_Characteristic71) {
  (0, _inherits2["default"])(PairVerify, _Characteristic71);

  var _super71 = _createSuper(PairVerify);

  function PairVerify() {
    var _this71;

    (0, _classCallCheck2["default"])(this, PairVerify);
    _this71 = _super71.call(this, 'Pair Verify', PairVerify.UUID);

    _this71.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.WRITE]
    });

    _this71.value = _this71.getDefaultValue();
    return _this71;
  }

  return PairVerify;
}(Characteristic);

exports.PairVerify = PairVerify;
(0, _defineProperty2["default"])(PairVerify, "UUID", '0000004E-0000-1000-8000-0026BB765291');
Characteristic.PairVerify = PairVerify;
/**
 * Characteristic "Pairing Features"
 */

var PairingFeatures = /*#__PURE__*/function (_Characteristic72) {
  (0, _inherits2["default"])(PairingFeatures, _Characteristic72);

  var _super72 = _createSuper(PairingFeatures);

  function PairingFeatures() {
    var _this72;

    (0, _classCallCheck2["default"])(this, PairingFeatures);
    _this72 = _super72.call(this, 'Pairing Features', PairingFeatures.UUID);

    _this72.setProps({
      format: Formats.UINT8,
      perms: [Perms.READ]
    });

    _this72.value = _this72.getDefaultValue();
    return _this72;
  }

  return PairingFeatures;
}(Characteristic);

exports.PairingFeatures = PairingFeatures;
(0, _defineProperty2["default"])(PairingFeatures, "UUID", '0000004F-0000-1000-8000-0026BB765291');
Characteristic.PairingFeatures = PairingFeatures;
/**
 * Characteristic "Pairing Pairings"
 */

var PairingPairings = /*#__PURE__*/function (_Characteristic73) {
  (0, _inherits2["default"])(PairingPairings, _Characteristic73);

  var _super73 = _createSuper(PairingPairings);

  function PairingPairings() {
    var _this73;

    (0, _classCallCheck2["default"])(this, PairingPairings);
    _this73 = _super73.call(this, 'Pairing Pairings', PairingPairings.UUID);

    _this73.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.WRITE]
    });

    _this73.value = _this73.getDefaultValue();
    return _this73;
  }

  return PairingPairings;
}(Characteristic);

exports.PairingPairings = PairingPairings;
(0, _defineProperty2["default"])(PairingPairings, "UUID", '00000050-0000-1000-8000-0026BB765291');
Characteristic.PairingPairings = PairingPairings;
/**
 * Characteristic "Password Setting"
 */

var PasswordSetting = /*#__PURE__*/function (_Characteristic74) {
  (0, _inherits2["default"])(PasswordSetting, _Characteristic74);

  var _super74 = _createSuper(PasswordSetting);

  function PasswordSetting() {
    var _this74;

    (0, _classCallCheck2["default"])(this, PasswordSetting);
    _this74 = _super74.call(this, 'Password Setting', PasswordSetting.UUID);

    _this74.setProps({
      format: Formats.TLV8,
      perms: [Perms.NOTIFY, Perms.PAIRED_READ, Perms.PAIRED_WRITE]
    });

    _this74.value = _this74.getDefaultValue();
    return _this74;
  }

  return PasswordSetting;
}(Characteristic);

exports.PasswordSetting = PasswordSetting;
(0, _defineProperty2["default"])(PasswordSetting, "UUID", '000000E4-0000-1000-8000-0026BB765291');
Characteristic.PasswordSetting = PasswordSetting;
/**
 * Characteristic "PM10 Density"
 */

var PM10Density = /*#__PURE__*/function (_Characteristic75) {
  (0, _inherits2["default"])(PM10Density, _Characteristic75);

  var _super75 = _createSuper(PM10Density);

  function PM10Density() {
    var _this75;

    (0, _classCallCheck2["default"])(this, PM10Density);
    _this75 = _super75.call(this, 'PM10 Density', PM10Density.UUID);

    _this75.setProps({
      format: Formats.FLOAT,
      maxValue: 1000,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this75.value = _this75.getDefaultValue();
    return _this75;
  }

  return PM10Density;
}(Characteristic);

exports.PM10Density = PM10Density;
(0, _defineProperty2["default"])(PM10Density, "UUID", '000000C7-0000-1000-8000-0026BB765291');
Characteristic.PM10Density = PM10Density;
/**
 * Characteristic "PM2.5 Density"
 */

var PM2_5Density = /*#__PURE__*/function (_Characteristic76) {
  (0, _inherits2["default"])(PM2_5Density, _Characteristic76);

  var _super76 = _createSuper(PM2_5Density);

  function PM2_5Density() {
    var _this76;

    (0, _classCallCheck2["default"])(this, PM2_5Density);
    _this76 = _super76.call(this, 'PM2.5 Density', PM2_5Density.UUID);

    _this76.setProps({
      format: Formats.FLOAT,
      maxValue: 1000,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this76.value = _this76.getDefaultValue();
    return _this76;
  }

  return PM2_5Density;
}(Characteristic);

exports.PM2_5Density = PM2_5Density;
(0, _defineProperty2["default"])(PM2_5Density, "UUID", '000000C6-0000-1000-8000-0026BB765291');
Characteristic.PM2_5Density = PM2_5Density;
/**
 * Characteristic "Position State"
 */

var PositionState = /*#__PURE__*/function (_Characteristic77) {
  (0, _inherits2["default"])(PositionState, _Characteristic77);

  var _super77 = _createSuper(PositionState);

  // The value property of PositionState must be one of the following:
  function PositionState() {
    var _this77;

    (0, _classCallCheck2["default"])(this, PositionState);
    _this77 = _super77.call(this, 'Position State', PositionState.UUID);

    _this77.setProps({
      format: Formats.UINT8,
      maxValue: 2,
      minValue: 0,
      validValues: [0, 1, 2],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this77.value = _this77.getDefaultValue();
    return _this77;
  }

  return PositionState;
}(Characteristic);

exports.PositionState = PositionState;
(0, _defineProperty2["default"])(PositionState, "DECREASING", 0);
(0, _defineProperty2["default"])(PositionState, "INCREASING", 1);
(0, _defineProperty2["default"])(PositionState, "STOPPED", 2);
(0, _defineProperty2["default"])(PositionState, "UUID", '00000072-0000-1000-8000-0026BB765291');
Characteristic.PositionState = PositionState;
/**
 * Characteristic "Program Mode"
 */

var ProgramMode = /*#__PURE__*/function (_Characteristic78) {
  (0, _inherits2["default"])(ProgramMode, _Characteristic78);

  var _super78 = _createSuper(ProgramMode);

  // The value property of ProgramMode must be one of the following:
  function ProgramMode() {
    var _this78;

    (0, _classCallCheck2["default"])(this, ProgramMode);
    _this78 = _super78.call(this, 'Program Mode', ProgramMode.UUID);

    _this78.setProps({
      format: Formats.UINT8,
      maxValue: 2,
      minValue: 0,
      validValues: [0, 1, 2],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this78.value = _this78.getDefaultValue();
    return _this78;
  }

  return ProgramMode;
}(Characteristic);

exports.ProgramMode = ProgramMode;
(0, _defineProperty2["default"])(ProgramMode, "NO_PROGRAM_SCHEDULED", 0);
(0, _defineProperty2["default"])(ProgramMode, "PROGRAM_SCHEDULED", 1);
(0, _defineProperty2["default"])(ProgramMode, "PROGRAM_SCHEDULED_MANUAL_MODE_", 2);
(0, _defineProperty2["default"])(ProgramMode, "UUID", '000000D1-0000-1000-8000-0026BB765291');
Characteristic.ProgramMode = ProgramMode;
/**
 * Characteristic "Programmable Switch Event"
 */

var ProgrammableSwitchEvent = /*#__PURE__*/function (_Characteristic79) {
  (0, _inherits2["default"])(ProgrammableSwitchEvent, _Characteristic79);

  var _super79 = _createSuper(ProgrammableSwitchEvent);

  // The value property of ProgrammableSwitchEvent must be one of the following:
  function ProgrammableSwitchEvent() {
    var _this79;

    (0, _classCallCheck2["default"])(this, ProgrammableSwitchEvent);
    _this79 = _super79.call(this, 'Programmable Switch Event', ProgrammableSwitchEvent.UUID);

    _this79.setProps({
      format: Formats.UINT8,
      maxValue: 2,
      minValue: 0,
      validValues: [0, 1, 2],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this79.eventOnlyCharacteristic = true; //Manual addition.

    _this79.value = _this79.getDefaultValue();
    return _this79;
  }

  return ProgrammableSwitchEvent;
}(Characteristic);

exports.ProgrammableSwitchEvent = ProgrammableSwitchEvent;
(0, _defineProperty2["default"])(ProgrammableSwitchEvent, "SINGLE_PRESS", 0);
(0, _defineProperty2["default"])(ProgrammableSwitchEvent, "DOUBLE_PRESS", 1);
(0, _defineProperty2["default"])(ProgrammableSwitchEvent, "LONG_PRESS", 2);
(0, _defineProperty2["default"])(ProgrammableSwitchEvent, "UUID", '00000073-0000-1000-8000-0026BB765291');
Characteristic.ProgrammableSwitchEvent = ProgrammableSwitchEvent;
/**
 * Characteristic "Relative Humidity Dehumidifier Threshold"
 */

var RelativeHumidityDehumidifierThreshold = /*#__PURE__*/function (_Characteristic80) {
  (0, _inherits2["default"])(RelativeHumidityDehumidifierThreshold, _Characteristic80);

  var _super80 = _createSuper(RelativeHumidityDehumidifierThreshold);

  function RelativeHumidityDehumidifierThreshold() {
    var _this80;

    (0, _classCallCheck2["default"])(this, RelativeHumidityDehumidifierThreshold);
    _this80 = _super80.call(this, 'Relative Humidity Dehumidifier Threshold', RelativeHumidityDehumidifierThreshold.UUID);

    _this80.setProps({
      format: Formats.FLOAT,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this80.value = _this80.getDefaultValue();
    return _this80;
  }

  return RelativeHumidityDehumidifierThreshold;
}(Characteristic);

exports.RelativeHumidityDehumidifierThreshold = RelativeHumidityDehumidifierThreshold;
(0, _defineProperty2["default"])(RelativeHumidityDehumidifierThreshold, "UUID", '000000C9-0000-1000-8000-0026BB765291');
Characteristic.RelativeHumidityDehumidifierThreshold = RelativeHumidityDehumidifierThreshold;
/**
 * Characteristic "Relative Humidity Humidifier Threshold"
 */

var RelativeHumidityHumidifierThreshold = /*#__PURE__*/function (_Characteristic81) {
  (0, _inherits2["default"])(RelativeHumidityHumidifierThreshold, _Characteristic81);

  var _super81 = _createSuper(RelativeHumidityHumidifierThreshold);

  function RelativeHumidityHumidifierThreshold() {
    var _this81;

    (0, _classCallCheck2["default"])(this, RelativeHumidityHumidifierThreshold);
    _this81 = _super81.call(this, 'Relative Humidity Humidifier Threshold', RelativeHumidityHumidifierThreshold.UUID);

    _this81.setProps({
      format: Formats.FLOAT,
      unit: Units.PERCENTAGE,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this81.value = _this81.getDefaultValue();
    return _this81;
  }

  return RelativeHumidityHumidifierThreshold;
}(Characteristic);

exports.RelativeHumidityHumidifierThreshold = RelativeHumidityHumidifierThreshold;
(0, _defineProperty2["default"])(RelativeHumidityHumidifierThreshold, "UUID", '000000CA-0000-1000-8000-0026BB765291');
Characteristic.RelativeHumidityHumidifierThreshold = RelativeHumidityHumidifierThreshold;
/**
 * Characteristic "Remaining Duration"
 */

var RemainingDuration = /*#__PURE__*/function (_Characteristic82) {
  (0, _inherits2["default"])(RemainingDuration, _Characteristic82);

  var _super82 = _createSuper(RemainingDuration);

  function RemainingDuration() {
    var _this82;

    (0, _classCallCheck2["default"])(this, RemainingDuration);
    _this82 = _super82.call(this, 'Remaining Duration', RemainingDuration.UUID);

    _this82.setProps({
      format: Formats.UINT32,
      maxValue: 3600,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this82.value = _this82.getDefaultValue();
    return _this82;
  }

  return RemainingDuration;
}(Characteristic);

exports.RemainingDuration = RemainingDuration;
(0, _defineProperty2["default"])(RemainingDuration, "UUID", '000000D4-0000-1000-8000-0026BB765291');
Characteristic.RemainingDuration = RemainingDuration;
/**
 * Characteristic "Reset Filter Indication"
 */

var ResetFilterIndication = /*#__PURE__*/function (_Characteristic83) {
  (0, _inherits2["default"])(ResetFilterIndication, _Characteristic83);

  var _super83 = _createSuper(ResetFilterIndication);

  function ResetFilterIndication() {
    var _this83;

    (0, _classCallCheck2["default"])(this, ResetFilterIndication);
    _this83 = _super83.call(this, 'Reset Filter Indication', ResetFilterIndication.UUID);

    _this83.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 1,
      minStep: 1,
      perms: [Perms.WRITE]
    });

    _this83.value = _this83.getDefaultValue();
    return _this83;
  }

  return ResetFilterIndication;
}(Characteristic);

exports.ResetFilterIndication = ResetFilterIndication;
(0, _defineProperty2["default"])(ResetFilterIndication, "UUID", '000000AD-0000-1000-8000-0026BB765291');
Characteristic.ResetFilterIndication = ResetFilterIndication;
/**
 * Characteristic "Rotation Direction"
 */

var RotationDirection = /*#__PURE__*/function (_Characteristic84) {
  (0, _inherits2["default"])(RotationDirection, _Characteristic84);

  var _super84 = _createSuper(RotationDirection);

  // The value property of RotationDirection must be one of the following:
  function RotationDirection() {
    var _this84;

    (0, _classCallCheck2["default"])(this, RotationDirection);
    _this84 = _super84.call(this, 'Rotation Direction', RotationDirection.UUID);

    _this84.setProps({
      format: Formats.INT,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this84.value = _this84.getDefaultValue();
    return _this84;
  }

  return RotationDirection;
}(Characteristic);

exports.RotationDirection = RotationDirection;
(0, _defineProperty2["default"])(RotationDirection, "CLOCKWISE", 0);
(0, _defineProperty2["default"])(RotationDirection, "COUNTER_CLOCKWISE", 1);
(0, _defineProperty2["default"])(RotationDirection, "UUID", '00000028-0000-1000-8000-0026BB765291');
Characteristic.RotationDirection = RotationDirection;
/**
 * Characteristic "Rotation Speed"
 */

var RotationSpeed = /*#__PURE__*/function (_Characteristic85) {
  (0, _inherits2["default"])(RotationSpeed, _Characteristic85);

  var _super85 = _createSuper(RotationSpeed);

  function RotationSpeed() {
    var _this85;

    (0, _classCallCheck2["default"])(this, RotationSpeed);
    _this85 = _super85.call(this, 'Rotation Speed', RotationSpeed.UUID);

    _this85.setProps({
      format: Formats.FLOAT,
      unit: Units.PERCENTAGE,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this85.value = _this85.getDefaultValue();
    return _this85;
  }

  return RotationSpeed;
}(Characteristic);

exports.RotationSpeed = RotationSpeed;
(0, _defineProperty2["default"])(RotationSpeed, "UUID", '00000029-0000-1000-8000-0026BB765291');
Characteristic.RotationSpeed = RotationSpeed;
/**
 * Characteristic "Saturation"
 */

var Saturation = /*#__PURE__*/function (_Characteristic86) {
  (0, _inherits2["default"])(Saturation, _Characteristic86);

  var _super86 = _createSuper(Saturation);

  function Saturation() {
    var _this86;

    (0, _classCallCheck2["default"])(this, Saturation);
    _this86 = _super86.call(this, 'Saturation', Saturation.UUID);

    _this86.setProps({
      format: Formats.FLOAT,
      unit: Units.PERCENTAGE,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this86.value = _this86.getDefaultValue();
    return _this86;
  }

  return Saturation;
}(Characteristic);

exports.Saturation = Saturation;
(0, _defineProperty2["default"])(Saturation, "UUID", '0000002F-0000-1000-8000-0026BB765291');
Characteristic.Saturation = Saturation;
/**
 * Characteristic "Security System Alarm Type"
 */

var SecuritySystemAlarmType = /*#__PURE__*/function (_Characteristic87) {
  (0, _inherits2["default"])(SecuritySystemAlarmType, _Characteristic87);

  var _super87 = _createSuper(SecuritySystemAlarmType);

  function SecuritySystemAlarmType() {
    var _this87;

    (0, _classCallCheck2["default"])(this, SecuritySystemAlarmType);
    _this87 = _super87.call(this, 'Security System Alarm Type', SecuritySystemAlarmType.UUID);

    _this87.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this87.value = _this87.getDefaultValue();
    return _this87;
  }

  return SecuritySystemAlarmType;
}(Characteristic);

exports.SecuritySystemAlarmType = SecuritySystemAlarmType;
(0, _defineProperty2["default"])(SecuritySystemAlarmType, "UUID", '0000008E-0000-1000-8000-0026BB765291');
Characteristic.SecuritySystemAlarmType = SecuritySystemAlarmType;
/**
 * Characteristic "Security System Current State"
 */

var SecuritySystemCurrentState = /*#__PURE__*/function (_Characteristic88) {
  (0, _inherits2["default"])(SecuritySystemCurrentState, _Characteristic88);

  var _super88 = _createSuper(SecuritySystemCurrentState);

  // The value property of SecuritySystemCurrentState must be one of the following:
  function SecuritySystemCurrentState() {
    var _this88;

    (0, _classCallCheck2["default"])(this, SecuritySystemCurrentState);
    _this88 = _super88.call(this, 'Security System Current State', SecuritySystemCurrentState.UUID);

    _this88.setProps({
      format: Formats.UINT8,
      maxValue: 4,
      minValue: 0,
      validValues: [0, 1, 2, 3, 4],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this88.value = _this88.getDefaultValue();
    return _this88;
  }

  return SecuritySystemCurrentState;
}(Characteristic);

exports.SecuritySystemCurrentState = SecuritySystemCurrentState;
(0, _defineProperty2["default"])(SecuritySystemCurrentState, "STAY_ARM", 0);
(0, _defineProperty2["default"])(SecuritySystemCurrentState, "AWAY_ARM", 1);
(0, _defineProperty2["default"])(SecuritySystemCurrentState, "NIGHT_ARM", 2);
(0, _defineProperty2["default"])(SecuritySystemCurrentState, "DISARMED", 3);
(0, _defineProperty2["default"])(SecuritySystemCurrentState, "ALARM_TRIGGERED", 4);
(0, _defineProperty2["default"])(SecuritySystemCurrentState, "UUID", '00000066-0000-1000-8000-0026BB765291');
Characteristic.SecuritySystemCurrentState = SecuritySystemCurrentState;
/**
 * Characteristic "Security System Target State"
 */

var SecuritySystemTargetState = /*#__PURE__*/function (_Characteristic89) {
  (0, _inherits2["default"])(SecuritySystemTargetState, _Characteristic89);

  var _super89 = _createSuper(SecuritySystemTargetState);

  // The value property of SecuritySystemTargetState must be one of the following:
  function SecuritySystemTargetState() {
    var _this89;

    (0, _classCallCheck2["default"])(this, SecuritySystemTargetState);
    _this89 = _super89.call(this, 'Security System Target State', SecuritySystemTargetState.UUID);

    _this89.setProps({
      format: Formats.UINT8,
      maxValue: 3,
      minValue: 0,
      validValues: [0, 1, 2, 3],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this89.value = _this89.getDefaultValue();
    return _this89;
  }

  return SecuritySystemTargetState;
}(Characteristic);

exports.SecuritySystemTargetState = SecuritySystemTargetState;
(0, _defineProperty2["default"])(SecuritySystemTargetState, "STAY_ARM", 0);
(0, _defineProperty2["default"])(SecuritySystemTargetState, "AWAY_ARM", 1);
(0, _defineProperty2["default"])(SecuritySystemTargetState, "NIGHT_ARM", 2);
(0, _defineProperty2["default"])(SecuritySystemTargetState, "DISARM", 3);
(0, _defineProperty2["default"])(SecuritySystemTargetState, "UUID", '00000067-0000-1000-8000-0026BB765291');
Characteristic.SecuritySystemTargetState = SecuritySystemTargetState;
/**
 * Characteristic "Selected RTP Stream Configuration"
 */

var SelectedRTPStreamConfiguration = /*#__PURE__*/function (_Characteristic90) {
  (0, _inherits2["default"])(SelectedRTPStreamConfiguration, _Characteristic90);

  var _super90 = _createSuper(SelectedRTPStreamConfiguration);

  function SelectedRTPStreamConfiguration() {
    var _this90;

    (0, _classCallCheck2["default"])(this, SelectedRTPStreamConfiguration);
    _this90 = _super90.call(this, 'Selected RTP Stream Configuration', SelectedRTPStreamConfiguration.UUID);

    _this90.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.WRITE]
    });

    _this90.value = _this90.getDefaultValue();
    return _this90;
  }

  return SelectedRTPStreamConfiguration;
}(Characteristic);

exports.SelectedRTPStreamConfiguration = SelectedRTPStreamConfiguration;
(0, _defineProperty2["default"])(SelectedRTPStreamConfiguration, "UUID", '00000117-0000-1000-8000-0026BB765291');
Characteristic.SelectedRTPStreamConfiguration = SelectedRTPStreamConfiguration;
/**
 * Characteristic "Serial Number"
 */

var SerialNumber = /*#__PURE__*/function (_Characteristic91) {
  (0, _inherits2["default"])(SerialNumber, _Characteristic91);

  var _super91 = _createSuper(SerialNumber);

  function SerialNumber() {
    var _this91;

    (0, _classCallCheck2["default"])(this, SerialNumber);
    _this91 = _super91.call(this, 'Serial Number', SerialNumber.UUID);

    _this91.setProps({
      format: Formats.STRING,
      perms: [Perms.READ]
    });

    _this91.value = _this91.getDefaultValue();
    return _this91;
  }

  return SerialNumber;
}(Characteristic);

exports.SerialNumber = SerialNumber;
(0, _defineProperty2["default"])(SerialNumber, "UUID", '00000030-0000-1000-8000-0026BB765291');
Characteristic.SerialNumber = SerialNumber;
/**
 * Characteristic "Service Label Index"
 */

var ServiceLabelIndex = /*#__PURE__*/function (_Characteristic92) {
  (0, _inherits2["default"])(ServiceLabelIndex, _Characteristic92);

  var _super92 = _createSuper(ServiceLabelIndex);

  function ServiceLabelIndex() {
    var _this92;

    (0, _classCallCheck2["default"])(this, ServiceLabelIndex);
    _this92 = _super92.call(this, 'Service Label Index', ServiceLabelIndex.UUID);

    _this92.setProps({
      format: Formats.UINT8,
      maxValue: 255,
      minValue: 1,
      minStep: 1,
      perms: [Perms.READ]
    });

    _this92.value = _this92.getDefaultValue();
    return _this92;
  }

  return ServiceLabelIndex;
}(Characteristic);

exports.ServiceLabelIndex = ServiceLabelIndex;
(0, _defineProperty2["default"])(ServiceLabelIndex, "UUID", '000000CB-0000-1000-8000-0026BB765291');
Characteristic.ServiceLabelIndex = ServiceLabelIndex;
/**
 * Characteristic "Service Label Namespace"
 */

var ServiceLabelNamespace = /*#__PURE__*/function (_Characteristic93) {
  (0, _inherits2["default"])(ServiceLabelNamespace, _Characteristic93);

  var _super93 = _createSuper(ServiceLabelNamespace);

  // The value property of ServiceLabelNamespace must be one of the following:
  function ServiceLabelNamespace() {
    var _this93;

    (0, _classCallCheck2["default"])(this, ServiceLabelNamespace);
    _this93 = _super93.call(this, 'Service Label Namespace', ServiceLabelNamespace.UUID);

    _this93.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ]
    });

    _this93.value = _this93.getDefaultValue();
    return _this93;
  }

  return ServiceLabelNamespace;
}(Characteristic);

exports.ServiceLabelNamespace = ServiceLabelNamespace;
(0, _defineProperty2["default"])(ServiceLabelNamespace, "DOTS", 0);
(0, _defineProperty2["default"])(ServiceLabelNamespace, "ARABIC_NUMERALS", 1);
(0, _defineProperty2["default"])(ServiceLabelNamespace, "UUID", '000000CD-0000-1000-8000-0026BB765291');
Characteristic.ServiceLabelNamespace = ServiceLabelNamespace;
/**
 * Characteristic "Set Duration"
 */

var SetDuration = /*#__PURE__*/function (_Characteristic94) {
  (0, _inherits2["default"])(SetDuration, _Characteristic94);

  var _super94 = _createSuper(SetDuration);

  function SetDuration() {
    var _this94;

    (0, _classCallCheck2["default"])(this, SetDuration);
    _this94 = _super94.call(this, 'Set Duration', SetDuration.UUID);

    _this94.setProps({
      format: Formats.UINT32,
      maxValue: 3600,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this94.value = _this94.getDefaultValue();
    return _this94;
  }

  return SetDuration;
}(Characteristic);

exports.SetDuration = SetDuration;
(0, _defineProperty2["default"])(SetDuration, "UUID", '000000D3-0000-1000-8000-0026BB765291');
Characteristic.SetDuration = SetDuration;
/**
 * Characteristic "Setup Endpoints"
 */

var SetupEndpoints = /*#__PURE__*/function (_Characteristic95) {
  (0, _inherits2["default"])(SetupEndpoints, _Characteristic95);

  var _super95 = _createSuper(SetupEndpoints);

  function SetupEndpoints() {
    var _this95;

    (0, _classCallCheck2["default"])(this, SetupEndpoints);
    _this95 = _super95.call(this, 'Setup Endpoints', SetupEndpoints.UUID);

    _this95.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.WRITE]
    });

    _this95.value = _this95.getDefaultValue();
    return _this95;
  }

  return SetupEndpoints;
}(Characteristic);

exports.SetupEndpoints = SetupEndpoints;
(0, _defineProperty2["default"])(SetupEndpoints, "UUID", '00000118-0000-1000-8000-0026BB765291');
Characteristic.SetupEndpoints = SetupEndpoints;
/**
 * Characteristic "Slat Type"
 */

var SlatType = /*#__PURE__*/function (_Characteristic96) {
  (0, _inherits2["default"])(SlatType, _Characteristic96);

  var _super96 = _createSuper(SlatType);

  // The value property of SlatType must be one of the following:
  function SlatType() {
    var _this96;

    (0, _classCallCheck2["default"])(this, SlatType);
    _this96 = _super96.call(this, 'Slat Type', SlatType.UUID);

    _this96.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ]
    });

    _this96.value = _this96.getDefaultValue();
    return _this96;
  }

  return SlatType;
}(Characteristic);

exports.SlatType = SlatType;
(0, _defineProperty2["default"])(SlatType, "HORIZONTAL", 0);
(0, _defineProperty2["default"])(SlatType, "VERTICAL", 1);
(0, _defineProperty2["default"])(SlatType, "UUID", '000000C0-0000-1000-8000-0026BB765291');
Characteristic.SlatType = SlatType;
/**
 * Characteristic "Smoke Detected"
 */

var SmokeDetected = /*#__PURE__*/function (_Characteristic97) {
  (0, _inherits2["default"])(SmokeDetected, _Characteristic97);

  var _super97 = _createSuper(SmokeDetected);

  // The value property of SmokeDetected must be one of the following:
  function SmokeDetected() {
    var _this97;

    (0, _classCallCheck2["default"])(this, SmokeDetected);
    _this97 = _super97.call(this, 'Smoke Detected', SmokeDetected.UUID);

    _this97.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this97.value = _this97.getDefaultValue();
    return _this97;
  }

  return SmokeDetected;
}(Characteristic);

exports.SmokeDetected = SmokeDetected;
(0, _defineProperty2["default"])(SmokeDetected, "SMOKE_NOT_DETECTED", 0);
(0, _defineProperty2["default"])(SmokeDetected, "SMOKE_DETECTED", 1);
(0, _defineProperty2["default"])(SmokeDetected, "UUID", '00000076-0000-1000-8000-0026BB765291');
Characteristic.SmokeDetected = SmokeDetected;
/**
 * Characteristic "Status Active"
 */

var StatusActive = /*#__PURE__*/function (_Characteristic98) {
  (0, _inherits2["default"])(StatusActive, _Characteristic98);

  var _super98 = _createSuper(StatusActive);

  function StatusActive() {
    var _this98;

    (0, _classCallCheck2["default"])(this, StatusActive);
    _this98 = _super98.call(this, 'Status Active', StatusActive.UUID);

    _this98.setProps({
      format: Formats.BOOL,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this98.value = _this98.getDefaultValue();
    return _this98;
  }

  return StatusActive;
}(Characteristic);

exports.StatusActive = StatusActive;
(0, _defineProperty2["default"])(StatusActive, "UUID", '00000075-0000-1000-8000-0026BB765291');
Characteristic.StatusActive = StatusActive;
/**
 * Characteristic "Status Fault"
 */

var StatusFault = /*#__PURE__*/function (_Characteristic99) {
  (0, _inherits2["default"])(StatusFault, _Characteristic99);

  var _super99 = _createSuper(StatusFault);

  // The value property of StatusFault must be one of the following:
  function StatusFault() {
    var _this99;

    (0, _classCallCheck2["default"])(this, StatusFault);
    _this99 = _super99.call(this, 'Status Fault', StatusFault.UUID);

    _this99.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this99.value = _this99.getDefaultValue();
    return _this99;
  }

  return StatusFault;
}(Characteristic);

exports.StatusFault = StatusFault;
(0, _defineProperty2["default"])(StatusFault, "NO_FAULT", 0);
(0, _defineProperty2["default"])(StatusFault, "GENERAL_FAULT", 1);
(0, _defineProperty2["default"])(StatusFault, "UUID", '00000077-0000-1000-8000-0026BB765291');
Characteristic.StatusFault = StatusFault;
/**
 * Characteristic "Status Jammed"
 */

var StatusJammed = /*#__PURE__*/function (_Characteristic100) {
  (0, _inherits2["default"])(StatusJammed, _Characteristic100);

  var _super100 = _createSuper(StatusJammed);

  // The value property of StatusJammed must be one of the following:
  function StatusJammed() {
    var _this100;

    (0, _classCallCheck2["default"])(this, StatusJammed);
    _this100 = _super100.call(this, 'Status Jammed', StatusJammed.UUID);

    _this100.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this100.value = _this100.getDefaultValue();
    return _this100;
  }

  return StatusJammed;
}(Characteristic);

exports.StatusJammed = StatusJammed;
(0, _defineProperty2["default"])(StatusJammed, "NOT_JAMMED", 0);
(0, _defineProperty2["default"])(StatusJammed, "JAMMED", 1);
(0, _defineProperty2["default"])(StatusJammed, "UUID", '00000078-0000-1000-8000-0026BB765291');
Characteristic.StatusJammed = StatusJammed;
/**
 * Characteristic "Status Low Battery"
 */

var StatusLowBattery = /*#__PURE__*/function (_Characteristic101) {
  (0, _inherits2["default"])(StatusLowBattery, _Characteristic101);

  var _super101 = _createSuper(StatusLowBattery);

  // The value property of StatusLowBattery must be one of the following:
  function StatusLowBattery() {
    var _this101;

    (0, _classCallCheck2["default"])(this, StatusLowBattery);
    _this101 = _super101.call(this, 'Status Low Battery', StatusLowBattery.UUID);

    _this101.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this101.value = _this101.getDefaultValue();
    return _this101;
  }

  return StatusLowBattery;
}(Characteristic);

exports.StatusLowBattery = StatusLowBattery;
(0, _defineProperty2["default"])(StatusLowBattery, "BATTERY_LEVEL_NORMAL", 0);
(0, _defineProperty2["default"])(StatusLowBattery, "BATTERY_LEVEL_LOW", 1);
(0, _defineProperty2["default"])(StatusLowBattery, "UUID", '00000079-0000-1000-8000-0026BB765291');
Characteristic.StatusLowBattery = StatusLowBattery;
/**
 * Characteristic "Status Tampered"
 */

var StatusTampered = /*#__PURE__*/function (_Characteristic102) {
  (0, _inherits2["default"])(StatusTampered, _Characteristic102);

  var _super102 = _createSuper(StatusTampered);

  // The value property of StatusTampered must be one of the following:
  function StatusTampered() {
    var _this102;

    (0, _classCallCheck2["default"])(this, StatusTampered);
    _this102 = _super102.call(this, 'Status Tampered', StatusTampered.UUID);

    _this102.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this102.value = _this102.getDefaultValue();
    return _this102;
  }

  return StatusTampered;
}(Characteristic);

exports.StatusTampered = StatusTampered;
(0, _defineProperty2["default"])(StatusTampered, "NOT_TAMPERED", 0);
(0, _defineProperty2["default"])(StatusTampered, "TAMPERED", 1);
(0, _defineProperty2["default"])(StatusTampered, "UUID", '0000007A-0000-1000-8000-0026BB765291');
Characteristic.StatusTampered = StatusTampered;
/**
 * Characteristic "Streaming Status"
 */

var StreamingStatus = /*#__PURE__*/function (_Characteristic103) {
  (0, _inherits2["default"])(StreamingStatus, _Characteristic103);

  var _super103 = _createSuper(StreamingStatus);

  function StreamingStatus() {
    var _this103;

    (0, _classCallCheck2["default"])(this, StreamingStatus);
    _this103 = _super103.call(this, 'Streaming Status', StreamingStatus.UUID);

    _this103.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this103.value = _this103.getDefaultValue();
    return _this103;
  }

  return StreamingStatus;
}(Characteristic);

exports.StreamingStatus = StreamingStatus;
(0, _defineProperty2["default"])(StreamingStatus, "UUID", '00000120-0000-1000-8000-0026BB765291');
Characteristic.StreamingStatus = StreamingStatus;
/**
 * Characteristic "Sulphur Dioxide Density"
 */

var SulphurDioxideDensity = /*#__PURE__*/function (_Characteristic104) {
  (0, _inherits2["default"])(SulphurDioxideDensity, _Characteristic104);

  var _super104 = _createSuper(SulphurDioxideDensity);

  function SulphurDioxideDensity() {
    var _this104;

    (0, _classCallCheck2["default"])(this, SulphurDioxideDensity);
    _this104 = _super104.call(this, 'Sulphur Dioxide Density', SulphurDioxideDensity.UUID);

    _this104.setProps({
      format: Formats.FLOAT,
      maxValue: 1000,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this104.value = _this104.getDefaultValue();
    return _this104;
  }

  return SulphurDioxideDensity;
}(Characteristic);

exports.SulphurDioxideDensity = SulphurDioxideDensity;
(0, _defineProperty2["default"])(SulphurDioxideDensity, "UUID", '000000C5-0000-1000-8000-0026BB765291');
Characteristic.SulphurDioxideDensity = SulphurDioxideDensity;
/**
 * Characteristic "Supported Audio Stream Configuration"
 */

var SupportedAudioStreamConfiguration = /*#__PURE__*/function (_Characteristic105) {
  (0, _inherits2["default"])(SupportedAudioStreamConfiguration, _Characteristic105);

  var _super105 = _createSuper(SupportedAudioStreamConfiguration);

  function SupportedAudioStreamConfiguration() {
    var _this105;

    (0, _classCallCheck2["default"])(this, SupportedAudioStreamConfiguration);
    _this105 = _super105.call(this, 'Supported Audio Stream Configuration', SupportedAudioStreamConfiguration.UUID);

    _this105.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ]
    });

    _this105.value = _this105.getDefaultValue();
    return _this105;
  }

  return SupportedAudioStreamConfiguration;
}(Characteristic);

exports.SupportedAudioStreamConfiguration = SupportedAudioStreamConfiguration;
(0, _defineProperty2["default"])(SupportedAudioStreamConfiguration, "UUID", '00000115-0000-1000-8000-0026BB765291');
Characteristic.SupportedAudioStreamConfiguration = SupportedAudioStreamConfiguration;
/**
 * Characteristic "Supported RTP Configuration"
 */

var SupportedRTPConfiguration = /*#__PURE__*/function (_Characteristic106) {
  (0, _inherits2["default"])(SupportedRTPConfiguration, _Characteristic106);

  var _super106 = _createSuper(SupportedRTPConfiguration);

  function SupportedRTPConfiguration() {
    var _this106;

    (0, _classCallCheck2["default"])(this, SupportedRTPConfiguration);
    _this106 = _super106.call(this, 'Supported RTP Configuration', SupportedRTPConfiguration.UUID);

    _this106.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ]
    });

    _this106.value = _this106.getDefaultValue();
    return _this106;
  }

  return SupportedRTPConfiguration;
}(Characteristic);

exports.SupportedRTPConfiguration = SupportedRTPConfiguration;
(0, _defineProperty2["default"])(SupportedRTPConfiguration, "UUID", '00000116-0000-1000-8000-0026BB765291');
Characteristic.SupportedRTPConfiguration = SupportedRTPConfiguration;
/**
 * Characteristic "Supported Video Stream Configuration"
 */

var SupportedVideoStreamConfiguration = /*#__PURE__*/function (_Characteristic107) {
  (0, _inherits2["default"])(SupportedVideoStreamConfiguration, _Characteristic107);

  var _super107 = _createSuper(SupportedVideoStreamConfiguration);

  function SupportedVideoStreamConfiguration() {
    var _this107;

    (0, _classCallCheck2["default"])(this, SupportedVideoStreamConfiguration);
    _this107 = _super107.call(this, 'Supported Video Stream Configuration', SupportedVideoStreamConfiguration.UUID);

    _this107.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ]
    });

    _this107.value = _this107.getDefaultValue();
    return _this107;
  }

  return SupportedVideoStreamConfiguration;
}(Characteristic);

exports.SupportedVideoStreamConfiguration = SupportedVideoStreamConfiguration;
(0, _defineProperty2["default"])(SupportedVideoStreamConfiguration, "UUID", '00000114-0000-1000-8000-0026BB765291');
Characteristic.SupportedVideoStreamConfiguration = SupportedVideoStreamConfiguration;
/**
 * Characteristic "Swing Mode"
 */

var SwingMode = /*#__PURE__*/function (_Characteristic108) {
  (0, _inherits2["default"])(SwingMode, _Characteristic108);

  var _super108 = _createSuper(SwingMode);

  // The value property of SwingMode must be one of the following:
  function SwingMode() {
    var _this108;

    (0, _classCallCheck2["default"])(this, SwingMode);
    _this108 = _super108.call(this, 'Swing Mode', SwingMode.UUID);

    _this108.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this108.value = _this108.getDefaultValue();
    return _this108;
  }

  return SwingMode;
}(Characteristic);

exports.SwingMode = SwingMode;
(0, _defineProperty2["default"])(SwingMode, "SWING_DISABLED", 0);
(0, _defineProperty2["default"])(SwingMode, "SWING_ENABLED", 1);
(0, _defineProperty2["default"])(SwingMode, "UUID", '000000B6-0000-1000-8000-0026BB765291');
Characteristic.SwingMode = SwingMode;
/**
 * Characteristic "Target Air Purifier State"
 */

var TargetAirPurifierState = /*#__PURE__*/function (_Characteristic109) {
  (0, _inherits2["default"])(TargetAirPurifierState, _Characteristic109);

  var _super109 = _createSuper(TargetAirPurifierState);

  // The value property of TargetAirPurifierState must be one of the following:
  function TargetAirPurifierState() {
    var _this109;

    (0, _classCallCheck2["default"])(this, TargetAirPurifierState);
    _this109 = _super109.call(this, 'Target Air Purifier State', TargetAirPurifierState.UUID);

    _this109.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this109.value = _this109.getDefaultValue();
    return _this109;
  }

  return TargetAirPurifierState;
}(Characteristic);

exports.TargetAirPurifierState = TargetAirPurifierState;
(0, _defineProperty2["default"])(TargetAirPurifierState, "MANUAL", 0);
(0, _defineProperty2["default"])(TargetAirPurifierState, "AUTO", 1);
(0, _defineProperty2["default"])(TargetAirPurifierState, "UUID", '000000A8-0000-1000-8000-0026BB765291');
Characteristic.TargetAirPurifierState = TargetAirPurifierState;
/**
 * Characteristic "Target Air Quality"
 */

var TargetAirQuality = /*#__PURE__*/function (_Characteristic110) {
  (0, _inherits2["default"])(TargetAirQuality, _Characteristic110);

  var _super110 = _createSuper(TargetAirQuality);

  // The value property of TargetAirQuality must be one of the following:
  function TargetAirQuality() {
    var _this110;

    (0, _classCallCheck2["default"])(this, TargetAirQuality);
    _this110 = _super110.call(this, 'Target Air Quality', TargetAirQuality.UUID);

    _this110.setProps({
      format: Formats.UINT8,
      maxValue: 2,
      minValue: 0,
      validValues: [0, 1, 2],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this110.value = _this110.getDefaultValue();
    return _this110;
  }

  return TargetAirQuality;
}(Characteristic);

exports.TargetAirQuality = TargetAirQuality;
(0, _defineProperty2["default"])(TargetAirQuality, "EXCELLENT", 0);
(0, _defineProperty2["default"])(TargetAirQuality, "GOOD", 1);
(0, _defineProperty2["default"])(TargetAirQuality, "FAIR", 2);
(0, _defineProperty2["default"])(TargetAirQuality, "UUID", '000000AE-0000-1000-8000-0026BB765291');
Characteristic.TargetAirQuality = TargetAirQuality;
/**
 * Characteristic "Target Door State"
 */

var TargetDoorState = /*#__PURE__*/function (_Characteristic111) {
  (0, _inherits2["default"])(TargetDoorState, _Characteristic111);

  var _super111 = _createSuper(TargetDoorState);

  // The value property of TargetDoorState must be one of the following:
  function TargetDoorState() {
    var _this111;

    (0, _classCallCheck2["default"])(this, TargetDoorState);
    _this111 = _super111.call(this, 'Target Door State', TargetDoorState.UUID);

    _this111.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this111.value = _this111.getDefaultValue();
    return _this111;
  }

  return TargetDoorState;
}(Characteristic);

exports.TargetDoorState = TargetDoorState;
(0, _defineProperty2["default"])(TargetDoorState, "OPEN", 0);
(0, _defineProperty2["default"])(TargetDoorState, "CLOSED", 1);
(0, _defineProperty2["default"])(TargetDoorState, "UUID", '00000032-0000-1000-8000-0026BB765291');
Characteristic.TargetDoorState = TargetDoorState;
/**
 * Characteristic "Target Fan State"
 */

var TargetFanState = /*#__PURE__*/function (_Characteristic112) {
  (0, _inherits2["default"])(TargetFanState, _Characteristic112);

  var _super112 = _createSuper(TargetFanState);

  // The value property of TargetFanState must be one of the following:
  function TargetFanState() {
    var _this112;

    (0, _classCallCheck2["default"])(this, TargetFanState);
    _this112 = _super112.call(this, 'Target Fan State', TargetFanState.UUID);

    _this112.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this112.value = _this112.getDefaultValue();
    return _this112;
  }

  return TargetFanState;
}(Characteristic);

exports.TargetFanState = TargetFanState;
(0, _defineProperty2["default"])(TargetFanState, "MANUAL", 0);
(0, _defineProperty2["default"])(TargetFanState, "AUTO", 1);
(0, _defineProperty2["default"])(TargetFanState, "UUID", '000000BF-0000-1000-8000-0026BB765291');
Characteristic.TargetFanState = TargetFanState;
/**
 * Characteristic "Target Heater Cooler State"
 */

var TargetHeaterCoolerState = /*#__PURE__*/function (_Characteristic113) {
  (0, _inherits2["default"])(TargetHeaterCoolerState, _Characteristic113);

  var _super113 = _createSuper(TargetHeaterCoolerState);

  // The value property of TargetHeaterCoolerState must be one of the following:
  function TargetHeaterCoolerState() {
    var _this113;

    (0, _classCallCheck2["default"])(this, TargetHeaterCoolerState);
    _this113 = _super113.call(this, 'Target Heater Cooler State', TargetHeaterCoolerState.UUID);

    _this113.setProps({
      format: Formats.UINT8,
      maxValue: 2,
      minValue: 0,
      validValues: [0, 1, 2],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this113.value = _this113.getDefaultValue();
    return _this113;
  }

  return TargetHeaterCoolerState;
}(Characteristic);

exports.TargetHeaterCoolerState = TargetHeaterCoolerState;
(0, _defineProperty2["default"])(TargetHeaterCoolerState, "AUTO", 0);
(0, _defineProperty2["default"])(TargetHeaterCoolerState, "HEAT", 1);
(0, _defineProperty2["default"])(TargetHeaterCoolerState, "COOL", 2);
(0, _defineProperty2["default"])(TargetHeaterCoolerState, "UUID", '000000B2-0000-1000-8000-0026BB765291');
Characteristic.TargetHeaterCoolerState = TargetHeaterCoolerState;
/**
 * Characteristic "Target Heating Cooling State"
 */

var TargetHeatingCoolingState = /*#__PURE__*/function (_Characteristic114) {
  (0, _inherits2["default"])(TargetHeatingCoolingState, _Characteristic114);

  var _super114 = _createSuper(TargetHeatingCoolingState);

  // The value property of TargetHeatingCoolingState must be one of the following:
  function TargetHeatingCoolingState() {
    var _this114;

    (0, _classCallCheck2["default"])(this, TargetHeatingCoolingState);
    _this114 = _super114.call(this, 'Target Heating Cooling State', TargetHeatingCoolingState.UUID);

    _this114.setProps({
      format: Formats.UINT8,
      maxValue: 3,
      minValue: 0,
      validValues: [0, 1, 2, 3],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this114.value = _this114.getDefaultValue();
    return _this114;
  }

  return TargetHeatingCoolingState;
}(Characteristic);

exports.TargetHeatingCoolingState = TargetHeatingCoolingState;
(0, _defineProperty2["default"])(TargetHeatingCoolingState, "OFF", 0);
(0, _defineProperty2["default"])(TargetHeatingCoolingState, "HEAT", 1);
(0, _defineProperty2["default"])(TargetHeatingCoolingState, "COOL", 2);
(0, _defineProperty2["default"])(TargetHeatingCoolingState, "AUTO", 3);
(0, _defineProperty2["default"])(TargetHeatingCoolingState, "UUID", '00000033-0000-1000-8000-0026BB765291');
Characteristic.TargetHeatingCoolingState = TargetHeatingCoolingState;
/**
 * Characteristic "Target Horizontal Tilt Angle"
 */

var TargetHorizontalTiltAngle = /*#__PURE__*/function (_Characteristic115) {
  (0, _inherits2["default"])(TargetHorizontalTiltAngle, _Characteristic115);

  var _super115 = _createSuper(TargetHorizontalTiltAngle);

  function TargetHorizontalTiltAngle() {
    var _this115;

    (0, _classCallCheck2["default"])(this, TargetHorizontalTiltAngle);
    _this115 = _super115.call(this, 'Target Horizontal Tilt Angle', TargetHorizontalTiltAngle.UUID);

    _this115.setProps({
      format: Formats.INT,
      unit: Units.ARC_DEGREE,
      maxValue: 90,
      minValue: -90,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this115.value = _this115.getDefaultValue();
    return _this115;
  }

  return TargetHorizontalTiltAngle;
}(Characteristic);

exports.TargetHorizontalTiltAngle = TargetHorizontalTiltAngle;
(0, _defineProperty2["default"])(TargetHorizontalTiltAngle, "UUID", '0000007B-0000-1000-8000-0026BB765291');
Characteristic.TargetHorizontalTiltAngle = TargetHorizontalTiltAngle;
/**
 * Characteristic "Target Humidifier Dehumidifier State"
 */

var TargetHumidifierDehumidifierState = /*#__PURE__*/function (_Characteristic116) {
  (0, _inherits2["default"])(TargetHumidifierDehumidifierState, _Characteristic116);

  var _super116 = _createSuper(TargetHumidifierDehumidifierState);

  /**
   * @deprecated Removed in iOS 11. Use HUMIDIFIER_OR_DEHUMIDIFIER instead.
   */
  // The value property of TargetHumidifierDehumidifierState must be one of the following:
  function TargetHumidifierDehumidifierState() {
    var _this116;

    (0, _classCallCheck2["default"])(this, TargetHumidifierDehumidifierState);
    _this116 = _super116.call(this, 'Target Humidifier Dehumidifier State', TargetHumidifierDehumidifierState.UUID);

    _this116.setProps({
      format: Formats.UINT8,
      maxValue: 2,
      minValue: 0,
      validValues: [0, 1, 2],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this116.value = _this116.getDefaultValue();
    return _this116;
  }

  return TargetHumidifierDehumidifierState;
}(Characteristic);

exports.TargetHumidifierDehumidifierState = TargetHumidifierDehumidifierState;
(0, _defineProperty2["default"])(TargetHumidifierDehumidifierState, "AUTO", 0);
(0, _defineProperty2["default"])(TargetHumidifierDehumidifierState, "HUMIDIFIER_OR_DEHUMIDIFIER", 0);
(0, _defineProperty2["default"])(TargetHumidifierDehumidifierState, "HUMIDIFIER", 1);
(0, _defineProperty2["default"])(TargetHumidifierDehumidifierState, "DEHUMIDIFIER", 2);
(0, _defineProperty2["default"])(TargetHumidifierDehumidifierState, "UUID", '000000B4-0000-1000-8000-0026BB765291');
Characteristic.TargetHumidifierDehumidifierState = TargetHumidifierDehumidifierState;
/**
 * Characteristic "Target Position"
 */

var TargetPosition = /*#__PURE__*/function (_Characteristic117) {
  (0, _inherits2["default"])(TargetPosition, _Characteristic117);

  var _super117 = _createSuper(TargetPosition);

  function TargetPosition() {
    var _this117;

    (0, _classCallCheck2["default"])(this, TargetPosition);
    _this117 = _super117.call(this, 'Target Position', TargetPosition.UUID);

    _this117.setProps({
      format: Formats.UINT8,
      unit: Units.PERCENTAGE,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this117.value = _this117.getDefaultValue();
    return _this117;
  }

  return TargetPosition;
}(Characteristic);

exports.TargetPosition = TargetPosition;
(0, _defineProperty2["default"])(TargetPosition, "UUID", '0000007C-0000-1000-8000-0026BB765291');
Characteristic.TargetPosition = TargetPosition;
/**
 * Characteristic "Target Relative Humidity"
 */

var TargetRelativeHumidity = /*#__PURE__*/function (_Characteristic118) {
  (0, _inherits2["default"])(TargetRelativeHumidity, _Characteristic118);

  var _super118 = _createSuper(TargetRelativeHumidity);

  function TargetRelativeHumidity() {
    var _this118;

    (0, _classCallCheck2["default"])(this, TargetRelativeHumidity);
    _this118 = _super118.call(this, 'Target Relative Humidity', TargetRelativeHumidity.UUID);

    _this118.setProps({
      format: Formats.FLOAT,
      unit: Units.PERCENTAGE,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this118.value = _this118.getDefaultValue();
    return _this118;
  }

  return TargetRelativeHumidity;
}(Characteristic);

exports.TargetRelativeHumidity = TargetRelativeHumidity;
(0, _defineProperty2["default"])(TargetRelativeHumidity, "UUID", '00000034-0000-1000-8000-0026BB765291');
Characteristic.TargetRelativeHumidity = TargetRelativeHumidity;
/**
 * Characteristic "Target Slat State"
 */

var TargetSlatState = /*#__PURE__*/function (_Characteristic119) {
  (0, _inherits2["default"])(TargetSlatState, _Characteristic119);

  var _super119 = _createSuper(TargetSlatState);

  // The value property of TargetSlatState must be one of the following:
  function TargetSlatState() {
    var _this119;

    (0, _classCallCheck2["default"])(this, TargetSlatState);
    _this119 = _super119.call(this, 'Target Slat State', TargetSlatState.UUID);

    _this119.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this119.value = _this119.getDefaultValue();
    return _this119;
  }

  return TargetSlatState;
}(Characteristic);

exports.TargetSlatState = TargetSlatState;
(0, _defineProperty2["default"])(TargetSlatState, "MANUAL", 0);
(0, _defineProperty2["default"])(TargetSlatState, "AUTO", 1);
(0, _defineProperty2["default"])(TargetSlatState, "UUID", '000000BE-0000-1000-8000-0026BB765291');
Characteristic.TargetSlatState = TargetSlatState;
/**
 * Characteristic "Target Temperature"
 */

var TargetTemperature = /*#__PURE__*/function (_Characteristic120) {
  (0, _inherits2["default"])(TargetTemperature, _Characteristic120);

  var _super120 = _createSuper(TargetTemperature);

  function TargetTemperature() {
    var _this120;

    (0, _classCallCheck2["default"])(this, TargetTemperature);
    _this120 = _super120.call(this, 'Target Temperature', TargetTemperature.UUID);

    _this120.setProps({
      format: Formats.FLOAT,
      unit: Units.CELSIUS,
      maxValue: 38,
      minValue: 10,
      minStep: 0.1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this120.value = _this120.getDefaultValue();
    return _this120;
  }

  return TargetTemperature;
}(Characteristic);

exports.TargetTemperature = TargetTemperature;
(0, _defineProperty2["default"])(TargetTemperature, "UUID", '00000035-0000-1000-8000-0026BB765291');
Characteristic.TargetTemperature = TargetTemperature;
/**
 * Characteristic "Target Tilt Angle"
 */

var TargetTiltAngle = /*#__PURE__*/function (_Characteristic121) {
  (0, _inherits2["default"])(TargetTiltAngle, _Characteristic121);

  var _super121 = _createSuper(TargetTiltAngle);

  function TargetTiltAngle() {
    var _this121;

    (0, _classCallCheck2["default"])(this, TargetTiltAngle);
    _this121 = _super121.call(this, 'Target Tilt Angle', TargetTiltAngle.UUID);

    _this121.setProps({
      format: Formats.INT,
      unit: Units.ARC_DEGREE,
      maxValue: 90,
      minValue: -90,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this121.value = _this121.getDefaultValue();
    return _this121;
  }

  return TargetTiltAngle;
}(Characteristic);

exports.TargetTiltAngle = TargetTiltAngle;
(0, _defineProperty2["default"])(TargetTiltAngle, "UUID", '000000C2-0000-1000-8000-0026BB765291');
Characteristic.TargetTiltAngle = TargetTiltAngle;
/**
 * Characteristic "Target Vertical Tilt Angle"
 */

var TargetVerticalTiltAngle = /*#__PURE__*/function (_Characteristic122) {
  (0, _inherits2["default"])(TargetVerticalTiltAngle, _Characteristic122);

  var _super122 = _createSuper(TargetVerticalTiltAngle);

  function TargetVerticalTiltAngle() {
    var _this122;

    (0, _classCallCheck2["default"])(this, TargetVerticalTiltAngle);
    _this122 = _super122.call(this, 'Target Vertical Tilt Angle', TargetVerticalTiltAngle.UUID);

    _this122.setProps({
      format: Formats.INT,
      unit: Units.ARC_DEGREE,
      maxValue: 90,
      minValue: -90,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this122.value = _this122.getDefaultValue();
    return _this122;
  }

  return TargetVerticalTiltAngle;
}(Characteristic);

exports.TargetVerticalTiltAngle = TargetVerticalTiltAngle;
(0, _defineProperty2["default"])(TargetVerticalTiltAngle, "UUID", '0000007D-0000-1000-8000-0026BB765291');
Characteristic.TargetVerticalTiltAngle = TargetVerticalTiltAngle;
/**
 * Characteristic "Temperature Display Units"
 */

var TemperatureDisplayUnits = /*#__PURE__*/function (_Characteristic123) {
  (0, _inherits2["default"])(TemperatureDisplayUnits, _Characteristic123);

  var _super123 = _createSuper(TemperatureDisplayUnits);

  // The value property of TemperatureDisplayUnits must be one of the following:
  function TemperatureDisplayUnits() {
    var _this123;

    (0, _classCallCheck2["default"])(this, TemperatureDisplayUnits);
    _this123 = _super123.call(this, 'Temperature Display Units', TemperatureDisplayUnits.UUID);

    _this123.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this123.value = _this123.getDefaultValue();
    return _this123;
  }

  return TemperatureDisplayUnits;
}(Characteristic);

exports.TemperatureDisplayUnits = TemperatureDisplayUnits;
(0, _defineProperty2["default"])(TemperatureDisplayUnits, "CELSIUS", 0);
(0, _defineProperty2["default"])(TemperatureDisplayUnits, "FAHRENHEIT", 1);
(0, _defineProperty2["default"])(TemperatureDisplayUnits, "UUID", '00000036-0000-1000-8000-0026BB765291');
Characteristic.TemperatureDisplayUnits = TemperatureDisplayUnits;
/**
 * Characteristic "Valve Type"
 */

var ValveType = /*#__PURE__*/function (_Characteristic124) {
  (0, _inherits2["default"])(ValveType, _Characteristic124);

  var _super124 = _createSuper(ValveType);

  // The value property of ValveType must be one of the following:
  function ValveType() {
    var _this124;

    (0, _classCallCheck2["default"])(this, ValveType);
    _this124 = _super124.call(this, 'Valve Type', ValveType.UUID);

    _this124.setProps({
      format: Formats.UINT8,
      maxValue: 3,
      minValue: 0,
      validValues: [0, 1, 2, 3],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this124.value = _this124.getDefaultValue();
    return _this124;
  }

  return ValveType;
}(Characteristic);

exports.ValveType = ValveType;
(0, _defineProperty2["default"])(ValveType, "GENERIC_VALVE", 0);
(0, _defineProperty2["default"])(ValveType, "IRRIGATION", 1);
(0, _defineProperty2["default"])(ValveType, "SHOWER_HEAD", 2);
(0, _defineProperty2["default"])(ValveType, "WATER_FAUCET", 3);
(0, _defineProperty2["default"])(ValveType, "UUID", '000000D5-0000-1000-8000-0026BB765291');
Characteristic.ValveType = ValveType;
/**
 * Characteristic "Version"
 */

var Version = /*#__PURE__*/function (_Characteristic125) {
  (0, _inherits2["default"])(Version, _Characteristic125);

  var _super125 = _createSuper(Version);

  function Version() {
    var _this125;

    (0, _classCallCheck2["default"])(this, Version);
    _this125 = _super125.call(this, 'Version', Version.UUID);

    _this125.setProps({
      format: Formats.STRING,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this125.value = _this125.getDefaultValue();
    return _this125;
  }

  return Version;
}(Characteristic);

exports.Version = Version;
(0, _defineProperty2["default"])(Version, "UUID", '00000037-0000-1000-8000-0026BB765291');
Characteristic.Version = Version;
/**
 * Characteristic "VOC Density"
 */

var VOCDensity = /*#__PURE__*/function (_Characteristic126) {
  (0, _inherits2["default"])(VOCDensity, _Characteristic126);

  var _super126 = _createSuper(VOCDensity);

  function VOCDensity() {
    var _this126;

    (0, _classCallCheck2["default"])(this, VOCDensity);
    _this126 = _super126.call(this, 'VOC Density', VOCDensity.UUID);

    _this126.setProps({
      format: Formats.FLOAT,
      maxValue: 1000,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this126.value = _this126.getDefaultValue();
    return _this126;
  }

  return VOCDensity;
}(Characteristic);

exports.VOCDensity = VOCDensity;
(0, _defineProperty2["default"])(VOCDensity, "UUID", '000000C8-0000-1000-8000-0026BB765291');
Characteristic.VOCDensity = VOCDensity;
/**
 * Characteristic "Volume"
 */

var Volume = /*#__PURE__*/function (_Characteristic127) {
  (0, _inherits2["default"])(Volume, _Characteristic127);

  var _super127 = _createSuper(Volume);

  function Volume() {
    var _this127;

    (0, _classCallCheck2["default"])(this, Volume);
    _this127 = _super127.call(this, 'Volume', Volume.UUID);

    _this127.setProps({
      format: Formats.UINT8,
      unit: Units.PERCENTAGE,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this127.value = _this127.getDefaultValue();
    return _this127;
  }

  return Volume;
}(Characteristic);

exports.Volume = Volume;
(0, _defineProperty2["default"])(Volume, "UUID", '00000119-0000-1000-8000-0026BB765291');
Characteristic.Volume = Volume;
/**
 * Characteristic "Water Level"
 */

var WaterLevel = /*#__PURE__*/function (_Characteristic128) {
  (0, _inherits2["default"])(WaterLevel, _Characteristic128);

  var _super128 = _createSuper(WaterLevel);

  function WaterLevel() {
    var _this128;

    (0, _classCallCheck2["default"])(this, WaterLevel);
    _this128 = _super128.call(this, 'Water Level', WaterLevel.UUID);

    _this128.setProps({
      format: Formats.FLOAT,
      maxValue: 100,
      minValue: 0,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this128.value = _this128.getDefaultValue();
    return _this128;
  }

  return WaterLevel;
}(Characteristic);

exports.WaterLevel = WaterLevel;
(0, _defineProperty2["default"])(WaterLevel, "UUID", '000000B5-0000-1000-8000-0026BB765291');
Characteristic.WaterLevel = WaterLevel;
/**
 * Characteristic "Recording Audio Active"
 */

var RecordingAudioActive = /*#__PURE__*/function (_Characteristic129) {
  (0, _inherits2["default"])(RecordingAudioActive, _Characteristic129);

  var _super129 = _createSuper(RecordingAudioActive);

  function RecordingAudioActive() {
    var _this129;

    (0, _classCallCheck2["default"])(this, RecordingAudioActive);
    _this129 = _super129.call(this, 'Recording Audio Active', RecordingAudioActive.UUID);

    _this129.setProps({
      format: Formats.UINT8,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this129.value = _this129.getDefaultValue();
    return _this129;
  }

  return RecordingAudioActive;
}(Characteristic);

exports.RecordingAudioActive = RecordingAudioActive;
(0, _defineProperty2["default"])(RecordingAudioActive, "DISABLE", 0);
(0, _defineProperty2["default"])(RecordingAudioActive, "ENABLE", 1);
(0, _defineProperty2["default"])(RecordingAudioActive, "UUID", '00000226-0000-1000-8000-0026BB765291');
Characteristic.RecordingAudioActive = RecordingAudioActive;
/**
 * Characteristic "Supported Camera Recording Configuration"
 */

var SupportedCameraRecordingConfiguration = /*#__PURE__*/function (_Characteristic130) {
  (0, _inherits2["default"])(SupportedCameraRecordingConfiguration, _Characteristic130);

  var _super130 = _createSuper(SupportedCameraRecordingConfiguration);

  function SupportedCameraRecordingConfiguration() {
    var _this130;

    (0, _classCallCheck2["default"])(this, SupportedCameraRecordingConfiguration);
    _this130 = _super130.call(this, 'Supported Camera Recording Configuration', SupportedCameraRecordingConfiguration.UUID);

    _this130.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this130.value = _this130.getDefaultValue();
    return _this130;
  }

  return SupportedCameraRecordingConfiguration;
}(Characteristic);

exports.SupportedCameraRecordingConfiguration = SupportedCameraRecordingConfiguration;
(0, _defineProperty2["default"])(SupportedCameraRecordingConfiguration, "UUID", '00000205-0000-1000-8000-0026BB765291');
Characteristic.SupportedCameraRecordingConfiguration = SupportedCameraRecordingConfiguration;
/**
 * Characteristic "Supported Video Recording Configuration"
 */

var SupportedVideoRecordingConfiguration = /*#__PURE__*/function (_Characteristic131) {
  (0, _inherits2["default"])(SupportedVideoRecordingConfiguration, _Characteristic131);

  var _super131 = _createSuper(SupportedVideoRecordingConfiguration);

  function SupportedVideoRecordingConfiguration() {
    var _this131;

    (0, _classCallCheck2["default"])(this, SupportedVideoRecordingConfiguration);
    _this131 = _super131.call(this, 'Supported Video Recording Configuration', SupportedVideoRecordingConfiguration.UUID);

    _this131.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this131.value = _this131.getDefaultValue();
    return _this131;
  }

  return SupportedVideoRecordingConfiguration;
}(Characteristic);

exports.SupportedVideoRecordingConfiguration = SupportedVideoRecordingConfiguration;
(0, _defineProperty2["default"])(SupportedVideoRecordingConfiguration, "UUID", '00000206-0000-1000-8000-0026BB765291');
Characteristic.SupportedVideoRecordingConfiguration = SupportedVideoRecordingConfiguration;
/**
 * Characteristic "Supported Audio Recording Configuration"
 */

var SupportedAudioRecordingConfiguration = /*#__PURE__*/function (_Characteristic132) {
  (0, _inherits2["default"])(SupportedAudioRecordingConfiguration, _Characteristic132);

  var _super132 = _createSuper(SupportedAudioRecordingConfiguration);

  function SupportedAudioRecordingConfiguration() {
    var _this132;

    (0, _classCallCheck2["default"])(this, SupportedAudioRecordingConfiguration);
    _this132 = _super132.call(this, 'Supported Audio Recording Configuration', SupportedAudioRecordingConfiguration.UUID);

    _this132.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this132.value = _this132.getDefaultValue();
    return _this132;
  }

  return SupportedAudioRecordingConfiguration;
}(Characteristic);

exports.SupportedAudioRecordingConfiguration = SupportedAudioRecordingConfiguration;
(0, _defineProperty2["default"])(SupportedAudioRecordingConfiguration, "UUID", '00000207-0000-1000-8000-0026BB765291');
Characteristic.SupportedAudioRecordingConfiguration = SupportedAudioRecordingConfiguration;
/**
 * Characteristic "Selected Camera Recording Configuration"
 */

var SelectedCameraRecordingConfiguration = /*#__PURE__*/function (_Characteristic133) {
  (0, _inherits2["default"])(SelectedCameraRecordingConfiguration, _Characteristic133);

  var _super133 = _createSuper(SelectedCameraRecordingConfiguration);

  function SelectedCameraRecordingConfiguration() {
    var _this133;

    (0, _classCallCheck2["default"])(this, SelectedCameraRecordingConfiguration);
    _this133 = _super133.call(this, 'Selected Camera Recording Configuration', SelectedCameraRecordingConfiguration.UUID);

    _this133.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this133.value = _this133.getDefaultValue();
    return _this133;
  }

  return SelectedCameraRecordingConfiguration;
}(Characteristic);

exports.SelectedCameraRecordingConfiguration = SelectedCameraRecordingConfiguration;
(0, _defineProperty2["default"])(SelectedCameraRecordingConfiguration, "UUID", '00000209-0000-1000-8000-0026BB765291');
Characteristic.SelectedCameraRecordingConfiguration = SelectedCameraRecordingConfiguration;
/**
 * Characteristic "Camera Operating Mode Indicator"
 */

var CameraOperatingModeIndicator = /*#__PURE__*/function (_Characteristic134) {
  (0, _inherits2["default"])(CameraOperatingModeIndicator, _Characteristic134);

  var _super134 = _createSuper(CameraOperatingModeIndicator);

  function CameraOperatingModeIndicator() {
    var _this134;

    (0, _classCallCheck2["default"])(this, CameraOperatingModeIndicator);
    _this134 = _super134.call(this, 'Camera Operating Mode Indicator', CameraOperatingModeIndicator.UUID);

    _this134.setProps({
      format: Formats.UINT8,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY, Perms.TIMED_WRITE]
    });

    _this134.value = _this134.getDefaultValue();
    return _this134;
  }

  return CameraOperatingModeIndicator;
}(Characteristic);

exports.CameraOperatingModeIndicator = CameraOperatingModeIndicator;
(0, _defineProperty2["default"])(CameraOperatingModeIndicator, "DISABLE", 0);
(0, _defineProperty2["default"])(CameraOperatingModeIndicator, "ENABLE", 1);
(0, _defineProperty2["default"])(CameraOperatingModeIndicator, "UUID", '0000021D-0000-1000-8000-0026BB765291');
Characteristic.CameraOperatingModeIndicator = CameraOperatingModeIndicator;
/**
 * Characteristic "Event Snapshots Active"
 */

var EventSnapshotsActive = /*#__PURE__*/function (_Characteristic135) {
  (0, _inherits2["default"])(EventSnapshotsActive, _Characteristic135);

  var _super135 = _createSuper(EventSnapshotsActive);

  function EventSnapshotsActive() {
    var _this135;

    (0, _classCallCheck2["default"])(this, EventSnapshotsActive);
    _this135 = _super135.call(this, 'Event Snapshots Active', EventSnapshotsActive.UUID);

    _this135.setProps({
      format: Formats.UINT8,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this135.value = _this135.getDefaultValue();
    return _this135;
  }

  return EventSnapshotsActive;
}(Characteristic);

exports.EventSnapshotsActive = EventSnapshotsActive;
(0, _defineProperty2["default"])(EventSnapshotsActive, "DISABLE", 0);
(0, _defineProperty2["default"])(EventSnapshotsActive, "ENABLE", 1);
(0, _defineProperty2["default"])(EventSnapshotsActive, "UUID", '00000223-0000-1000-8000-0026BB765291');
Characteristic.EventSnapshotsActive = EventSnapshotsActive;
/**
 * Characteristic "Diagonal Field Of View"
 *
 * @deprecated was removed again
 */

var DiagonalFieldOfView = /*#__PURE__*/function (_Characteristic136) {
  (0, _inherits2["default"])(DiagonalFieldOfView, _Characteristic136);

  var _super136 = _createSuper(DiagonalFieldOfView);

  function DiagonalFieldOfView() {
    var _this136;

    (0, _classCallCheck2["default"])(this, DiagonalFieldOfView);
    _this136 = _super136.call(this, 'Diagonal Field Of View', DiagonalFieldOfView.UUID);

    _this136.setProps({
      format: Formats.FLOAT,
      unit: Units.ARC_DEGREE,
      maxValue: 360,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this136.value = _this136.getDefaultValue();
    return _this136;
  }

  return DiagonalFieldOfView;
}(Characteristic);

exports.DiagonalFieldOfView = DiagonalFieldOfView;
(0, _defineProperty2["default"])(DiagonalFieldOfView, "UUID", '00000224-0000-1000-8000-0026BB765291');
Characteristic.DiagonalFieldOfView = DiagonalFieldOfView;
/**
 * Characteristic "HomeKit Camera Active"
 */

var HomeKitCameraActive = /*#__PURE__*/function (_Characteristic137) {
  (0, _inherits2["default"])(HomeKitCameraActive, _Characteristic137);

  var _super137 = _createSuper(HomeKitCameraActive);

  function HomeKitCameraActive() {
    var _this137;

    (0, _classCallCheck2["default"])(this, HomeKitCameraActive);
    _this137 = _super137.call(this, 'HomeKit Camera Active', HomeKitCameraActive.UUID);

    _this137.setProps({
      format: Formats.UINT8,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY, Perms.TIMED_WRITE]
    });

    _this137.value = _this137.getDefaultValue();
    return _this137;
  }

  return HomeKitCameraActive;
}(Characteristic);

exports.HomeKitCameraActive = HomeKitCameraActive;
(0, _defineProperty2["default"])(HomeKitCameraActive, "OFF", 0);
(0, _defineProperty2["default"])(HomeKitCameraActive, "ON", 1);
(0, _defineProperty2["default"])(HomeKitCameraActive, "UUID", '0000021B-0000-1000-8000-0026BB765291');
Characteristic.HomeKitCameraActive = HomeKitCameraActive;
/**
 * Characteristic "Manually disabled"
 */

var ManuallyDisabled = /*#__PURE__*/function (_Characteristic138) {
  (0, _inherits2["default"])(ManuallyDisabled, _Characteristic138);

  var _super138 = _createSuper(ManuallyDisabled);

  function ManuallyDisabled() {
    var _this138;

    (0, _classCallCheck2["default"])(this, ManuallyDisabled);
    _this138 = _super138.call(this, 'Manually disabled', ManuallyDisabled.UUID);

    _this138.setProps({
      format: Formats.BOOL,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this138.value = _this138.getDefaultValue();
    return _this138;
  }

  return ManuallyDisabled;
}(Characteristic);

exports.ManuallyDisabled = ManuallyDisabled;
(0, _defineProperty2["default"])(ManuallyDisabled, "ENABLED", 0);
(0, _defineProperty2["default"])(ManuallyDisabled, "DISABLED", 1);
(0, _defineProperty2["default"])(ManuallyDisabled, "UUID", '00000227-0000-1000-8000-0026BB765291');
Characteristic.ManuallyDisabled = ManuallyDisabled;
/**
 * Characteristic "Third Party Camera Active"
 */

var ThirdPartyCameraActive = /*#__PURE__*/function (_Characteristic139) {
  (0, _inherits2["default"])(ThirdPartyCameraActive, _Characteristic139);

  var _super139 = _createSuper(ThirdPartyCameraActive);

  function ThirdPartyCameraActive() {
    var _this139;

    (0, _classCallCheck2["default"])(this, ThirdPartyCameraActive);
    _this139 = _super139.call(this, 'Third Party Camera Active', ThirdPartyCameraActive.UUID);

    _this139.setProps({
      format: Formats.UINT8,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this139.value = _this139.getDefaultValue();
    return _this139;
  }

  return ThirdPartyCameraActive;
}(Characteristic);

exports.ThirdPartyCameraActive = ThirdPartyCameraActive;
(0, _defineProperty2["default"])(ThirdPartyCameraActive, "OFF", 0);
(0, _defineProperty2["default"])(ThirdPartyCameraActive, "ON", 1);
(0, _defineProperty2["default"])(ThirdPartyCameraActive, "UUID", '0000021C-0000-1000-8000-0026BB765291');
Characteristic.ThirdPartyCameraActive = ThirdPartyCameraActive;
/**
 * Characteristic "Periodic Snapshots Active"
 */

var PeriodicSnapshotsActive = /*#__PURE__*/function (_Characteristic140) {
  (0, _inherits2["default"])(PeriodicSnapshotsActive, _Characteristic140);

  var _super140 = _createSuper(PeriodicSnapshotsActive);

  function PeriodicSnapshotsActive() {
    var _this140;

    (0, _classCallCheck2["default"])(this, PeriodicSnapshotsActive);
    _this140 = _super140.call(this, 'Periodic Snapshots Active', PeriodicSnapshotsActive.UUID);

    _this140.setProps({
      format: Formats.UINT8,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });

    _this140.value = _this140.getDefaultValue();
    return _this140;
  }

  return PeriodicSnapshotsActive;
}(Characteristic);

exports.PeriodicSnapshotsActive = PeriodicSnapshotsActive;
(0, _defineProperty2["default"])(PeriodicSnapshotsActive, "DISABLE", 0);
(0, _defineProperty2["default"])(PeriodicSnapshotsActive, "ENABLE", 1);
(0, _defineProperty2["default"])(PeriodicSnapshotsActive, "UUID", '00000225-0000-1000-8000-0026BB765291');
Characteristic.PeriodicSnapshotsActive = PeriodicSnapshotsActive;
/**
 * Characteristic "Network Client Profile Control"
 */

var NetworkClientProfileControl = /*#__PURE__*/function (_Characteristic141) {
  (0, _inherits2["default"])(NetworkClientProfileControl, _Characteristic141);

  var _super141 = _createSuper(NetworkClientProfileControl);

  function NetworkClientProfileControl() {
    var _this141;

    (0, _classCallCheck2["default"])(this, NetworkClientProfileControl);
    _this141 = _super141.call(this, 'Network Client Profile Control', NetworkClientProfileControl.UUID);

    _this141.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY, Perms.TIMED_WRITE, Perms.WRITE_RESPONSE]
    });

    _this141.value = _this141.getDefaultValue();
    return _this141;
  }

  return NetworkClientProfileControl;
}(Characteristic);

exports.NetworkClientProfileControl = NetworkClientProfileControl;
(0, _defineProperty2["default"])(NetworkClientProfileControl, "UUID", '0000020C-0000-1000-8000-0026BB765291');
Characteristic.NetworkClientProfileControl = NetworkClientProfileControl;
/**
 * Characteristic "Network Client Status Control"
 */

var NetworkClientStatusControl = /*#__PURE__*/function (_Characteristic142) {
  (0, _inherits2["default"])(NetworkClientStatusControl, _Characteristic142);

  var _super142 = _createSuper(NetworkClientStatusControl);

  function NetworkClientStatusControl() {
    var _this142;

    (0, _classCallCheck2["default"])(this, NetworkClientStatusControl);
    _this142 = _super142.call(this, 'Network Client Status Control', NetworkClientStatusControl.UUID);

    _this142.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.WRITE, Perms.WRITE_RESPONSE]
    });

    _this142.value = _this142.getDefaultValue();
    return _this142;
  }

  return NetworkClientStatusControl;
}(Characteristic);

exports.NetworkClientStatusControl = NetworkClientStatusControl;
(0, _defineProperty2["default"])(NetworkClientStatusControl, "UUID", '0000020D-0000-1000-8000-0026BB765291');
Characteristic.NetworkClientStatusControl = NetworkClientStatusControl;
/**
 * Characteristic "Router Status"
 */

var RouterStatus = /*#__PURE__*/function (_Characteristic143) {
  (0, _inherits2["default"])(RouterStatus, _Characteristic143);

  var _super143 = _createSuper(RouterStatus);

  function RouterStatus() {
    var _this143;

    (0, _classCallCheck2["default"])(this, RouterStatus);
    _this143 = _super143.call(this, 'Router Status', RouterStatus.UUID);

    _this143.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this143.value = _this143.getDefaultValue();
    return _this143;
  }

  return RouterStatus;
}(Characteristic);

exports.RouterStatus = RouterStatus;
(0, _defineProperty2["default"])(RouterStatus, "READY", 0);
(0, _defineProperty2["default"])(RouterStatus, "NOT_READY", 1);
(0, _defineProperty2["default"])(RouterStatus, "UUID", '0000020E-0000-1000-8000-0026BB765291');
Characteristic.RouterStatus = RouterStatus;
/**
 * Characteristic "Supported Router Configuration"
 */

var SupportedRouterConfiguration = /*#__PURE__*/function (_Characteristic144) {
  (0, _inherits2["default"])(SupportedRouterConfiguration, _Characteristic144);

  var _super144 = _createSuper(SupportedRouterConfiguration);

  function SupportedRouterConfiguration() {
    var _this144;

    (0, _classCallCheck2["default"])(this, SupportedRouterConfiguration);
    _this144 = _super144.call(this, 'Supported Router Configuration', SupportedRouterConfiguration.UUID);

    _this144.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ]
    });

    _this144.value = _this144.getDefaultValue();
    return _this144;
  }

  return SupportedRouterConfiguration;
}(Characteristic);

exports.SupportedRouterConfiguration = SupportedRouterConfiguration;
(0, _defineProperty2["default"])(SupportedRouterConfiguration, "UUID", '00000210-0000-1000-8000-0026BB765291');
Characteristic.SupportedRouterConfiguration = SupportedRouterConfiguration;
/**
 * Characteristic "WAN Configuration List"
 */

var WANConfigurationList = /*#__PURE__*/function (_Characteristic145) {
  (0, _inherits2["default"])(WANConfigurationList, _Characteristic145);

  var _super145 = _createSuper(WANConfigurationList);

  function WANConfigurationList() {
    var _this145;

    (0, _classCallCheck2["default"])(this, WANConfigurationList);
    _this145 = _super145.call(this, 'WAN Configuration List', WANConfigurationList.UUID);

    _this145.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this145.value = _this145.getDefaultValue();
    return _this145;
  }

  return WANConfigurationList;
}(Characteristic);

exports.WANConfigurationList = WANConfigurationList;
(0, _defineProperty2["default"])(WANConfigurationList, "UUID", '00000211-0000-1000-8000-0026BB765291');
Characteristic.WANConfigurationList = WANConfigurationList;
/**
 * Characteristic "WAN Status List"
 */

var WANStatusList = /*#__PURE__*/function (_Characteristic146) {
  (0, _inherits2["default"])(WANStatusList, _Characteristic146);

  var _super146 = _createSuper(WANStatusList);

  function WANStatusList() {
    var _this146;

    (0, _classCallCheck2["default"])(this, WANStatusList);
    _this146 = _super146.call(this, 'WAN Status List', WANStatusList.UUID);

    _this146.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.NOTIFY]
    });

    _this146.value = _this146.getDefaultValue();
    return _this146;
  }

  return WANStatusList;
}(Characteristic);

exports.WANStatusList = WANStatusList;
(0, _defineProperty2["default"])(WANStatusList, "UUID", '00000212-0000-1000-8000-0026BB765291');
Characteristic.WANStatusList = WANStatusList;
/**
 * Characteristic "Managed Network Enable"
 */

var ManagedNetworkEnable = /*#__PURE__*/function (_Characteristic147) {
  (0, _inherits2["default"])(ManagedNetworkEnable, _Characteristic147);

  var _super147 = _createSuper(ManagedNetworkEnable);

  function ManagedNetworkEnable() {
    var _this147;

    (0, _classCallCheck2["default"])(this, ManagedNetworkEnable);
    _this147 = _super147.call(this, 'Managed Network Enable', ManagedNetworkEnable.UUID);

    _this147.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY, Perms.TIMED_WRITE]
    });

    _this147.value = _this147.getDefaultValue();
    return _this147;
  }

  return ManagedNetworkEnable;
}(Characteristic);

exports.ManagedNetworkEnable = ManagedNetworkEnable;
(0, _defineProperty2["default"])(ManagedNetworkEnable, "DISABLED", 0);
(0, _defineProperty2["default"])(ManagedNetworkEnable, "ENABLED", 1);
(0, _defineProperty2["default"])(ManagedNetworkEnable, "UNKNOWN", 2);
(0, _defineProperty2["default"])(ManagedNetworkEnable, "UUID", '00000215-0000-1000-8000-0026BB765291');
Characteristic.ManagedNetworkEnable = ManagedNetworkEnable;
/**
 * Characteristic "Network Access Violation Control"
 */

var NetworkAccessViolationControl = /*#__PURE__*/function (_Characteristic148) {
  (0, _inherits2["default"])(NetworkAccessViolationControl, _Characteristic148);

  var _super148 = _createSuper(NetworkAccessViolationControl);

  function NetworkAccessViolationControl() {
    var _this148;

    (0, _classCallCheck2["default"])(this, NetworkAccessViolationControl);
    _this148 = _super148.call(this, 'Network Access Violation Control', NetworkAccessViolationControl.UUID);

    _this148.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY, Perms.TIMED_WRITE, Perms.WRITE_RESPONSE]
    });

    _this148.value = _this148.getDefaultValue();
    return _this148;
  }

  return NetworkAccessViolationControl;
}(Characteristic);

exports.NetworkAccessViolationControl = NetworkAccessViolationControl;
(0, _defineProperty2["default"])(NetworkAccessViolationControl, "UUID", '0000021F-0000-1000-8000-0026BB765291');
Characteristic.NetworkAccessViolationControl = NetworkAccessViolationControl;
/**
 * Characteristic "Wi-Fi Satellite Status"
 */

var WiFiSatelliteStatus = /*#__PURE__*/function (_Characteristic149) {
  (0, _inherits2["default"])(WiFiSatelliteStatus, _Characteristic149);

  var _super149 = _createSuper(WiFiSatelliteStatus);

  // The value property of WiFiSatelliteStatus must be one of the following:
  function WiFiSatelliteStatus() {
    var _this149;

    (0, _classCallCheck2["default"])(this, WiFiSatelliteStatus);
    _this149 = _super149.call(this, 'Wi-Fi Satellite Status', WiFiSatelliteStatus.UUID);

    _this149.setProps({
      format: Formats.UINT8,
      maxValue: 2,
      minValue: 0,
      validValues: [0, 1, 2],
      perms: [Perms.PAIRED_READ, Perms.NOTIFY]
    });

    _this149.value = _this149.getDefaultValue();
    return _this149;
  }

  return WiFiSatelliteStatus;
}(Characteristic);

exports.WiFiSatelliteStatus = WiFiSatelliteStatus;
(0, _defineProperty2["default"])(WiFiSatelliteStatus, "UNKNOWN", 0);
(0, _defineProperty2["default"])(WiFiSatelliteStatus, "CONNECTED", 1);
(0, _defineProperty2["default"])(WiFiSatelliteStatus, "NOT_CONNECTED", 2);
(0, _defineProperty2["default"])(WiFiSatelliteStatus, "UUID", '0000021E-0000-1000-8000-0026BB765291');
Characteristic.WiFiSatelliteStatus = WiFiSatelliteStatus;
/**
 * Characteristic "Wake Configuration"
 */

var WakeConfiguration = /*#__PURE__*/function (_Characteristic150) {
  (0, _inherits2["default"])(WakeConfiguration, _Characteristic150);

  var _super150 = _createSuper(WakeConfiguration);

  function WakeConfiguration() {
    var _this150;

    (0, _classCallCheck2["default"])(this, WakeConfiguration);
    _this150 = _super150.call(this, 'Wake Configuration', WakeConfiguration.UUID);

    _this150.setProps({
      format: Formats.TLV8,
      perms: [Perms.PAIRED_READ]
    });

    _this150.value = _this150.getDefaultValue();
    return _this150;
  }

  return WakeConfiguration;
}(Characteristic);

exports.WakeConfiguration = WakeConfiguration;
(0, _defineProperty2["default"])(WakeConfiguration, "UUID", '00000222-0000-1000-8000-0026BB765291');
Characteristic.WakeConfiguration = WakeConfiguration;
/**
 * Characteristic "Supported Transfer Transport Configuration"
 */

var SupportedTransferTransportConfiguration = /*#__PURE__*/function (_Characteristic151) {
  (0, _inherits2["default"])(SupportedTransferTransportConfiguration, _Characteristic151);

  var _super151 = _createSuper(SupportedTransferTransportConfiguration);

  function SupportedTransferTransportConfiguration() {
    var _this151;

    (0, _classCallCheck2["default"])(this, SupportedTransferTransportConfiguration);
    _this151 = _super151.call(this, 'Supported Transfer Transport Configuration', SupportedTransferTransportConfiguration.UUID);

    _this151.setProps({
      format: Formats.TLV8,
      perms: [Perms.PAIRED_READ]
    });

    _this151.value = _this151.getDefaultValue();
    return _this151;
  }

  return SupportedTransferTransportConfiguration;
}(Characteristic);

exports.SupportedTransferTransportConfiguration = SupportedTransferTransportConfiguration;
(0, _defineProperty2["default"])(SupportedTransferTransportConfiguration, "UUID", '00000202-0000-1000-8000-0026BB765291');
Characteristic.SupportedTransferTransportConfiguration = SupportedTransferTransportConfiguration;
/**
 * Characteristic "Setup Transfer Transport"
 */

var SetupTransferTransport = /*#__PURE__*/function (_Characteristic152) {
  (0, _inherits2["default"])(SetupTransferTransport, _Characteristic152);

  var _super152 = _createSuper(SetupTransferTransport);

  function SetupTransferTransport() {
    var _this152;

    (0, _classCallCheck2["default"])(this, SetupTransferTransport);
    _this152 = _super152.call(this, 'Setup Transfer Transport', SetupTransferTransport.UUID);

    _this152.setProps({
      format: Formats.TLV8,
      perms: [Perms.PAIRED_WRITE, Perms.WRITE_RESPONSE]
    });

    _this152.value = _this152.getDefaultValue();
    return _this152;
  }

  return SetupTransferTransport;
}(Characteristic);

exports.SetupTransferTransport = SetupTransferTransport;
(0, _defineProperty2["default"])(SetupTransferTransport, "UUID", '00000201-0000-1000-8000-0026BB765291');
Characteristic.SetupTransferTransport = SetupTransferTransport;
/**
 * Service "Access Control"
 */

var AccessControl = /*#__PURE__*/function (_Service) {
  (0, _inherits2["default"])(AccessControl, _Service);

  var _super153 = _createSuper(AccessControl);

  function AccessControl(logger, displayName, subtype, _id) {
    var _this153;

    (0, _classCallCheck2["default"])(this, AccessControl);
    _this153 = _super153.call(this, logger, displayName, AccessControl.UUID, subtype, _id); // Required Characteristics

    _this153.addCharacteristic(Characteristic.AccessControlLevel); // Optional Characteristics


    _this153.addOptionalCharacteristic(Characteristic.PasswordSetting);

    return _this153;
  }

  return AccessControl;
}(Service);
/**
 * Service "Accessory Information"
 */


exports.AccessControl = AccessControl;
(0, _defineProperty2["default"])(AccessControl, "UUID", '000000DA-0000-1000-8000-0026BB765291');

var AccessoryInformation = /*#__PURE__*/function (_Service2) {
  (0, _inherits2["default"])(AccessoryInformation, _Service2);

  var _super154 = _createSuper(AccessoryInformation);

  function AccessoryInformation(logger, displayName, subtype, _id) {
    var _this154;

    (0, _classCallCheck2["default"])(this, AccessoryInformation);
    _this154 = _super154.call(this, logger, displayName, AccessoryInformation.UUID, subtype, _id); // Required Characteristics

    _this154.addCharacteristic(Characteristic.Identify);

    _this154.addCharacteristic(Characteristic.Manufacturer);

    _this154.addCharacteristic(Characteristic.Model);

    _this154.addCharacteristic(Characteristic.Name);

    _this154.addCharacteristic(Characteristic.SerialNumber); // Optional Characteristics


    _this154.addOptionalCharacteristic(Characteristic.AccessoryFlags);

    _this154.addOptionalCharacteristic(Characteristic.AppMatchingIdentifier);

    _this154.addOptionalCharacteristic(Characteristic.ConfiguredName);

    _this154.addOptionalCharacteristic(Characteristic.FirmwareRevision);

    _this154.addOptionalCharacteristic(Characteristic.HardwareRevision);

    _this154.addOptionalCharacteristic(Characteristic.SoftwareRevision);

    _this154.addOptionalCharacteristic(Characteristic.ProductData);

    return _this154;
  }

  return AccessoryInformation;
}(Service);

exports.AccessoryInformation = AccessoryInformation;
(0, _defineProperty2["default"])(AccessoryInformation, "UUID", '0000003E-0000-1000-8000-0026BB765291');
Service.AccessoryInformation = AccessoryInformation;
/**
 * Service "Air Purifier"
 */

var AirPurifier = /*#__PURE__*/function (_Service3) {
  (0, _inherits2["default"])(AirPurifier, _Service3);

  var _super155 = _createSuper(AirPurifier);

  function AirPurifier(logger, displayName, subtype, _id) {
    var _this155;

    (0, _classCallCheck2["default"])(this, AirPurifier);
    _this155 = _super155.call(this, logger, displayName, AirPurifier.UUID, subtype, _id); // Required Characteristics

    _this155.addCharacteristic(Characteristic.Active);

    _this155.addCharacteristic(Characteristic.CurrentAirPurifierState);

    _this155.addCharacteristic(Characteristic.TargetAirPurifierState); // Optional Characteristics


    _this155.addOptionalCharacteristic(Characteristic.LockPhysicalControls);

    _this155.addOptionalCharacteristic(Characteristic.Name);

    _this155.addOptionalCharacteristic(Characteristic.SwingMode);

    _this155.addOptionalCharacteristic(Characteristic.RotationSpeed);

    return _this155;
  }

  return AirPurifier;
}(Service);

exports.AirPurifier = AirPurifier;
(0, _defineProperty2["default"])(AirPurifier, "UUID", '000000BB-0000-1000-8000-0026BB765291');
Service.AirPurifier = AirPurifier;
/**
 * Service "Air Quality Sensor"
 */

var AirQualitySensor = /*#__PURE__*/function (_Service4) {
  (0, _inherits2["default"])(AirQualitySensor, _Service4);

  var _super156 = _createSuper(AirQualitySensor);

  function AirQualitySensor(logger, displayName, subtype, _id) {
    var _this156;

    (0, _classCallCheck2["default"])(this, AirQualitySensor);
    _this156 = _super156.call(this, logger, displayName, AirQualitySensor.UUID, subtype, _id); // Required Characteristics

    _this156.addCharacteristic(Characteristic.AirQuality); // Optional Characteristics


    _this156.addOptionalCharacteristic(Characteristic.StatusActive);

    _this156.addOptionalCharacteristic(Characteristic.StatusFault);

    _this156.addOptionalCharacteristic(Characteristic.StatusTampered);

    _this156.addOptionalCharacteristic(Characteristic.StatusLowBattery);

    _this156.addOptionalCharacteristic(Characteristic.Name);

    _this156.addOptionalCharacteristic(Characteristic.OzoneDensity);

    _this156.addOptionalCharacteristic(Characteristic.NitrogenDioxideDensity);

    _this156.addOptionalCharacteristic(Characteristic.SulphurDioxideDensity);

    _this156.addOptionalCharacteristic(Characteristic.PM2_5Density);

    _this156.addOptionalCharacteristic(Characteristic.PM10Density);

    _this156.addOptionalCharacteristic(Characteristic.VOCDensity);

    return _this156;
  }

  return AirQualitySensor;
}(Service);

exports.AirQualitySensor = AirQualitySensor;
(0, _defineProperty2["default"])(AirQualitySensor, "UUID", '0000008D-0000-1000-8000-0026BB765291');
Service.AirQualitySensor = AirQualitySensor;
/**
 * Service "Battery Service"
 */

var BatteryService = /*#__PURE__*/function (_Service5) {
  (0, _inherits2["default"])(BatteryService, _Service5);

  var _super157 = _createSuper(BatteryService);

  function BatteryService(logger, displayName, subtype, _id) {
    var _this157;

    (0, _classCallCheck2["default"])(this, BatteryService);
    _this157 = _super157.call(this, logger, displayName, BatteryService.UUID, subtype, _id); // Required Characteristics

    _this157.addCharacteristic(Characteristic.BatteryLevel);

    _this157.addCharacteristic(Characteristic.ChargingState);

    _this157.addCharacteristic(Characteristic.StatusLowBattery); // Optional Characteristics


    _this157.addOptionalCharacteristic(Characteristic.Name);

    return _this157;
  }

  return BatteryService;
}(Service);

exports.BatteryService = BatteryService;
(0, _defineProperty2["default"])(BatteryService, "UUID", '00000096-0000-1000-8000-0026BB765291');
Service.BatteryService = BatteryService;
/**
 * Service "Camera RTP Stream Management"
 */

var CameraRTPStreamManagement = /*#__PURE__*/function (_Service6) {
  (0, _inherits2["default"])(CameraRTPStreamManagement, _Service6);

  var _super158 = _createSuper(CameraRTPStreamManagement);

  function CameraRTPStreamManagement(logger, displayName, subtype, _id) {
    var _this158;

    (0, _classCallCheck2["default"])(this, CameraRTPStreamManagement);
    _this158 = _super158.call(this, logger, displayName, CameraRTPStreamManagement.UUID, subtype, _id); // Required Characteristics

    _this158.addCharacteristic(Characteristic.SupportedVideoStreamConfiguration);

    _this158.addCharacteristic(Characteristic.SupportedAudioStreamConfiguration);

    _this158.addCharacteristic(Characteristic.SupportedRTPConfiguration);

    _this158.addCharacteristic(Characteristic.SelectedRTPStreamConfiguration);

    _this158.addCharacteristic(Characteristic.StreamingStatus);

    _this158.addCharacteristic(Characteristic.SetupEndpoints); // Optional Characteristics


    _this158.addOptionalCharacteristic(Characteristic.Active);

    return _this158;
  }

  return CameraRTPStreamManagement;
}(Service);

exports.CameraRTPStreamManagement = CameraRTPStreamManagement;
(0, _defineProperty2["default"])(CameraRTPStreamManagement, "UUID", '00000110-0000-1000-8000-0026BB765291');
Service.CameraRTPStreamManagement = CameraRTPStreamManagement;
/**
 * Service "Carbon Dioxide Sensor"
 */

var CarbonDioxideSensor = /*#__PURE__*/function (_Service7) {
  (0, _inherits2["default"])(CarbonDioxideSensor, _Service7);

  var _super159 = _createSuper(CarbonDioxideSensor);

  function CarbonDioxideSensor(logger, displayName, subtype, _id) {
    var _this159;

    (0, _classCallCheck2["default"])(this, CarbonDioxideSensor);
    _this159 = _super159.call(this, logger, displayName, CarbonDioxideSensor.UUID, subtype, _id); // Required Characteristics

    _this159.addCharacteristic(Characteristic.CarbonDioxideDetected); // Optional Characteristics


    _this159.addOptionalCharacteristic(Characteristic.StatusActive);

    _this159.addOptionalCharacteristic(Characteristic.StatusFault);

    _this159.addOptionalCharacteristic(Characteristic.StatusLowBattery);

    _this159.addOptionalCharacteristic(Characteristic.StatusTampered);

    _this159.addOptionalCharacteristic(Characteristic.CarbonDioxideLevel);

    _this159.addOptionalCharacteristic(Characteristic.CarbonDioxidePeakLevel);

    _this159.addOptionalCharacteristic(Characteristic.Name);

    return _this159;
  }

  return CarbonDioxideSensor;
}(Service);

exports.CarbonDioxideSensor = CarbonDioxideSensor;
(0, _defineProperty2["default"])(CarbonDioxideSensor, "UUID", '00000097-0000-1000-8000-0026BB765291');
Service.CarbonDioxideSensor = CarbonDioxideSensor;
/**
 * Service "Carbon Monoxide Sensor"
 */

var CarbonMonoxideSensor = /*#__PURE__*/function (_Service8) {
  (0, _inherits2["default"])(CarbonMonoxideSensor, _Service8);

  var _super160 = _createSuper(CarbonMonoxideSensor);

  function CarbonMonoxideSensor(logger, displayName, subtype, _id) {
    var _this160;

    (0, _classCallCheck2["default"])(this, CarbonMonoxideSensor);
    _this160 = _super160.call(this, logger, displayName, CarbonMonoxideSensor.UUID, subtype, _id); // Required Characteristics

    _this160.addCharacteristic(Characteristic.CarbonMonoxideDetected); // Optional Characteristics


    _this160.addOptionalCharacteristic(Characteristic.StatusActive);

    _this160.addOptionalCharacteristic(Characteristic.StatusFault);

    _this160.addOptionalCharacteristic(Characteristic.StatusLowBattery);

    _this160.addOptionalCharacteristic(Characteristic.StatusTampered);

    _this160.addOptionalCharacteristic(Characteristic.CarbonMonoxideLevel);

    _this160.addOptionalCharacteristic(Characteristic.CarbonMonoxidePeakLevel);

    _this160.addOptionalCharacteristic(Characteristic.Name);

    return _this160;
  }

  return CarbonMonoxideSensor;
}(Service);

exports.CarbonMonoxideSensor = CarbonMonoxideSensor;
(0, _defineProperty2["default"])(CarbonMonoxideSensor, "UUID", '0000007F-0000-1000-8000-0026BB765291');
Service.CarbonMonoxideSensor = CarbonMonoxideSensor;
/**
 * Service "Contact Sensor"
 */

var ContactSensor = /*#__PURE__*/function (_Service9) {
  (0, _inherits2["default"])(ContactSensor, _Service9);

  var _super161 = _createSuper(ContactSensor);

  function ContactSensor(logger, displayName, subtype, _id) {
    var _this161;

    (0, _classCallCheck2["default"])(this, ContactSensor);
    _this161 = _super161.call(this, logger, displayName, ContactSensor.UUID, subtype, _id); // Required Characteristics

    _this161.addCharacteristic(Characteristic.ContactSensorState); // Optional Characteristics


    _this161.addOptionalCharacteristic(Characteristic.StatusActive);

    _this161.addOptionalCharacteristic(Characteristic.StatusFault);

    _this161.addOptionalCharacteristic(Characteristic.StatusTampered);

    _this161.addOptionalCharacteristic(Characteristic.StatusLowBattery);

    _this161.addOptionalCharacteristic(Characteristic.Name);

    return _this161;
  }

  return ContactSensor;
}(Service);

exports.ContactSensor = ContactSensor;
(0, _defineProperty2["default"])(ContactSensor, "UUID", '00000080-0000-1000-8000-0026BB765291');
Service.ContactSensor = ContactSensor;
/**
 * Service "Door"
 */

var Door = /*#__PURE__*/function (_Service10) {
  (0, _inherits2["default"])(Door, _Service10);

  var _super162 = _createSuper(Door);

  function Door(logger, displayName, subtype, _id) {
    var _this162;

    (0, _classCallCheck2["default"])(this, Door);
    _this162 = _super162.call(this, logger, displayName, Door.UUID, subtype, _id); // Required Characteristics

    _this162.addCharacteristic(Characteristic.CurrentPosition);

    _this162.addCharacteristic(Characteristic.PositionState);

    _this162.addCharacteristic(Characteristic.TargetPosition); // Optional Characteristics


    _this162.addOptionalCharacteristic(Characteristic.HoldPosition);

    _this162.addOptionalCharacteristic(Characteristic.ObstructionDetected);

    _this162.addOptionalCharacteristic(Characteristic.Name);

    return _this162;
  }

  return Door;
}(Service);

exports.Door = Door;
(0, _defineProperty2["default"])(Door, "UUID", '00000081-0000-1000-8000-0026BB765291');
Service.Door = Door;
/**
 * Service "Doorbell"
 */

var Doorbell = /*#__PURE__*/function (_Service11) {
  (0, _inherits2["default"])(Doorbell, _Service11);

  var _super163 = _createSuper(Doorbell);

  function Doorbell(logger, displayName, subtype, _id) {
    var _this163;

    (0, _classCallCheck2["default"])(this, Doorbell);
    _this163 = _super163.call(this, logger, displayName, Doorbell.UUID, subtype, _id); // Required Characteristics

    _this163.addCharacteristic(Characteristic.ProgrammableSwitchEvent); // Optional Characteristics


    _this163.addOptionalCharacteristic(Characteristic.Brightness);

    _this163.addOptionalCharacteristic(Characteristic.Volume);

    _this163.addOptionalCharacteristic(Characteristic.Name);

    return _this163;
  }

  return Doorbell;
}(Service);

exports.Doorbell = Doorbell;
(0, _defineProperty2["default"])(Doorbell, "UUID", '00000121-0000-1000-8000-0026BB765291');
Service.Doorbell = Doorbell;
/**
 * Service "Fan"
 */

var Fan = /*#__PURE__*/function (_Service12) {
  (0, _inherits2["default"])(Fan, _Service12);

  var _super164 = _createSuper(Fan);

  function Fan(logger, displayName, subtype, _id) {
    var _this164;

    (0, _classCallCheck2["default"])(this, Fan);
    _this164 = _super164.call(this, logger, displayName, Fan.UUID, subtype, _id); // Required Characteristics

    _this164.addCharacteristic(Characteristic.On); // Optional Characteristics


    _this164.addOptionalCharacteristic(Characteristic.RotationDirection);

    _this164.addOptionalCharacteristic(Characteristic.RotationSpeed);

    _this164.addOptionalCharacteristic(Characteristic.Name);

    return _this164;
  }

  return Fan;
}(Service);

exports.Fan = Fan;
(0, _defineProperty2["default"])(Fan, "UUID", '00000040-0000-1000-8000-0026BB765291');
Service.Fan = Fan;
/**
 * Service "Fan v2"
 */

var Fanv2 = /*#__PURE__*/function (_Service13) {
  (0, _inherits2["default"])(Fanv2, _Service13);

  var _super165 = _createSuper(Fanv2);

  function Fanv2(logger, displayName, subtype, _id) {
    var _this165;

    (0, _classCallCheck2["default"])(this, Fanv2);
    _this165 = _super165.call(this, logger, displayName, Fanv2.UUID, subtype, _id); // Required Characteristics

    _this165.addCharacteristic(Characteristic.Active); // Optional Characteristics


    _this165.addOptionalCharacteristic(Characteristic.CurrentFanState);

    _this165.addOptionalCharacteristic(Characteristic.TargetFanState);

    _this165.addOptionalCharacteristic(Characteristic.LockPhysicalControls);

    _this165.addOptionalCharacteristic(Characteristic.Name);

    _this165.addOptionalCharacteristic(Characteristic.RotationDirection);

    _this165.addOptionalCharacteristic(Characteristic.RotationSpeed);

    _this165.addOptionalCharacteristic(Characteristic.SwingMode);

    return _this165;
  }

  return Fanv2;
}(Service);

exports.Fanv2 = Fanv2;
(0, _defineProperty2["default"])(Fanv2, "UUID", '000000B7-0000-1000-8000-0026BB765291');
Service.Fanv2 = Fanv2;
/**
 * Service "Filter Maintenance"
 */

var FilterMaintenance = /*#__PURE__*/function (_Service14) {
  (0, _inherits2["default"])(FilterMaintenance, _Service14);

  var _super166 = _createSuper(FilterMaintenance);

  function FilterMaintenance(logger, displayName, subtype, _id) {
    var _this166;

    (0, _classCallCheck2["default"])(this, FilterMaintenance);
    _this166 = _super166.call(this, logger, displayName, FilterMaintenance.UUID, subtype, _id); // Required Characteristics

    _this166.addCharacteristic(Characteristic.FilterChangeIndication); // Optional Characteristics


    _this166.addOptionalCharacteristic(Characteristic.FilterLifeLevel);

    _this166.addOptionalCharacteristic(Characteristic.ResetFilterIndication);

    _this166.addOptionalCharacteristic(Characteristic.Name);

    return _this166;
  }

  return FilterMaintenance;
}(Service);

exports.FilterMaintenance = FilterMaintenance;
(0, _defineProperty2["default"])(FilterMaintenance, "UUID", '000000BA-0000-1000-8000-0026BB765291');
Service.FilterMaintenance = FilterMaintenance;
/**
 * Service "Faucet"
 */

var Faucet = /*#__PURE__*/function (_Service15) {
  (0, _inherits2["default"])(Faucet, _Service15);

  var _super167 = _createSuper(Faucet);

  function Faucet(logger, displayName, subtype, _id) {
    var _this167;

    (0, _classCallCheck2["default"])(this, Faucet);
    _this167 = _super167.call(this, logger, displayName, Faucet.UUID, subtype, _id); // Required Characteristics

    _this167.addCharacteristic(Characteristic.Active); // Optional Characteristics


    _this167.addOptionalCharacteristic(Characteristic.Name);

    _this167.addOptionalCharacteristic(Characteristic.StatusFault);

    return _this167;
  }

  return Faucet;
}(Service);

exports.Faucet = Faucet;
(0, _defineProperty2["default"])(Faucet, "UUID", '000000D7-0000-1000-8000-0026BB765291');
Service.Faucet = Faucet;
/**
 * Service "Garage Door Opener"
 */

var GarageDoorOpener = /*#__PURE__*/function (_Service16) {
  (0, _inherits2["default"])(GarageDoorOpener, _Service16);

  var _super168 = _createSuper(GarageDoorOpener);

  function GarageDoorOpener(logger, displayName, subtype, _id) {
    var _this168;

    (0, _classCallCheck2["default"])(this, GarageDoorOpener);
    _this168 = _super168.call(this, logger, displayName, GarageDoorOpener.UUID, subtype, _id); // Required Characteristics

    _this168.addCharacteristic(Characteristic.CurrentDoorState);

    _this168.addCharacteristic(Characteristic.TargetDoorState);

    _this168.addCharacteristic(Characteristic.ObstructionDetected); // Optional Characteristics


    _this168.addOptionalCharacteristic(Characteristic.LockCurrentState);

    _this168.addOptionalCharacteristic(Characteristic.LockTargetState);

    _this168.addOptionalCharacteristic(Characteristic.Name);

    return _this168;
  }

  return GarageDoorOpener;
}(Service);

exports.GarageDoorOpener = GarageDoorOpener;
(0, _defineProperty2["default"])(GarageDoorOpener, "UUID", '00000041-0000-1000-8000-0026BB765291');
Service.GarageDoorOpener = GarageDoorOpener;
/**
 * Service "Heater Cooler"
 */

var HeaterCooler = /*#__PURE__*/function (_Service17) {
  (0, _inherits2["default"])(HeaterCooler, _Service17);

  var _super169 = _createSuper(HeaterCooler);

  function HeaterCooler(logger, displayName, subtype, _id) {
    var _this169;

    (0, _classCallCheck2["default"])(this, HeaterCooler);
    _this169 = _super169.call(this, logger, displayName, HeaterCooler.UUID, subtype, _id); // Required Characteristics

    _this169.addCharacteristic(Characteristic.Active);

    _this169.addCharacteristic(Characteristic.CurrentHeaterCoolerState);

    _this169.addCharacteristic(Characteristic.TargetHeaterCoolerState);

    _this169.addCharacteristic(Characteristic.CurrentTemperature); // Optional Characteristics


    _this169.addOptionalCharacteristic(Characteristic.LockPhysicalControls);

    _this169.addOptionalCharacteristic(Characteristic.Name);

    _this169.addOptionalCharacteristic(Characteristic.SwingMode);

    _this169.addOptionalCharacteristic(Characteristic.CoolingThresholdTemperature);

    _this169.addOptionalCharacteristic(Characteristic.HeatingThresholdTemperature);

    _this169.addOptionalCharacteristic(Characteristic.TemperatureDisplayUnits);

    _this169.addOptionalCharacteristic(Characteristic.RotationSpeed);

    return _this169;
  }

  return HeaterCooler;
}(Service);

exports.HeaterCooler = HeaterCooler;
(0, _defineProperty2["default"])(HeaterCooler, "UUID", '000000BC-0000-1000-8000-0026BB765291');
Service.HeaterCooler = HeaterCooler;
/**
 * Service "Humidifier Dehumidifier"
 */

var HumidifierDehumidifier = /*#__PURE__*/function (_Service18) {
  (0, _inherits2["default"])(HumidifierDehumidifier, _Service18);

  var _super170 = _createSuper(HumidifierDehumidifier);

  function HumidifierDehumidifier(logger, displayName, subtype, _id) {
    var _this170;

    (0, _classCallCheck2["default"])(this, HumidifierDehumidifier);
    _this170 = _super170.call(this, logger, displayName, HumidifierDehumidifier.UUID, subtype, _id); // Required Characteristics

    _this170.addCharacteristic(Characteristic.CurrentRelativeHumidity);

    _this170.addCharacteristic(Characteristic.CurrentHumidifierDehumidifierState);

    _this170.addCharacteristic(Characteristic.TargetHumidifierDehumidifierState);

    _this170.addCharacteristic(Characteristic.Active); // Optional Characteristics


    _this170.addOptionalCharacteristic(Characteristic.LockPhysicalControls);

    _this170.addOptionalCharacteristic(Characteristic.Name);

    _this170.addOptionalCharacteristic(Characteristic.SwingMode);

    _this170.addOptionalCharacteristic(Characteristic.WaterLevel);

    _this170.addOptionalCharacteristic(Characteristic.RelativeHumidityDehumidifierThreshold);

    _this170.addOptionalCharacteristic(Characteristic.RelativeHumidityHumidifierThreshold);

    _this170.addOptionalCharacteristic(Characteristic.RotationSpeed);

    return _this170;
  }

  return HumidifierDehumidifier;
}(Service);

exports.HumidifierDehumidifier = HumidifierDehumidifier;
(0, _defineProperty2["default"])(HumidifierDehumidifier, "UUID", '000000BD-0000-1000-8000-0026BB765291');
Service.HumidifierDehumidifier = HumidifierDehumidifier;
/**
 * Service "Humidity Sensor"
 */

var HumiditySensor = /*#__PURE__*/function (_Service19) {
  (0, _inherits2["default"])(HumiditySensor, _Service19);

  var _super171 = _createSuper(HumiditySensor);

  function HumiditySensor(logger, displayName, subtype, _id) {
    var _this171;

    (0, _classCallCheck2["default"])(this, HumiditySensor);
    _this171 = _super171.call(this, logger, displayName, HumiditySensor.UUID, subtype, _id); // Required Characteristics

    _this171.addCharacteristic(Characteristic.CurrentRelativeHumidity); // Optional Characteristics


    _this171.addOptionalCharacteristic(Characteristic.StatusActive);

    _this171.addOptionalCharacteristic(Characteristic.StatusFault);

    _this171.addOptionalCharacteristic(Characteristic.StatusTampered);

    _this171.addOptionalCharacteristic(Characteristic.StatusLowBattery);

    _this171.addOptionalCharacteristic(Characteristic.Name);

    return _this171;
  }

  return HumiditySensor;
}(Service);

exports.HumiditySensor = HumiditySensor;
(0, _defineProperty2["default"])(HumiditySensor, "UUID", '00000082-0000-1000-8000-0026BB765291');
Service.HumiditySensor = HumiditySensor;
/**
 * Service "Irrigation System"
 */

var IrrigationSystem = /*#__PURE__*/function (_Service20) {
  (0, _inherits2["default"])(IrrigationSystem, _Service20);

  var _super172 = _createSuper(IrrigationSystem);

  function IrrigationSystem(logger, displayName, subtype, _id) {
    var _this172;

    (0, _classCallCheck2["default"])(this, IrrigationSystem);
    _this172 = _super172.call(this, logger, displayName, IrrigationSystem.UUID, subtype, _id); // Required Characteristics

    _this172.addCharacteristic(Characteristic.Active);

    _this172.addCharacteristic(Characteristic.ProgramMode);

    _this172.addCharacteristic(Characteristic.InUse); // Optional Characteristics


    _this172.addOptionalCharacteristic(Characteristic.Name);

    _this172.addOptionalCharacteristic(Characteristic.RemainingDuration);

    _this172.addOptionalCharacteristic(Characteristic.StatusFault);

    return _this172;
  }

  return IrrigationSystem;
}(Service);

exports.IrrigationSystem = IrrigationSystem;
(0, _defineProperty2["default"])(IrrigationSystem, "UUID", '000000CF-0000-1000-8000-0026BB765291');
Service.IrrigationSystem = IrrigationSystem;
/**
 * Service "Leak Sensor"
 */

var LeakSensor = /*#__PURE__*/function (_Service21) {
  (0, _inherits2["default"])(LeakSensor, _Service21);

  var _super173 = _createSuper(LeakSensor);

  function LeakSensor(logger, displayName, subtype, _id) {
    var _this173;

    (0, _classCallCheck2["default"])(this, LeakSensor);
    _this173 = _super173.call(this, logger, displayName, LeakSensor.UUID, subtype, _id); // Required Characteristics

    _this173.addCharacteristic(Characteristic.LeakDetected); // Optional Characteristics


    _this173.addOptionalCharacteristic(Characteristic.StatusActive);

    _this173.addOptionalCharacteristic(Characteristic.StatusFault);

    _this173.addOptionalCharacteristic(Characteristic.StatusTampered);

    _this173.addOptionalCharacteristic(Characteristic.StatusLowBattery);

    _this173.addOptionalCharacteristic(Characteristic.Name);

    return _this173;
  }

  return LeakSensor;
}(Service);

exports.LeakSensor = LeakSensor;
(0, _defineProperty2["default"])(LeakSensor, "UUID", '00000083-0000-1000-8000-0026BB765291');
Service.LeakSensor = LeakSensor;
/**
 * Service "Light Sensor"
 */

var LightSensor = /*#__PURE__*/function (_Service22) {
  (0, _inherits2["default"])(LightSensor, _Service22);

  var _super174 = _createSuper(LightSensor);

  function LightSensor(logger, displayName, subtype, _id) {
    var _this174;

    (0, _classCallCheck2["default"])(this, LightSensor);
    _this174 = _super174.call(this, logger, displayName, LightSensor.UUID, subtype, _id); // Required Characteristics

    _this174.addCharacteristic(Characteristic.CurrentAmbientLightLevel); // Optional Characteristics


    _this174.addOptionalCharacteristic(Characteristic.StatusActive);

    _this174.addOptionalCharacteristic(Characteristic.StatusFault);

    _this174.addOptionalCharacteristic(Characteristic.StatusTampered);

    _this174.addOptionalCharacteristic(Characteristic.StatusLowBattery);

    _this174.addOptionalCharacteristic(Characteristic.Name);

    return _this174;
  }

  return LightSensor;
}(Service);

exports.LightSensor = LightSensor;
(0, _defineProperty2["default"])(LightSensor, "UUID", '00000084-0000-1000-8000-0026BB765291');
Service.LightSensor = LightSensor;
/**
 * Service "Lightbulb"
 */

var Lightbulb = /*#__PURE__*/function (_Service23) {
  (0, _inherits2["default"])(Lightbulb, _Service23);

  var _super175 = _createSuper(Lightbulb);

  function Lightbulb(logger, displayName, subtype, _id) {
    var _this175;

    (0, _classCallCheck2["default"])(this, Lightbulb);
    _this175 = _super175.call(this, logger, displayName, Lightbulb.UUID, subtype, _id); // Required Characteristics

    _this175.addCharacteristic(Characteristic.On); // Optional Characteristics


    _this175.addOptionalCharacteristic(Characteristic.Brightness);

    _this175.addOptionalCharacteristic(Characteristic.Hue);

    _this175.addOptionalCharacteristic(Characteristic.Saturation);

    _this175.addOptionalCharacteristic(Characteristic.Name);

    _this175.addOptionalCharacteristic(Characteristic.ColorTemperature); //Manual fix to add temperature


    return _this175;
  }

  return Lightbulb;
}(Service);

exports.Lightbulb = Lightbulb;
(0, _defineProperty2["default"])(Lightbulb, "UUID", '00000043-0000-1000-8000-0026BB765291');
Service.Lightbulb = Lightbulb;
/**
 * Service "Lock Management"
 */

var LockManagement = /*#__PURE__*/function (_Service24) {
  (0, _inherits2["default"])(LockManagement, _Service24);

  var _super176 = _createSuper(LockManagement);

  function LockManagement(logger, displayName, subtype, _id) {
    var _this176;

    (0, _classCallCheck2["default"])(this, LockManagement);
    _this176 = _super176.call(this, logger, displayName, LockManagement.UUID, subtype, _id); // Required Characteristics

    _this176.addCharacteristic(Characteristic.LockControlPoint);

    _this176.addCharacteristic(Characteristic.Version); // Optional Characteristics


    _this176.addOptionalCharacteristic(Characteristic.Logs);

    _this176.addOptionalCharacteristic(Characteristic.AudioFeedback);

    _this176.addOptionalCharacteristic(Characteristic.LockManagementAutoSecurityTimeout);

    _this176.addOptionalCharacteristic(Characteristic.AdministratorOnlyAccess);

    _this176.addOptionalCharacteristic(Characteristic.LockLastKnownAction);

    _this176.addOptionalCharacteristic(Characteristic.CurrentDoorState);

    _this176.addOptionalCharacteristic(Characteristic.MotionDetected);

    _this176.addOptionalCharacteristic(Characteristic.Name);

    return _this176;
  }

  return LockManagement;
}(Service);

exports.LockManagement = LockManagement;
(0, _defineProperty2["default"])(LockManagement, "UUID", '00000044-0000-1000-8000-0026BB765291');
Service.LockManagement = LockManagement;
/**
 * Service "Lock Mechanism"
 */

var LockMechanism = /*#__PURE__*/function (_Service25) {
  (0, _inherits2["default"])(LockMechanism, _Service25);

  var _super177 = _createSuper(LockMechanism);

  function LockMechanism(logger, displayName, subtype, _id) {
    var _this177;

    (0, _classCallCheck2["default"])(this, LockMechanism);
    _this177 = _super177.call(this, logger, displayName, LockMechanism.UUID, subtype, _id); // Required Characteristics

    _this177.addCharacteristic(Characteristic.LockCurrentState);

    _this177.addCharacteristic(Characteristic.LockTargetState); // Optional Characteristics


    _this177.addOptionalCharacteristic(Characteristic.Name);

    return _this177;
  }

  return LockMechanism;
}(Service);

exports.LockMechanism = LockMechanism;
(0, _defineProperty2["default"])(LockMechanism, "UUID", '00000045-0000-1000-8000-0026BB765291');
Service.LockMechanism = LockMechanism;
/**
 * Service "Microphone"
 */

var Microphone = /*#__PURE__*/function (_Service26) {
  (0, _inherits2["default"])(Microphone, _Service26);

  var _super178 = _createSuper(Microphone);

  function Microphone(logger, displayName, subtype, _id) {
    var _this178;

    (0, _classCallCheck2["default"])(this, Microphone);
    _this178 = _super178.call(this, logger, displayName, Microphone.UUID, subtype, _id); // Required Characteristics

    _this178.addCharacteristic(Characteristic.Mute); // Optional Characteristics


    _this178.addOptionalCharacteristic(Characteristic.Volume);

    return _this178;
  }

  return Microphone;
}(Service);

exports.Microphone = Microphone;
(0, _defineProperty2["default"])(Microphone, "UUID", '00000112-0000-1000-8000-0026BB765291');
Service.Microphone = Microphone;
/**
 * Service "Motion Sensor"
 */

var MotionSensor = /*#__PURE__*/function (_Service27) {
  (0, _inherits2["default"])(MotionSensor, _Service27);

  var _super179 = _createSuper(MotionSensor);

  function MotionSensor(logger, displayName, subtype, _id) {
    var _this179;

    (0, _classCallCheck2["default"])(this, MotionSensor);
    _this179 = _super179.call(this, logger, displayName, MotionSensor.UUID, subtype, _id); // Required Characteristics

    _this179.addCharacteristic(Characteristic.MotionDetected); // Optional Characteristics


    _this179.addOptionalCharacteristic(Characteristic.StatusActive);

    _this179.addOptionalCharacteristic(Characteristic.StatusFault);

    _this179.addOptionalCharacteristic(Characteristic.StatusTampered);

    _this179.addOptionalCharacteristic(Characteristic.StatusLowBattery);

    _this179.addOptionalCharacteristic(Characteristic.Name);

    return _this179;
  }

  return MotionSensor;
}(Service);

exports.MotionSensor = MotionSensor;
(0, _defineProperty2["default"])(MotionSensor, "UUID", '00000085-0000-1000-8000-0026BB765291');
Service.MotionSensor = MotionSensor;
/**
 * Service "Occupancy Sensor"
 */

var OccupancySensor = /*#__PURE__*/function (_Service28) {
  (0, _inherits2["default"])(OccupancySensor, _Service28);

  var _super180 = _createSuper(OccupancySensor);

  function OccupancySensor(logger, displayName, subtype, _id) {
    var _this180;

    (0, _classCallCheck2["default"])(this, OccupancySensor);
    _this180 = _super180.call(this, logger, displayName, OccupancySensor.UUID, subtype, _id); // Required Characteristics

    _this180.addCharacteristic(Characteristic.OccupancyDetected); // Optional Characteristics


    _this180.addOptionalCharacteristic(Characteristic.StatusActive);

    _this180.addOptionalCharacteristic(Characteristic.StatusFault);

    _this180.addOptionalCharacteristic(Characteristic.StatusTampered);

    _this180.addOptionalCharacteristic(Characteristic.StatusLowBattery);

    _this180.addOptionalCharacteristic(Characteristic.Name);

    return _this180;
  }

  return OccupancySensor;
}(Service);

exports.OccupancySensor = OccupancySensor;
(0, _defineProperty2["default"])(OccupancySensor, "UUID", '00000086-0000-1000-8000-0026BB765291');
Service.OccupancySensor = OccupancySensor;
/**
 * Service "Outlet"
 */

var Outlet = /*#__PURE__*/function (_Service29) {
  (0, _inherits2["default"])(Outlet, _Service29);

  var _super181 = _createSuper(Outlet);

  function Outlet(logger, displayName, subtype, _id) {
    var _this181;

    (0, _classCallCheck2["default"])(this, Outlet);
    _this181 = _super181.call(this, logger, displayName, Outlet.UUID, subtype, _id); // Required Characteristics

    _this181.addCharacteristic(Characteristic.On);

    _this181.addCharacteristic(Characteristic.OutletInUse); // Optional Characteristics


    _this181.addOptionalCharacteristic(Characteristic.Name);

    return _this181;
  }

  return Outlet;
}(Service);

exports.Outlet = Outlet;
(0, _defineProperty2["default"])(Outlet, "UUID", '00000047-0000-1000-8000-0026BB765291');
Service.Outlet = Outlet;
/**
 * Service "Security System"
 */

var SecuritySystem = /*#__PURE__*/function (_Service30) {
  (0, _inherits2["default"])(SecuritySystem, _Service30);

  var _super182 = _createSuper(SecuritySystem);

  function SecuritySystem(logger, displayName, subtype, _id) {
    var _this182;

    (0, _classCallCheck2["default"])(this, SecuritySystem);
    _this182 = _super182.call(this, logger, displayName, SecuritySystem.UUID, subtype, _id); // Required Characteristics

    _this182.addCharacteristic(Characteristic.SecuritySystemCurrentState);

    _this182.addCharacteristic(Characteristic.SecuritySystemTargetState); // Optional Characteristics


    _this182.addOptionalCharacteristic(Characteristic.StatusFault);

    _this182.addOptionalCharacteristic(Characteristic.StatusTampered);

    _this182.addOptionalCharacteristic(Characteristic.SecuritySystemAlarmType);

    _this182.addOptionalCharacteristic(Characteristic.Name);

    return _this182;
  }

  return SecuritySystem;
}(Service);

exports.SecuritySystem = SecuritySystem;
(0, _defineProperty2["default"])(SecuritySystem, "UUID", '0000007E-0000-1000-8000-0026BB765291');
Service.SecuritySystem = SecuritySystem;
/**
 * Service "Service Label"
 */

var ServiceLabel = /*#__PURE__*/function (_Service31) {
  (0, _inherits2["default"])(ServiceLabel, _Service31);

  var _super183 = _createSuper(ServiceLabel);

  function ServiceLabel(logger, displayName, subtype, _id) {
    var _this183;

    (0, _classCallCheck2["default"])(this, ServiceLabel);
    _this183 = _super183.call(this, logger, displayName, ServiceLabel.UUID, subtype, _id); // Required Characteristics

    _this183.addCharacteristic(Characteristic.ServiceLabelNamespace); // Optional Characteristics


    _this183.addOptionalCharacteristic(Characteristic.Name);

    return _this183;
  }

  return ServiceLabel;
}(Service);

exports.ServiceLabel = ServiceLabel;
(0, _defineProperty2["default"])(ServiceLabel, "UUID", '000000CC-0000-1000-8000-0026BB765291');
Service.ServiceLabel = ServiceLabel;
/**
 * Service "Slat"
 */

var Slat = /*#__PURE__*/function (_Service32) {
  (0, _inherits2["default"])(Slat, _Service32);

  var _super184 = _createSuper(Slat);

  function Slat(logger, displayName, subtype, _id) {
    var _this184;

    (0, _classCallCheck2["default"])(this, Slat);
    _this184 = _super184.call(this, logger, displayName, Slat.UUID, subtype, _id); // Required Characteristics

    _this184.addCharacteristic(Characteristic.SlatType);

    _this184.addCharacteristic(Characteristic.CurrentSlatState); // Optional Characteristics


    _this184.addOptionalCharacteristic(Characteristic.Name);

    _this184.addOptionalCharacteristic(Characteristic.CurrentTiltAngle);

    _this184.addOptionalCharacteristic(Characteristic.TargetTiltAngle);

    _this184.addOptionalCharacteristic(Characteristic.SwingMode);

    return _this184;
  }

  return Slat;
}(Service);

exports.Slat = Slat;
(0, _defineProperty2["default"])(Slat, "UUID", '000000B9-0000-1000-8000-0026BB765291');
Service.Slat = Slat;
/**
 * Service "Smoke Sensor"
 */

var SmokeSensor = /*#__PURE__*/function (_Service33) {
  (0, _inherits2["default"])(SmokeSensor, _Service33);

  var _super185 = _createSuper(SmokeSensor);

  function SmokeSensor(logger, displayName, subtype, _id) {
    var _this185;

    (0, _classCallCheck2["default"])(this, SmokeSensor);
    _this185 = _super185.call(this, logger, displayName, SmokeSensor.UUID, subtype, _id); // Required Characteristics

    _this185.addCharacteristic(Characteristic.SmokeDetected); // Optional Characteristics


    _this185.addOptionalCharacteristic(Characteristic.StatusActive);

    _this185.addOptionalCharacteristic(Characteristic.StatusFault);

    _this185.addOptionalCharacteristic(Characteristic.StatusTampered);

    _this185.addOptionalCharacteristic(Characteristic.StatusLowBattery);

    _this185.addOptionalCharacteristic(Characteristic.Name);

    return _this185;
  }

  return SmokeSensor;
}(Service);

exports.SmokeSensor = SmokeSensor;
(0, _defineProperty2["default"])(SmokeSensor, "UUID", '00000087-0000-1000-8000-0026BB765291');
Service.SmokeSensor = SmokeSensor;
/**
 * Service "Smart Speaker"
 */

var SmartSpeaker = /*#__PURE__*/function (_Service34) {
  (0, _inherits2["default"])(SmartSpeaker, _Service34);

  var _super186 = _createSuper(SmartSpeaker);

  function SmartSpeaker(logger, displayName, subtype, _id) {
    var _this186;

    (0, _classCallCheck2["default"])(this, SmartSpeaker);
    _this186 = _super186.call(this, logger, displayName, SmartSpeaker.UUID, subtype, _id); // Required Characteristics

    _this186.addCharacteristic(Characteristic.CurrentMediaState);

    _this186.addCharacteristic(Characteristic.TargetMediaState); // Optional Characteristics


    _this186.addOptionalCharacteristic(Characteristic.Name);

    _this186.addOptionalCharacteristic(Characteristic.ConfiguredName);

    _this186.addOptionalCharacteristic(Characteristic.Volume);

    _this186.addOptionalCharacteristic(Characteristic.Mute);

    return _this186;
  }

  return SmartSpeaker;
}(Service);

exports.SmartSpeaker = SmartSpeaker;
(0, _defineProperty2["default"])(SmartSpeaker, "UUID", '00000228-0000-1000-8000-0026BB765291');
Service.SmartSpeaker = SmartSpeaker;
/**
 * Service "Speaker"
 *
 * {@see TelevisionSpeaker} for the same Service defined with {@link VolumeControlType},
 * {@link VolumeSelector} and {@link Active} characteristics.
 */

var Speaker = /*#__PURE__*/function (_Service35) {
  (0, _inherits2["default"])(Speaker, _Service35);

  var _super187 = _createSuper(Speaker);

  function Speaker(logger, displayName, subtype, _id) {
    var _this187;

    (0, _classCallCheck2["default"])(this, Speaker);
    _this187 = _super187.call(this, logger, displayName, Speaker.UUID, subtype, _id); // Required Characteristics

    _this187.addCharacteristic(Characteristic.Mute); // Optional Characteristics


    _this187.addOptionalCharacteristic(Characteristic.Volume);

    return _this187;
  }

  return Speaker;
}(Service);

exports.Speaker = Speaker;
(0, _defineProperty2["default"])(Speaker, "UUID", '00000113-0000-1000-8000-0026BB765291');
Service.Speaker = Speaker;
/**
 * Service "Stateless Programmable Switch"
 */

var StatelessProgrammableSwitch = /*#__PURE__*/function (_Service36) {
  (0, _inherits2["default"])(StatelessProgrammableSwitch, _Service36);

  var _super188 = _createSuper(StatelessProgrammableSwitch);

  function StatelessProgrammableSwitch(logger, displayName, subtype, _id) {
    var _this188;

    (0, _classCallCheck2["default"])(this, StatelessProgrammableSwitch);
    _this188 = _super188.call(this, logger, displayName, StatelessProgrammableSwitch.UUID, subtype, _id); // Required Characteristics

    _this188.addCharacteristic(Characteristic.ProgrammableSwitchEvent); // Optional Characteristics


    _this188.addOptionalCharacteristic(Characteristic.Name);

    _this188.addOptionalCharacteristic(Characteristic.ServiceLabelIndex);

    return _this188;
  }

  return StatelessProgrammableSwitch;
}(Service);

exports.StatelessProgrammableSwitch = StatelessProgrammableSwitch;
(0, _defineProperty2["default"])(StatelessProgrammableSwitch, "UUID", '00000089-0000-1000-8000-0026BB765291');
Service.StatelessProgrammableSwitch = StatelessProgrammableSwitch;
/**
 * Service "Switch"
 */

var Switch = /*#__PURE__*/function (_Service37) {
  (0, _inherits2["default"])(Switch, _Service37);

  var _super189 = _createSuper(Switch);

  function Switch(logger, displayName, subtype, _id) {
    var _this189;

    (0, _classCallCheck2["default"])(this, Switch);
    _this189 = _super189.call(this, logger, displayName, Switch.UUID, subtype, _id); // Required Characteristics

    _this189.addCharacteristic(Characteristic.On); // Optional Characteristics


    _this189.addOptionalCharacteristic(Characteristic.Name);

    return _this189;
  }

  return Switch;
}(Service);

exports.Switch = Switch;
(0, _defineProperty2["default"])(Switch, "UUID", '00000049-0000-1000-8000-0026BB765291');
Service.Switch = Switch;
/**
 * Service "Temperature Sensor"
 */

var TemperatureSensor = /*#__PURE__*/function (_Service38) {
  (0, _inherits2["default"])(TemperatureSensor, _Service38);

  var _super190 = _createSuper(TemperatureSensor);

  function TemperatureSensor(logger, displayName, subtype, _id) {
    var _this190;

    (0, _classCallCheck2["default"])(this, TemperatureSensor);
    _this190 = _super190.call(this, logger, displayName, TemperatureSensor.UUID, subtype, _id); // Required Characteristics

    _this190.addCharacteristic(Characteristic.CurrentTemperature); // Optional Characteristics


    _this190.addOptionalCharacteristic(Characteristic.StatusActive);

    _this190.addOptionalCharacteristic(Characteristic.StatusFault);

    _this190.addOptionalCharacteristic(Characteristic.StatusLowBattery);

    _this190.addOptionalCharacteristic(Characteristic.StatusTampered);

    _this190.addOptionalCharacteristic(Characteristic.Name);

    return _this190;
  }

  return TemperatureSensor;
}(Service);

exports.TemperatureSensor = TemperatureSensor;
(0, _defineProperty2["default"])(TemperatureSensor, "UUID", '0000008A-0000-1000-8000-0026BB765291');
Service.TemperatureSensor = TemperatureSensor;
/**
 * Service "Thermostat"
 */

var Thermostat = /*#__PURE__*/function (_Service39) {
  (0, _inherits2["default"])(Thermostat, _Service39);

  var _super191 = _createSuper(Thermostat);

  function Thermostat(logger, displayName, subtype, _id) {
    var _this191;

    (0, _classCallCheck2["default"])(this, Thermostat);
    _this191 = _super191.call(this, logger, displayName, Thermostat.UUID, subtype, _id); // Required Characteristics

    _this191.addCharacteristic(Characteristic.CurrentHeatingCoolingState);

    _this191.addCharacteristic(Characteristic.TargetHeatingCoolingState);

    _this191.addCharacteristic(Characteristic.CurrentTemperature);

    _this191.addCharacteristic(Characteristic.TargetTemperature);

    _this191.addCharacteristic(Characteristic.TemperatureDisplayUnits); // Optional Characteristics


    _this191.addOptionalCharacteristic(Characteristic.CurrentRelativeHumidity);

    _this191.addOptionalCharacteristic(Characteristic.TargetRelativeHumidity);

    _this191.addOptionalCharacteristic(Characteristic.CoolingThresholdTemperature);

    _this191.addOptionalCharacteristic(Characteristic.HeatingThresholdTemperature);

    _this191.addOptionalCharacteristic(Characteristic.Name);

    return _this191;
  }

  return Thermostat;
}(Service);

exports.Thermostat = Thermostat;
(0, _defineProperty2["default"])(Thermostat, "UUID", '0000004A-0000-1000-8000-0026BB765291');
Service.Thermostat = Thermostat;
/**
 * Service "Valve"
 */

var Valve = /*#__PURE__*/function (_Service40) {
  (0, _inherits2["default"])(Valve, _Service40);

  var _super192 = _createSuper(Valve);

  function Valve(logger, displayName, subtype, _id) {
    var _this192;

    (0, _classCallCheck2["default"])(this, Valve);
    _this192 = _super192.call(this, logger, displayName, Valve.UUID, subtype, _id); // Required Characteristics

    _this192.addCharacteristic(Characteristic.Active);

    _this192.addCharacteristic(Characteristic.InUse);

    _this192.addCharacteristic(Characteristic.ValveType); // Optional Characteristics


    _this192.addOptionalCharacteristic(Characteristic.SetDuration);

    _this192.addOptionalCharacteristic(Characteristic.RemainingDuration);

    _this192.addOptionalCharacteristic(Characteristic.IsConfigured);

    _this192.addOptionalCharacteristic(Characteristic.ServiceLabelIndex);

    _this192.addOptionalCharacteristic(Characteristic.StatusFault);

    _this192.addOptionalCharacteristic(Characteristic.Name);

    return _this192;
  }

  return Valve;
}(Service);

exports.Valve = Valve;
(0, _defineProperty2["default"])(Valve, "UUID", '000000D0-0000-1000-8000-0026BB765291');
Service.Valve = Valve;
/**
 * Service "Window"
 */

var Window = /*#__PURE__*/function (_Service41) {
  (0, _inherits2["default"])(Window, _Service41);

  var _super193 = _createSuper(Window);

  function Window(logger, displayName, subtype, _id) {
    var _this193;

    (0, _classCallCheck2["default"])(this, Window);
    _this193 = _super193.call(this, logger, displayName, Window.UUID, subtype, _id); // Required Characteristics

    _this193.addCharacteristic(Characteristic.CurrentPosition);

    _this193.addCharacteristic(Characteristic.TargetPosition);

    _this193.addCharacteristic(Characteristic.PositionState); // Optional Characteristics


    _this193.addOptionalCharacteristic(Characteristic.HoldPosition);

    _this193.addOptionalCharacteristic(Characteristic.ObstructionDetected);

    _this193.addOptionalCharacteristic(Characteristic.Name);

    return _this193;
  }

  return Window;
}(Service);

exports.Window = Window;
(0, _defineProperty2["default"])(Window, "UUID", '0000008B-0000-1000-8000-0026BB765291');
Service.Window = Window;
/**
 * Service "Window Covering"
 */

var WindowCovering = /*#__PURE__*/function (_Service42) {
  (0, _inherits2["default"])(WindowCovering, _Service42);

  var _super194 = _createSuper(WindowCovering);

  function WindowCovering(logger, displayName, subtype, _id) {
    var _this194;

    (0, _classCallCheck2["default"])(this, WindowCovering);
    _this194 = _super194.call(this, logger, displayName, WindowCovering.UUID, subtype, _id); // Required Characteristics

    _this194.addCharacteristic(Characteristic.CurrentPosition);

    _this194.addCharacteristic(Characteristic.TargetPosition);

    _this194.addCharacteristic(Characteristic.PositionState); // Optional Characteristics


    _this194.addOptionalCharacteristic(Characteristic.HoldPosition);

    _this194.addOptionalCharacteristic(Characteristic.TargetHorizontalTiltAngle);

    _this194.addOptionalCharacteristic(Characteristic.TargetVerticalTiltAngle);

    _this194.addOptionalCharacteristic(Characteristic.CurrentHorizontalTiltAngle);

    _this194.addOptionalCharacteristic(Characteristic.CurrentVerticalTiltAngle);

    _this194.addOptionalCharacteristic(Characteristic.ObstructionDetected);

    _this194.addOptionalCharacteristic(Characteristic.Name);

    return _this194;
  }

  return WindowCovering;
}(Service);

exports.WindowCovering = WindowCovering;
(0, _defineProperty2["default"])(WindowCovering, "UUID", '0000008C-0000-1000-8000-0026BB765291');
Service.WindowCovering = WindowCovering;
/**
 * Service "Camera Operating Mode"
 */

var CameraOperatingMode = /*#__PURE__*/function (_Service43) {
  (0, _inherits2["default"])(CameraOperatingMode, _Service43);

  var _super195 = _createSuper(CameraOperatingMode);

  function CameraOperatingMode(logger, displayName, subtype, _id) {
    var _this195;

    (0, _classCallCheck2["default"])(this, CameraOperatingMode);
    _this195 = _super195.call(this, logger, displayName, CameraOperatingMode.UUID, subtype, _id); // Required Characteristics

    _this195.addCharacteristic(Characteristic.EventSnapshotsActive);

    _this195.addCharacteristic(Characteristic.HomeKitCameraActive); // Optional Characteristics


    _this195.addOptionalCharacteristic(Characteristic.ManuallyDisabled);

    _this195.addOptionalCharacteristic(Characteristic.NightVision);

    _this195.addOptionalCharacteristic(Characteristic.ThirdPartyCameraActive);

    _this195.addOptionalCharacteristic(Characteristic.CameraOperatingModeIndicator);

    _this195.addOptionalCharacteristic(Characteristic.PeriodicSnapshotsActive);

    return _this195;
  }

  return CameraOperatingMode;
}(Service);

exports.CameraOperatingMode = CameraOperatingMode;
(0, _defineProperty2["default"])(CameraOperatingMode, "UUID", '0000021A-0000-1000-8000-0026BB765291');
Service.CameraOperatingMode = CameraOperatingMode;
/**
 * Service "Camera Event Recording Management"
 */

var CameraEventRecordingManagement = /*#__PURE__*/function (_Service44) {
  (0, _inherits2["default"])(CameraEventRecordingManagement, _Service44);

  var _super196 = _createSuper(CameraEventRecordingManagement);

  function CameraEventRecordingManagement(logger, displayName, subtype, _id) {
    var _this196;

    (0, _classCallCheck2["default"])(this, CameraEventRecordingManagement);
    _this196 = _super196.call(this, logger, displayName, CameraEventRecordingManagement.UUID, subtype, _id); // Required Characteristics

    _this196.addCharacteristic(Characteristic.Active);

    _this196.addCharacteristic(Characteristic.SupportedCameraRecordingConfiguration);

    _this196.addCharacteristic(Characteristic.SupportedVideoRecordingConfiguration);

    _this196.addCharacteristic(Characteristic.SupportedAudioRecordingConfiguration);

    _this196.addCharacteristic(Characteristic.SelectedCameraRecordingConfiguration); // Optional Characteristics


    _this196.addOptionalCharacteristic(Characteristic.RecordingAudioActive);

    return _this196;
  }

  return CameraEventRecordingManagement;
}(Service);

exports.CameraEventRecordingManagement = CameraEventRecordingManagement;
(0, _defineProperty2["default"])(CameraEventRecordingManagement, "UUID", '00000204-0000-1000-8000-0026BB765291');
Service.CameraEventRecordingManagement = CameraEventRecordingManagement;
/**
 * Service "Wi-Fi Router"
 */

var WiFiRouter = /*#__PURE__*/function (_Service45) {
  (0, _inherits2["default"])(WiFiRouter, _Service45);

  var _super197 = _createSuper(WiFiRouter);

  function WiFiRouter(logger, displayName, subtype, _id) {
    var _this197;

    (0, _classCallCheck2["default"])(this, WiFiRouter);
    _this197 = _super197.call(this, logger, displayName, WiFiRouter.UUID, subtype, _id); // Required Characteristics

    _this197.addCharacteristic(Characteristic.NetworkClientProfileControl);

    _this197.addCharacteristic(Characteristic.NetworkClientStatusControl);

    _this197.addCharacteristic(Characteristic.RouterStatus);

    _this197.addCharacteristic(Characteristic.SupportedRouterConfiguration);

    _this197.addCharacteristic(Characteristic.WANConfigurationList);

    _this197.addCharacteristic(Characteristic.WANStatusList);

    _this197.addCharacteristic(Characteristic.ManagedNetworkEnable); // Optional Characteristics


    _this197.addOptionalCharacteristic(Characteristic.NetworkAccessViolationControl);

    return _this197;
  }

  return WiFiRouter;
}(Service);

exports.WiFiRouter = WiFiRouter;
(0, _defineProperty2["default"])(WiFiRouter, "UUID", '0000020A-0000-1000-8000-0026BB765291');
Service.WiFiRouter = WiFiRouter;
/**
 * Service "Wi-Fi Satellite"
 */

var WiFiSatellite = /*#__PURE__*/function (_Service46) {
  (0, _inherits2["default"])(WiFiSatellite, _Service46);

  var _super198 = _createSuper(WiFiSatellite);

  function WiFiSatellite(logger, displayName, subtype, _id) {
    var _this198;

    (0, _classCallCheck2["default"])(this, WiFiSatellite);
    _this198 = _super198.call(this, logger, displayName, WiFiSatellite.UUID, subtype, _id); // Required Characteristics

    _this198.addCharacteristic(Characteristic.WiFiSatelliteStatus);

    return _this198;
  }

  return WiFiSatellite;
}(Service);

exports.WiFiSatellite = WiFiSatellite;
(0, _defineProperty2["default"])(WiFiSatellite, "UUID", '0000020F-0000-1000-8000-0026BB765291');
Service.WiFiSatellite = WiFiSatellite;
/**
 * Service "Power Management"
 */

var PowerManagement = /*#__PURE__*/function (_Service47) {
  (0, _inherits2["default"])(PowerManagement, _Service47);

  var _super199 = _createSuper(PowerManagement);

  function PowerManagement(logger, displayName, subtype, _id) {
    var _this199;

    (0, _classCallCheck2["default"])(this, PowerManagement);
    _this199 = _super199.call(this, logger, displayName, PowerManagement.UUID, subtype, _id); // Required Characteristics

    _this199.addCharacteristic(Characteristic.WakeConfiguration);

    return _this199;
  }

  return PowerManagement;
}(Service);

exports.PowerManagement = PowerManagement;
(0, _defineProperty2["default"])(PowerManagement, "UUID", '00000221-0000-1000-8000-0026BB765291');
Service.PowerManagement = PowerManagement;
/**
 * Service "Transfer Transport Management"
 */

var TransferTransportManagement = /*#__PURE__*/function (_Service48) {
  (0, _inherits2["default"])(TransferTransportManagement, _Service48);

  var _super200 = _createSuper(TransferTransportManagement);

  function TransferTransportManagement(logger, displayName, subtype, _id) {
    var _this200;

    (0, _classCallCheck2["default"])(this, TransferTransportManagement);
    _this200 = _super200.call(this, logger, displayName, TransferTransportManagement.UUID, subtype, _id); // Required Characteristics

    _this200.addCharacteristic(Characteristic.SupportedTransferTransportConfiguration);

    _this200.addCharacteristic(Characteristic.SetupTransferTransport);

    return _this200;
  }

  return TransferTransportManagement;
}(Service);

exports.TransferTransportManagement = TransferTransportManagement;
(0, _defineProperty2["default"])(TransferTransportManagement, "UUID", '00000203-0000-1000-8000-0026BB765291');
Service.TransferTransportManagement = TransferTransportManagement;