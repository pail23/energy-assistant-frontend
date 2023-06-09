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
}

export interface IDeviceResponse {
  devices: IDeviceInfo[];
}

export interface IDeviceMeasurementDifference {
  name: string;
  device_id: string;
  solar_consumed_energy: number;
  consumed_energy: number;
}

export interface IHomeMeasurementDifference {
  name: string;
  solar_consumed_energy: number;
  consumed_energy: number;
  solar_produced_energy: number;
  grid_imported_energy: number;
  grid_exported_energy: number;

  device_measurements: IDeviceMeasurementDifference[];
}

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
    this.axiosInstance.defaults.headers.common['Content-Type'] =
      'application/json';
    this.deviceInfos = await this.getAllDevices();
  }

  public async getAllHomeMeasurements() {
    if (!this.axiosInstance) throw 'not initialized';
    const response = await this.axiosInstance.get<IHomeMeasurementResponse>(
      'homemeasurements',
    );
    return response.data.home_measurements;
  }

  public async getDeviceMeasurements(id: string) {
    if (!this.axiosInstance) throw 'not initialized';
    const response = await this.axiosInstance.get<IDeviceMeasurementResponse>(
      'devices/' + id + '/measurements',
    );
    return response.data.device_measurements;
  }

  public async getAllDevices(): Promise<IDeviceInfo[]> {
    if (!this.axiosInstance) throw 'not initialized';
    const response = await this.axiosInstance.get<IDeviceResponse>('devices');
    return response.data.devices;
  }

  public getDeviceInfo(id: string): IDeviceInfo {
    if (this.deviceInfos != null) {
      const result = this.deviceInfos.find((info) => info.id == id);
      if (result != null) {
        return result;
      }
    }
    return { id: '', name: '', icon: '' };
  }

  public async getHomeMeasurementDifference(
    from_measurement_date: Date,
    to_measurement_date: Date,
  ) {
    if (!this.axiosInstance) throw 'not initialized';
    const from_date = from_measurement_date.toISOString().split('T')[0];
    const to_date = to_measurement_date.toISOString().split('T')[0];
    return await this.axiosInstance.get<IHomeMeasurementDifference>(
      'history/difference/' + from_date + '?to_date=' + to_date,
    );
  }
}

export const api = new EnergyAssistantApi();

export const getAllHomeMeasurementsFn = async () => {
  return await api.getAllHomeMeasurements();
};

export const getHomeMeasurementsByDateFn = async (
  from_measurement_date: Date,
  to_measurement_date: Date,
) => {
  return await api.getHomeMeasurementDifference(
    from_measurement_date,
    to_measurement_date,
  );
};
