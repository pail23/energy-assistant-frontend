import { AxiosInstance } from 'axios';
import axios from 'axios';


export interface IDeviceMeasurementResponse {
  id: number;
  name: string;
  solar_consumed_energy: number;
  consumed_energy: number;
}


export interface IHomeMeasurementResponse {
  id: number;
  name: string;
  solar_consumed_energy: number;
  consumed_energy: number;
  solar_produced_energy: number;
  grid_imported_energy: number;
  grid_exported_energy: number;
  measurement_date: Date;

  device_measurements: IDeviceMeasurementResponse[];
}

export interface IDeviceMeasurementDifference {
  name: string;
  solar_consumed_energy: number;
  consumed_energy: number;
}



export class DeviceMeasurementDifference {
  name: string;
  solar_consumed_energy: number;
  consumed_energy: number;
  self_sufficiency: number;

  constructor(name: string, solar_consumed_energy: number, consumed_energy: number) {
    this.name = name;
    this.solar_consumed_energy = solar_consumed_energy;
    this.consumed_energy = consumed_energy;
    this.self_sufficiency = consumed_energy != 0.0 ? 100 * solar_consumed_energy / consumed_energy : 0.0;
  }
}


export interface IHomeMeasurementDifference {
  name: string;
  solar_consumed_energy: number;
  consumed_energy: number;
  solar_produced_energy: number;
  grid_imported_energy: number;
  grid_exported_energy: number;

  device_measurements: IDeviceMeasurementDifference[] ;

}


export class HomeMeasurementDifference implements IHomeMeasurementDifference {
  name: string;
  solar_consumed_energy: number = 0;
  consumed_energy: number = 0;
  solar_produced_energy: number = 0;
  grid_imported_energy: number = 0;
  grid_exported_energy: number = 0;

  device_measurements: DeviceMeasurementDifference[] = [];

  constructor(name: string) {
    this.name = name;
  }
}


export class EnergyAssistantApi {
  private axiosInstance?: AxiosInstance;
  public baseUrl?: string;

  constructor() {
  }

  public initialize(baseUrl: string) {
    if (this.axiosInstance) throw "already initialized";
    if (baseUrl.endsWith("/")) baseUrl = baseUrl.slice(0, -1);
    this.baseUrl = baseUrl + "/api";
    console.log(`Connecting to Energy Assistant API ${this.baseUrl}`);

    this.axiosInstance = axios.create({
      baseURL: this.baseUrl
    });
    this.axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';

  }

  public async getAllHomeMeasurements() {
    if (!this.axiosInstance) throw "not initialized";
    const response = await this.axiosInstance.get<IHomeMeasurementResponse>(`homemeasurements`);
    return response.data;
  }

  public async getHomeMeasurementDifference(from_measurement_date: Date, to_measurement_date: Date) {
    if (!this.axiosInstance) throw "not initialized";
    const from_date = from_measurement_date.toISOString().split('T')[0];
    const to_date = to_measurement_date.toISOString().split('T')[0];
    return await this.axiosInstance.get<IHomeMeasurementDifference>(`history/difference/` + from_date+ '?to_date=' + to_date);
  }

}

export const api = new EnergyAssistantApi();

export const getAllHomeMeasurementsFn = async () => {
  return await api.getAllHomeMeasurements();
};

export const getHomeMeasurementsByDateFn = async (from_measurement_date: Date, to_measurement_date: Date) => {
  return await api.getHomeMeasurementDifference(from_measurement_date, to_measurement_date)
}
