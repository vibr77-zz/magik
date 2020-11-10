const Service =require( './service')
const Characteristic =require( './characteristic');
const {Formats,Perms,Status,Units,CharacteristicEventTypes} =require( '../cst')

/**
 * Characteristic "Access Control Level"
 */

export class AccessControlLevel extends Characteristic {

  static UUID = '000000E5-0000-1000-8000-0026BB765291';

  constructor() {
    super('Access Control Level', AccessControlLevel.UUID);
    this.setProps({
      format: Formats.UINT16,
      perms: [Perms.NOTIFY, Perms.PAIRED_READ, Perms.PAIRED_WRITE],
      maxValue: 2,
      minValue: 0,
      minStep: 1,
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.AccessControlLevel = AccessControlLevel;

/**
 * Characteristic "Accessory Flags"
 */

export class AccessoryFlags extends Characteristic {

  static UUID = '000000A6-0000-1000-8000-0026BB765291';

  constructor() {
    super('Accessory Flags', AccessoryFlags.UUID);
    this.setProps({
      format: Formats.UINT32,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.AccessoryFlags = AccessoryFlags;

/**
 * Characteristic "Product Data"
 */

export class ProductData extends Characteristic {

  static UUID = '00000220-0000-1000-8000-0026BB765291';

  constructor() {
    super('Product Data', ProductData.UUID);
    this.setProps({
      format: Formats.DATA,
      perms: [Perms.READ]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.ProductData = ProductData;

/**
 * Characteristic "Active"
 */

export class Active extends Characteristic {

  // The value property of Active must be one of the following:
  static INACTIVE = 0;
  static ACTIVE = 1;

  static UUID = '000000B0-0000-1000-8000-0026BB765291';

  constructor() {
    super('Active', Active.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.Active = Active;

/**
 * Characteristic "Administrator Only Access"
 */

export class AdministratorOnlyAccess extends Characteristic {

  static UUID = '00000001-0000-1000-8000-0026BB765291';

  constructor() {
    super('Administrator Only Access', AdministratorOnlyAccess.UUID);
    this.setProps({
      format: Formats.BOOL,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.AdministratorOnlyAccess = AdministratorOnlyAccess;

/**
 * Characteristic "Air Particulate Density"
 */

export class AirParticulateDensity extends Characteristic {

  static UUID = '00000064-0000-1000-8000-0026BB765291';

  constructor() {
    super('Air Particulate Density', AirParticulateDensity.UUID);
    this.setProps({
      format: Formats.FLOAT,
      maxValue: 1000,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.AirParticulateDensity = AirParticulateDensity;

/**
 * Characteristic "Air Particulate Size"
 */

export class AirParticulateSize extends Characteristic {

  // The value property of AirParticulateSize must be one of the following:
  static _2_5_M = 0;
  static _10_M = 1;

  static UUID = '00000065-0000-1000-8000-0026BB765291';

  constructor() {
    super('Air Particulate Size', AirParticulateSize.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.AirParticulateSize = AirParticulateSize;


/**
 * Characteristic "Air Quality"
 */

export class AirQuality extends Characteristic {

  // The value property of AirQuality must be one of the following:
  static UNKNOWN = 0;
  static EXCELLENT = 1;
  static GOOD = 2;
  static FAIR = 3;
  static INFERIOR = 4;
  static POOR = 5;

  static UUID = '00000095-0000-1000-8000-0026BB765291';

  constructor() {
    super('Air Quality', AirQuality.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 5,
      minValue: 0,
      validValues: [0, 1, 2, 3, 4, 5],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.AirQuality = AirQuality;


/**
 * Characteristic "Audio Feedback"
 */

export class AudioFeedback extends Characteristic {

  static UUID = '00000005-0000-1000-8000-0026BB765291';

  constructor() {
    super('Audio Feedback', AudioFeedback.UUID);
    this.setProps({
      format: Formats.BOOL,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.AudioFeedback = AudioFeedback;

/**
 * Characteristic "Battery Level"
 */

export class BatteryLevel extends Characteristic {

  static UUID = '00000068-0000-1000-8000-0026BB765291';

  constructor() {
    super('Battery Level', BatteryLevel.UUID);
    this.setProps({
      format: Formats.UINT8,
      unit: Units.PERCENTAGE,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.BatteryLevel = BatteryLevel;

/**
 * Characteristic "Brightness"
 */

export class Brightness extends Characteristic {

  static UUID = '00000008-0000-1000-8000-0026BB765291';

  constructor() {
    super('Brightness', Brightness.UUID);
    this.setProps({
      format: Formats.INT,
      unit: Units.PERCENTAGE,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.Brightness = Brightness;

/**
 * Characteristic "Carbon Dioxide Detected"
 */

export class CarbonDioxideDetected extends Characteristic {

  // The value property of CarbonDioxideDetected must be one of the following:
  static CO2_LEVELS_NORMAL = 0;
  static CO2_LEVELS_ABNORMAL = 1;

  static UUID = '00000092-0000-1000-8000-0026BB765291';

  constructor() {
    super('Carbon Dioxide Detected', CarbonDioxideDetected.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.CarbonDioxideDetected = CarbonDioxideDetected;

/**
 * Characteristic "Carbon Dioxide Level"
 */

export class CarbonDioxideLevel extends Characteristic {

  static UUID = '00000093-0000-1000-8000-0026BB765291';

  constructor() {
    super('Carbon Dioxide Level', CarbonDioxideLevel.UUID);
    this.setProps({
      format: Formats.FLOAT,
      maxValue: 100000,
      minValue: 0,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.CarbonDioxideLevel = CarbonDioxideLevel;

/**
 * Characteristic "Carbon Dioxide Peak Level"
 */

export class CarbonDioxidePeakLevel extends Characteristic {

  static UUID = '00000094-0000-1000-8000-0026BB765291';

  constructor() {
    super('Carbon Dioxide Peak Level', CarbonDioxidePeakLevel.UUID);
    this.setProps({
      format: Formats.FLOAT,
      maxValue: 100000,
      minValue: 0,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.CarbonDioxidePeakLevel = CarbonDioxidePeakLevel;

/**
 * Characteristic "Carbon Monoxide Detected"
 */

export class CarbonMonoxideDetected extends Characteristic {

  // The value property of CarbonMonoxideDetected must be one of the following:
  static CO_LEVELS_NORMAL = 0;
  static CO_LEVELS_ABNORMAL = 1;

  static UUID = '00000069-0000-1000-8000-0026BB765291';

  constructor() {
    super('Carbon Monoxide Detected', CarbonMonoxideDetected.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.CarbonMonoxideDetected = CarbonMonoxideDetected;

/**
 * Characteristic "Carbon Monoxide Level"
 */

export class CarbonMonoxideLevel extends Characteristic {

  static UUID = '00000090-0000-1000-8000-0026BB765291';

  constructor() {
    super('Carbon Monoxide Level', CarbonMonoxideLevel.UUID);
    this.setProps({
      format: Formats.FLOAT,
      maxValue: 100,
      minValue: 0,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.CarbonMonoxideLevel = CarbonMonoxideLevel;

/**
 * Characteristic "Carbon Monoxide Peak Level"
 */

export class CarbonMonoxidePeakLevel extends Characteristic {

  static UUID = '00000091-0000-1000-8000-0026BB765291';

  constructor() {
    super('Carbon Monoxide Peak Level', CarbonMonoxidePeakLevel.UUID);
    this.setProps({
      format: Formats.FLOAT,
      maxValue: 100,
      minValue: 0,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.CarbonMonoxidePeakLevel = CarbonMonoxidePeakLevel;

/**
 * Characteristic "Charging State"
 */

export class ChargingState extends Characteristic {

  // The value property of ChargingState must be one of the following:
  static NOT_CHARGING = 0;
  static CHARGING = 1;
  static NOT_CHARGEABLE = 2;

  static UUID = '0000008F-0000-1000-8000-0026BB765291';

  constructor() {
    super('Charging State', ChargingState.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 2,
      minValue: 0,
      validValues: [0, 1, 2],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.ChargingState = ChargingState;

/**
 * Characteristic "Color Temperature"
 */

export class ColorTemperature extends Characteristic {

  static UUID = '000000CE-0000-1000-8000-0026BB765291';

  constructor() {
    super('Color Temperature', ColorTemperature.UUID);
    this.setProps({
      format: Formats.UINT32,
      maxValue: 500,
      minValue: 140,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.ColorTemperature = ColorTemperature;

/**
 * Characteristic "Contact Sensor State"
 */

export class ContactSensorState extends Characteristic {

  // The value property of ContactSensorState must be one of the following:
  static CONTACT_DETECTED = 0;
  static CONTACT_NOT_DETECTED = 1;

  static UUID = '0000006A-0000-1000-8000-0026BB765291';

  constructor() {
    super('Contact Sensor State', ContactSensorState.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.ContactSensorState = ContactSensorState;

/**
 * Characteristic "Cooling Threshold Temperature"
 */

export class CoolingThresholdTemperature extends Characteristic {

  static UUID = '0000000D-0000-1000-8000-0026BB765291';

  constructor() {
    super('Cooling Threshold Temperature', CoolingThresholdTemperature.UUID);
    this.setProps({
      format: Formats.FLOAT,
      unit: Units.CELSIUS,
      maxValue: 35,
      minValue: 10,
      minStep: 0.1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.CoolingThresholdTemperature = CoolingThresholdTemperature;

/**
 * Characteristic "Current Air Purifier State"
 */

export class CurrentAirPurifierState extends Characteristic {

  // The value property of CurrentAirPurifierState must be one of the following:
  static INACTIVE = 0;
  static IDLE = 1;
  static PURIFYING_AIR = 2;

  static UUID = '000000A9-0000-1000-8000-0026BB765291';

  constructor() {
    super('Current Air Purifier State', CurrentAirPurifierState.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 2,
      minValue: 0,
      validValues: [0, 1, 2],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.CurrentAirPurifierState = CurrentAirPurifierState;


/**
 * Characteristic "Current Ambient Light Level"
 */

export class CurrentAmbientLightLevel extends Characteristic {

  static UUID = '0000006B-0000-1000-8000-0026BB765291';

  constructor() {
    super('Current Ambient Light Level', CurrentAmbientLightLevel.UUID);
    this.setProps({
      format: Formats.FLOAT,
      unit: Units.LUX,
      maxValue: 100000,
      minValue: 0.0001,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.CurrentAmbientLightLevel = CurrentAmbientLightLevel;

/**
 * Characteristic "Current Door State"
 */

export class CurrentDoorState extends Characteristic {

  // The value property of CurrentDoorState must be one of the following:
  static OPEN = 0;
  static CLOSED = 1;
  static OPENING = 2;
  static CLOSING = 3;
  static STOPPED = 4;

  static UUID = '0000000E-0000-1000-8000-0026BB765291';

  constructor() {
    super('Current Door State', CurrentDoorState.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 4,
      minValue: 0,
      validValues: [0, 1, 2, 3, 4],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.CurrentDoorState = CurrentDoorState;

/**
 * Characteristic "Current Fan State"
 */

export class CurrentFanState extends Characteristic {

  // The value property of CurrentFanState must be one of the following:
  static INACTIVE = 0;
  static IDLE = 1;
  static BLOWING_AIR = 2;

  static UUID = '000000AF-0000-1000-8000-0026BB765291';

  constructor() {
    super('Current Fan State', CurrentFanState.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 2,
      minValue: 0,
      validValues: [0, 1, 2],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.CurrentFanState = CurrentFanState;

/**
 * Characteristic "Current Heater Cooler State"
 */

export class CurrentHeaterCoolerState extends Characteristic {

  // The value property of CurrentHeaterCoolerState must be one of the following:
  static INACTIVE = 0;
  static IDLE = 1;
  static HEATING = 2;
  static COOLING = 3;

  static UUID = '000000B1-0000-1000-8000-0026BB765291';

  constructor() {
    super('Current Heater Cooler State', CurrentHeaterCoolerState.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 3,
      minValue: 0,
      validValues: [0, 1, 2, 3],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.CurrentHeaterCoolerState = CurrentHeaterCoolerState;

/**
 * Characteristic "Current Heating Cooling State"
 */

export class CurrentHeatingCoolingState extends Characteristic {

  // The value property of CurrentHeatingCoolingState must be one of the following:
  static OFF = 0;
  static HEAT = 1;
  static COOL = 2;

  static UUID = '0000000F-0000-1000-8000-0026BB765291';

  constructor() {
    super('Current Heating Cooling State', CurrentHeatingCoolingState.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 2,
      minValue: 0,
      validValues: [0, 1, 2],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.CurrentHeatingCoolingState = CurrentHeatingCoolingState;

/**
 * Characteristic "Current Horizontal Tilt Angle"
 */

export class CurrentHorizontalTiltAngle extends Characteristic {

  static UUID = '0000006C-0000-1000-8000-0026BB765291';

  constructor() {
    super('Current Horizontal Tilt Angle', CurrentHorizontalTiltAngle.UUID);
    this.setProps({
      format: Formats.INT,
      unit: Units.ARC_DEGREE,
      maxValue: 90,
      minValue: -90,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.CurrentHorizontalTiltAngle = CurrentHorizontalTiltAngle;

/**
 * Characteristic "Current Humidifier Dehumidifier State"
 */

export class CurrentHumidifierDehumidifierState extends Characteristic {

  // The value property of CurrentHumidifierDehumidifierState must be one of the following:
  static INACTIVE = 0;
  static IDLE = 1;
  static HUMIDIFYING = 2;
  static DEHUMIDIFYING = 3;

  static UUID = '000000B3-0000-1000-8000-0026BB765291';

  constructor() {
    super('Current Humidifier Dehumidifier State', CurrentHumidifierDehumidifierState.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 3,
      minValue: 0,
      validValues: [0, 1, 2, 3],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.CurrentHumidifierDehumidifierState = CurrentHumidifierDehumidifierState;

/**
 * Characteristic "Current Position"
 */

export class CurrentPosition extends Characteristic {

  static UUID = '0000006D-0000-1000-8000-0026BB765291';

  constructor() {
    super('Current Position', CurrentPosition.UUID);
    this.setProps({
      format: Formats.UINT8,
      unit: Units.PERCENTAGE,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.CurrentPosition = CurrentPosition;

/**
 * Characteristic "Current Relative Humidity"
 */

export class CurrentRelativeHumidity extends Characteristic {

  static UUID = '00000010-0000-1000-8000-0026BB765291';

  constructor() {
    super('Current Relative Humidity', CurrentRelativeHumidity.UUID);
    this.setProps({
      format: Formats.FLOAT,
      unit: Units.PERCENTAGE,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.CurrentRelativeHumidity = CurrentRelativeHumidity;

/**
 * Characteristic "Current Slat State"
 */

export class CurrentSlatState extends Characteristic {

  // The value property of CurrentSlatState must be one of the following:
  static FIXED = 0;
  static JAMMED = 1;
  static SWINGING = 2;

  static UUID = '000000AA-0000-1000-8000-0026BB765291';

  constructor() {
    super('Current Slat State', CurrentSlatState.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 2,
      minValue: 0,
      validValues: [0, 1, 2],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.CurrentSlatState = CurrentSlatState;

/**
 * Characteristic "Current Temperature"
 */

export class CurrentTemperature extends Characteristic {

  static UUID = '00000011-0000-1000-8000-0026BB765291';

  constructor() {
    super('Current Temperature', CurrentTemperature.UUID);
    this.setProps({
      format: Formats.FLOAT,
      unit: Units.CELSIUS,
      maxValue: 100,
      minValue: 0,
      minStep: 0.1,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.CurrentTemperature = CurrentTemperature;

/**
 * Characteristic "Current Tilt Angle"
 */

export class CurrentTiltAngle extends Characteristic {

  static UUID = '000000C1-0000-1000-8000-0026BB765291';

  constructor() {
    super('Current Tilt Angle', CurrentTiltAngle.UUID);
    this.setProps({
      format: Formats.INT,
      unit: Units.ARC_DEGREE,
      maxValue: 90,
      minValue: -90,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.CurrentTiltAngle = CurrentTiltAngle;

/**
 * Characteristic "Current Vertical Tilt Angle"
 */

export class CurrentVerticalTiltAngle extends Characteristic {

  static UUID = '0000006E-0000-1000-8000-0026BB765291';

  constructor() {
    super('Current Vertical Tilt Angle', CurrentVerticalTiltAngle.UUID);
    this.setProps({
      format: Formats.INT,
      unit: Units.ARC_DEGREE,
      maxValue: 90,
      minValue: -90,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.CurrentVerticalTiltAngle = CurrentVerticalTiltAngle;

/**
 * Characteristic "Digital Zoom"
 */

export class DigitalZoom extends Characteristic {

  static UUID = '0000011D-0000-1000-8000-0026BB765291';

  constructor() {
    super('Digital Zoom', DigitalZoom.UUID);
    this.setProps({
      format: Formats.FLOAT,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.DigitalZoom = DigitalZoom;

/**
 * Characteristic "Filter Change Indication"
 */

export class FilterChangeIndication extends Characteristic {

  // The value property of FilterChangeIndication must be one of the following:
  static FILTER_OK = 0;
  static CHANGE_FILTER = 1;

  static UUID = '000000AC-0000-1000-8000-0026BB765291';

  constructor() {
    super('Filter Change Indication', FilterChangeIndication.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.FilterChangeIndication = FilterChangeIndication;

/**
 * Characteristic "Filter Life Level"
 */

export class FilterLifeLevel extends Characteristic {

  static UUID = '000000AB-0000-1000-8000-0026BB765291';

  constructor() {
    super('Filter Life Level', FilterLifeLevel.UUID);
    this.setProps({
      format: Formats.FLOAT,
      maxValue: 100,
      minValue: 0,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.FilterLifeLevel = FilterLifeLevel;

/**
 * Characteristic "Firmware Revision"
 */

export class FirmwareRevision extends Characteristic {

  static UUID = '00000052-0000-1000-8000-0026BB765291';

  constructor() {
    super('Firmware Revision', FirmwareRevision.UUID);
    this.setProps({
      format: Formats.STRING,
      perms: [Perms.READ]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.FirmwareRevision = FirmwareRevision;

/**
 * Characteristic "Hardware Revision"
 */

export class HardwareRevision extends Characteristic {

  static UUID = '00000053-0000-1000-8000-0026BB765291';

  constructor() {
    super('Hardware Revision', HardwareRevision.UUID);
    this.setProps({
      format: Formats.STRING,
      perms: [Perms.READ]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.HardwareRevision = HardwareRevision;

/**
 * Characteristic "Heating Threshold Temperature"
 */

export class HeatingThresholdTemperature extends Characteristic {

  static UUID = '00000012-0000-1000-8000-0026BB765291';

  constructor() {
    super('Heating Threshold Temperature', HeatingThresholdTemperature.UUID);
    this.setProps({
      format: Formats.FLOAT,
      unit: Units.CELSIUS,
      maxValue: 25,
      minValue: 0,
      minStep: 0.1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.HeatingThresholdTemperature = HeatingThresholdTemperature;

/**
 * Characteristic "Hold Position"
 */

export class HoldPosition extends Characteristic {

  static UUID = '0000006F-0000-1000-8000-0026BB765291';

  constructor() {
    super('Hold Position', HoldPosition.UUID);
    this.setProps({
      format: Formats.BOOL,
      perms: [Perms.WRITE]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.HoldPosition = HoldPosition;

/**
 * Characteristic "Hue"
 */

export class Hue extends Characteristic {

  static UUID = '00000013-0000-1000-8000-0026BB765291';

  constructor() {
    super('Hue', Hue.UUID);
    this.setProps({
      format: Formats.FLOAT,
      unit: Units.ARC_DEGREE,
      maxValue: 360,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.Hue = Hue;

/**
 * Characteristic "Identify"
 */

export class Identify extends Characteristic {

  static UUID = '00000014-0000-1000-8000-0026BB765291';

  constructor() {
    super('Identify', Identify.UUID);
    this.setProps({
      format: Formats.BOOL,
      perms: [Perms.WRITE]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.Identify = Identify;

/**
 * Characteristic "Image Mirroring"
 */

export class ImageMirroring extends Characteristic {

  static UUID = '0000011F-0000-1000-8000-0026BB765291';

  constructor() {
    super('Image Mirroring', ImageMirroring.UUID);
    this.setProps({
      format: Formats.BOOL,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.ImageMirroring = ImageMirroring;

/**
 * Characteristic "Image Rotation"
 */

export class ImageRotation extends Characteristic {

  static UUID = '0000011E-0000-1000-8000-0026BB765291';

  constructor() {
    super('Image Rotation', ImageRotation.UUID);
    this.setProps({
      format: Formats.FLOAT,
      unit: Units.ARC_DEGREE,
      maxValue: 270,
      minValue: 0,
      minStep: 90,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.ImageRotation = ImageRotation;

/**
 * Characteristic "In Use"
 */

export class InUse extends Characteristic {

  // The value property of InUse must be one of the following:
  static NOT_IN_USE = 0;
  static IN_USE = 1;

  static UUID = '000000D2-0000-1000-8000-0026BB765291';

  constructor() {
    super('In Use', InUse.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.InUse = InUse;

/**
 * Characteristic "Is Configured"
 */

export class IsConfigured extends Characteristic {

  // The value property of IsConfigured must be one of the following:
  static NOT_CONFIGURED = 0;
  static CONFIGURED = 1;

  static UUID = '000000D6-0000-1000-8000-0026BB765291';

  constructor() {
    super('Is Configured', IsConfigured.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.IsConfigured = IsConfigured;

/**
 * Characteristic "Leak Detected"
 */

export class LeakDetected extends Characteristic {

  // The value property of LeakDetected must be one of the following:
  static LEAK_NOT_DETECTED = 0;
  static LEAK_DETECTED = 1;

  static UUID = '00000070-0000-1000-8000-0026BB765291';

  constructor() {
    super('Leak Detected', LeakDetected.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.LeakDetected = LeakDetected;

/**
 * Characteristic "Lock Control Point"
 */

export class LockControlPoint extends Characteristic {

  static UUID = '00000019-0000-1000-8000-0026BB765291';

  constructor() {
    super('Lock Control Point', LockControlPoint.UUID);
    this.setProps({
      format: Formats.TLV8,
      perms: [Perms.WRITE]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.LockControlPoint = LockControlPoint;

/**
 * Characteristic "Lock Current State"
 */

export class LockCurrentState extends Characteristic {

  // The value property of LockCurrentState must be one of the following:
  static UNSECURED = 0;
  static SECURED = 1;
  static JAMMED = 2;
  static UNKNOWN = 3;

  static UUID = '0000001D-0000-1000-8000-0026BB765291';

  constructor() {
    super('Lock Current State', LockCurrentState.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 3,
      minValue: 0,
      validValues: [0, 1, 2, 3],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.LockCurrentState = LockCurrentState;

/**
 * Characteristic "Lock Last Known Action"
 */

export class LockLastKnownAction extends Characteristic {

  // The value property of LockLastKnownAction must be one of the following:
  static SECURED_PHYSICALLY_INTERIOR = 0;
  static UNSECURED_PHYSICALLY_INTERIOR = 1;
  static SECURED_PHYSICALLY_EXTERIOR = 2;
  static UNSECURED_PHYSICALLY_EXTERIOR = 3;
  static SECURED_BY_KEYPAD = 4;
  static UNSECURED_BY_KEYPAD = 5;
  static SECURED_REMOTELY = 6;
  static UNSECURED_REMOTELY = 7;
  static SECURED_BY_AUTO_SECURE_TIMEOUT = 8;

  static UUID = '0000001C-0000-1000-8000-0026BB765291';

  constructor() {
    super('Lock Last Known Action', LockLastKnownAction.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 8,
      minValue: 0,
      validValues: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.LockLastKnownAction = LockLastKnownAction;

/**
 * Characteristic "Lock Management Auto Security Timeout"
 */

export class LockManagementAutoSecurityTimeout extends Characteristic {

  static UUID = '0000001A-0000-1000-8000-0026BB765291';

  constructor() {
    super('Lock Management Auto Security Timeout', LockManagementAutoSecurityTimeout.UUID);
    this.setProps({
      format: Formats.UINT32,
      unit: Units.SECONDS,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.LockManagementAutoSecurityTimeout = LockManagementAutoSecurityTimeout;

/**
 * Characteristic "Lock Physical Controls"
 */

export class LockPhysicalControls extends Characteristic {

  // The value property of LockPhysicalControls must be one of the following:
  static CONTROL_LOCK_DISABLED = 0;
  static CONTROL_LOCK_ENABLED = 1;

  static UUID = '000000A7-0000-1000-8000-0026BB765291';

  constructor() {
    super('Lock Physical Controls', LockPhysicalControls.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.LockPhysicalControls = LockPhysicalControls;

/**
 * Characteristic "Lock Target State"
 */

export class LockTargetState extends Characteristic {

  // The value property of LockTargetState must be one of the following:
  static UNSECURED = 0;
  static SECURED = 1;

  static UUID = '0000001E-0000-1000-8000-0026BB765291';

  constructor() {
    super('Lock Target State', LockTargetState.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.LockTargetState = LockTargetState;

/**
 * Characteristic "Logs"
 */

export class Logs extends Characteristic {

  static UUID = '0000001F-0000-1000-8000-0026BB765291';

  constructor() {
    super('Logs', Logs.UUID);
    this.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.Logs = Logs;

/**
 * Characteristic "Manufacturer"
 */

export class Manufacturer extends Characteristic {

  static UUID = '00000020-0000-1000-8000-0026BB765291';

  constructor() {
    super('Manufacturer', Manufacturer.UUID);
    this.setProps({
      format: Formats.STRING,
      perms: [Perms.READ]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.Manufacturer = Manufacturer;

/**
 * Characteristic "Model"
 */

export class Model extends Characteristic {

  static UUID = '00000021-0000-1000-8000-0026BB765291';

  constructor() {
    super('Model', Model.UUID);
    this.setProps({
      format: Formats.STRING,
      perms: [Perms.READ]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.Model = Model;

/**
 * Characteristic "Motion Detected"
 */

export class MotionDetected extends Characteristic {

  static UUID = '00000022-0000-1000-8000-0026BB765291';

  constructor() {
    super('Motion Detected', MotionDetected.UUID);
    this.setProps({
      format: Formats.BOOL,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.MotionDetected = MotionDetected;

/**
 * Characteristic "Mute"
 */

export class Mute extends Characteristic {

  static UUID = '0000011A-0000-1000-8000-0026BB765291';

  constructor() {
    super('Mute', Mute.UUID);
    this.setProps({
      format: Formats.BOOL,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.Mute = Mute;

/**
 * Characteristic "Name"
 */

export class Name extends Characteristic {

  static UUID = '00000023-0000-1000-8000-0026BB765291';

  constructor() {
    super('Name', Name.UUID);
    this.setProps({
      format: Formats.STRING,
      perms: [Perms.READ]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.Name = Name;

/**
 * Characteristic "Night Vision"
 */

export class NightVision extends Characteristic {

  static UUID = '0000011B-0000-1000-8000-0026BB765291';

  constructor() {
    super('Night Vision', NightVision.UUID);
    this.setProps({
      format: Formats.BOOL,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY, Perms.TIMED_WRITE]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.NightVision = NightVision;

/**
 * Characteristic "Nitrogen Dioxide Density"
 */

export class NitrogenDioxideDensity extends Characteristic {

  static UUID = '000000C4-0000-1000-8000-0026BB765291';

  constructor() {
    super('Nitrogen Dioxide Density', NitrogenDioxideDensity.UUID);
    this.setProps({
      format: Formats.FLOAT,
      maxValue: 1000,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.NitrogenDioxideDensity = NitrogenDioxideDensity;

/**
 * Characteristic "Obstruction Detected"
 */

export class ObstructionDetected extends Characteristic {

  static UUID = '00000024-0000-1000-8000-0026BB765291';

  constructor() {
    super('Obstruction Detected', ObstructionDetected.UUID);
    this.setProps({
      format: Formats.BOOL,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.ObstructionDetected = ObstructionDetected;

/**
 * Characteristic "Occupancy Detected"
 */

export class OccupancyDetected extends Characteristic {

  // The value property of OccupancyDetected must be one of the following:
  static OCCUPANCY_NOT_DETECTED = 0;
  static OCCUPANCY_DETECTED = 1;

  static UUID = '00000071-0000-1000-8000-0026BB765291';

  constructor() {
    super('Occupancy Detected', OccupancyDetected.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.OccupancyDetected = OccupancyDetected;

/**
 * Characteristic "On"
 */

export class On extends Characteristic {

  static UUID = '00000025-0000-1000-8000-0026BB765291';

  constructor() {
    super('On', On.UUID);
    this.setProps({
      format: Formats.BOOL,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.On = On;

/**
 * Characteristic "Optical Zoom"
 */

export class OpticalZoom extends Characteristic {

  static UUID = '0000011C-0000-1000-8000-0026BB765291';

  constructor() {
    super('Optical Zoom', OpticalZoom.UUID);
    this.setProps({
      format: Formats.FLOAT,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.OpticalZoom = OpticalZoom;

/**
 * Characteristic "Outlet In Use"
 */

export class OutletInUse extends Characteristic {

  static UUID = '00000026-0000-1000-8000-0026BB765291';

  constructor() {
    super('Outlet In Use', OutletInUse.UUID);
    this.setProps({
      format: Formats.BOOL,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.OutletInUse = OutletInUse;

/**
 * Characteristic "Ozone Density"
 */

export class OzoneDensity extends Characteristic {

  static UUID = '000000C3-0000-1000-8000-0026BB765291';

  constructor() {
    super('Ozone Density', OzoneDensity.UUID);
    this.setProps({
      format: Formats.FLOAT,
      maxValue: 1000,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.OzoneDensity = OzoneDensity;

/**
 * Characteristic "Pair Setup"
 */

export class PairSetup extends Characteristic {

  static UUID = '0000004C-0000-1000-8000-0026BB765291';

  constructor() {
    super('Pair Setup', PairSetup.UUID);
    this.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.WRITE]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.PairSetup = PairSetup;

/**
 * Characteristic "Pair Verify"
 */

export class PairVerify extends Characteristic {

  static UUID = '0000004E-0000-1000-8000-0026BB765291';

  constructor() {
    super('Pair Verify', PairVerify.UUID);
    this.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.WRITE]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.PairVerify = PairVerify;

/**
 * Characteristic "Pairing Features"
 */

export class PairingFeatures extends Characteristic {

  static UUID = '0000004F-0000-1000-8000-0026BB765291';

  constructor() {
    super('Pairing Features', PairingFeatures.UUID);
    this.setProps({
      format: Formats.UINT8,
      perms: [Perms.READ]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.PairingFeatures = PairingFeatures;

/**
 * Characteristic "Pairing Pairings"
 */

export class PairingPairings extends Characteristic {

  static UUID = '00000050-0000-1000-8000-0026BB765291';

  constructor() {
    super('Pairing Pairings', PairingPairings.UUID);
    this.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.WRITE]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.PairingPairings = PairingPairings;

/**
 * Characteristic "Password Setting"
 */

export class PasswordSetting extends Characteristic {

  static UUID = '000000E4-0000-1000-8000-0026BB765291';

  constructor() {
    super('Password Setting', PasswordSetting.UUID);
    this.setProps({
      format: Formats.TLV8,
      perms: [Perms.NOTIFY, Perms.PAIRED_READ, Perms.PAIRED_WRITE],
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.PasswordSetting = PasswordSetting;

/**
 * Characteristic "PM10 Density"
 */

export class PM10Density extends Characteristic {

  static UUID = '000000C7-0000-1000-8000-0026BB765291';

  constructor() {
    super('PM10 Density', PM10Density.UUID);
    this.setProps({
      format: Formats.FLOAT,
      maxValue: 1000,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.PM10Density = PM10Density;

/**
 * Characteristic "PM2.5 Density"
 */

export class PM2_5Density extends Characteristic {

  static UUID = '000000C6-0000-1000-8000-0026BB765291';

  constructor() {
    super('PM2.5 Density', PM2_5Density.UUID);
    this.setProps({
      format: Formats.FLOAT,
      maxValue: 1000,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.PM2_5Density = PM2_5Density;

/**
 * Characteristic "Position State"
 */

export class PositionState extends Characteristic {

  // The value property of PositionState must be one of the following:
  static DECREASING = 0;
  static INCREASING = 1;
  static STOPPED = 2;

  static UUID = '00000072-0000-1000-8000-0026BB765291';

  constructor() {
    super('Position State', PositionState.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 2,
      minValue: 0,
      validValues: [0, 1, 2],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.PositionState = PositionState;

/**
 * Characteristic "Program Mode"
 */

export class ProgramMode extends Characteristic {

  // The value property of ProgramMode must be one of the following:
  static NO_PROGRAM_SCHEDULED = 0;
  static PROGRAM_SCHEDULED = 1;
  static PROGRAM_SCHEDULED_MANUAL_MODE_ = 2;

  static UUID = '000000D1-0000-1000-8000-0026BB765291';

  constructor() {
    super('Program Mode', ProgramMode.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 2,
      minValue: 0,
      validValues: [0, 1, 2],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.ProgramMode = ProgramMode;

/**
 * Characteristic "Programmable Switch Event"
 */

export class ProgrammableSwitchEvent extends Characteristic {

  // The value property of ProgrammableSwitchEvent must be one of the following:
  static SINGLE_PRESS = 0;
  static DOUBLE_PRESS = 1;
  static LONG_PRESS = 2;

  static UUID = '00000073-0000-1000-8000-0026BB765291';

  constructor() {
    super('Programmable Switch Event', ProgrammableSwitchEvent.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 2,
      minValue: 0,
      validValues: [0, 1, 2],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.eventOnlyCharacteristic = true; //Manual addition.
    this.value = this.getDefaultValue();
  }
}

Characteristic.ProgrammableSwitchEvent = ProgrammableSwitchEvent;

/**
 * Characteristic "Relative Humidity Dehumidifier Threshold"
 */

export class RelativeHumidityDehumidifierThreshold extends Characteristic {

  static UUID = '000000C9-0000-1000-8000-0026BB765291';

  constructor() {
    super('Relative Humidity Dehumidifier Threshold', RelativeHumidityDehumidifierThreshold.UUID);
    this.setProps({
      format: Formats.FLOAT,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.RelativeHumidityDehumidifierThreshold = RelativeHumidityDehumidifierThreshold;

/**
 * Characteristic "Relative Humidity Humidifier Threshold"
 */

export class RelativeHumidityHumidifierThreshold extends Characteristic {

  static UUID = '000000CA-0000-1000-8000-0026BB765291';

  constructor() {
    super('Relative Humidity Humidifier Threshold', RelativeHumidityHumidifierThreshold.UUID);
    this.setProps({
      format: Formats.FLOAT,
      unit: Units.PERCENTAGE,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.RelativeHumidityHumidifierThreshold = RelativeHumidityHumidifierThreshold;

/**
 * Characteristic "Remaining Duration"
 */

export class RemainingDuration extends Characteristic {

  static UUID = '000000D4-0000-1000-8000-0026BB765291';

  constructor() {
    super('Remaining Duration', RemainingDuration.UUID);
    this.setProps({
      format: Formats.UINT32,
      maxValue: 3600,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.RemainingDuration = RemainingDuration;

/**
 * Characteristic "Reset Filter Indication"
 */

export class ResetFilterIndication extends Characteristic {

  static UUID = '000000AD-0000-1000-8000-0026BB765291';

  constructor() {
    super('Reset Filter Indication', ResetFilterIndication.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 1,
      minStep: 1,
      perms: [Perms.WRITE]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.ResetFilterIndication = ResetFilterIndication;

/**
 * Characteristic "Rotation Direction"
 */

export class RotationDirection extends Characteristic {

  // The value property of RotationDirection must be one of the following:
  static CLOCKWISE = 0;
  static COUNTER_CLOCKWISE = 1;

  static UUID = '00000028-0000-1000-8000-0026BB765291';

  constructor() {
    super('Rotation Direction', RotationDirection.UUID);
    this.setProps({
      format: Formats.INT,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.RotationDirection = RotationDirection;

/**
 * Characteristic "Rotation Speed"
 */

export class RotationSpeed extends Characteristic {

  static UUID = '00000029-0000-1000-8000-0026BB765291';

  constructor() {
    super('Rotation Speed', RotationSpeed.UUID);
    this.setProps({
      format: Formats.FLOAT,
      unit: Units.PERCENTAGE,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.RotationSpeed = RotationSpeed;

/**
 * Characteristic "Saturation"
 */

export class Saturation extends Characteristic {

  static UUID = '0000002F-0000-1000-8000-0026BB765291';

  constructor() {
    super('Saturation', Saturation.UUID);
    this.setProps({
      format: Formats.FLOAT,
      unit: Units.PERCENTAGE,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.Saturation = Saturation;

/**
 * Characteristic "Security System Alarm Type"
 */

export class SecuritySystemAlarmType extends Characteristic {

  static UUID = '0000008E-0000-1000-8000-0026BB765291';

  constructor() {
    super('Security System Alarm Type', SecuritySystemAlarmType.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.SecuritySystemAlarmType = SecuritySystemAlarmType;

/**
 * Characteristic "Security System Current State"
 */

export class SecuritySystemCurrentState extends Characteristic {

  // The value property of SecuritySystemCurrentState must be one of the following:
  static STAY_ARM = 0;
  static AWAY_ARM = 1;
  static NIGHT_ARM = 2;
  static DISARMED = 3;
  static ALARM_TRIGGERED = 4;

  static UUID = '00000066-0000-1000-8000-0026BB765291';

  constructor() {
    super('Security System Current State', SecuritySystemCurrentState.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 4,
      minValue: 0,
      validValues: [0, 1, 2, 3, 4],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.SecuritySystemCurrentState = SecuritySystemCurrentState;

/**
 * Characteristic "Security System Target State"
 */

export class SecuritySystemTargetState extends Characteristic {

  // The value property of SecuritySystemTargetState must be one of the following:
  static STAY_ARM = 0;
  static AWAY_ARM = 1;
  static NIGHT_ARM = 2;
  static DISARM = 3;

  static UUID = '00000067-0000-1000-8000-0026BB765291';

  constructor() {
    super('Security System Target State', SecuritySystemTargetState.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 3,
      minValue: 0,
      validValues: [0, 1, 2, 3],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.SecuritySystemTargetState = SecuritySystemTargetState;

/**
 * Characteristic "Selected RTP Stream Configuration"
 */

export class SelectedRTPStreamConfiguration extends Characteristic {

  static UUID = '00000117-0000-1000-8000-0026BB765291';

  constructor() {
    super('Selected RTP Stream Configuration', SelectedRTPStreamConfiguration.UUID);
    this.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.WRITE]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.SelectedRTPStreamConfiguration = SelectedRTPStreamConfiguration;

/**
 * Characteristic "Serial Number"
 */

export class SerialNumber extends Characteristic {

  static UUID = '00000030-0000-1000-8000-0026BB765291';

  constructor() {
    super('Serial Number', SerialNumber.UUID);
    this.setProps({
      format: Formats.STRING,
      perms: [Perms.READ]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.SerialNumber = SerialNumber;

/**
 * Characteristic "Service Label Index"
 */

export class ServiceLabelIndex extends Characteristic {

  static UUID = '000000CB-0000-1000-8000-0026BB765291';

  constructor() {
    super('Service Label Index', ServiceLabelIndex.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 255,
      minValue: 1,
      minStep: 1,
      perms: [Perms.READ]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.ServiceLabelIndex = ServiceLabelIndex;

/**
 * Characteristic "Service Label Namespace"
 */

export class ServiceLabelNamespace extends Characteristic {

  // The value property of ServiceLabelNamespace must be one of the following:
  static DOTS = 0;
  static ARABIC_NUMERALS = 1;

  static UUID = '000000CD-0000-1000-8000-0026BB765291';

  constructor() {
    super('Service Label Namespace', ServiceLabelNamespace.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.ServiceLabelNamespace = ServiceLabelNamespace;

/**
 * Characteristic "Set Duration"
 */

export class SetDuration extends Characteristic {

  static UUID = '000000D3-0000-1000-8000-0026BB765291';

  constructor() {
    super('Set Duration', SetDuration.UUID);
    this.setProps({
      format: Formats.UINT32,
      maxValue: 3600,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.SetDuration = SetDuration;

/**
 * Characteristic "Setup Endpoints"
 */

export class SetupEndpoints extends Characteristic {

  static UUID = '00000118-0000-1000-8000-0026BB765291';

  constructor() {
    super('Setup Endpoints', SetupEndpoints.UUID);
    this.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.WRITE]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.SetupEndpoints = SetupEndpoints;

/**
 * Characteristic "Slat Type"
 */

export class SlatType extends Characteristic {

  // The value property of SlatType must be one of the following:
  static HORIZONTAL = 0;
  static VERTICAL = 1;

  static UUID = '000000C0-0000-1000-8000-0026BB765291';

  constructor() {
    super('Slat Type', SlatType.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.SlatType = SlatType;

/**
 * Characteristic "Smoke Detected"
 */

export class SmokeDetected extends Characteristic {

  // The value property of SmokeDetected must be one of the following:
  static SMOKE_NOT_DETECTED = 0;
  static SMOKE_DETECTED = 1;

  static UUID = '00000076-0000-1000-8000-0026BB765291';

  constructor() {
    super('Smoke Detected', SmokeDetected.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.SmokeDetected = SmokeDetected;

/**
 * Characteristic "Status Active"
 */

export class StatusActive extends Characteristic {

  static UUID = '00000075-0000-1000-8000-0026BB765291';

  constructor() {
    super('Status Active', StatusActive.UUID);
    this.setProps({
      format: Formats.BOOL,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.StatusActive = StatusActive;

/**
 * Characteristic "Status Fault"
 */

export class StatusFault extends Characteristic {

  // The value property of StatusFault must be one of the following:
  static NO_FAULT = 0;
  static GENERAL_FAULT = 1;

  static UUID = '00000077-0000-1000-8000-0026BB765291';

  constructor() {
    super('Status Fault', StatusFault.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.StatusFault = StatusFault;

/**
 * Characteristic "Status Jammed"
 */

export class StatusJammed extends Characteristic {

  // The value property of StatusJammed must be one of the following:
  static NOT_JAMMED = 0;
  static JAMMED = 1;

  static UUID = '00000078-0000-1000-8000-0026BB765291';

  constructor() {
    super('Status Jammed', StatusJammed.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.StatusJammed = StatusJammed;

/**
 * Characteristic "Status Low Battery"
 */

export class StatusLowBattery extends Characteristic {

  // The value property of StatusLowBattery must be one of the following:
  static BATTERY_LEVEL_NORMAL = 0;
  static BATTERY_LEVEL_LOW = 1;

  static UUID = '00000079-0000-1000-8000-0026BB765291';

  constructor() {
    super('Status Low Battery', StatusLowBattery.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.StatusLowBattery = StatusLowBattery;


/**
 * Characteristic "Status Tampered"
 */

export class StatusTampered extends Characteristic {

  // The value property of StatusTampered must be one of the following:
  static NOT_TAMPERED = 0;
  static TAMPERED = 1;

  static UUID = '0000007A-0000-1000-8000-0026BB765291';

  constructor() {
    super('Status Tampered', StatusTampered.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.StatusTampered = StatusTampered;

/**
 * Characteristic "Streaming Status"
 */

export class StreamingStatus extends Characteristic {

  static UUID = '00000120-0000-1000-8000-0026BB765291';

  constructor() {
    super('Streaming Status', StreamingStatus.UUID);
    this.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.StreamingStatus = StreamingStatus;

/**
 * Characteristic "Sulphur Dioxide Density"
 */

export class SulphurDioxideDensity extends Characteristic {

  static UUID = '000000C5-0000-1000-8000-0026BB765291';

  constructor() {
    super('Sulphur Dioxide Density', SulphurDioxideDensity.UUID);
    this.setProps({
      format: Formats.FLOAT,
      maxValue: 1000,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.SulphurDioxideDensity = SulphurDioxideDensity;

/**
 * Characteristic "Supported Audio Stream Configuration"
 */

export class SupportedAudioStreamConfiguration extends Characteristic {

  static UUID = '00000115-0000-1000-8000-0026BB765291';

  constructor() {
    super('Supported Audio Stream Configuration', SupportedAudioStreamConfiguration.UUID);
    this.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.SupportedAudioStreamConfiguration = SupportedAudioStreamConfiguration;

/**
 * Characteristic "Supported RTP Configuration"
 */

export class SupportedRTPConfiguration extends Characteristic {

  static UUID = '00000116-0000-1000-8000-0026BB765291';

  constructor() {
    super('Supported RTP Configuration', SupportedRTPConfiguration.UUID);
    this.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.SupportedRTPConfiguration = SupportedRTPConfiguration;

/**
 * Characteristic "Supported Video Stream Configuration"
 */

export class SupportedVideoStreamConfiguration extends Characteristic {

  static UUID = '00000114-0000-1000-8000-0026BB765291';

  constructor() {
    super('Supported Video Stream Configuration', SupportedVideoStreamConfiguration.UUID);
    this.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.SupportedVideoStreamConfiguration = SupportedVideoStreamConfiguration;

/**
 * Characteristic "Swing Mode"
 */

export class SwingMode extends Characteristic {

  // The value property of SwingMode must be one of the following:
  static SWING_DISABLED = 0;
  static SWING_ENABLED = 1;

  static UUID = '000000B6-0000-1000-8000-0026BB765291';

  constructor() {
    super('Swing Mode', SwingMode.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.SwingMode = SwingMode;

/**
 * Characteristic "Target Air Purifier State"
 */

export class TargetAirPurifierState extends Characteristic {

  // The value property of TargetAirPurifierState must be one of the following:
  static MANUAL = 0;
  static AUTO = 1;

  static UUID = '000000A8-0000-1000-8000-0026BB765291';

  constructor() {
    super('Target Air Purifier State', TargetAirPurifierState.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.TargetAirPurifierState = TargetAirPurifierState;

/**
 * Characteristic "Target Air Quality"
 */

export class TargetAirQuality extends Characteristic {

  // The value property of TargetAirQuality must be one of the following:
  static EXCELLENT = 0;
  static GOOD = 1;
  static FAIR = 2;

  static UUID = '000000AE-0000-1000-8000-0026BB765291';

  constructor() {
    super('Target Air Quality', TargetAirQuality.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 2,
      minValue: 0,
      validValues: [0, 1, 2],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.TargetAirQuality = TargetAirQuality;

/**
 * Characteristic "Target Door State"
 */

export class TargetDoorState extends Characteristic {

  // The value property of TargetDoorState must be one of the following:
  static OPEN = 0;
  static CLOSED = 1;

  static UUID = '00000032-0000-1000-8000-0026BB765291';

  constructor() {
    super('Target Door State', TargetDoorState.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.TargetDoorState = TargetDoorState;

/**
 * Characteristic "Target Fan State"
 */

export class TargetFanState extends Characteristic {

  // The value property of TargetFanState must be one of the following:
  static MANUAL = 0;
  static AUTO = 1;

  static UUID = '000000BF-0000-1000-8000-0026BB765291';

  constructor() {
    super('Target Fan State', TargetFanState.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.TargetFanState = TargetFanState;

/**
 * Characteristic "Target Heater Cooler State"
 */

export class TargetHeaterCoolerState extends Characteristic {

  // The value property of TargetHeaterCoolerState must be one of the following:
  static AUTO = 0;
  static HEAT = 1;
  static COOL = 2;

  static UUID = '000000B2-0000-1000-8000-0026BB765291';

  constructor() {
    super('Target Heater Cooler State', TargetHeaterCoolerState.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 2,
      minValue: 0,
      validValues: [0, 1, 2],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.TargetHeaterCoolerState = TargetHeaterCoolerState;

/**
 * Characteristic "Target Heating Cooling State"
 */

export class TargetHeatingCoolingState extends Characteristic {

  // The value property of TargetHeatingCoolingState must be one of the following:
  static OFF = 0;
  static HEAT = 1;
  static COOL = 2;
  static AUTO = 3;

  static UUID = '00000033-0000-1000-8000-0026BB765291';

  constructor() {
    super('Target Heating Cooling State', TargetHeatingCoolingState.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 3,
      minValue: 0,
      validValues: [0, 1, 2, 3],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.TargetHeatingCoolingState = TargetHeatingCoolingState;

/**
 * Characteristic "Target Horizontal Tilt Angle"
 */

export class TargetHorizontalTiltAngle extends Characteristic {

  static UUID = '0000007B-0000-1000-8000-0026BB765291';

  constructor() {
    super('Target Horizontal Tilt Angle', TargetHorizontalTiltAngle.UUID);
    this.setProps({
      format: Formats.INT,
      unit: Units.ARC_DEGREE,
      maxValue: 90,
      minValue: -90,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.TargetHorizontalTiltAngle = TargetHorizontalTiltAngle;

/**
 * Characteristic "Target Humidifier Dehumidifier State"
 */

export class TargetHumidifierDehumidifierState extends Characteristic {

  /**
   * @deprecated Removed in iOS 11. Use HUMIDIFIER_OR_DEHUMIDIFIER instead.
   */
  static AUTO = 0;

  // The value property of TargetHumidifierDehumidifierState must be one of the following:
  static HUMIDIFIER_OR_DEHUMIDIFIER = 0;
  static HUMIDIFIER = 1;
  static DEHUMIDIFIER = 2;

  static UUID = '000000B4-0000-1000-8000-0026BB765291';

  constructor() {
    super('Target Humidifier Dehumidifier State', TargetHumidifierDehumidifierState.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 2,
      minValue: 0,
      validValues: [0, 1, 2],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.TargetHumidifierDehumidifierState = TargetHumidifierDehumidifierState;

/**
 * Characteristic "Target Position"
 */

export class TargetPosition extends Characteristic {

  static UUID = '0000007C-0000-1000-8000-0026BB765291';

  constructor() {
    super('Target Position', TargetPosition.UUID);
    this.setProps({
      format: Formats.UINT8,
      unit: Units.PERCENTAGE,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.TargetPosition = TargetPosition;

/**
 * Characteristic "Target Relative Humidity"
 */

export class TargetRelativeHumidity extends Characteristic {

  static UUID = '00000034-0000-1000-8000-0026BB765291';

  constructor() {
    super('Target Relative Humidity', TargetRelativeHumidity.UUID);
    this.setProps({
      format: Formats.FLOAT,
      unit: Units.PERCENTAGE,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.TargetRelativeHumidity = TargetRelativeHumidity;

/**
 * Characteristic "Target Slat State"
 */

export class TargetSlatState extends Characteristic {

  // The value property of TargetSlatState must be one of the following:
  static MANUAL = 0;
  static AUTO = 1;

  static UUID = '000000BE-0000-1000-8000-0026BB765291';

  constructor() {
    super('Target Slat State', TargetSlatState.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.TargetSlatState = TargetSlatState;

/**
 * Characteristic "Target Temperature"
 */

export class TargetTemperature extends Characteristic {

  static UUID = '00000035-0000-1000-8000-0026BB765291';

  constructor() {
    super('Target Temperature', TargetTemperature.UUID);
    this.setProps({
      format: Formats.FLOAT,
      unit: Units.CELSIUS,
      maxValue: 38,
      minValue: 10,
      minStep: 0.1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.TargetTemperature = TargetTemperature;

/**
 * Characteristic "Target Tilt Angle"
 */

export class TargetTiltAngle extends Characteristic {

  static UUID = '000000C2-0000-1000-8000-0026BB765291';

  constructor() {
    super('Target Tilt Angle', TargetTiltAngle.UUID);
    this.setProps({
      format: Formats.INT,
      unit: Units.ARC_DEGREE,
      maxValue: 90,
      minValue: -90,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.TargetTiltAngle = TargetTiltAngle;

/**
 * Characteristic "Target Vertical Tilt Angle"
 */

export class TargetVerticalTiltAngle extends Characteristic {

  static UUID = '0000007D-0000-1000-8000-0026BB765291';

  constructor() {
    super('Target Vertical Tilt Angle', TargetVerticalTiltAngle.UUID);
    this.setProps({
      format: Formats.INT,
      unit: Units.ARC_DEGREE,
      maxValue: 90,
      minValue: -90,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.TargetVerticalTiltAngle = TargetVerticalTiltAngle;

/**
 * Characteristic "Temperature Display Units"
 */

export class TemperatureDisplayUnits extends Characteristic {

  // The value property of TemperatureDisplayUnits must be one of the following:
  static CELSIUS = 0;
  static FAHRENHEIT = 1;

  static UUID = '00000036-0000-1000-8000-0026BB765291';

  constructor() {
    super('Temperature Display Units', TemperatureDisplayUnits.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0, 1],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.TemperatureDisplayUnits = TemperatureDisplayUnits;

/**
 * Characteristic "Valve Type"
 */

export class ValveType extends Characteristic {

  // The value property of ValveType must be one of the following:
  static GENERIC_VALVE = 0;
  static IRRIGATION = 1;
  static SHOWER_HEAD = 2;
  static WATER_FAUCET = 3;

  static UUID = '000000D5-0000-1000-8000-0026BB765291';

  constructor() {
    super('Valve Type', ValveType.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 3,
      minValue: 0,
      validValues: [0, 1, 2, 3],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.ValveType = ValveType;

/**
 * Characteristic "Version"
 */

export class Version extends Characteristic {

  static UUID = '00000037-0000-1000-8000-0026BB765291';

  constructor() {
    super('Version', Version.UUID);
    this.setProps({
      format: Formats.STRING,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.Version = Version;

/**
 * Characteristic "VOC Density"
 */

export class VOCDensity extends Characteristic {

  static UUID = '000000C8-0000-1000-8000-0026BB765291';

  constructor() {
    super('VOC Density', VOCDensity.UUID);
    this.setProps({
      format: Formats.FLOAT,
      maxValue: 1000,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.VOCDensity = VOCDensity;

/**
 * Characteristic "Volume"
 */

export class Volume extends Characteristic {

  static UUID = '00000119-0000-1000-8000-0026BB765291';

  constructor() {
    super('Volume', Volume.UUID);
    this.setProps({
      format: Formats.UINT8,
      unit: Units.PERCENTAGE,
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.Volume = Volume;

/**
 * Characteristic "Water Level"
 */

export class WaterLevel extends Characteristic {

  static UUID = '000000B5-0000-1000-8000-0026BB765291';

  constructor() {
    super('Water Level', WaterLevel.UUID);
    this.setProps({
      format: Formats.FLOAT,
      maxValue: 100,
      minValue: 0,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.WaterLevel = WaterLevel;

/**
 * Characteristic "Recording Audio Active"
 */

export class RecordingAudioActive extends Characteristic {

  static DISABLE = 0;
  static ENABLE = 1;

  static UUID = '00000226-0000-1000-8000-0026BB765291';

  constructor() {
    super('Recording Audio Active', RecordingAudioActive.UUID);
    this.setProps({
        format: Formats.UINT8,
        perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.RecordingAudioActive = RecordingAudioActive;

/**
 * Characteristic "Supported Camera Recording Configuration"
 */

export class SupportedCameraRecordingConfiguration extends Characteristic {

  static UUID = '00000205-0000-1000-8000-0026BB765291';

  constructor() {
    super('Supported Camera Recording Configuration', SupportedCameraRecordingConfiguration.UUID);
    this.setProps({
        format: Formats.TLV8,
        perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.SupportedCameraRecordingConfiguration = SupportedCameraRecordingConfiguration;

/**
 * Characteristic "Supported Video Recording Configuration"
 */

export class SupportedVideoRecordingConfiguration extends Characteristic {

  static UUID = '00000206-0000-1000-8000-0026BB765291';

  constructor() {
    super('Supported Video Recording Configuration', SupportedVideoRecordingConfiguration.UUID);
    this.setProps({
        format: Formats.TLV8,
        perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.SupportedVideoRecordingConfiguration = SupportedVideoRecordingConfiguration;

/**
 * Characteristic "Supported Audio Recording Configuration"
 */

export class SupportedAudioRecordingConfiguration extends Characteristic {

  static UUID = '00000207-0000-1000-8000-0026BB765291';

  constructor() {
    super('Supported Audio Recording Configuration', SupportedAudioRecordingConfiguration.UUID);
    this.setProps({
        format: Formats.TLV8,
        perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.SupportedAudioRecordingConfiguration = SupportedAudioRecordingConfiguration;

/**
 * Characteristic "Selected Camera Recording Configuration"
 */

export class SelectedCameraRecordingConfiguration extends Characteristic {

  static UUID = '00000209-0000-1000-8000-0026BB765291';

  constructor() {
    super('Selected Camera Recording Configuration', SelectedCameraRecordingConfiguration.UUID);
    this.setProps({
        format: Formats.TLV8,
        perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.SelectedCameraRecordingConfiguration = SelectedCameraRecordingConfiguration;

/**
 * Characteristic "Camera Operating Mode Indicator"
 */

export class CameraOperatingModeIndicator extends Characteristic {

  static DISABLE = 0;
  static ENABLE = 1;

  static UUID = '0000021D-0000-1000-8000-0026BB765291';

  constructor() {
    super('Camera Operating Mode Indicator', CameraOperatingModeIndicator.UUID);
    this.setProps({
        format: Formats.UINT8,
        perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY, Perms.TIMED_WRITE]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.CameraOperatingModeIndicator = CameraOperatingModeIndicator;

/**
 * Characteristic "Event Snapshots Active"
 */

export class EventSnapshotsActive extends Characteristic {

  static DISABLE = 0;
  static ENABLE = 1;

  static UUID = '00000223-0000-1000-8000-0026BB765291';

  constructor() {
    super('Event Snapshots Active', EventSnapshotsActive.UUID);
    this.setProps({
      format: Formats.UINT8,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.EventSnapshotsActive = EventSnapshotsActive;

/**
 * Characteristic "Diagonal Field Of View"
 *
 * @deprecated was removed again
 */

export class DiagonalFieldOfView extends Characteristic {

  static UUID = '00000224-0000-1000-8000-0026BB765291';

  constructor() {
    super('Diagonal Field Of View', DiagonalFieldOfView.UUID);
    this.setProps({
      format: Formats.FLOAT,
      unit: Units.ARC_DEGREE,
      maxValue: 360,
      minValue: 0,
      minStep: 1,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.DiagonalFieldOfView = DiagonalFieldOfView;

/**
 * Characteristic "HomeKit Camera Active"
 */

export class HomeKitCameraActive extends Characteristic {

  static OFF = 0;
  static ON = 1;

  static UUID = '0000021B-0000-1000-8000-0026BB765291';

  constructor() {
    super('HomeKit Camera Active', HomeKitCameraActive.UUID);
    this.setProps({
      format: Formats.UINT8,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY, Perms.TIMED_WRITE]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.HomeKitCameraActive = HomeKitCameraActive;

/**
 * Characteristic "Manually disabled"
 */

export class ManuallyDisabled extends Characteristic {

  static ENABLED = 0;
  static DISABLED = 1;

  static UUID = '00000227-0000-1000-8000-0026BB765291';

  constructor() {
    super('Manually disabled', ManuallyDisabled.UUID);
    this.setProps({
      format: Formats.BOOL,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.ManuallyDisabled = ManuallyDisabled;

/**
 * Characteristic "Third Party Camera Active"
 */

export class ThirdPartyCameraActive extends Characteristic {

  static OFF = 0;
  static ON = 1;

  static UUID = '0000021C-0000-1000-8000-0026BB765291';

  constructor() {
    super('Third Party Camera Active', ThirdPartyCameraActive.UUID);
    this.setProps({
      format: Formats.UINT8,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.ThirdPartyCameraActive = ThirdPartyCameraActive;

/**
 * Characteristic "Periodic Snapshots Active"
 */

export class PeriodicSnapshotsActive extends Characteristic {

  static DISABLE = 0;
  static ENABLE = 1;

  static UUID = '00000225-0000-1000-8000-0026BB765291';

  constructor() {
    super('Periodic Snapshots Active', PeriodicSnapshotsActive.UUID);
    this.setProps({
      format: Formats.UINT8,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.PeriodicSnapshotsActive = PeriodicSnapshotsActive;

/**
 * Characteristic "Network Client Profile Control"
 */

export class NetworkClientProfileControl extends Characteristic {

  static UUID = '0000020C-0000-1000-8000-0026BB765291';

  constructor() {
    super('Network Client Profile Control', NetworkClientProfileControl.UUID);
    this.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY, Perms.TIMED_WRITE, Perms.WRITE_RESPONSE]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.NetworkClientProfileControl = NetworkClientProfileControl;

/**
 * Characteristic "Network Client Status Control"
 */

export class NetworkClientStatusControl extends Characteristic {

  static UUID = '0000020D-0000-1000-8000-0026BB765291';

  constructor() {
    super('Network Client Status Control', NetworkClientStatusControl.UUID);
    this.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.WRITE, Perms.WRITE_RESPONSE]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.NetworkClientStatusControl = NetworkClientStatusControl;

/**
 * Characteristic "Router Status"
 */

export class RouterStatus extends Characteristic {

  static READY = 0;
  static NOT_READY = 1;

  static UUID = '0000020E-0000-1000-8000-0026BB765291';

  constructor() {
    super('Router Status', RouterStatus.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0,1],
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.RouterStatus = RouterStatus;

/**
 * Characteristic "Supported Router Configuration"
 */

export class SupportedRouterConfiguration extends Characteristic {

  static UUID = '00000210-0000-1000-8000-0026BB765291';

  constructor() {
    super('Supported Router Configuration', SupportedRouterConfiguration.UUID);
    this.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.SupportedRouterConfiguration = SupportedRouterConfiguration;

/**
 * Characteristic "WAN Configuration List"
 */

export class WANConfigurationList extends Characteristic {

  static UUID = '00000211-0000-1000-8000-0026BB765291';

  constructor() {
    super('WAN Configuration List', WANConfigurationList.UUID);
    this.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.WANConfigurationList = WANConfigurationList;

/**
 * Characteristic "WAN Status List"
 */

export class WANStatusList extends Characteristic {

  static UUID = '00000212-0000-1000-8000-0026BB765291';

  constructor() {
    super('WAN Status List', WANStatusList.UUID);
    this.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.WANStatusList = WANStatusList;

/**
 * Characteristic "Managed Network Enable"
 */

export class ManagedNetworkEnable extends Characteristic {
  static DISABLED = 0;
  static ENABLED = 1;
  static UNKNOWN = 2;

  static UUID = '00000215-0000-1000-8000-0026BB765291';

  constructor() {
    super('Managed Network Enable', ManagedNetworkEnable.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 1,
      minValue: 0,
      validValues: [0,1],
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY, Perms.TIMED_WRITE]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.ManagedNetworkEnable = ManagedNetworkEnable;

/**
 * Characteristic "Network Access Violation Control"
 */

export class NetworkAccessViolationControl extends Characteristic {

  static UUID = '0000021F-0000-1000-8000-0026BB765291';

  constructor() {
    super('Network Access Violation Control', NetworkAccessViolationControl.UUID);
    this.setProps({
      format: Formats.TLV8,
      perms: [Perms.READ, Perms.WRITE, Perms.NOTIFY, Perms.TIMED_WRITE, Perms.WRITE_RESPONSE]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.NetworkAccessViolationControl = NetworkAccessViolationControl;

/**
 * Characteristic "Wi-Fi Satellite Status"
 */

export class WiFiSatelliteStatus extends Characteristic {
  // The value property of WiFiSatelliteStatus must be one of the following:
  static UNKNOWN = 0;
  static CONNECTED = 1;
  static NOT_CONNECTED = 2;

  static UUID = '0000021E-0000-1000-8000-0026BB765291';

  constructor() {
    super('Wi-Fi Satellite Status', WiFiSatelliteStatus.UUID);
    this.setProps({
      format: Formats.UINT8,
      maxValue: 2,
      minValue: 0,
      validValues: [0,1,2],
      perms: [Perms.PAIRED_READ, Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.WiFiSatelliteStatus = WiFiSatelliteStatus;

/**
 * Characteristic "Wake Configuration"
 */

export class WakeConfiguration extends Characteristic {

  static UUID = '00000222-0000-1000-8000-0026BB765291';

  constructor() {
    super('Wake Configuration', WakeConfiguration.UUID);
    this.setProps({
      format: Formats.TLV8,
      perms: [Perms.PAIRED_READ],
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.WakeConfiguration = WakeConfiguration;

/**
 * Characteristic "Supported Transfer Transport Configuration"
 */

export class SupportedTransferTransportConfiguration extends Characteristic {

  static UUID = '00000202-0000-1000-8000-0026BB765291';

  constructor() {
    super('Supported Transfer Transport Configuration', SupportedTransferTransportConfiguration.UUID);
    this.setProps({
      format: Formats.TLV8,
      perms: [Perms.PAIRED_READ],
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.SupportedTransferTransportConfiguration = SupportedTransferTransportConfiguration;

/**
 * Characteristic "Setup Transfer Transport"
 */

export class SetupTransferTransport extends Characteristic {

  static UUID = '00000201-0000-1000-8000-0026BB765291';

  constructor() {
    super('Setup Transfer Transport', SetupTransferTransport.UUID);
    this.setProps({
      format: Formats.TLV8,
      perms: [Perms.PAIRED_WRITE, Perms.WRITE_RESPONSE],
    });
    this.value = this.getDefaultValue();
  }
}

Characteristic.SetupTransferTransport = SetupTransferTransport;

/**
 * Service "Access Control"
 */

export class AccessControl extends Service {

  static UUID = '000000DA-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, AccessControl.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.AccessControlLevel);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.PasswordSetting);
  }
}

/**
 * Service "Accessory Information"
 */

export class AccessoryInformation extends Service {

  static UUID = '0000003E-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, AccessoryInformation.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.Identify);
    this.addCharacteristic(Characteristic.Manufacturer);
    this.addCharacteristic(Characteristic.Model);
    this.addCharacteristic(Characteristic.Name);
    this.addCharacteristic(Characteristic.SerialNumber);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.AccessoryFlags);
    this.addOptionalCharacteristic(Characteristic.AppMatchingIdentifier);
    this.addOptionalCharacteristic(Characteristic.ConfiguredName);
    this.addOptionalCharacteristic(Characteristic.FirmwareRevision);
    this.addOptionalCharacteristic(Characteristic.HardwareRevision);
    this.addOptionalCharacteristic(Characteristic.SoftwareRevision);
    this.addOptionalCharacteristic(Characteristic.ProductData);
  }
}

Service.AccessoryInformation = AccessoryInformation;

/**
 * Service "Air Purifier"
 */

export class AirPurifier extends Service {

  static UUID = '000000BB-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, AirPurifier.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.Active);
    this.addCharacteristic(Characteristic.CurrentAirPurifierState);
    this.addCharacteristic(Characteristic.TargetAirPurifierState);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.LockPhysicalControls);
    this.addOptionalCharacteristic(Characteristic.Name);
    this.addOptionalCharacteristic(Characteristic.SwingMode);
    this.addOptionalCharacteristic(Characteristic.RotationSpeed);
  }
}

Service.AirPurifier = AirPurifier;

/**
 * Service "Air Quality Sensor"
 */

export class AirQualitySensor extends Service {

  static UUID = '0000008D-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, AirQualitySensor.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.AirQuality);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.StatusActive);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
    this.addOptionalCharacteristic(Characteristic.Name);
    this.addOptionalCharacteristic(Characteristic.OzoneDensity);
    this.addOptionalCharacteristic(Characteristic.NitrogenDioxideDensity);
    this.addOptionalCharacteristic(Characteristic.SulphurDioxideDensity);
    this.addOptionalCharacteristic(Characteristic.PM2_5Density);
    this.addOptionalCharacteristic(Characteristic.PM10Density);
    this.addOptionalCharacteristic(Characteristic.VOCDensity);
  }
}

Service.AirQualitySensor = AirQualitySensor;

/**
 * Service "Battery Service"
 */

export class BatteryService extends Service {

  static UUID = '00000096-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, BatteryService.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.BatteryLevel);
    this.addCharacteristic(Characteristic.ChargingState);
    this.addCharacteristic(Characteristic.StatusLowBattery);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.Name);
  }
}

Service.BatteryService = BatteryService;

/**
 * Service "Camera RTP Stream Management"
 */

export class CameraRTPStreamManagement extends Service {

  static UUID = '00000110-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, CameraRTPStreamManagement.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.SupportedVideoStreamConfiguration);
    this.addCharacteristic(Characteristic.SupportedAudioStreamConfiguration);
    this.addCharacteristic(Characteristic.SupportedRTPConfiguration);
    this.addCharacteristic(Characteristic.SelectedRTPStreamConfiguration);
    this.addCharacteristic(Characteristic.StreamingStatus);
    this.addCharacteristic(Characteristic.SetupEndpoints);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.Active);
  }
}

Service.CameraRTPStreamManagement = CameraRTPStreamManagement;

/**
 * Service "Carbon Dioxide Sensor"
 */

export class CarbonDioxideSensor extends Service {

  static UUID = '00000097-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, CarbonDioxideSensor.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.CarbonDioxideDetected);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.StatusActive);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.CarbonDioxideLevel);
    this.addOptionalCharacteristic(Characteristic.CarbonDioxidePeakLevel);
    this.addOptionalCharacteristic(Characteristic.Name);
  }
}

Service.CarbonDioxideSensor = CarbonDioxideSensor;

/**
 * Service "Carbon Monoxide Sensor"
 */

export class CarbonMonoxideSensor extends Service {

  static UUID = '0000007F-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, CarbonMonoxideSensor.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.CarbonMonoxideDetected);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.StatusActive);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.CarbonMonoxideLevel);
    this.addOptionalCharacteristic(Characteristic.CarbonMonoxidePeakLevel);
    this.addOptionalCharacteristic(Characteristic.Name);
  }
}

Service.CarbonMonoxideSensor = CarbonMonoxideSensor;

/**
 * Service "Contact Sensor"
 */

export class ContactSensor extends Service {

  static UUID = '00000080-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, ContactSensor.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.ContactSensorState);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.StatusActive);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
    this.addOptionalCharacteristic(Characteristic.Name);
  }
}

Service.ContactSensor = ContactSensor;

/**
 * Service "Door"
 */

export class Door extends Service {

  static UUID = '00000081-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, Door.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.CurrentPosition);
    this.addCharacteristic(Characteristic.PositionState);
    this.addCharacteristic(Characteristic.TargetPosition);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.HoldPosition);
    this.addOptionalCharacteristic(Characteristic.ObstructionDetected);
    this.addOptionalCharacteristic(Characteristic.Name);
  }
}

Service.Door = Door;

/**
 * Service "Doorbell"
 */

export class Doorbell extends Service {

  static UUID = '00000121-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, Doorbell.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.ProgrammableSwitchEvent);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.Brightness);
    this.addOptionalCharacteristic(Characteristic.Volume);
    this.addOptionalCharacteristic(Characteristic.Name);
  }
}

Service.Doorbell = Doorbell;

/**
 * Service "Fan"
 */

export class Fan extends Service {

  static UUID = '00000040-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, Fan.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.On);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.RotationDirection);
    this.addOptionalCharacteristic(Characteristic.RotationSpeed);
    this.addOptionalCharacteristic(Characteristic.Name);
  }
}

Service.Fan = Fan;

/**
 * Service "Fan v2"
 */

export class Fanv2 extends Service {

  static UUID = '000000B7-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, Fanv2.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.Active);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.CurrentFanState);
    this.addOptionalCharacteristic(Characteristic.TargetFanState);
    this.addOptionalCharacteristic(Characteristic.LockPhysicalControls);
    this.addOptionalCharacteristic(Characteristic.Name);
    this.addOptionalCharacteristic(Characteristic.RotationDirection);
    this.addOptionalCharacteristic(Characteristic.RotationSpeed);
    this.addOptionalCharacteristic(Characteristic.SwingMode);
  }
}

Service.Fanv2 = Fanv2;

/**
 * Service "Filter Maintenance"
 */

export class FilterMaintenance extends Service {

  static UUID = '000000BA-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, FilterMaintenance.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.FilterChangeIndication);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.FilterLifeLevel);
    this.addOptionalCharacteristic(Characteristic.ResetFilterIndication);
    this.addOptionalCharacteristic(Characteristic.Name);
  }
}

Service.FilterMaintenance = FilterMaintenance;

/**
 * Service "Faucet"
 */

export class Faucet extends Service {

  static UUID = '000000D7-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, Faucet.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.Active);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.Name);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
  }
}

Service.Faucet = Faucet;

/**
 * Service "Garage Door Opener"
 */

export class GarageDoorOpener extends Service {

  static UUID = '00000041-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, GarageDoorOpener.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.CurrentDoorState);
    this.addCharacteristic(Characteristic.TargetDoorState);
    this.addCharacteristic(Characteristic.ObstructionDetected);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.LockCurrentState);
    this.addOptionalCharacteristic(Characteristic.LockTargetState);
    this.addOptionalCharacteristic(Characteristic.Name);
  }
}

Service.GarageDoorOpener = GarageDoorOpener;

/**
 * Service "Heater Cooler"
 */

export class HeaterCooler extends Service {

  static UUID = '000000BC-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, HeaterCooler.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.Active);
    this.addCharacteristic(Characteristic.CurrentHeaterCoolerState);
    this.addCharacteristic(Characteristic.TargetHeaterCoolerState);
    this.addCharacteristic(Characteristic.CurrentTemperature);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.LockPhysicalControls);
    this.addOptionalCharacteristic(Characteristic.Name);
    this.addOptionalCharacteristic(Characteristic.SwingMode);
    this.addOptionalCharacteristic(Characteristic.CoolingThresholdTemperature);
    this.addOptionalCharacteristic(Characteristic.HeatingThresholdTemperature);
    this.addOptionalCharacteristic(Characteristic.TemperatureDisplayUnits);
    this.addOptionalCharacteristic(Characteristic.RotationSpeed);
  }
}

Service.HeaterCooler = HeaterCooler;

/**
 * Service "Humidifier Dehumidifier"
 */

export class HumidifierDehumidifier extends Service {

  static UUID = '000000BD-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, HumidifierDehumidifier.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.CurrentRelativeHumidity);
    this.addCharacteristic(Characteristic.CurrentHumidifierDehumidifierState);
    this.addCharacteristic(Characteristic.TargetHumidifierDehumidifierState);
    this.addCharacteristic(Characteristic.Active);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.LockPhysicalControls);
    this.addOptionalCharacteristic(Characteristic.Name);
    this.addOptionalCharacteristic(Characteristic.SwingMode);
    this.addOptionalCharacteristic(Characteristic.WaterLevel);
    this.addOptionalCharacteristic(Characteristic.RelativeHumidityDehumidifierThreshold);
    this.addOptionalCharacteristic(Characteristic.RelativeHumidityHumidifierThreshold);
    this.addOptionalCharacteristic(Characteristic.RotationSpeed);
  }
}

Service.HumidifierDehumidifier = HumidifierDehumidifier;

/**
 * Service "Humidity Sensor"
 */

export class HumiditySensor extends Service {

  static UUID = '00000082-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, HumiditySensor.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.CurrentRelativeHumidity);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.StatusActive);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
    this.addOptionalCharacteristic(Characteristic.Name);
  }
}

Service.HumiditySensor = HumiditySensor;

/**
 * Service "Irrigation System"
 */

export class IrrigationSystem extends Service {

  static UUID = '000000CF-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, IrrigationSystem.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.Active);
    this.addCharacteristic(Characteristic.ProgramMode);
    this.addCharacteristic(Characteristic.InUse);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.Name);
    this.addOptionalCharacteristic(Characteristic.RemainingDuration);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
  }
}

Service.IrrigationSystem = IrrigationSystem;

/**
 * Service "Leak Sensor"
 */

export class LeakSensor extends Service {

  static UUID = '00000083-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, LeakSensor.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.LeakDetected);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.StatusActive);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
    this.addOptionalCharacteristic(Characteristic.Name);
  }
}

Service.LeakSensor = LeakSensor;

/**
 * Service "Light Sensor"
 */

export class LightSensor extends Service {

  static UUID = '00000084-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, LightSensor.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.CurrentAmbientLightLevel);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.StatusActive);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
    this.addOptionalCharacteristic(Characteristic.Name);
  }
}

Service.LightSensor = LightSensor;

/**
 * Service "Lightbulb"
 */

export class Lightbulb extends Service {

  static UUID = '00000043-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, Lightbulb.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.On);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.Brightness);
    this.addOptionalCharacteristic(Characteristic.Hue);
    this.addOptionalCharacteristic(Characteristic.Saturation);
    this.addOptionalCharacteristic(Characteristic.Name);
    this.addOptionalCharacteristic(Characteristic.ColorTemperature); //Manual fix to add temperature
  }
}

Service.Lightbulb = Lightbulb;

/**
 * Service "Lock Management"
 */

export class LockManagement extends Service {

  static UUID = '00000044-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, LockManagement.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.LockControlPoint);
    this.addCharacteristic(Characteristic.Version);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.Logs);
    this.addOptionalCharacteristic(Characteristic.AudioFeedback);
    this.addOptionalCharacteristic(Characteristic.LockManagementAutoSecurityTimeout);
    this.addOptionalCharacteristic(Characteristic.AdministratorOnlyAccess);
    this.addOptionalCharacteristic(Characteristic.LockLastKnownAction);
    this.addOptionalCharacteristic(Characteristic.CurrentDoorState);
    this.addOptionalCharacteristic(Characteristic.MotionDetected);
    this.addOptionalCharacteristic(Characteristic.Name);
  }
}

Service.LockManagement = LockManagement;

/**
 * Service "Lock Mechanism"
 */

export class LockMechanism extends Service {

  static UUID = '00000045-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, LockMechanism.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.LockCurrentState);
    this.addCharacteristic(Characteristic.LockTargetState);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.Name);
  }
}

Service.LockMechanism = LockMechanism;

/**
 * Service "Microphone"
 */

export class Microphone extends Service {

  static UUID = '00000112-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, Microphone.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.Mute);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.Volume);
  }
}

Service.Microphone = Microphone;

/**
 * Service "Motion Sensor"
 */

export class MotionSensor extends Service {

  static UUID = '00000085-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, MotionSensor.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.MotionDetected);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.StatusActive);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
    this.addOptionalCharacteristic(Characteristic.Name);
  }
}

Service.MotionSensor = MotionSensor;

/**
 * Service "Occupancy Sensor"
 */

export class OccupancySensor extends Service {

  static UUID = '00000086-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, OccupancySensor.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.OccupancyDetected);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.StatusActive);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
    this.addOptionalCharacteristic(Characteristic.Name);
  }
}

Service.OccupancySensor = OccupancySensor;

/**
 * Service "Outlet"
 */

export class Outlet extends Service {

  static UUID = '00000047-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, Outlet.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.On);
    this.addCharacteristic(Characteristic.OutletInUse);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.Name);
  }
}

Service.Outlet = Outlet;

/**
 * Service "Security System"
 */

export class SecuritySystem extends Service {

  static UUID = '0000007E-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, SecuritySystem.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.SecuritySystemCurrentState);
    this.addCharacteristic(Characteristic.SecuritySystemTargetState);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.SecuritySystemAlarmType);
    this.addOptionalCharacteristic(Characteristic.Name);
  }
}

Service.SecuritySystem = SecuritySystem;

/**
 * Service "Service Label"
 */

export class ServiceLabel extends Service {

  static UUID = '000000CC-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, ServiceLabel.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.ServiceLabelNamespace);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.Name);
  }
}

Service.ServiceLabel = ServiceLabel;

/**
 * Service "Slat"
 */

export class Slat extends Service {

  static UUID = '000000B9-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, Slat.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.SlatType);
    this.addCharacteristic(Characteristic.CurrentSlatState);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.Name);
    this.addOptionalCharacteristic(Characteristic.CurrentTiltAngle);
    this.addOptionalCharacteristic(Characteristic.TargetTiltAngle);
    this.addOptionalCharacteristic(Characteristic.SwingMode);
  }
}

Service.Slat = Slat;

/**
 * Service "Smoke Sensor"
 */

export class SmokeSensor extends Service {

  static UUID = '00000087-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, SmokeSensor.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.SmokeDetected);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.StatusActive);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
    this.addOptionalCharacteristic(Characteristic.Name);
  }
}

Service.SmokeSensor = SmokeSensor;

/**
 * Service "Smart Speaker"
 */

export class SmartSpeaker extends Service {

  static UUID = '00000228-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, SmartSpeaker.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.CurrentMediaState);
    this.addCharacteristic(Characteristic.TargetMediaState);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.Name);
    this.addOptionalCharacteristic(Characteristic.ConfiguredName);
    this.addOptionalCharacteristic(Characteristic.Volume);
    this.addOptionalCharacteristic(Characteristic.Mute);
  }
}

Service.SmartSpeaker = SmartSpeaker;

/**
 * Service "Speaker"
 *
 * {@see TelevisionSpeaker} for the same Service defined with {@link VolumeControlType},
 * {@link VolumeSelector} and {@link Active} characteristics.
 */

export class Speaker extends Service {

  static UUID = '00000113-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, Speaker.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.Mute);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.Volume);
  }
}

Service.Speaker = Speaker;

/**
 * Service "Stateless Programmable Switch"
 */

export class StatelessProgrammableSwitch extends Service {

  static UUID = '00000089-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, StatelessProgrammableSwitch.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.ProgrammableSwitchEvent);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.Name);
    this.addOptionalCharacteristic(Characteristic.ServiceLabelIndex);
  }
}

Service.StatelessProgrammableSwitch = StatelessProgrammableSwitch;

/**
 * Service "Switch"
 */

export class Switch extends Service {

  static UUID = '00000049-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, Switch.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.On);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.Name);
  }
}

Service.Switch = Switch;

/**
 * Service "Temperature Sensor"
 */

export class TemperatureSensor extends Service {

  static UUID = '0000008A-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, TemperatureSensor.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.CurrentTemperature);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.StatusActive);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
    this.addOptionalCharacteristic(Characteristic.StatusTampered);
    this.addOptionalCharacteristic(Characteristic.Name);
  }
}

Service.TemperatureSensor = TemperatureSensor;

/**
 * Service "Thermostat"
 */

export class Thermostat extends Service {

  static UUID = '0000004A-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, Thermostat.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.CurrentHeatingCoolingState);
    this.addCharacteristic(Characteristic.TargetHeatingCoolingState);
    this.addCharacteristic(Characteristic.CurrentTemperature);
    this.addCharacteristic(Characteristic.TargetTemperature);
    this.addCharacteristic(Characteristic.TemperatureDisplayUnits);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.CurrentRelativeHumidity);
    this.addOptionalCharacteristic(Characteristic.TargetRelativeHumidity);
    this.addOptionalCharacteristic(Characteristic.CoolingThresholdTemperature);
    this.addOptionalCharacteristic(Characteristic.HeatingThresholdTemperature);
    this.addOptionalCharacteristic(Characteristic.Name);
  }
}

Service.Thermostat = Thermostat;

/**
 * Service "Valve"
 */

export class Valve extends Service {

  static UUID = '000000D0-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, Valve.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.Active);
    this.addCharacteristic(Characteristic.InUse);
    this.addCharacteristic(Characteristic.ValveType);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.SetDuration);
    this.addOptionalCharacteristic(Characteristic.RemainingDuration);
    this.addOptionalCharacteristic(Characteristic.IsConfigured);
    this.addOptionalCharacteristic(Characteristic.ServiceLabelIndex);
    this.addOptionalCharacteristic(Characteristic.StatusFault);
    this.addOptionalCharacteristic(Characteristic.Name);
  }
}

Service.Valve = Valve;

/**
 * Service "Window"
 */

export class Window extends Service {

  static UUID = '0000008B-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, Window.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.CurrentPosition);
    this.addCharacteristic(Characteristic.TargetPosition);
    this.addCharacteristic(Characteristic.PositionState);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.HoldPosition);
    this.addOptionalCharacteristic(Characteristic.ObstructionDetected);
    this.addOptionalCharacteristic(Characteristic.Name);
  }
}

Service.Window = Window;

/**
 * Service "Window Covering"
 */

export class WindowCovering extends Service {

  static UUID = '0000008C-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, WindowCovering.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.CurrentPosition);
    this.addCharacteristic(Characteristic.TargetPosition);
    this.addCharacteristic(Characteristic.PositionState);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.HoldPosition);
    this.addOptionalCharacteristic(Characteristic.TargetHorizontalTiltAngle);
    this.addOptionalCharacteristic(Characteristic.TargetVerticalTiltAngle);
    this.addOptionalCharacteristic(Characteristic.CurrentHorizontalTiltAngle);
    this.addOptionalCharacteristic(Characteristic.CurrentVerticalTiltAngle);
    this.addOptionalCharacteristic(Characteristic.ObstructionDetected);
    this.addOptionalCharacteristic(Characteristic.Name);
  }
}

Service.WindowCovering = WindowCovering;

/**
 * Service "Camera Operating Mode"
 */

export class CameraOperatingMode extends Service {

  static UUID = '0000021A-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, CameraOperatingMode.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.EventSnapshotsActive);
    this.addCharacteristic(Characteristic.HomeKitCameraActive);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.ManuallyDisabled);
    this.addOptionalCharacteristic(Characteristic.NightVision);
    this.addOptionalCharacteristic(Characteristic.ThirdPartyCameraActive);
    this.addOptionalCharacteristic(Characteristic.CameraOperatingModeIndicator);
    this.addOptionalCharacteristic(Characteristic.PeriodicSnapshotsActive);
  }
}

Service.CameraOperatingMode = CameraOperatingMode;

/**
 * Service "Camera Event Recording Management"
 */

export class CameraEventRecordingManagement extends Service {

  static UUID = '00000204-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, CameraEventRecordingManagement.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.Active);
    this.addCharacteristic(Characteristic.SupportedCameraRecordingConfiguration);
    this.addCharacteristic(Characteristic.SupportedVideoRecordingConfiguration);
    this.addCharacteristic(Characteristic.SupportedAudioRecordingConfiguration);
    this.addCharacteristic(Characteristic.SelectedCameraRecordingConfiguration);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.RecordingAudioActive);
  }
}

Service.CameraEventRecordingManagement = CameraEventRecordingManagement;

/**
 * Service "Wi-Fi Router"
 */

export class WiFiRouter extends Service {

  static UUID = '0000020A-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, WiFiRouter.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.NetworkClientProfileControl);
    this.addCharacteristic(Characteristic.NetworkClientStatusControl);
    this.addCharacteristic(Characteristic.RouterStatus);
    this.addCharacteristic(Characteristic.SupportedRouterConfiguration);
    this.addCharacteristic(Characteristic.WANConfigurationList);
    this.addCharacteristic(Characteristic.WANStatusList);
    this.addCharacteristic(Characteristic.ManagedNetworkEnable);

    // Optional Characteristics
    this.addOptionalCharacteristic(Characteristic.NetworkAccessViolationControl);
  }
}

Service.WiFiRouter = WiFiRouter;

/**
 * Service "Wi-Fi Satellite"
 */

export class WiFiSatellite extends Service {

  static UUID = '0000020F-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, WiFiSatellite.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.WiFiSatelliteStatus);
  }
}

Service.WiFiSatellite = WiFiSatellite;

/**
 * Service "Power Management"
 */

export class PowerManagement extends Service {

  static UUID = '00000221-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, PowerManagement.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.WakeConfiguration);
  }
}

Service.PowerManagement = PowerManagement;

/**
 * Service "Transfer Transport Management"
 */

export class TransferTransportManagement extends Service {

  static UUID = '00000203-0000-1000-8000-0026BB765291';

  constructor(displayName, subtype,_id) {
    super(displayName, TransferTransportManagement.UUID, subtype,_id);

    // Required Characteristics
    this.addCharacteristic(Characteristic.SupportedTransferTransportConfiguration);
    this.addCharacteristic(Characteristic.SetupTransferTransport);
  }
}

Service.TransferTransportManagement = TransferTransportManagement;


//
// Remote Control Management  v0.1
// 
// CX RemoteKey
// 

export class RemoteControl  extends Service {
  static UUID = '00000001-0000-1777-8000-775D67EC4377';
  constructor(displayName, subtype,_id) {
    super(displayName, RemoteControl.UUID, subtype,_id);

    this.addOptionalCharacteristic(Characteristic.RemoteKey);
    this.addOptionalCharacteristic(Characteristic.CurrentTransmitter);
  }
};
Service.RemoteControl = RemoteControl;

export class RemoteKey extends Characteristic {

  static UUID = '00000222-0000-1000-8000-0026BB765291';
  constructor(_id) {
    super('Remote Key', RemoteKey.UUID,null,_id);
    this.setProps({
      format: Formats.BOOL,
      perms: [Perms.WRITE]
    });
    this.value = this.getDefaultValue();
  }
}
Characteristic.RemoteKey = RemoteKey;

export class RemoteTransmitter  extends Service {
  static UUID = '00000001-0000-1777-8000-775D67EC4377';
  constructor(displayName, subtype,_id) {
    super(displayName, RemoteControl.UUID, subtype,_id);
    this.addCharacteristic(Characteristic.CurrentTransmitter,_id+"-RemoteTransmitter");
  }
};

//
// Remote Control Management  v0.1
// 
// CX RemoteKey
// 

Service.RemoteTransmitter = RemoteTransmitter;

export class CurrentTransmitter extends Characteristic {

  static UUID = '00000222-0000-1000-8000-0026BB765291';
  constructor(_id) {
    super('Current Transmitter', CurrentTransmitter.UUID,null,_id);
    this.setProps({
        format: Formats.INT,
        maxValue: 8,
        minValue: 1,
        minStep: 1,
        perms: [Perms.READ, Perms.WRITE,Perms.NOTIFY]
    });
    this.value = this.getDefaultValue();
  }
}
Characteristic.CurrentTransmitter = CurrentTransmitter;


//
// Power Control Management  v0.1
//
// CX CurrentPowerConsumption
// CX PowerConsumptionResetCounter
// CX TotalPowerConsumption
//

export class PowerMeterService  extends Service {
  static UUID = '00000001-0000-1777-8000-775D67EC4377';
  constructor(displayName, subtype,_id) {
    super(displayName, PowerMeterService.UUID, subtype,_id);

    this.addCharacteristic(Characteristic.CurrentPowerConsumption);
    this.addOptionalCharacteristic(Characteristic.TotalPowerConsumption);
    this.addOptionalCharacteristic(Characteristic.PowerConsumptionResetCounter);
  }
};
Service.PowerMeterService = PowerMeterService;


export class CurrentPowerConsumption extends Characteristic {

  static UUID = '00000222-0000-1000-8000-0026BB765291';

  constructor() {
    super('Power Consumption', CurrentPowerConsumption.UUID,null,_id);
     this.setProps({
        format: Formats.UINT16,
        unit: "watts",
        maxValue: 1000000000,
        minValue: 0,
        minStep: 1,
        perms: [Perms.READ, Perms.NOTIFY]
      });
    this.value = this.getDefaultValue();
  }
}
Characteristic.CurrentPowerConsumption = CurrentPowerConsumption;


export class PowerConsumptionResetCounter extends Characteristic {
  static UUID = '00000025-0000-1000-8000-0026BB765299';
  constructor(_id) {
    super('Reset Counter', PowerConsumptionResetCounter.UUID,null,_id);
    this.setProps({
      format: Formats.BOOL,
      perms: [Perms.WRITE]
    });
    this.value = this.getDefaultValue();
  }
}
Characteristic.PowerConsumptionResetCounter = PowerConsumptionResetCounter;

export class TotalPowerConsumption extends Characteristic {
  static UUID = 'E863F10C-079E-48FF-8F27-9C2605A29F52';
  constructor() {
    super('Total Power Consumption', TotalPowerConsumption.UUID,null,_id);
     this.setProps({
        format: Formats.FLOAT, // Deviation from Eve Energy observed type
        unit: "kilowatthours",
        maxValue: 1000000000,
        minValue: 0,
        minStep: 0.001,
        perms: [Perms.READ, Perms.NOTIFY]
      });
    this.value = this.getDefaultValue();
  }
}
Characteristic.TotalPowerConsumption = TotalPowerConsumption;



