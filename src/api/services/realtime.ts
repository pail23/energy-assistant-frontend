import { reactive } from 'vue';
import { WebsocketBuilder, Websocket, LinearBackoff } from 'websocket-ts';
import type { IDevice, IEnergy, IHomePower } from '../types';

/**
 * Real-time data API service using WebSockets
 */
export class RealtimeApiService {
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

  /**
   * Initialize WebSocket connection
   * @param baseUrl - Base URL for WebSocket connection
   */
  public initialize(baseUrl: string) {
    if (this.socket) throw new Error('already initialized');
    if (baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0, -1);
    this.baseUrl = baseUrl;

    const wsUrl = baseUrl.replace('http', 'ws') + '/ws';
    console.log(`Connecting to Energy Assistant WS API: ${wsUrl}`);

    this.socket = new WebsocketBuilder(wsUrl)
      .onOpen(() => {
        console.log('WebSocket connection opened');
        this.state.connected = true;
      })
      .onClose(() => {
        console.log('WebSocket connection closed');
        this.state.connected = false;
      })
      .onError(() => {
        console.log('WebSocket connection error');
      })
      .onMessage((_i, ev) => {
        this.updateHome(ev.data);
      })
      .onRetry(() => {
        console.log('WebSocket retry');
        this.state.connected = false;
      })
      .withBackoff(new LinearBackoff(0, 1000, 12000))
      .build();
  }

  /**
   * Update home data from WebSocket message
   * @param data - Raw WebSocket message data
   */
  private updateHome(data: string) {
    const home = JSON.parse(data);
    this.home.name = home.name;
    this.home.power = home.power;
    this.home.today = home.today;
    this.home.devices = home.devices;
  }
}
