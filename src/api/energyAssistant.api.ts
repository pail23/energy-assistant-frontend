import { $t } from '@/plugins/i18n';
import { AxiosInstance } from 'axios';
import axios from 'axios';

export interface IDeviceMeasurement {
  id: number;
  solar_consumed_energy: number;
  consumed_energy: number;
  device_id: string;
  measurement_date: Date;
}

export interface IDeviceMeasurementResponse {
  device_measurements: IDeviceMeasurement[];
}

export interface IHomeMeasurement {
  id: number;
  name: string;
  solar_consumed_energy: number;
  consumed_energy: number;
  solar_produced_energy: number;
  grid_imported_energy: number;
  grid_exported_energy: number;
  measurement_date: Date;

  device_measurements: IDeviceMeasurement[];
}

export interface IHomeMeasurementResponse {
  home_measurements: IHomeMeasurement[];
}

export interface IDeviceInfo {
  id: string;
  name: string;
  icon: string;
  supported_power_modes: string[];
  power_mode: string;
}

export interface IDeviceResponse {
  devices: IDeviceInfo[];
}

export interface IDeviceMeasurementPeriod {
  //name: string;
  device_id: string;
  solar_consumed_energy: number;
  consumed_energy: number;
}

export interface IHomeMeasurementPeriod {
  // name: string;
  solar_consumed_energy: number;
  consumed_energy: number;
  solar_produced_energy: number;
  grid_imported_energy: number;
  grid_exported_energy: number;

  device_measurements: IDeviceMeasurementPeriod[];
}

export interface IHomeMeasurementDate extends IHomeMeasurementPeriod {
  measurement_date: Date;
}

export interface IHomeMeasurementDaily {
  measurements: IHomeMeasurementDate[];
}

export interface ISessionLogEntry {
  start: Date;
  end: Date;
  text: string;
  device_id: string;
  solar_consumed_energy: number;
  consumed_energy: number;
}

export interface ISessionLog {
  entries: ISessionLogEntry[];
}

export interface IForecastSerie {
  name: string;
  data: number[];
}

export interface IForecast {
  cost: number;
  solar_energy: number;
  consumed_energy: number;
  time: Date[];
  series: IForecastSerie[];
}

export interface ICreateForecastModel {
  r2: number;
}

export interface ITuneForecastModel {
  model: string;
}

export interface IConfig {
  config: object;
}

export interface IVersion {
  version: string;
  ui_version: string;
}

export interface IDeviceControlDisabled {
  disable_device_control: boolean;
}

export type ConfigValueType = string | number | boolean | string[] | number[] | null;

export class EnergyAssistantApi {
  private axiosInstance?: AxiosInstance;
  public baseUrl?: string;
  public deviceInfos?: IDeviceInfo[];

