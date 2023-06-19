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


export const measurementApi = axios.create({
  baseURL: devMode ? "http://localhost:5000/api" : "/api"
});

measurementApi.defaults.headers.common['Content-Type'] = 'application/json';

export const getAllHomeMeasurementsFn = async () => {
    console.log("Query data:")
    const response = await measurementApi.get<IHomeMeasurementResponse>(`homemeasurements`);
    //response = await fetch("http://localhost:5000/api/homemeasurements")
    console.log("Response:")
    console.log(response.data);
    return response.data;
  };