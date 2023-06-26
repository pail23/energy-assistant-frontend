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
  name: string;
  icon: string;
  type: string;
  power: number;
  overall: IEnergy;
  today: IEnergy;
  extra_attributes: string;
}

export interface IHeatpumpDevice extends IDevice {
  actual_temperature: number;
  state: string;
}

