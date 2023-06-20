import axios from 'axios';

const devMode = process.env.NODE_ENV === 'development';

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

export class DeviceMeasurementDifference {
  name: string;
  solar_consumed_energy: number;
  consumed_energy: number;
  self_sufficiency: number;

  constructor(name: string, solar_consumed_energy:number, consumed_energy:number) {
    this.name = name;
    this.solar_consumed_energy = solar_consumed_energy;
    this.consumed_energy = consumed_energy;
    this.self_sufficiency = consumed_energy != 0.0 ? solar_consumed_energy / consumed_energy : 0.0;
  }
}


export class HomeMeasurementDifference {
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



export const measurementApi = axios.create({
  baseURL: devMode ? "http://localhost:5000/api" : "/api"
});

measurementApi.defaults.headers.common['Content-Type'] = 'application/json';

export const getAllHomeMeasurementsFn = async () => {
  const response = await measurementApi.get<IHomeMeasurementResponse>(`homemeasurements`);
  return response.data;
};

function calculateDifference(from: IHomeMeasurementResponse, to: IHomeMeasurementResponse): HomeMeasurementDifference {
  const result = new HomeMeasurementDifference(from.name);
  result.consumed_energy = to.consumed_energy - from.consumed_energy
  result.solar_consumed_energy = to.solar_consumed_energy - from.solar_consumed_energy
  result.solar_produced_energy = to.solar_produced_energy - from.solar_produced_energy
  result.grid_exported_energy = to.grid_exported_energy - from.grid_exported_energy
  result.grid_imported_energy = to.grid_exported_energy - from.grid_exported_energy

  for (let i = 0; i < from.device_measurements.length; i++) {
    const difference = new DeviceMeasurementDifference(from.device_measurements[i].name, to.device_measurements[i].solar_consumed_energy - from.device_measurements[i].solar_consumed_energy, to.device_measurements[i].consumed_energy - from.device_measurements[i].consumed_energy);
    result.device_measurements.push(difference)
  }
  return result;
}

export const getHomeMeasurementsByDateFn = async (measurement_date: Date) => {
  const response_date = await measurementApi.get<IHomeMeasurementResponse>(`homemeasurements/by_date/` + measurement_date.toISOString().split('T')[0]);
  const response_last = await measurementApi.get<IHomeMeasurementResponse>(`homemeasurements/before_date/` + measurement_date.toISOString().split('T')[0]);
  console.log("date: ")
  console.log(response_date.data)
  console.log("last: ")
  console.log(response_last.data)

  return {
    data: response_date.data,
    last: response_last.data,
    difference: calculateDifference(response_last.data, response_date.data)
  }
};