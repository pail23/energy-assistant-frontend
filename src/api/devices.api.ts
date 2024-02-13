//import axios, { AxiosInstance} from "axios"
import { IDevice, IEnergy, IHomePower } from './device';
import { reactive } from 'vue';
import { WebsocketBuilder, Websocket, LinearBackoff } from 'websocket-ts';

export default class DevicesAPIService {
  // private axiosInstance: AxiosInstance;
  private socket?: Websocket;
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
    if (this.socket) throw new Error('already initialized');
    if (baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0, -1);
    this.baseUrl = baseUrl;
    let pathname = new URL(baseUrl).pathname;
    if (pathname.endsWith('/')) pathname = pathname.slice(0, -1);
    // const sio_path = pathname + '/ws';
    // const wsUrl = baseUrl.replace("http", "ws");

    const devMode = process.env.NODE_ENV === 'development';
    const wsUrl = devMode ? 'ws://localhost:5000/ws' : '';
    console.log(`Connecting to Energy Assistant WS API path ${wsUrl}`);

    this.socket = new WebsocketBuilder(wsUrl)
      .onOpen(() => {
        console.log('connection opened');
        this.state.connected = true;
      })
      .onClose(() => {
        console.log('connection closed');
        this.state.connected = false;
      })
      .onError(() => {
        console.log('error on connection');
      })
      .onMessage((_i, ev) => {
        this.update_home(ev.data);
      })
      .onRetry(() => {
        console.log('retry');
        this.state.connected = false;
      })
      .withBackoff(new LinearBackoff(0, 1000, 12000))
      .build();
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
