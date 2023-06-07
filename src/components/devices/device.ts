export interface Energy {
  consumed_solar_energy : number;
  consumed_energy : number;
  self_sufficiency : number;     
}

export interface HomePower {
  solar_production: number;
  grid_supply: number;
  solar_self_consumption: number;
  home_consumption: number;
  self_sufficiency: number;
}

export interface Device {
    name: string;
    icon: string;
    type: string;
    power: number;
    overall: Energy;
    today: Energy;
    extra_attributes: string;
  }
  
  export interface HeatpumpDevice extends Device {
    actual_temperature : number;   
    state: string;
  }