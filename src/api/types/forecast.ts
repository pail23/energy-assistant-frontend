/**
 * Forecast related type definitions
 */

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
