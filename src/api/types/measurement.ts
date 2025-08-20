/**
 * Measurement and analytics related type definitions
 */

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

export interface IDeviceMeasurementPeriod {
  device_id: string;
  solar_consumed_energy: number;
  consumed_energy: number;
}

export interface IHomeMeasurementPeriod {
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
