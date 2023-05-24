export interface Device {
    name: string;
    icon: string;
    type: string;
    state: number;
    consumed_solar_energy : number;
    consumed_energy : number;
    self_sufficiency_today : number;   
    extra_attributes: string;
  }
  
  export interface HeatpumpDevice extends Device{
    actual_temperature : number;   
  }