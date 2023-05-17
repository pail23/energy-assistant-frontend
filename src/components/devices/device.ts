export default interface Device {
    name: string;
    icon: string;
    state: number;
    solar_energy : number;
    consumed_energy : number;
    self_sufficiency_today : number;   
  }
  