import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import {Device, HeatpumpDevice} from "./device";
import { io, Socket } from "socket.io-client";
import { reactive } from "vue";

export default class DevicesAPIService {
    private axiosInstance: AxiosInstance;
    private socket: Socket;
    public home = reactive({
        name: "",
        home_consumption: 0.0,
        solar_production: 0.0,
        self_sufficiency: 0.0,
        consumed_solar_energy : 0.0,
        consumed_energy : 0.0,
        self_sufficiency_today : 0.0,        
        devices: [] as Device[],
        heat_pumps: [] as HeatpumpDevice[]
    });
    public state = reactive({
        connected: false
    });


    constructor() {
        const devMode = process.env.NODE_ENV === 'development';

        this.axiosInstance = axios.create({
            baseURL: devMode ? "http://localhost:5000/api" : "/api",
            headers: {
                "Content-type": "application/json"
            }
        })
        this.socket = devMode ? io(":5000"): io();

        this.socket.on('connect', () => {
            console.log("WS connected...");
            this.state.connected = true;
        });

        this.socket.on('disconnect', () => {    
            console.log("WS diconnected...");
            this.state.connected = false;
        });

        this.socket.on('connection', (msg, cb) => {
            console.log('Received connection home: ' + msg.data);
            if (cb)
                cb();
            this.update_home(msg.data)
        });

        // Event handler for server sent data.
        // The callback function is invoked whenever the server emits data
        // to the client. The data is then displayed in the "Received"
        // section of the page.
        this.socket.on('refresh', (msg, cb) => {
            console.log('Received refresh home: ' + msg.data);
            if (cb)
                cb();
            this.update_home(msg.data)
        });        
    }

    update_home(data:string){
        const home = JSON.parse(data);
        this.home.name = home.name;
        this.home.home_consumption = home.home_consumption;
        this.home.solar_production = home.solar_production;
        this.home.self_sufficiency = home.self_sufficiency;
        this.home.consumed_solar_energy = home.consumed_solar_energy;
        this.home.consumed_energy = home.consumed_energy;
        this.home.self_sufficiency_today = home.self_sufficiency_today;
        this.home.devices = home.devices;        
        this.home.heat_pumps = home.heat_pumps;
    }

}

export const devicesAPI = new DevicesAPIService();