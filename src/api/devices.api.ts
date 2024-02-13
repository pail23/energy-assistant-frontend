//import axios, { AxiosInstance} from "axios"
import { IDevice, IEnergy, IHomePower } from './device';
import { reactive } from 'vue';

export default class DevicesAPIService {
  // private axiosInstance: AxiosInstance;
  private socket?: WebSocket;
  public baseUrl?: string;
  public home = reactive({
    name: '',
    home_consumption: 0.0,
    power: {
      solar_production: 0.0,
      grid_supply: 0.0,
      solar_self_consumption: 0.0,
      home_consumption: 0.0,
      self_sufficiency: 0.0,
    } as IHomePower,
    today: {
      consumed_solar_energy: 0.0,
      consumed_energy: 0.0,
      self_sufficiency: 0.0,
    } as IEnergy,
    devices: [] as IDevice[],
  });
  public state = reactive({
    connected: false,
  });

  public initialize(baseUrl: string) {
    if (baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0, -1);
    this.baseUrl = baseUrl;
    let pathname = new URL(baseUrl).pathname;
    if (pathname.endsWith('/')) pathname = pathname.slice(0, -1);
    // const sio_path = pathname + '/ws';
    // const wsUrl = baseUrl.replace("http", "ws");

    const devMode = process.env.NODE_ENV === 'development';
    const ws_url = devMode ? 'ws://localhost:5000/ws' : '';
    console.log(`Connecting to Energy Assistant WS API path ${ws_url}`);

    this.socket = new WebSocket(ws_url);
    this.state.connected = true;

    this.socket.onopen = () => {
      this.state.connected = true;
    };
    this.socket.onclose = () => {
      this.state.connected = false;
      setInterval(() => {
        this.initialize(baseUrl);
      }, 10000);
    };

    this.socket.onmessage = (event) => {
      this.update_home(event.data);
    };
  }

  update_home(data: string) {
    const home = JSON.parse(data);
    this.home.name = home.name;
    this.home.power = home.power;
    this.home.today = home.today;
    this.home.devices = home.devices;
  }
}

export const devicesAPI = new DevicesAPIService();
