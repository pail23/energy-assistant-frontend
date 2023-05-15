import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import Device from "./device";
import { io, Socket } from "socket.io-client";
import { reactive, ref } from "vue";
/*
export class Device {
    name: string = "";
    state: number = 0.0;
    constructor(name: string = "", state: number = 0.0) {
        this.name = name;
        this.state = state;
    }
}*/

export default class DevicesAPIService {
    private axiosInstance: AxiosInstance;
    private socket: Socket;
    public home = reactive({
        name: "",
        home_consumption: 0.0,
        solar_production: 0.0,
        self_sufficiency: 0.0,
        devices: []

    });


    constructor() {
        this.axiosInstance = axios.create({
            baseURL: "http://localhost:5000/api",
            headers: {
                "Content-type": "application/json"
            }
        })
        this.socket = io(':5000');        
        this.socket.on('connect', () => {
            console.log("WS connected...");
        });

        // Event handler for server sent data.
        // The callback function is invoked whenever the server emits data
        // to the client. The data is then displayed in the "Received"
        // section of the page.
        this.socket.on('refresh', (msg, cb) => {
            console.log('Received refresh home: ' + msg.data);
            const home = JSON.parse(msg.data);
            if (cb)
                cb();
            this.home.name = home.name;
            this.home.home_consumption = home.home_consumption;
            this.home.solar_production = home.solar_production;
            this.home.self_sufficiency = home.self_sufficiency;
            this.home.solar_energy = home.solar_energy;
            this.home.consumed_energy = home.consumed_energy;
            this.home.self_sufficiency_today = home.self_sufficiency_today;
            this.home.devices = home.devices;

        });        
    }


    fetchData(){
        this.axiosInstance.get("/home").then((res) => {
            const home = res.data;
            this.home.name = home.name;
            this.home.home_consumption = home.home_consumption;
            this.home.solar_production = home.solar_production;
            this.home.self_sufficiency = home.self_sufficiency;
            this.home.solar_energy = home.solar_energy;
            this.home.consumed_energy = home.consumed_energy;
            this.home.self_sufficiency_today = home.self_sufficiency_today;
            this.home.devices = home.devices;
        })
        .catch((error) => {
            console.error(error);
        });
    }
}

export const devicesAPI = new DevicesAPIService();