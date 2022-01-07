import { WeatherPackage } from "./types";

const TEMP_RANGE_F = 140; // in US stupid imperial value
const BAROMETER_RANGE = 1400;
const HUMIDITY_RANGE = 100; // %
const WIND_DIRECTION = 360; // Degrees
const WIND_SPEED = 20; // Mph
const RAIN_RANGE = 10; // mm ?
const SOLAR_RADIATION_RANGE = 10; // mm ?

const UPDATE_INTERVAL = 10000;
export class PackageGenerator {
  private _PASSKEY: string = "111111111111111111";
  private _stationtype: string = "EasyWeather Emulator 0.1";
  private _dateutc: string = new Date().toUTCString();
  private _tempinf: number = Math.random() * TEMP_RANGE_F;
  private _tempf: number = Math.random() * TEMP_RANGE_F;
  private _humidityin: number = Math.random() * HUMIDITY_RANGE;
  private _humidity: number = Math.random() * HUMIDITY_RANGE;
  private _baromrelin: number = Math.random() * BAROMETER_RANGE;
  private _baromabsin: number = Math.random() * BAROMETER_RANGE;
  private _winddir: number = Math.random() * WIND_DIRECTION;
  private _windspeedmph: number = Math.random() * WIND_SPEED;
  private _windgustmph: number = 0;
  private _maxdailygust: number = Math.random() * WIND_SPEED;
  private _rainratein: number = Math.random() * RAIN_RANGE;
  private _eventrainin: number = Math.random() * RAIN_RANGE;
  private _hourlyrainin: number = Math.random() * RAIN_RANGE;
  private _dailyrainin: number = Math.random() * RAIN_RANGE;
  private _weeklyrainin: number = Math.random() * RAIN_RANGE;
  private _monthlyrainin: number = Math.random() * RAIN_RANGE;
  private _totalrainin: number = Math.random() * RAIN_RANGE;
  private _solarradiation: number = Math.random() * SOLAR_RADIATION_RANGE;
  private _uv: number = Math.random() * SOLAR_RADIATION_RANGE;
  private _wh65batt: number = 100;
  private _freq: number = 843; // mhz
  private _model: string = "Emulator";
  private _prev5Packages: Array<WeatherPackage> = [];

  constructor() {
    this.startTimers();
  }

  private get _negPos() {
    return Math.round(Math.random()) * 2 - 1;
  }

  private startTimers() {
    setInterval(() => {
      this._changeTemperature();
      this._changeHumidity();
      this._changePressure();
      this._changeWind();
      this._dateutc = new Date().toUTCString();
    }, UPDATE_INTERVAL);
  }

  private _changeWithinRange(n: number, change: number, range: number) {
    if (n + change < range && n + change > 0) return n + change;
    if (n + change < 0) return 0;
    return range;
  }

  private _changePressure() {
    const changeAmount = Math.random() * 50 * this._negPos;
    this._baromabsin = this._changeWithinRange(this._baromabsin, changeAmount, BAROMETER_RANGE);
    this._baromrelin = this._changeWithinRange(this._baromrelin, changeAmount, BAROMETER_RANGE);
  }

  private _changeHumidity() {
    const changeAmount = Math.random() * 3 * this._negPos;
    this._humidity = this._changeWithinRange(this._humidity, changeAmount, HUMIDITY_RANGE);
    this._humidityin = this._changeWithinRange(this._humidityin, changeAmount, HUMIDITY_RANGE);
  }

  private _changeTemperature() {
    const changeAmount = Math.random() * 3 * this._negPos;
    this._tempf = this._changeWithinRange(this._tempf, changeAmount, TEMP_RANGE_F);
    this._tempinf = this._changeWithinRange(this._tempinf, changeAmount, TEMP_RANGE_F);
  }

  private _changeWind() {
    const windDirChange = Math.random() * 70 * this._negPos;
    const windSpeedChange = Math.random() * 3 * this._negPos;
    this._winddir = this._changeWithinRange(this._winddir, windDirChange, WIND_DIRECTION);
    this._windspeedmph = this._changeWithinRange(this._windspeedmph, windSpeedChange, WIND_SPEED);
    this._windgustmph = Math.max(...this._prev5Packages.map((pkg) => pkg.windspeedmph));
  }

  public generate(): WeatherPackage {
    const metricPackage = {
      PASSKEY: this._PASSKEY,
      stationtype: this._stationtype,
      dateutc: this._dateutc,
      tempinf: this._tempinf,
      tempf: this._tempf,
      humidityin: this._humidityin,
      humidity: this._humidity,
      baromrelin: this._baromrelin,
      baromabsin: this._baromabsin,
      winddir: this._winddir,
      windspeedmph: this._windspeedmph,
      windgustmph: this._windgustmph,
      maxdailygust: this._maxdailygust,
      rainratein: this._rainratein,
      eventrainin: this._eventrainin,
      hourlyrainin: this._hourlyrainin,
      dailyrainin: this._dailyrainin,
      weeklyrainin: this._weeklyrainin,
      monthlyrainin: this._monthlyrainin,
      totalrainin: this._totalrainin,
      solarradiation: this._solarradiation,
      uv: this._uv,
      wh65batt: this._wh65batt,
      freq: this._freq,
      model: this._model,
    };

    this._prev5Packages = this._prev5Packages.slice(-3).concat([metricPackage]);

    return metricPackage;
  }
}
