export default interface Device {
    name: string;
    icon: string;
    type: string;
    state: number;
    solar_energy : number;
    consumed_energy : number;
    self_sufficiency_today : number;   
  }
  
  export interface HeatpumpDevice extends Device{
    actual_temperature : number;   
  }