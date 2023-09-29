export interface IEnergy {
  consumed_solar_energy: number;
  consumed_energy: number;
  self_sufficiency: number;
}

export interface IHomePower {
  solar_production: number;
  grid_supply: number;
  solar_self_consumption: number;
  home_consumption: number;
  self_sufficiency: number;
}

export interface IDevice {
  device_id: string;
  type: string;
  power: number;
  available: boolean;
  today: IEnergy;
  attributes: Object;
}

