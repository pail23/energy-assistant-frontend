/**
 * Device-related type definitions
 */

export interface IEnergy {
  consumed_solar_energy: number;
  consumed_energy: number;
  self_sufficiency: number;
  self_consumption: number;
}

export interface IHomePower {
  solar_production: number;
  grid_supply: number;
  solar_self_consumption: number;
  home_consumption: number;
  self_sufficiency: number;
  self_consumption: number;
}

export interface IDevice {
  device_id: string;
  type: string;
  power: number;
  available: boolean;
  today: IEnergy;
  attributes: object;
}

export interface IDeviceInfo {
  id: string;
  name: string;
  icon: string;
  supported_power_modes: string[];
  power_mode: string;
}

export interface IDeviceConfig {
  [key: string]: ConfigValueType;
}

export interface ICreateDeviceData {
  device_type: string;
  name: string;
  config: IDeviceConfig;
}

export interface ICreateDeviceResponse {
  device_id: string;
}

export interface IDeviceResponse {
  devices: IDeviceInfo[];
}

export interface IDeviceControlDisabled {
  disable_device_control: boolean;
}

export type ConfigValueType = string | number | boolean | string[] | number[] | null;