  public async initialize(baseUrl: string) {
    if (this.axiosInstance) throw 'already initialized';
    if (baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0, -1);
    this.baseUrl = baseUrl + '/api';
    console.log(`Connecting to Energy Assistant API ${this.baseUrl}`);

    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
    });
    this.axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';
    this.deviceInfos = await this.getAllDevices();
    const otherDevice = this.getDeviceInfo('9c0e0865-f3b0-488f-8d3f-b3b0cdda5de7');
    if (otherDevice != null) {
      otherDevice.name = $t('otherDeviceName');
    }
  }

  public async getAllHomeMeasurements() {
    if (!this.axiosInstance) throw 'not initialized';
    const response = await this.axiosInstance.get<IHomeMeasurementResponse>('homemeasurements');
    return response.data.home_measurements;
  }

  public async getDeviceMeasurements(id: string) {
    if (!this.axiosInstance) throw 'not initialized';
    const response = await this.axiosInstance.get<IDeviceMeasurementResponse>('devices/' + id + '/measurements');
    return response.data.device_measurements;
  }

  public async getDailyMeasurements(from_date: Date, to_date: Date) {
    if (!this.axiosInstance) throw 'not initialized';
    const response = await this.axiosInstance.get<IHomeMeasurementDaily>(
      'history/daily?from_date=' +
        from_date.toISOString().split('T')[0] +
        '&to_date=' +
        to_date.toISOString().split('T')[0],
    );
    return response.data.measurements;
  }

  public async getDeviceSessionLog(id: string) {
    if (!this.axiosInstance) throw 'not initialized';
    const response = await this.axiosInstance.get<ISessionLog>('sessionlog?device_id=' + id);
    return response.data.entries;
  }

  public async getAllDevices(filterWithSessionLogEntries = false): Promise<IDeviceInfo[]> {
    if (!this.axiosInstance) throw 'not initialized';
    const response = await this.axiosInstance.get<IDeviceResponse>(
      'devices?filter_with_session_log_enties=' + filterWithSessionLogEntries,
    );
    return response.data.devices;
  }

  public getDeviceInfo(id: string): IDeviceInfo {
    if (this.deviceInfos != null) {
      const result = this.deviceInfos.find((info) => info.id == id);
      if (result != null) {
        return result;
      }
    }
    return {
      id: '',
      name: '',
      icon: '',
      supported_power_modes: [],
      power_mode: '',
    };
  }

  public async deleteDevice(id: string) {
    if (!this.axiosInstance) throw 'not initialized';
    await this.axiosInstance.delete('devices/' + id);
  }

  public async setPowerMode(id: string, power_mode: string) {
    const deviceInfo = this.getDeviceInfo(id);
    if (deviceInfo != null) {
      deviceInfo.power_mode = power_mode;
    }
    if (!this.axiosInstance) throw 'not initialized';
    const response = await this.axiosInstance.put<IDeviceInfo>('devices/' + id + '/power_mode', {
      power_mode: power_mode,
    });
    return response;
  }

  public async getHomeMeasurementDifference(from_measurement_date: Date, to_measurement_date: Date) {
    if (!this.axiosInstance) throw 'not initialized';
    const from_date = from_measurement_date.toISOString().split('T')[0];
    const to_date = to_measurement_date.toISOString().split('T')[0];
    return await this.axiosInstance.get<IHomeMeasurementPeriod>(
      'history/difference?from_date=' + from_date + '&to_date=' + to_date,
    );
  }

  public async getForecast() {
    if (!this.axiosInstance) throw 'not initialized';
    return (await this.axiosInstance.get<IForecast>('forecast')).data;
  }

  public async createModel(daysToRetreive: number) {
    if (!this.axiosInstance) throw 'not initialized';
    return await this.axiosInstance.post<ICreateForecastModel>(
      'forecast/create_model?days_to_retrieve=' + daysToRetreive,
    );
  }

  public async tuneModel() {
    if (!this.axiosInstance) throw 'not initialized';
    return await this.axiosInstance.post<ITuneForecastModel>('forecast/tune_model');
  }

  public async getConfig() {
    if (!this.axiosInstance) throw 'not initialized';
    return (await this.axiosInstance.get<IConfig>('config')).data.config;
  }
  public async getVersion() {
    if (!this.axiosInstance) throw 'not initialized';
    return (await this.axiosInstance.get<IVersion>('config/version')).data.version;
  }
  public async getDeviceConfig(deviceId: string) {
    if (!this.axiosInstance) throw 'not initialized';
    return (await this.axiosInstance.get<IConfig>('config/device/' + deviceId)).data.config;
  }
  public async saveDeviceConfig(deviceId: string, values) {
    if (!this.axiosInstance) throw 'not initialized';
    return await this.axiosInstance.put<IConfig>('config/device/' + deviceId, values);
  }
  public async getDeviceControlDisabled() {
    if (!this.axiosInstance) throw 'not initialized';
    return (await this.axiosInstance.get<IDeviceControlDisabled>('config/device_control')).data;
  }
  public async setDeviceControlDisabled(disable_device_control: boolean) {
    if (!this.axiosInstance) throw 'not initialized';
    return await this.axiosInstance.put<IDeviceControlDisabled>(
      'config/device_control?disable_device_control=' + disable_device_control,
    );
  }
}

export const api = new EnergyAssistantApi();

export const getAllHomeMeasurementsFn = async () => {
  return await api.getAllHomeMeasurements();
};

export const getHomeMeasurementsByDateFn = async (from_measurement_date: Date, to_measurement_date: Date) => {
  return await api.getHomeMeasurementDifference(from_measurement_date, to_measurement_date);
};
